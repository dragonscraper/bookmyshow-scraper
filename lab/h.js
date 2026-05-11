function cutomFuntion(
  venueCode,
  sessionId,
  eventCode,
  showTimeString,
  isAtmosEnabledAPI,
  dateSelected
) {
  a = strEventName;
  // show name

  evtName = "";
  if (a.indexOf("(U/A)") > 1) {
    evtName = a.replace("(U/A)", "");
  } else if (a.indexOf("(U)") != -1) {
    evtName = a.replace("(U)", "");
  } else if (a.indexOf("(A)") != -1) {
    evtName = a.replace("(A)", "");
  } else {
    evtName = a;
  }

  var eventDetail = {},
    sessionArr = [];

  eventDetail = _.find(
    _.flatten(_.pluck(UAPI.ShowDetails[0].Event, "ChildEvents")),
    function (obj) {
      return obj.EventCode == eventCode;
    }
  );

  if (!eventDetail) {
    return;
  }

  function getCatAvailabilityJs(cat) {
    var availSeatRange = [
      {
        availStatus: "0",
        class: "_sold",
        text: "Sold Out",
      },
      {
        availStatus: "1",
        class: "_filling",
        text: "Almost Full",
      },
      {
        availStatus: "2",
        class: "_filling",
        text: "Filling Fast",
      },
      {
        availStatus: "3",
        class: "_available",
        text: "Available",
      },
    ];

    var returnCat = {
      class: "",
      text: "",
    };

    for (var asr of availSeatRange) {
      if (parseInt(cat.AvailStatus, 10) === parseInt(asr.availStatus, 10)) {
        returnCat = asr;
        break;
      }
    }

    return returnCat;
  }

  $.each(eventDetail["ShowTimes"], function (i, item) {
    var showCats = [];
    if (item.Categories && item.Categories.length > 0) {
      $.each(item.Categories, function (j, catCodes) {
        var availabilityDetails = getCatAvailabilityJs(catCodes);
        showCats.push({
          price: catCodes.CurPrice,
          desc: catCodes.PriceDesc,
          availabilityClass: availabilityDetails.class,
          availabilityText: availabilityDetails.text,
          priceCode: catCodes.PriceCode,
          availStatus: catCodes.AvailStatus,
          overallSeatsStatus: item.AvailStatus,
        });
      });
    }

    sessionArr.push({
      id: item.SessionId,
      time: item.ShowTime,
      dateTime: item.ShowDateTime,
      isAvailable: item.AvailStatus !== "0" ? "Y" : "N",
      isAtmosEnabled: item.IsAtmosEnabled == "N" ? false : true,
      sessionPopUpDesc: item.SessionPopUpDesc,
      attributes: item.Attributes,
      cats: showCats,
      dateTime: item.ShowDateTime,
      overallAvailStatus: item.AvailStatus,
      showtimeCode: item.ShowDateCode,
    });
  });

  var sessionMessage = "";
  var popupDescription = "";
  var popUpAndVenueMessage = "";
  var msgBody = "";

  $.each(sessionArr, function (index, value) {
    if (value.id == sessionId) {
      sessionMessage = !value.sessionPopUpDesc ? "" : value.sessionPopUpDesc;
      console.log(sessionMessage);
      return;
    }
  });

  popupDescription = !eventDetail.Event_strPopUpDesc
    ? ""
    : eventDetail.Event_strPopUpDesc;
  popUpAndVenueMessage = (
    popupDescription +
    (Message != "" && popupDescription != "" ? "<br>" : "") +
    Message
  ).trim();
  msgBody =
    sessionMessage +
    (sessionMessage != "" ? "<br>" : "") +
    popUpAndVenueMessage;
  console.log(msgBody);
  var events = {
    selected: {
      time: showTimeString,
      date: SeatdateSelected.trim(),
      ssid: sessionId,
      venueCode: venueCode,
      cats: cats,
    },
    event: [],
    venue: [],
    cats: cats,
  };
  console.log(events);
  var globalEventAPI = {};
  globalEventAPI[eventCode] = {
    event: {
      eventCode: eventCode,
      title: evtName,
      language: strEventLan,
      dimension: evtDimensions,
      isAtmosEnabled: isAtmosEnabledAPI,
      censor: strEventSen,
      sessions: sessionArr,
    },
  };
  console.log(globalEventAPI);
  events.event.push(globalEventAPI[eventCode].event);
  var globalVenueAPI = {};
  globalVenueAPI[venueCode] = {
    code: venueCode,
    eventCode: eventCode,
    name: strVenueName,
    appType: VenueApp,
    isFullSeatLayout: IsFullSeatLayout,
    message: {
      type: MessageType,
      title: MessageTitle,
      body: msgBody,
    },
    sessions: sessionArr,
  };
  events.venue.push(globalVenueAPI[venueCode]);
  if (newShowtime) {
    var tncExists = msgBody !== "";
    fnSelSh(
      "ET",
      venueCode,
      sessionId,
      eventCode,
      showTimeString,
      events,
      undefined,
      tncExists
    );
  } else if (msgBody != "") {
    console.log(venueCode, sessionId, eventCode, showTimeString, events);
    fnPopupSelSh("ET", venueCode, sessionId, eventCode, showTimeString, events);
  } else {
    console.log("ET", venueCode, sessionId, eventCode, showTimeString, events);
    fnSelSh("ET", venueCode, sessionId, eventCode, showTimeString, events);
  }
}

