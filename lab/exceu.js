function callSeatLayout(
  venueCode,
  sessionId,
  eventCode,
  showTimeString,
  isAtmosEnabledAPI,
  dateSelected
) {
  a = strEventName;
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
  console.log(eventDetail);
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
    console.log(returnCat);
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
    console.log(showCats);

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
  console.log(sessionArr);
  var sessionMessage = "";
  var popupDescription = "";
  var popUpAndVenueMessage = "";
  var msgBody = "";

  $.each(sessionArr, function (index, value) {
    if (value.id == sessionId) {
      sessionMessage = !value.sessionPopUpDesc ? "" : value.sessionPopUpDesc;
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
    fnPopupSelSh("ET", venueCode, sessionId, eventCode, showTimeString, events);
  } else {
    fnSelSh("ET", venueCode, sessionId, eventCode, showTimeString, events);
  }
}

callSeatLayout(
  "CSWO",
  "86182",
  "ET00363454",
  "11:45 AM",
  "N",
  "Saturday,Mar 22,  2025,11:45 AM"
);