cutomFuntion(
  "GTWH",
  "29614",
  "ET00408691",
  "12:00 PM",
  "N",
  "Tuesday,Mar 18,  2025,12:00 PM"
);

// Load CryptoJS if not already available
if (typeof CryptoJS === "undefined") {
  var script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
  document.head.appendChild(script);
}

setTimeout(() => {
  const key = CryptoJS.enc.Utf8.parse("kYp3s6v9y$B&E)H+MbQeThWmZq4t7w!z");

  function decryptStrData(encryptedStr) {
    const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedStr);
    const iv = CryptoJS.lib.WordArray.create(encryptedBytes.words.slice(0, 4)); // Extract IV (first 16 bytes)
    const cipherText = CryptoJS.lib.WordArray.create(
      encryptedBytes.words.slice(4)
    );

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherText }, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  // Encrypted strData
  const encryptedData =
    "ljxG4c60/ygSeds0vnxDH3edf1R2aQS/HAugyT3pzEYiwrwToEEndPDUIQgHMgYdN50qB4EtorPgzGfLmU76dQRZ4EKcVfUvKJVmau1ZrktcxJm9pM63prjglboUDFqIvh8DRESejHbM+uqYHi83+07QBpArK/AbtcbFTQ4AvAj10TWeoniIStFlncZscwo+2jpW211c/INznOQnvuZKongYZ+pMcJhCBfpF0SORVD9X6Ek2apfxeBgdvAGNkRkHGYfwiUpN5QevJXIgylrQ2sZKV9AMBqxpzxXHO6hK748SowH6Y8tzLLvgXXiV18FXAFRvE2PMO6shuhzmk+mtERxgoyneZwfOUO0SQq5MwgCNOAde9heMaGz/YF6VgSZxFFmkQS2FL3QbKqEIrefeae9b4lEbKgMntlzndZeOmFXv49u4nwzB9WUroUOxJIJoNoKmR/h/JGAkRuwlzTvhUl9b8vOl3rEKdcmfN0ET2rdKsOCVUo4BT/hlFz/kN358V6S12zLGHKkLGudwDvuhPnGSrAYvM3Ltou2O681cfIVB1Ez2FXRdPGocytpEL6C4aoB3dQgAwaDuedgELLzaojpCqySU6r7SHVll6g/eYhAIUJ9L0XBLRg4hlcMFQTW6GN4gtSCimNUi6cidCMEl7nzrBHaJka8jtcqjBGnURFDC6G3c1MhJKHEsgv9O46q13R/OpgcvUX267YKGvA7P9a5RZdwwhT5btUbnPogOe7R7rvOl+uGxLj7b4qEdLbI1NuCZ9EhzHIClwjTVLg4IGHtThJ+YmcnUdbjMYnnOxqh4UNN5gj3M6xVT+ciww/1MjtaOJ67gC0kogpWkaY9pIyFUH+8NR0cnKFyK35/jH8ISkimafXw2WjNsJ7610yxGEXyKMjBK76Ze27p5JxbhRA==";

  console.log("Decrypted Data:", decryptStrData(encryptedData));
}, 2000);
