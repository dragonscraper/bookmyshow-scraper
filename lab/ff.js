function fnGetCoupon() {
  try {
    (cpnObj = []),
      (arrCpnAdded = []),
      (objCpnData = {}),
      (objProcCpnData = {}),
      $(".cpnRefresh").unbind("click"),
      $("#CpnCnt").text("upto 2"),
      $(".overlay_box").show(),
      $("#cpnloading h2").text("Loading..."),
      $("#cpnloading").show(),
      $("#selctSeat").hide(),
      (TicCpnPrice =
        "undefined" == typeof TicCpnPrice ? arrShowInfo[0].Price : TicCpnPrice),
      BMS.Misc.fnAjax({
        url: "/serv/getData",
        type: "GET",
        dataType: "json",
        data: {
          cmd: "GETCOUPONSEATNEW",
          vid: glBT.SVC,
          Appc: global.strAppCode,
          eid: glBT.SEC,
          st: arrShowInfo[0].ShowDateTime,
          tq: Qty,
          tp: TicCpnPrice,
          dc: arrShowInfo[0].ShowDateCode,
          RecoEmail: BMS.Storage.get({ name: "le" }),
          UserRgn: BMS.Region.fnGRgn(),
        },
        success: function (e) {
          fnDisCoupon(e);
        },
        error: function (e) {
          $("#selctSeat").hide(),
            $(".overlay_box").show(),
            $("#nocp h2").text("No Coupons Found"),
            $("#nocp").show(),
            $("#cpnloading").hide();
        },
      });
  } catch (e) {
    void 0;
  }
}
function fnDisCoupon(e) {
  try {
    for (
      $(".cpnRefresh").css("cursor", "pointer"),
        cntAddCpn = 0,
        arrNonProm = [],
        arrProm = [],
        void 0,
        $("#cpnmain").hide(),
        cpnObj.push(e),
        coupData = "",
        blnIsCoupons = !1,
        void 0,
        PgNoNext = e.page.next,
        PgNoPre = e.page.previous,
        $("#cpnRefresh").css("cursor", "pointer"),
        defaultCouponShow ||
          ((blnUnpaid =
            ("Y" == unpaidflg && intQuatt >= parseInt(Qty)
              ? ($("#btn-paylater").css("display", "inline-block"),
                $("#btn-btm-paylater").css("display", "inline-block"),
                $(".laterMsgText").text("").hide(),
                $("#btn-btm-paylater")
                  .removeClass("_disable")
                  .addClass("_cuatro"),
                $("#btn-paylater").removeClass("_disable").addClass("_cuatro"),
                $("#btn-btm-paylater").attr("onclick", "fnPayLatter('Y')"),
                $("#btn-paylater").attr("onclick", "fnPayLatter('Y')"))
              : ((seats_string =
                  1 == parseInt(intQuatt) ? " seat" : " seat (s)"),
                (0 == parseInt(intQuatt)
                  ? $(".laterMsgText").text(
                      "Enough seats are not available for this option."
                    )
                  : $(".laterMsgText").text(
                      "Reserve upto " +
                        intQuatt +
                        seats_string +
                        " and confirm by paying online upto " +
                        unpaid_CutOff_time +
                        " before the show."
                    )
                ).css("display", "inline-block"),
                $("#btn-paylater").removeClass("_cuatro").addClass("_disable"),
                $("#btn-btm-paylater")
                  .removeClass("_cuatro")
                  .addClass("_disable"),
                $("#btn-btm-paylater").attr("onclick", "fnRevDis()"),
                $("#btn-paylater").attr("onclick", "fnRevDis()")),
            !1)),
          "True" == blnActiveTrans &&
            ($(".laterMsgText")
              .text(
                "It seems you already have a booking with us. Please choose the 'Pay now' option to continue with this booking. "
              )
              .css("display", "inline-block"),
            $("#btn-paylater").css("display", "inline-block"),
            $("#btn-btm-paylater").css("display", "inline-block"),
            $("#btn-paylater").removeClass("_cuatro").addClass("_disable"),
            $("#btn-btm-paylater").removeClass("_cuatro").addClass("_disable"),
            $("#btn-btm-paylater").attr("onclick", "fnRevDis()"),
            $("#btn-paylater").attr("onclick", "fnRevDis()"),
            (blnUnpaid = !1)),
          "False" == blnAllowUnpaid &&
            ($(".laterMsgText")
              .text(
                "It seems you have Cancelled Reservation twice in this month for PVR. Please choose the 'Pay now' option to continue with this booking. "
              )
              .css("display", "inline-block"),
            $("#btn-paylater").css("display", "inline-block"),
            $("#btn-btm-paylater").css("display", "inline-block"),
            $("#btn-paylater").removeClass("_cuatro").addClass("_disable"),
            $("#btn-btm-paylater").removeClass("_cuatro").addClass("_disable"),
            $("#btn-btm-paylater").attr("onclick", "fnRevDis()"),
            $("#btn-paylater").attr("onclick", "fnRevDis()"),
            (blnUnpaid = !1))),
        i = 0;
      i < e.couponsets.length;
      i++
    ) {
      (blnIsCoupons = !0),
        (couponType = e.couponsets[i].isPromoted ? "promoted" : "nonPromoted"),
        (cpn_flat_Dis = "Save Rs." + e.couponsets[i].flatDiscount),
        (coupData +=
          "<aside id =mainDiv" +
          e.couponsets[i].couponsetId +
          " data-type=" +
          couponType +
          " data-id=" +
          e.couponsets[i].couponsetId +
          ">"),
        (coupData += '<div class="coupons_card">'),
        (coupData += '<div class="card_inner_section">'),
        (coupData +=
          "<div data-modal =" +
          e.couponsets[i].couponsetId +
          "," +
          couponType +
          ' class="card_left_section showmodal">'),
        (coupData += '<div class="card_banner">'),
        (imgUrl =
          "" != e.couponsets[i].largeBrandLogo
            ? e.couponsets[i].largeBrandLogo
            : e.couponsets[i].brandLogo),
        (coupData += "<img src=" + imgUrl + ">"),
        (coupData += "</div>"),
        (coupData += '<div class="location_section">'),
        (coupData += '<div class="st-distance" style="display: block;">'),
        (coupData += '<span class="__dis-icon">'),
        (coupData +=
          '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">'),
        (coupData +=
          '<use xlink:href="/icons/buytickets-icons#icon-theatre-distance"></use>'),
        (coupData += "</svg>"),
        (coupData += "</span>");
      var t = "",
        t = e.couponsets[i].inCinema
          ? "In Cinema"
          : e.couponsets[i].inMall
          ? "In Mall"
          : ((DisCinema =
              1 < e.couponsets[i].distanceFromCinema
                ? e.couponsets[i].distanceFromCinema + " KM"
                : 1e3 * e.couponsets[i].distanceFromCinema + " m"),
            DisCinema);
      (coupData += '<span class="__distance">' + t + "</span>"),
        (coupData += "</div>"),
        (coupData += "</div>"),
        (coupData += "</div>"),
        (coupData += '<div class="card_right_section">'),
        (coupData +=
          "<div data-modal =" +
          e.couponsets[i].couponsetId +
          "," +
          couponType +
          ' class="card_details_section showmodal">'),
        (coupData += "<h2>" + e.couponsets[i].brandName + "</h2>"),
        (coupData += '<div class="card_disc">'),
        50 < e.couponsets[i].offerDescription.length
          ? (coupData +=
              "<h3 id=offer_" +
              e.couponsets[i].couponsetId +
              ">" +
              e.couponsets[i].offerDescription.substr(0, 50) +
              "...</h3>")
          : (coupData +=
              "<h3 id=offer_" +
              e.couponsets[i].couponsetId +
              ">" +
              e.couponsets[i].offerDescription +
              "</h3>"),
        (coupData += "</div>"),
        (coupData +=
          "<div data-modal =" +
          e.couponsets[i].couponsetId +
          "," +
          couponType +
          ' class="bought_section">'),
        (coupData +=
          '<span class="icon-ua" id="sen_ua" style="display: inline-block;">'),
        (coupData +=
          '<svg width=\'100%\' height=\'100%\' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" enable-background="new 0 0 100 100" xml:space="preserve">'),
        (coupData +=
          '<use xlink:href="/icons/common-icons.svg#icon-ref-a-friends"></use>'),
        (coupData += "</svg>"),
        (coupData += "</span>");
      var a = e.couponsets[i].isNewCampaign
        ? " New"
        : e.couponsets[i].boughtCount + " Bought";
      if (
        ((coupData += "<h4>" + a + "</h4>"),
        (coupData += "</div>"),
        (coupData += "</div>"),
        (coupData += '<div class="right_bottom">'),
        (coupData +=
          "<div data-modal =" +
          e.couponsets[i].couponsetId +
          "," +
          couponType +
          ' class="seve_section showmodal">'),
        (coupData += "<h3>" + cpn_flat_Dis + "*</h3>"),
        (coupData += "</div>"),
        (coupData +=
          "<div id=add_" +
          e.couponsets[i].couponsetId +
          " onclick =\"fnAddCoupons('" +
          e.couponsets[i].couponsetId +
          '\')" class="add_remove_btn">'),
        (coupData += "<h3>FREE</h3>"),
        (coupData += "</div>"),
        (coupData +=
          "<div id=rm_" +
          e.couponsets[i].couponsetId +
          " onclick =\"fnRemoveCoupons('" +
          e.couponsets[i].couponsetId +
          '\')" class="_remove_btn coup_remove">'),
        (coupData += "<h3>REMOVE</h3>"),
        (coupData += "</div>"),
        (coupData +=
          "<div data-modal =" +
          e.couponsets[i].couponsetId +
          "," +
          couponType +
          ' class="price_strikedprice showmodal">'),
        (coupData += "</div>"),
        (coupData += '<div class="clear"></div>'),
        (coupData += "</div>"),
        (coupData += "</div>"),
        (coupData += '<div class="clear"></div>'),
        global.blnIsTouchScreen)
      ) {
        var o = "";
        "" != e.couponsets[i].mobileNumber &&
          (o = e.couponsets[i].mobileNumber),
          "" != e.couponsets[i].landLine &&
            ("" != o
              ? (o += ", " + e.couponsets[i].landLine)
              : (o = e.couponsets[i].landLine));
        var n = "";
        if (0 < e.couponsets[i].outletOpeningHours.hours.length)
          for (
            var s = 0;
            s < e.couponsets[i].outletOpeningHours.hours.length;
            s++
          )
            n +=
              e.couponsets[i].outletOpeningHours.hours[s].from +
              "-" +
              e.couponsets[i].outletOpeningHours.hours[s].to +
              "</br>";
        var r = "";
        if (0 < e.couponsets[i].dayOfWeek.length)
          for (s = 0; s < e.couponsets[i].dayOfWeek.length; s++) {
            if ("ALL_DAYS" == e.couponsets[i].dayOfWeek[s]) {
              r += "All Days";
              break;
            }
            e.couponsets[i].dayOfWeek.length - s <= 1
              ? (r += e.couponsets[i].dayOfWeek[s])
              : (r += e.couponsets[i].dayOfWeek[s] + ",");
          }
        var l = (restTypeText = "");
        if (0 < e.couponsets[i].cuisineType.length) {
          for (s = 0; s < e.couponsets[i].cuisineType.length; s++)
            l += e.couponsets[i].cuisineType[s] + ",";
          restTypeText = l.replace(/,\s*$/, "");
        } else
          restTypeText = e.couponsets[i].cuisineType[0].replace(/,\s*$/, "");
        for (
          var c = "", d = e.couponsets[i].termsAndConditions.split("\n"), s = 0;
          s < d.length;
          s++
        )
          c += "<li>" + d[s].replace("\r", "") + "</li>";
        for (
          var p = "<strong>Redemption Process: </strong>",
            f = e.couponsets[i].redeemProcess.split("\n"),
            s = 0;
          s < f.length;
          s++
        )
          p += f[s].replace("\r", "") + "<br/>";
        (coupData +=
          "<div id = card_" +
          e.couponsets[i].couponsetId +
          ' class="card_info_slide" style="display:none">'),
          (coupData += ' <div class="ctnc_notes">'),
          (coupData +=
            '<div class="ctnc_validtill">Valid till <span id="">' +
            ("" != e.couponsets[i].validUpto
              ? e.couponsets[i].validUpto
              : "NA") +
            "</span></div>"),
          (coupData += ' <div class="ctnc_location location_txt">'),
          (coupData += ' <span class="_svgicons">'),
          (coupData +=
            ' <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">'),
          (coupData +=
            ' <use xlink:href="/icons/common-icons.svg#icon-location"></use>'),
          (coupData += " </svg>"),
          (coupData += " </span>"),
          (coupData +=
            ' <span class="__content" id="">' +
            ("" != e.couponsets[i].outletAddress
              ? e.couponsets[i].outletAddress
              : "NA") +
            "</span>"),
          (coupData += " </div>"),
          (coupData += ' <div class="ctnc_location">'),
          (coupData += ' <span class="_svgicons">'),
          (coupData +=
            ' <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">'),
          (coupData +=
            ' <use xlink:href="/icons/confirmation-icons.svg#icon-time"></use>'),
          (coupData += " </svg>"),
          (coupData += " </span>"),
          (coupData += ' <span class="__content" id="">' + n + "</span>"),
          (coupData += ' <p class="__outnotes" id="outNotes"></p>'),
          (coupData += " </div>"),
          (coupData += '<div class="ctnc_location">'),
          (coupData += '<span class="_svgicons">'),
          (coupData +=
            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">'),
          (coupData +=
            '<use xlink:href="/icons/confirmation-icons.svg#icon-date"></use>'),
          (coupData += "</svg>"),
          (coupData += "</span>"),
          (coupData +=
            '<span class="__content" id="">Valid On: ' + r + "</span>"),
          (coupData += "</div>"),
          (coupData += '<div class="ctnc_location">'),
          (coupData += '<span class="_svgicons">'),
          (coupData +=
            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">'),
          (coupData +=
            '<use xlink:href="/icons/home-icons.svg#icon-mobile"></use>'),
          (coupData += "</svg>"),
          (coupData += "</span>"),
          (coupData +=
            '<span class="__content" id="">' +
            ("" != o ? o : "NA") +
            "</span>"),
          (coupData += "</div>"),
          (coupData += '<div class="ctnc_location">'),
          (coupData += '<span class="_svgicons">'),
          (coupData +=
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-255 333.3 100 100" style="enable-background:new -255 333.3 100 100;" xml:space="preserve">'),
          (coupData += "<g>"),
          (coupData +=
            '<path class="st0" d="M-198.9,368.6c-1.3,1.6-3.4,2.6-5.6,2.6c0,0,0,0,0,0c2.2,0,4.2-1,5.5-2.6c1.1-1.3,1.8-2.9,1.8-4.7c0-4-3.3-7.3-7.3-7.3s-7.3,3.3-7.3,7.3c0,1.8,0.7,3.4,1.8,4.7c0.8,0.9,1.8,1.6,3,2.1c-1.2-0.4-2.4-1.1-3.2-2.1c-18.1,2.7-32.2,18.4-32.2,37.2v2.3h76v-2.3C-166.5,386.9-180.7,371.2-198.9,368.6z M-208.5,363.9c0-2.1,1.7-3.8,3.8-3.8s3.8,1.7,3.8,3.8s-1.7,3.8-3.8,3.8S-208.5,366-208.5,363.9z M-238.6,404.7c0.9-19,15.9-32.4,34.1-32.4s33.2,13.4,34.1,32.4H-238.6z"/>'),
          (coupData +=
            '<path class="st0" d="M-231.9,396.7l3.3,1.1h0c0.3-1.7,0.6-1.7,1-2.5c0,0,0,0,0,0c3.7-8.3,11.6-13.9,20.6-14.8c0.9-0.1,2.6-0.2,2.6-0.2v-3.5C-216.6,376.9-228,384.9-231.9,396.7z"/>'),
          (coupData += "</g>"),
          (coupData += " </svg>"),
          (coupData += "</span>"),
          (coupData +=
            '<span class="__content" id="">' + restTypeText + "</span>"),
          (coupData += "</div>"),
          (coupData += '<div class="ctnc_location">'),
          (coupData += ' <span class="_svgicons">'),
          (coupData +=
            ' <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">'),
          (coupData +=
            ' <use xlink:href="/icons/common-icons.svg#icon-info"></use>'),
          (coupData += " </svg>"),
          (coupData += " </span>"),
          (coupData += '<div class="__content">' + p + "</div>"),
          (coupData += " </div>"),
          (coupData += '<div class="ctnc_lists">'),
          (coupData +=
            '<div class="_ctnctitle"><span id="">*</span> Terms and Conditions<span class="showtnc">+</span></div>'),
          (coupData += '<ul id="cpTnc" class="olnu" style="display:none;">'),
          (coupData += c),
          (coupData += "</ul>"),
          (coupData += "</div>"),
          (coupData += "</div>"),
          (coupData += "</div>");
      }
      (coupData += "</div>"),
        (coupData += "<div id=cp_" + e.couponsets[i].couponsetId + "></div>"),
        (coupData += "</div>"),
        (coupData += "</aside>"),
        (objCpnData[e.couponsets[i].couponsetId] = {}),
        (objCpnData[e.couponsets[i].couponsetId].added = 0),
        (objCpnData[e.couponsets[i].couponsetId].campaignId =
          e.couponsets[i].campaignId),
        (objCpnData[e.couponsets[i].couponsetId].couponsetId =
          e.couponsets[i].couponsetId),
        (objProcCpnData[e.couponsets[i].couponsetId] = {}),
        (objProcCpnData[e.couponsets[i].couponsetId].added = 0),
        (objProcCpnData[e.couponsets[i].couponsetId].campaign_id =
          e.couponsets[i].campaign_id),
        (objProcCpnData[e.couponsets[i].couponsetId].couponsetId =
          e.couponsets[i].couponsetId),
        (objProcCpnData[e.couponsets[i].couponsetId].brandName =
          e.couponsets[i].brandName),
        (objProcCpnData[e.couponsets[i].couponsetId].displayPriceRs =
          e.couponsets[i].displayPriceRs),
        (objProcCpnData[e.couponsets[i].couponsetId].offerDescription =
          e.couponsets[i].offerDescription);
    }
    if (
      ((coupData += "</div>"), $("#cpnRefresh").text("show more"), blnIsCoupons)
    )
      if (Qty != cpnNum) $("#cpnloading").hide(), fnShowOverLay();
      else {
        for (var S in ($(".overlay_box").hide(),
        $("#cpnloading").hide(),
        $("#coupons_list").html(coupData),
        objCpnData))
          -1 !== $.inArray(objCpnData[S].couponsetId, arrCpnAdded) &&
            (void 0,
            (objCpnData[objCpnData[S].couponsetId].added = 1),
            (objProcCpnData[objCpnData[S].couponsetId].added = 1),
            void 0,
            $("#cp_" + objCpnData[S].couponsetId).css("display", "block"),
            $("#cp_" + objCpnData[S].couponsetId)
              .parent()
              .addClass("coupdiv_boxborder"),
            $("#add_" + objCpnData[S].couponsetId).hide(),
            $("#rm_" + objCpnData[S].couponsetId).show());
        $("#scrollTopBtn").click(function () {
          return $("#seatlayoutbox").animate({ scrollTop: 0 }, "fast"), !1;
        }),
          $(".overlay_box").hide(),
          $("#selctSeat h2").text("Select seats to unlock coupons"),
          $("#selctSeat").show(),
          $("#nocp").hide(),
          $("#cpnsumm h2").text("ORDER SUMMARY"),
          $("#cpnsumm").show(),
          $(".coupons_title").text("Free Discount Coupons For You"),
          $(".refOverlay").css("display", "none"),
          0 < $("#cpnDiv0").length &&
            $("#cpnDiv0")
              .children()
              .each(function (e, t) {
                "nonPromoted" == $(this).attr("data-type")
                  ? -1 == $.inArray($(this).attr("data-id"), arrNonProm) &&
                    arrNonProm.push($(this).attr("data-id"))
                  : -1 == $.inArray($(this).attr("data-id"), arrProm) &&
                    arrProm.push($(this).attr("data-id"));
              }),
          1 == $("#coupons_list > .cpnDiv").length
            ? $(".cpnRefresh").hide()
            : $(".cpnRefresh").show(),
          $(".cpnRefresh").click(function () {
            $(".cpnRefresh").unbind("click"),
              $(".overlay_box").show(),
              $("#cpnloading h2").text("Loading..."),
              $("#cpnloading").show(),
              $("#selctSeat").hide(),
              $(".cpnRefresh").css("box-shadow", "1px 1px 1px #49ba8f"),
              global.blnIsTouchScreen && $(".cpnRefresh").text("Loading.."),
              BMS.Misc.fnAjax({
                url: "/serv/getData",
                type: "GET",
                dataType: "json",
                data: {
                  cmd: "GETCOUPONSEATNEW",
                  IsPage: "Y",
                  ReqId: cpnObj[0].reqId,
                  Page: PgNoNext,
                  TicketQuantity: Qty,
                },
                success: function (e) {
                  $(".cpnRefresh").css("box-shadow", ""),
                    (cpnObj = new Array()),
                    fnDisCoupon(e),
                    global.blnIsTouchScreen &&
                      $(".cpnRefresh").text("Show More");
                },
                error: function (e) {
                  $("#selctSeat").hide(),
                    $(".overlay_box").show(),
                    $("#nocp h2").text("No Coupons Found"),
                    $("#nocp").show(),
                    $("#cpnloading").hide();
                },
              });
          }),
          1 == defaultCouponShow &&
            (blnVistaCine
              ? couponAvailable() || disableVisibleCoupons()
              : valSelSts() || disableVisibleCoupons());
      }
    else
      $(".overlay_box").show(),
        $("#nocp h2").text("No Coupons Found"),
        $("#nocp").show(),
        $("#cpnloading").hide(),
        $("#selctSeat").hide(),
        $("#cpnsumm").hide();
  } catch (e) {
    void 0;
  }
}
function disableVisibleCoupons() {
  $(".coupons_title").text("Select Seats To Unlock Coupons"),
    $("#coupons_list .coup_outprce").css({
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    }),
    $(".cpnRefresh").css({ cursor: "not-allowed" }).unbind("click"),
    $(".cpnRefresh .refOverlay").css({ display: "block" }),
    $("#cpnsumm").hide();
}
function fnShowCoupModal(e, t) {
  try {
    for (
      cpTncHtml = "",
        cpRedHtml = "<strong>Redemption Process: </strong>",
        $("#showtnc").text("+"),
        $("#cpTnc").slideUp("slow", function () {}),
        $("#showtnc").unbind("click"),
        $("#showtnc").bind("click"),
        i = 0;
      i < cpnObj[0].couponsets.length;
      i++
    )
      if (e == cpnObj[0].couponsets[i].couponsetId) {
        $("#offerDis").text(
          "" != cpnObj[0].couponsets[i].offerDescription
            ? cpnObj[0].couponsets[i].offerDescription
            : "NA"
        ),
          $("#brdName").text(cpnObj[0].couponsets[i].brandName),
          $("#outbought").text(cpnObj[0].couponsets[i].boughtCount + " Bought"),
          $("#valDate,#webvalDate").text(
            "" != cpnObj[0].couponsets[i].validUpto
              ? cpnObj[0].couponsets[i].validUpto
              : "NA"
          ),
          $("#ActualPrice").text(
            "" != cpnObj[0].couponsets[i].actualPriceRs
              ? "Rs. " + parseFloat(cpnObj[0].couponsets[i].actualPriceRs)
              : "NA"
          ),
          $("#DisplayPrice").text(
            "Rs. " + parseFloat(cpnObj[0].couponsets[i].displayPriceRs)
          ),
          $(".save-rupees-label").text(
            "Save Rs." + parseFloat(cpnObj[0].couponsets[i].flatDiscount) + "*"
          ),
          1 != objCpnData[e].added
            ? ($("#btnAddCP").text("Free"),
              $("#btnAddCP").removeClass("_disable"),
              $("#btnAddCP").attr("onclick", "fnAddCoupons('" + e + "','Y')"))
            : ($("#btnAddCP").attr("onclick", ""),
              $("#btnAddCP").text("Added"),
              $("#btnAddCP").addClass("_disable")),
          $("#cpTitel").text(
            "" != cpnObj[0].couponsets[i].outletName
              ? cpnObj[0].couponsets[i].outletName
              : "NA"
          ),
          $("#outAdd").text(
            "" != cpnObj[0].couponsets[i].outletAddress
              ? cpnObj[0].couponsets[i].outletAddress
              : "NA"
          );
        var a = "";
        if (
          ("" != cpnObj[0].couponsets[i].mobileNumber &&
            (a = cpnObj[0].couponsets[i].mobileNumber),
          "" != cpnObj[0].couponsets[i].landLine &&
            ("" != a
              ? (a += ", " + cpnObj[0].couponsets[i].landLine)
              : (a = cpnObj[0].couponsets[i].landLine)),
          $("#outMobNo").text("" != a ? a : "NA"),
          (optime = ""),
          0 < cpnObj[0].couponsets[i].outletOpeningHours.hours.length)
        ) {
          for (
            var o = 0;
            o < cpnObj[0].couponsets[i].outletOpeningHours.hours.length;
            o++
          )
            optime +=
              cpnObj[0].couponsets[i].outletOpeningHours.hours[o].from +
              "-" +
              cpnObj[0].couponsets[i].outletOpeningHours.hours[o].to +
              "</br>";
          $("#outTime").html(optime);
        } else $("#outTime").parent().hide();
        if (
          ($("#outNotes").text(cpnObj[0].couponsets[i].outletOpeningHours.note),
          $("#cmpImg").attr("src", cpnObj[0].couponsets[i].campaignImage),
          $(".brdlogo").attr("src", cpnObj[0].couponsets[i].brandLogo),
          (strDayOfWeek = ""),
          0 < cpnObj[0].couponsets[i].dayOfWeek.length)
        ) {
          for (o = 0; o < cpnObj[0].couponsets[i].dayOfWeek.length; o++) {
            if ("ALL_DAYS" == cpnObj[0].couponsets[i].dayOfWeek[o]) {
              strDayOfWeek += "All Days";
              break;
            }
            cpnObj[0].couponsets[i].dayOfWeek.length - o <= 1
              ? (strDayOfWeek += cpnObj[0].couponsets[i].dayOfWeek[o])
              : (strDayOfWeek += cpnObj[0].couponsets[i].dayOfWeek[o] + ",");
          }
          $("#OutValid").text("Valid On: " + strDayOfWeek);
        } else $("#OutValid").text("NA");
        if (
          ($("#OutValid").text("Valid On: " + strDayOfWeek),
          (RestType = ""),
          0 < cpnObj[0].couponsets[i].cuisineType.length)
        ) {
          for (o = 0; o < cpnObj[0].couponsets[i].cuisineType.length; o++)
            RestType += cpnObj[0].couponsets[i].cuisineType[o] + ",";
          $("#restType").text(RestType.replace(/,\s*$/, ""));
        } else
          $("#restType").text(
            cpnObj[0].couponsets[i].cuisineType[0].replace(/,\s*$/, "")
          );
        cntCpnTnC = cpnObj[0].couponsets[i].termsAndConditions.split("\n");
        for (o = 0; o < cntCpnTnC.length; o++)
          cpTncHtml += "<li>" + cntCpnTnC[o].replace("\r", "") + "</li>";
        $("#cpTnc").html(cpTncHtml),
          (cntCpnRed = cpnObj[0].couponsets[i].redeemProcess.split("\n"));
        for (o = 0; o < cntCpnRed.length; o++)
          cpRedHtml += cntCpnRed[o].replace("\r", "") + "<br/>";
        $("#showredCpn").html(cpRedHtml), BMS.Misc.modal("couponTnc", !0);
        break;
      }
    $("#showtnc").click(function () {
      var e = $.trim($(this).text());
      $(this).text("-" == e ? "+" : "-"),
        "-" == e
          ? $("#cpTnc").slideUp("slow", function () {})
          : ($("#cpTnc").slideDown("slow", function () {}),
            $(".inner_ctnc_desc").animate(
              { scrollTop: $("#showtnc").offset().top },
              800
            ));
    });
  } catch (e) {
    void 0;
  }
}
function fnAddCoupons(e, t) {
  try {
    if (blnVistaCine) {
      if (!couponAvailable())
        return void BMS.Misc.modal("addSeatsToEnable", !0);
    } else if (!valSelSts()) return void BMS.Misc.modal("addSeatsToEnable", !0);
    for (var a in ((objCpnData[e].added = 1),
    (objProcCpnData[e].added = 1),
    (cntAddCpn = 0),
    "Y" == t && BMS.Misc.modal("couponTnc", !1),
    $("#cpndd").show(),
    (cpnPrice = 0),
    (cpnList = ""),
    arrCpnAdded.push(e),
    void 0,
    objProcCpnData))
      "1" == objProcCpnData[a].added && cntAddCpn++;
    if (2 <= cntAddCpn)
      for (var a in ($("#cp_" + e).css("display", "block"),
      $("#cp_" + e)
        .parent()
        .addClass("coupdiv_boxborder"),
      $("#add_" + e).hide(),
      $("#rm_" + e).show(),
      $(".refOverlay").css("display", "block"),
      $(".cpnRefresh").css("cursor", "not-allowed"),
      $(".cpnRefresh").hide(),
      objProcCpnData))
        "1" != objProcCpnData[a].added &&
          ($("#mainDiv" + objProcCpnData[a].couponsetId).addClass("__disabled"),
          $("#cp_" + objProcCpnData[a].couponsetId)
            .addClass("__overlay")
            .show(),
          $("#add_" + objProcCpnData[a].couponsetId).removeAttr("onclick"));
    else
      $("#cp_" + e).css("display", "block"),
        $("#cp_" + e)
          .parent()
          .addClass("coupdiv_boxborder"),
        $("#add_" + e).hide(),
        $("#rm_" + e).show();
    for (var a in objProcCpnData)
      "1" == objProcCpnData[a].added &&
        ((cpnPrice += parseFloat(objProcCpnData[a].displayPriceRs)),
        (cpnList += "<li>"),
        (cpnList += "<div>" + objProcCpnData[a].brandName + "</div>"),
        (cpnList +=
          '<div><span class="__subtotal">Rs.' +
          objProcCpnData[a].displayPriceRs +
          "</span></div>"),
        (cpnList += "</li>"));
    $("#cpnmain").show(),
      $("#cpnAddList").html(cpnList),
      (TTPrice = parseFloat(TicPrice) + cpnPrice),
      $("#cpnTotal").html("Rs. " + parseFloat(cpnPrice.toFixed(2))),
      $("#cpnttPrice").html("Rs. " + parseFloat(TTPrice).toFixed(2)),
      $("#btnSTotal").html("Rs. " + parseFloat(TTPrice).toFixed(2)),
      $("#STotal").text("Rs. " + TTPrice.toFixed(2)),
      "Y" == unpaidflg &&
        0 < cntAddCpn &&
        ($(".laterMsgText").text("Please Pay Now to avail Coupons").show(),
        $("#btn-paylater").css("display", "inline-block"),
        $("#btn-btm-paylater").css("display", "inline-block"),
        $("#btn-paylater").removeClass("_cuatro").addClass("_disable"),
        $("#btn-btm-paylater").removeClass("_cuatro").addClass("_disable"),
        $("#btn-btm-paylater").attr("onclick", "fnRevDis()"),
        $("#btn-paylater").attr("onclick", "fnRevDis()")),
      (place = "Y" == t ? "popup" : "seat layout");
    "ET" == byWhat
      ? objSeatData.event[0].genre
      : "VN" == byWhat &&
        0 < objSeatData.event[0].genre.length &&
        void 0 !== objSeatData.event[0].genre[0].Plays &&
        objSeatData.event[0].genre[0].Plays.toString();
  } catch (e) {
    void 0;
  }
}
function fnRemoveCoupons(e) {
  try {
    for (var t in ((cntAddCpn -= 1),
    (objCpnData[e].added = 0),
    (objProcCpnData[e].added = 0),
    (blnHasCouponsdata = !1),
    (cpnPrice = 0),
    (cpnList = ""),
    (cntrmCpn = 0),
    arrCpnAdded.splice($.inArray(e, arrCpnAdded), 1),
    void 0,
    objProcCpnData))
      "1" == objProcCpnData[t].added &&
        ((blnHasCouponsdata = !0),
        (cpnPrice += parseFloat(objProcCpnData[t].displayPriceRs)),
        (cpnList += "<li>"),
        (cpnList += "<div>" + objProcCpnData[t].brandName + "</div>"),
        (cpnList +=
          '<div><span class="__subtotal">Rs.' +
          objProcCpnData[t].displayPriceRs +
          "</span></div>"),
        (cpnList += "</li>"),
        cntrmCpn++);
    if (1 <= parseInt(Qty) && cntrmCpn <= 1)
      for (var t in ($(".refOverlay").css("display", "none"),
      $(".cpnRefresh").show(),
      $(".cpnRefresh").css("cursor", "pointer"),
      objProcCpnData))
        "1" != objProcCpnData[t].added &&
          ($("#mainDiv" + objProcCpnData[t].couponsetId).removeClass(
            "__disabled"
          ),
          $("#cp_" + objProcCpnData[t].couponsetId)
            .css("display", "none")
            .removeClass("__overlay"),
          $("#add_" + objProcCpnData[t].couponsetId).attr(
            "onclick",
            "fnAddCoupons('" + objProcCpnData[t].couponsetId + "')"
          ));
    "Y" == unpaidflg &&
      0 == cntrmCpn &&
      ("True" != blnActiveTrans &&
        (parseInt(Qty) > intQuatt
          ? ((seats_string = 1 == parseInt(intQuatt) ? " seat" : " seat (s)"),
            $(".laterMsgText")
              .text(
                "Reserve upto " +
                  intQuatt +
                  seats_string +
                  " and confirm by paying online upto " +
                  unpaid_CutOff_time +
                  " before the show."
              )
              .css("display", "inline-block"))
          : ($("#btn-paylater").removeClass("_disable").addClass("_cuatro"),
            $("#btn-btm-paylater").removeClass("_disable").addClass("_cuatro"),
            $("#btn-btm-paylater").attr("onclick", 'fnPayLatter("Y")'),
            $("#btn-paylater").attr("onclick", 'fnPayLatter("Y")'))),
      "True" == blnActiveTrans &&
        ($(".laterMsgText")
          .text(
            "It seems you already have a booking with us. Please choose the 'Pay now' option to continue with this booking. "
          )
          .css("display", "inline-block"),
        $("#btn-paylater").css("display", "inline-block"),
        $("#btn-btm-paylater").css("display", "inline-block"),
        $("#btn-paylater").removeClass("_cuatro").addClass("_disable"),
        $("#btn-btm-paylater").removeClass("_cuatro").addClass("_disable"),
        $("#btn-btm-paylater").attr("onclick", "fnRevDis()"),
        $("#btn-paylater").attr("onclick", "fnRevDis()"),
        (blnUnpaid = !1)),
      "False" == blnAllowUnpaid &&
        ($(".laterMsgText")
          .text(
            "It seems you have Cancelled Reservation twice in this month for PVR. Please choose the 'Pay now' option to continue with this booking. "
          )
          .css("display", "inline-block"),
        $("#btn-paylater").css("display", "inline-block"),
        $("#btn-btm-paylater").css("display", "inline-block"),
        $("#btn-paylater").removeClass("_cuatro").addClass("_disable"),
        $("#btn-btm-paylater").removeClass("_cuatro").addClass("_disable"),
        $("#btn-btm-paylater").attr("onclick", "fnRevDis()"),
        $("#btn-paylater").attr("onclick", "fnRevDis()"),
        (blnUnpaid = !1))),
      $("#cpnAddList").html(cpnList),
      (TTPrice = parseFloat(TicPrice) + cpnPrice),
      void 0,
      $("#cpnttPrice").html("Rs. " + parseFloat(TTPrice).toFixed(2)),
      $("#btnSTotal").html("Rs. " + parseFloat(TTPrice).toFixed(2)),
      $("#btnSTotal_reserve").html("Rs. " + parseFloat(TTPrice).toFixed(2)),
      $("#STotal").text("Rs. " + parseFloat(TTPrice).toFixed(2)),
      $("#cpnTotal").html("Rs. " + parseFloat(cpnPrice).toFixed(2)),
      $("#cp_" + e).css("display", "none"),
      $("#cp_" + e)
        .parent()
        .removeClass("coupdiv_boxborder"),
      $("#add_" + e).show(),
      $("#rm_" + e).hide(),
      $("#mainDiv" + e).removeAttr("onclick"),
      blnHasCouponsdata || $("#cpnmain").hide();
  } catch (e) {
    void 0;
  }
}
function fnSummRemCP(e, t, a) {
  try {
    (rmCpnID = e), (rmCpnPrice = a), (objCpnData[t].added = 0);
    var o,
      n = [];
    for (o in ((rmCpn = {}), $("#ttPrice").text("Loading..."), objCpnData))
      objCpnData[o].couponsetId == t &&
        (void 0, (rmCpn.couponId = e), n.push(rmCpn));
    void 0;
    var s = JSON.stringify({
      couponQuantity: 1,
      transId: lngTransId,
      couponDetails: n,
    });
    BMS.Misc.fnDoTrans({
      AppC: global.strAppCode,
      venCode: glBT.SVC,
      transId: lngTransId,
      cmd: "REMOVECOUPON",
      blnSuppress: !0,
      p1: s,
      fnCC: fnSucRemCoupon,
      fnEC: fnErrCoupon,
    });
  } catch (e) {
    void 0;
  }
}
function fnSucRemCoupon(e) {
  try {
    "Y" == arrShowInfo[0].VenueAllowFoodSales
      ? ((blnInCartCoupon = !0),
        (intTotAmt = parseFloat(
          BMS.Misc.fnGVal({ key: "TOTALAMOUNT", data: e })
        ).toFixed(2)),
        (intCpnAmt = parseFloat(
          BMS.Misc.fnGVal({ key: "COUPONTOTAL", data: e })
        ).toFixed(2)),
        (Transtot = TotalFNBAmount + parseFloat(intTotAmt)),
        $("#" + rmCpnID).remove(),
        $("#ttPrice").text("Rs. " + parseFloat(Transtot).toFixed(2)))
      : ((blnInCartCoupon = !1),
        (intTotAmt = parseFloat(
          BMS.Misc.fnGVal({ key: "TOTALAMOUNT", data: e })
        ).toFixed(2)),
        (intCpnAmt = parseFloat(
          BMS.Misc.fnGVal({ key: "COUPONTOTAL", data: e })
        ).toFixed(2)),
        $("#" + rmCpnID).remove(),
        $("#ttPrice").text("Rs. " + intTotAmt)),
      $("#cptotal-order").text("Rs. " + intCpnAmt),
      0 == $("#cpnDeta > li").length && $("#cpnfdd").hide();
  } catch (e) {
    void 0;
  }
}
function fnProcesCoupon() {
  try {
    if ($.isEmptyObject(objProcCpnData)) fnuSI();
    else {
      $("#cpnNotadd").hide(), (blnCpnNotAdd = !1);
      var e,
        t = [],
        a = 0;
      for (e in objCpnData)
        "1" == objCpnData[e].added && (a++, void 0, t.push(objCpnData[e]));
      jsonNonPromObj = [];
      for (var o = 0; o <= arrNonProm.length; o++)
        void 0 !== arrNonProm[o] &&
          ((objNonProm = {}),
          (objNonProm.couponsetId = arrNonProm[o]),
          jsonNonPromObj.push(objNonProm));
      jsonPromObj = [];
      for (var n, o = 0; o <= arrProm.length; o++)
        void 0 !== arrProm[o] &&
          ((objProm = {}),
          (objProm.couponsetId = arrProm[o]),
          jsonPromObj.push(objProm));
      (n = JSON.stringify({
        couponQuantity: a,
        reqId: cpnObj[0].reqId,
        showDate: arrShowInfo[0].ShowDateCode,
        transId: lngTransId,
        couponDetails: t,
        promotedShownCouponSet: jsonPromObj,
        nonPromotedShownCouponSet: jsonNonPromObj,
      })),
        BMS.Misc.fnDoTrans({
          AppC: global.strAppCode,
          venCode: glBT.SVC,
          transId: lngTransId,
          cmd: "ADDCOUPON",
          p1: n,
          blnSupp: !0,
          fnCC: fnuSI,
          fnEC: fnErrCoupon,
        });
    }
  } catch (e) {
    void 0;
  }
}
function fnErrCoupon(e) {
  void 0, (blnCpnNotAdd = !0), $("#cpnNotadd").show(), fnuSI();
}
function showCoupons(e, t) {
  try {
    $("#" + e).is(":visible")
      ? ($("#" + e).hide(), $("#" + t).html(" Show All"))
      : ($("#" + e).show(), $("#" + t).html(" Hide All"));
  } catch (e) {
    void 0;
  }
}
function fnShowOverLay() {
  $(".overlay_box").show(),
    $("#cpnsumm").hide(),
    $("#seatinfo").text("-"),
    $("#audi").text("-"),
    $("#CpnsubTT").text("-"),
    $("#cpnttPrice").text("-"),
    $("#selctSeat h2").text("Select seats to unlock coupons"),
    $("#selctSeat").show(),
    $("#nocp").hide(),
    $("#cpnAddList").html(""),
    $("#cpnmain").hide(),
    global.blnIsTouchScreen &&
      ($(".coupons_resp .__respoverlay").show(),
      $(".coupons_resp").removeClass("bottomSlide")),
    (cuponPrice = "");
}
function couponAvailable() {
  return 0 == ObjCheckList.TotalSeats;
}
(arrCpnAdded = []), (intTotAmt = "");
var fnOneClickPayCheck = function (e) {
    var t;
    skipOneClickPlay
      ? fnuOS(e)
      : ("ET00055918" == glBT.SEC && (oneClickPayEnabled = !1),
        crBkInfoJsonObj(e),
        (t = parseFloat(objBookingInfoData.Summary[0].Order_mnyTotal)),
        (e = oneClk.walletCurrBal),
        (void 0 !== userValidForOneClickPay &&
          userValidForOneClickPay &&
          oneClickPayEnabled &&
          "A" ==
            BMS.Storage.get({
              name: "ld",
              key: "WALLETSTATUS",
              storage: "C",
            }) &&
          t <= e
          ? fnOneClickPay
          : fnuOS)());
  },
  fnOneClickPay = function () {
    objBookingInfoData.SessionOrder[0].Event_strName,
      objBookingInfoData.SessionOrder[0].Venue_strCode,
      objBookingInfoData.SessionOrder[0].Venue_strName,
      objBookingInfoData.SessionOrder[0].Order_dtmShowTime,
      objBookingInfoData.SessionOrder[0].Order_dtmShowDate;
    var e = objBookingInfoData.SessionOrder[0].Order_dtmShowDate;
    scnAudi = objBookingInfoData.SessionOrder[0].Screen_strName;
    parseFloat(objBookingInfoData.SessionOrder[0].Ticket_mnyPrice).toFixed(2);
    var t = parseFloat(
        objBookingInfoData.Summary[0].Order_mnyTicketsTotal
      ).toFixed(2),
      a = parseInt(objBookingInfoData.SessionOrder[0].Order_intQuantity),
      o =
        parseFloat(objBookingInfoData.Summary[0].Order_mnyTicketsTotal).toFixed(
          2
        ) / a;
    (a += 1 == a ? " Ticket" : " Tickets"),
      (sTot = objBookingInfoData.Summary[0].Order_strTotal);
    var n =
        "Rs." +
        parseFloat(
          objBookingInfoData.Summary[0].Order_mnyTicketsBookingFee
        ).toFixed(2),
      s =
        "Rs." +
        parseFloat(objBookingInfoData.Summary[0].Order_mnyTotal).toFixed(2),
      r = "",
      i = parseFloat(objBookingInfoData.Summary[0].Order_mnyTotal),
      l = oneClk.walletCurrBal;
    if (
      ((0 <
        parseFloat(objBookingInfoData.Summary[0].Order_mnyTicketsBookingFee) ||
        0 < objBookingInfoData.AddChgs.length) &&
        ((glOneClickStateCode =
          objBookingInfoData.Summary[0].Order_strToStateCode),
        $("#gst-one-click-state").html(
          objBookingInfoData.Summary[0].Order_strToStateName
        ),
        $("#gstCurrentStateId,#gstOneClickStateId").show()),
      l < i)
    )
      fnuOS();
    else {
      0 <
        parseInt(
          objBookingInfoData.Summary[0].Order_mnyTicketsBookingFee,
          10
        ) &&
        ((c = ""),
        (c += '<ul  style="display: block;">'),
        void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFBaseAmount &&
          "" !== objBookingInfoData.Summary[0].Order_strTicketBFBaseAmount &&
          ((c += '<li style="clear:both;">'),
          (c += "<span class='left'>Base Amount</span>"),
          (c +=
            "<span class='right'>" +
            objBookingInfoData.Summary[0].Order_strTicketBFBaseAmount +
            "</span>"),
          (c += "</li>")),
        void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax1Desc &&
          void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax1 &&
          "" !==
            objBookingInfoData.Summary[0].order_Order_strTicketBFTax1Desc &&
          "" !== objBookingInfoData.Summary[0].Order_strTicketBFTax1 &&
          ((c += '<li style="clear:both;">'),
          (c +=
            "<span class='left'>" +
            objBookingInfoData.Summary[0].Order_strTicketBFTax1Desc +
            "</span>"),
          (c +=
            "<span class='right'>" +
            objBookingInfoData.Summary[0].Order_strTicketBFTax1 +
            "</span>"),
          (c += "</li>")),
        void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax2 &&
          void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax2Desc &&
          "" !== objBookingInfoData.Summary[0].Order_strTicketBFTax2 &&
          "" != objBookingInfoData.Summary[0].Order_strTicketBFTax2Desc &&
          ((c += '<li style="clear:both;">'),
          (c +=
            "<span class='left'>" +
            objBookingInfoData.Summary[0].Order_strTicketBFTax2Desc +
            "</span>"),
          (c +=
            "<span class='right'>" +
            objBookingInfoData.Summary[0].Order_strTicketBFTax2 +
            "</span>"),
          (c += "</li>")),
        void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax3 &&
          void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax3Desc &&
          "" !== objBookingInfoData.Summary[0].Order_strTicketBFTax3 &&
          "" !== objBookingInfoData.Summary[0].Order_strTicketBFTax3Desc &&
          ((c += '<li style="clear:both;">'),
          (c +=
            "<span class='left'>" +
            objBookingInfoData.Summary[0].Order_strTicketBFTax3Desc +
            "</span>"),
          (c +=
            "<span class='right'>" +
            objBookingInfoData.Summary[0].Order_strTicketBFTax3 +
            "</span>"),
          (c += "</li>")),
        (c += "</ul>"),
        $("#oneClickIntHandlingFeeBreakdown").html(c));
      var c = "";
      "Y" == objBookingInfoData.SessionOrder[0].Order_strShowTicketTaxSplitup &&
        ((c += "<ul>"),
        void 0 !== objBookingInfoData.SessionOrder[0].Order_strTicketTax1Desc &&
          void 0 !== objBookingInfoData.SessionOrder[0].Order_strTicketTax1 &&
          "" !==
            objBookingInfoData.SessionOrder[0].order_Order_strTicketTax1Desc &&
          "" !== objBookingInfoData.SessionOrder[0].Order_strTicketTax1 &&
          0 !=
            parseFloat(
              objBookingInfoData.SessionOrder[0].Order_mnyTicketTax1
            ) &&
          ((c += "<li>"),
          (c +=
            "<span>" +
            objBookingInfoData.SessionOrder[0].Order_strTicketTax1Desc +
            "</span>"),
          (c +=
            "<span>" +
            objBookingInfoData.SessionOrder[0].Order_strTicketTax1 +
            "</span>"),
          (c += "</li>")),
        void 0 !== objBookingInfoData.SessionOrder[0].Order_strTicketTax2 &&
          void 0 !==
            objBookingInfoData.SessionOrder[0].Order_strTicketTax2Desc &&
          "" !== objBookingInfoData.SessionOrder[0].Order_strTicketTax2 &&
          "" != objBookingInfoData.SessionOrder[0].Order_strTicketTax2Desc &&
          0 !=
            parseFloat(
              objBookingInfoData.SessionOrder[0].Order_mnyTicketTax2
            ) &&
          ((c += "<li>"),
          (c +=
            "<span>" +
            objBookingInfoData.SessionOrder[0].Order_strTicketTax2Desc +
            "</span>"),
          (c +=
            "<span>" +
            objBookingInfoData.SessionOrder[0].Order_strTicketTax2 +
            "</span>"),
          (c += "</li>")),
        void 0 !== objBookingInfoData.SessionOrder[0].Order_strTicketTax3 &&
          void 0 !==
            objBookingInfoData.SessionOrder[0].Order_strTicketTax3Desc &&
          "" !== objBookingInfoData.SessionOrder[0].Order_strTicketTax3 &&
          "" != objBookingInfoData.SessionOrder[0].Order_strTicketTax3Desc &&
          0 !=
            parseFloat(
              objBookingInfoData.SessionOrder[0].Order_mnyTicketTax3
            ) &&
          ((c += "<li>"),
          (c +=
            "<span>" +
            objBookingInfoData.SessionOrder[0].Order_strTicketTax3Desc +
            "</span>"),
          (c +=
            "<span>" +
            objBookingInfoData.SessionOrder[0].Order_strTicketTax3 +
            "</span>"),
          (c += "</li>")),
        void 0 !== objBookingInfoData.SessionOrder[0].Order_strTicketTax4 &&
          void 0 !==
            objBookingInfoData.SessionOrder[0].Order_strTicketTax4Desc &&
          "" !== objBookingInfoData.SessionOrder[0].Order_strTicketTax4 &&
          "" != objBookingInfoData.SessionOrder[0].Order_strTicketTax4Desc &&
          0 !=
            parseFloat(
              objBookingInfoData.SessionOrder[0].Order_mnyTicketTax4
            ) &&
          ((c += "<li>"),
          (c +=
            "<span>" +
            objBookingInfoData.SessionOrder[0].Order_strTicketTax4Desc +
            "</span>"),
          (c +=
            "<span>" +
            objBookingInfoData.SessionOrder[0].Order_strTicketTax4 +
            "</span>"),
          (c += "</li>")),
        (c += "</ul>"),
        $("#oneClkHndlgGstChenFeeBreakdown").html(c));
      a = " ( " + global.strCurrencyCode + " " + o + " X " + a + " )";
      $("#oneClickTickCat").html(e),
        $("#TickQuantity").html(a),
        $("#oneClickSeatPri").html("Rs. " + t),
        $("#oneClickSubTT").html(s),
        $("#oneClickBkfee").html(n),
        $("#oneClickTtPrice").html(sTot),
        $("#oneClickAudiInfo").html(scnAudi),
        $("#oneClickWalletBalance").html(global.strCurrencyCode + " " + l);
      l =
        '<image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' +
        strContentUrl +
        '/webin/icons/bms_wallet.svg" src="' +
        strContentUrl +
        '/webin/icons/bms_wallet.svg" width="85" height="35"></image>';
      if (
        ($("#oneClickWalLogo").html(l),
        (CpnDetails = ""),
        (IscpnAvl = "No"),
        void 0 !== objBookingInfoData.CouponDetails &&
          0 < objBookingInfoData.CouponDetails.length)
      ) {
        IscpnAvl = "YES";
        for (var d = 0; d < objBookingInfoData.CouponDetails.length; d++)
          (CpnDetails +=
            "<li id=oneClk" +
            objBookingInfoData.CouponDetails[d].OrderC_strCouponId +
            ' class="liFB">'),
            (CpnDetails +=
              '<span class="left">' +
              objBookingInfoData.CouponDetails[d].OrderC_strOutletName +
              "</span>"),
            (CpnDetails +=
              '<span class="right">Rs.' +
              parseFloat(
                objBookingInfoData.CouponDetails[d].OrderC_mnyCouponPrice
              ).toFixed(2) +
              '<a class="__remove" href="javascript:;" onclick="fnOneClkSummRemCP(\'' +
              objBookingInfoData.CouponDetails[d].OrderC_strCouponId +
              "','" +
              objBookingInfoData.CouponDetails[d].OrderC_strCouponSetId +
              "','" +
              objBookingInfoData.CouponDetails[d].OrderC_mnyCouponPrice +
              "')\"> X </a></span>"),
            (CpnDetails += "</li>");
        $("#oneClkCopuonsTitle").show(),
          $("#oneClickCpnDeta").html(CpnDetails),
          $("#oneClickCpnDeta").show(),
          $("#oneClickCpnDeta").parent().show(),
          global.blnIsTouchScreen &&
            ((l = parseFloat($("#total-item-counter").html().slice(1, -1))),
            $("#total-item-counter").html(
              "(" +
                (parseFloat(l) + objBookingInfoData.CouponDetails.length) +
                ")"
            ));
      } else
        $("#oneClkCopuonsTitle").hide(),
          $("#oneClickCpnDeta").html(""),
          $("#oneClickCpnDeta").parent().hide();
      if (
        ("Y" == arrShowInfo[0].VenueHasETicket
          ? ($("#oneClickTickType").parent().show(),
            $("#oneClickTickTypeTitle").show(),
            "Y" == arrShowInfo[0].Package
              ? ($("#oneClickTickType").css("display", "inline-block"),
                $("#oneClickShbox").show(),
                $("#oneClickShmticket").show(),
                $("#oneClickSheticket").hide(),
                $("#oneClickMticket").prop("checked", !0))
              : ($("#oneClickTickType").css("display", "inline-block"),
                $("#oneClickShbox").show(),
                $("#oneClickSheticket").show(),
                $("#oneClickShmticket").hide(),
                $("#oneClickEticket").prop("checked", !0)),
            dispOneClkTicketType())
          : ($("#oneClickTickType").hide(),
            $("#oneClickTickType").parent().hide(),
            $("#oneClickTickTypeTitle").hide()),
        0 == objBookingInfoData.AddChgs.length)
      )
        $("#oneClickdOtherCharges").hide();
      else {
        for (d = 0; d < objBookingInfoData.AddChgs.length; d++)
          (r += "<div>"),
            (r +=
              '<span class="breakup-total"> ' +
              objBookingInfoData.AddChgs[d].AdditionalCharge_strDescription +
              ": </span>"),
            (r +=
              '<span class="breakup-total">' +
              objBookingInfoData.AddChgs[d].AdditionalCharge_mnyAmount +
              "</span>"),
            (r += "</div>"),
            (r +=
              '<div class="__breakdown _bkd-othr-charges" id="oneClickdOtherChargesBkDown">'),
            (r += '<ul style="clear: both;">'),
            "" !=
              objBookingInfoData.AddChgs[d].AdditionalCharge_mnyBaseAmount &&
              0 <
                parseFloat(
                  objBookingInfoData.AddChgs[d].AdditionalCharge_mnyBaseAmount
                ) &&
              ((r += '<li style="clear: both;">'),
              (r +=
                "<span>" +
                objBookingInfoData.AddChgs[d].AdditionalCharge_strDescription +
                "</span>"),
              (r +=
                "<span>" +
                global.strCurrencyCode +
                objBookingInfoData.AddChgs[d].AdditionalCharge_mnyBaseAmount +
                "</span>"),
              (r += "</li>")),
            "" != objBookingInfoData.AddChgs[d].AdditionalCharge_mnyTax1 &&
              0 <
                parseFloat(
                  objBookingInfoData.AddChgs[d].AdditionalCharge_mnyTax1
                ) &&
              ((r += '<li style="clear: both;">'),
              (r +=
                "<span>" +
                objBookingInfoData.AddChgs[d].Tax1_strDescription +
                "</span>"),
              (r +=
                "<span>" +
                global.strCurrencyCode +
                objBookingInfoData.AddChgs[d].AdditionalCharge_mnyTax1 +
                "</span>"),
              (r += "</li>")),
            "" != objBookingInfoData.AddChgs[d].AdditionalCharge_mnyTax2 &&
              0 <
                parseFloat(
                  objBookingInfoData.AddChgs[d].AdditionalCharge_mnyTax2
                ) &&
              ((r += '<li style="clear: both;">'),
              (r +=
                "<span>" +
                objBookingInfoData.AddChgs[d].Tax2_strDescription +
                "</span>"),
              (r +=
                "<span>" +
                global.strCurrencyCode +
                objBookingInfoData.AddChgs[d].AdditionalCharge_mnyTax2 +
                "</span>"),
              (r += "</li>")),
            "" != objBookingInfoData.AddChgs[d].AdditionalCharge_mnyTax3 &&
              0 <
                parseFloat(
                  objBookingInfoData.AddChgs[d].AdditionalCharge_mnyTax3
                ) &&
              ((r += '<li style="clear: both;">'),
              (r +=
                "<span>" +
                objBookingInfoData.AddChgs[d].Tax3_strDescription +
                "</span>"),
              (r +=
                "<span>" +
                global.strCurrencyCode +
                objBookingInfoData.AddChgs[d].AdditionalCharge_mnyTax3 +
                "</span>"),
              (r += "</li>")),
            (r += "</ul>"),
            (r += "</div>"),
            (r += "</div>");
        $("#oneClickdOtherCharges").html(r),
          $("#oneClickdOtherCharges").css({ display: "block" }),
          $("._bkd-othr-charges").css({ display: "none" });
      }
      3 == arrShowInfo[0].EventRating
        ? ($("#oneClickCstmMsg").html(
            "Adult Movie - Children below 18 years are not allowed."
          ),
          $("#oneClickCstmMsg").show())
        : $("#oneClickCstmMsg").hide(),
        global.blnIsTouchScreen &&
          ($(
            ".bkf-layout .bkf-container .coupon_right .coupons_respsection .coupons_detials .coupons_types.coupons_typeScroll"
          ).css("overflow-y", "inherit"),
          $("#seatlayoutbox").css("overflow-y", "inherit"),
          $("body").css("overflow-y", "inherit")),
        BMS.Misc.fnBusy(!1),
        BMS.Misc.modal("oneClickWalletPop", !0),
        createModalHeight();
    }
  },
  fnOneClickListPaymentDetails = function () {
    BMS.Misc.modal("oneClickWalletPop", !1),
      BMS.Misc.fnBusy(!0),
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        cmd: "LISTMYPAYMENTDETAILS",
        p1: BMS.Storage.get({ name: "ld", key: "MEMBERID", storage: "C" }),
        p2: BMS.Storage.get({ name: "ld", key: "LSID", storage: "C" }),
        p3: "Y",
        p4: "jsa",
        p5: BMS.Storage.get({ name: "ld", key: "SEQUENCE", storage: "C" }),
        p6: "WL",
        p7: "Y",
        secure: !0,
        fnCC: fnOneClickPayment,
        fnEC: function (e) {
          BMS.Misc.fnDoTrans({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: BMS.Storage.get({ name: "lngTransId" }),
            cmd: "CANCELTRANS",
            p1: "webuser",
            p2: "",
            p3: "fn-one-click-list-payment-details",
            p4: "",
            p5: "",
            p6: "",
            p7: "",
            p8: "",
            p9: "",
            p10: "",
            fnCC: "",
            fnEC: "",
          }),
            BMS.Storage.del({ name: "lngTransId" }),
            fnPkgCl();
        },
      });
  },
  fnOneClickPayment = function (e) {
    $.globalEval(unescape(e));
    for (var t = 0; t < CardDetails.length; t++)
      "WL" == CardDetails[t][3] && (oneClk.walletPayId = CardDetails[t][0]);
    void 0 !== oneClk.walletPayId && "" != oneClk.walletPayId
      ? BMS.Misc.fnDoTrans({
          AppC: global.strAppCode,
          venCode: glBT.SVC,
          transId: lngTransId,
          cmd: "SETPAYMENT",
          p1:
            "|TYPE=BMSWALLET|MPAY=Y|MPID=" +
            oneClk.walletPayId +
            "|MEMBERID=" +
            BMS.Storage.get({ name: "ld", key: "MEMBERID", storage: "C" }) +
            "|LSID=" +
            BMS.Storage.get({ name: "ld", key: "LSID", storage: "C" }) +
            "|MEMBERSEQ=" +
            BMS.Storage.get({ name: "ld", key: "SEQUENCE", storage: "C" }) +
            "|",
          p3: BMS.Storage.get({
            name: "ld",
            key: "WALLETEMAILID",
            storage: "C",
          }),
          p4: BMS.Storage.get({
            name: "ld",
            key: "WALLETMOBILENO",
            storage: "C",
          }),
          secure: !0,
          fnCC: oneClickCommitTrans,
          fnEC: function (e) {
            BMS.Misc.fnDoTrans({
              AppC: global.strAppCode,
              venCode: glBT.SVC,
              transId: BMS.Storage.get({ name: "lngTransId" }),
              cmd: "CANCELTRANS",
              p1: "webuser",
              p2: "",
              p3: "fn-one-click-payment",
              p4: "",
              p5: "",
              p6: "",
              p7: "",
              p8: "",
              p9: "",
              p10: "",
              fnCC: "",
              fnEC: "",
            }),
              BMS.Storage.del({ name: "lngTransId" }),
              fnPkgCl();
          },
        })
      : ((skipOneClickPlay = !0), fnuOS());
  },
  fnGetWalletBalance = function () {
    try {
      var e = BMS.Storage.get({ name: "ld", key: "MEMBERID", storage: "C" }),
        t = BMS.Storage.get({ name: "ld", key: "LSID", storage: "C" });
      BMS.Misc.fnWsData({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: "",
        cmd: "GETWALLETBALANCE",
        retType: "json",
        lsid: BMS.Storage.get({ name: "ld", key: "LSID", storage: "C" }),
        data: escape("|WALLETID=" + e + "|MEMBERID=" + e + "|LSID=" + t + "|"),
        fnCC: function (e) {
          e = $.parseJSON(unescape(e));
          (oneClk.walletCurrBal = e.BookMyShow.TotalBalance),
            0 < oneClk.walletCurrBal && (userValidForOneClickPay = !0);
        },
        fnEC: function (e) {
          params.error(e), (oneClk.walletCurrBal = 0);
        },
      });
    } catch (e) {
      BMS.Misc.fnErr({
        fnName: "fnGetWalletBalance",
        fnParams: arguments,
        err: e,
      }),
        (oneClk.walletCurrBal = 0);
    }
  },
  oneClickshowTaxBreakup = function (e) {
    $("#oneclk-show-hide-breakup .rnd_arrow").hasClass("bottom")
      ? ($("#oneClickIntHandlingFeeBreakdown").show(),
        $(".__breakdown").show(),
        $("#oneclk-show-hide-breakup .rnd_arrow").removeClass("bottom"),
        $("#oneclk-show-hide-breakup .rnd_arrow").addClass("top"))
      : ($("#oneClickIntHandlingFeeBreakdown").hide(),
        $(".__breakdown").hide(),
        $("#oneclk-show-hide-breakup .rnd_arrow").addClass("bottom"),
        $("#oneclk-show-hide-breakup .rnd_arrow").removeClass("top")),
      createModalHeight();
  },
  fnOneClickGetContactDetails = function () {
    try {
      var e = [];
      return (
        e.push(
          "EMAIL=" +
            $.trim(
              BMS.Storage.get({
                name: "ld",
                key: "WALLETEMAILID",
                storage: "C",
              }).toLowerCase()
            )
        ),
        e.push(
          "MOBILE=" +
            $.trim(
              BMS.Storage.get({
                name: "ld",
                key: "WALLETMOBILENO",
                storage: "C",
              }).toLowerCase()
            )
        ),
        e.push(
          "MEMBER=" +
            BMS.Storage.get({ name: "ld", key: "MEMBERID", defVal: "" })
        ),
        e.push(
          "LSID=" + BMS.Storage.get({ name: "ld", key: "LSID", defVal: "" })
        ),
        "|" + e.join("|") + "|"
      );
    } catch (e) {
      fnErr({ fnName: arguments.callee.name, fnParams: arguments, err: e });
    }
  },
  fnOneClickGetTransData = function () {
    try {
      var e = [];
      return (
        (cxVarId = 0),
        e.push("VARID=" + cxVarId),
        $("#oneClickMticket:checked").length &&
          (e.push("ETICKET=Y"), e.push("MTICKET=Y")),
        0 < e.length ? "|" + e.join("|") + "|" : ""
      );
    } catch (e) {
      BMS.Misc.fnErr({
        fnName: "fnOneClickGetTransData",
        fnParams: arguments,
        err: e,
      });
    }
  },
  oneClickCommitTrans = function () {
    $("#confirmPayment").submit();
  },
  fnSkipOneClickPay = function () {
    (skipOneClickPlay = !0), BMS.Misc.modal("oneClickWalletPop", !1), fnuOS();
  },
  chkOneClickPay = function (e) {
    void 0 !== $("#chk1ClickWltBal") &&
    0 < $("#chk1ClickWltBal:checkbox:checked").length
      ? ($("#btnOneClickConfirm").addClass("one-click-active"),
        $("#btnOneClickConfirm").removeClass("non-active"),
        $("#btnOneClickSkip").addClass("non-active"),
        $("#btnOneClickSkip").removeClass("one-click-active"))
      : ($("#btnOneClickConfirm").addClass("non-active"),
        $("#btnOneClickConfirm").removeClass("one-click-active"),
        $("#btnOneClickSkip").addClass("one-click-active"),
        $("#btnOneClickSkip").removeClass("non-active"));
  },
  fnCloseOneClick = function () {
    global.blnIsTouchScreen &&
      ($(
        ".bkf-layout .bkf-container .coupon_right .coupons_respsection .coupons_detials .coupons_types.coupons_typeScroll"
      ).css("overflow-y", "scroll"),
      $("#seatlayoutbox").css("overflow-y", "auto"),
      $("body").removeClass("_fixed"),
      $(".coupons_resp").hasClass("toggleUp") && fnShowCPResp()),
      blnVistaCine
        ? (BMS.Storage.del({ name: "lngTransId" }),
          BMS.Storage.del({ name: "BOOKINGID" }),
          BMS.Misc.fnDoTrans({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: lngTransId,
            cmd: "CANCELTRANS",
            p1: "webuser",
            p2: "",
            p3: "fn-close-one-click",
            p4: "",
            p5: "",
            p6: "",
            p7: "",
            p8: "",
            p9: "",
            p10: "",
            fnCC: "",
            fnEC: "",
          }),
          fnClearSelection())
        : fnCanTr(),
      fnUnHide("oneClickWalletPop");
  },
  fnOneClkSummRemCP = function (e, t, a) {
    try {
      fnRemoveCoupons(t),
        $("#oneClk" + e).remove(),
        0 == $("#oneClickCpnDeta > li").length &&
          $("#oneClkCopuonsTitle").hide(),
        createModalHeight(),
        fnOneClkRemCP(e, t, a);
    } catch (e) {
      void 0;
    }
  },
  fnOneClkRemCP = function (e, t, a) {
    try {
      (rmCpnID = e), (rmCpnPrice = a), (objCpnData[t].added = 0);
      var o,
        n = [];
      for (o in ((rmCpn = {}), objCpnData))
        objCpnData[o].couponsetId == t &&
          (void 0, (rmCpn.couponId = e), n.push(rmCpn));
      var s = JSON.stringify({
        couponQuantity: 1,
        transId: lngTransId,
        couponDetails: n,
      });
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: lngTransId,
        cmd: "REMOVECOUPON",
        blnSuppress: !0,
        p1: s,
        fnCC: fnOneClkSucRemCoupon(e),
        fnEC: fnErrCoupon,
      });
    } catch (e) {
      void 0;
    }
  };
function fnOneClkSucRemCoupon(e) {
  try {
    for (var t in objBookingInfoData.CouponDetails)
      if (objBookingInfoData.CouponDetails[t].OrderC_strCouponId == e) {
        objBookingInfoData.CouponDetails.splice(t, 1);
        break;
      }
  } catch (e) {
    void 0;
  }
}
var glBT,
  arrFBInfo,
  dispOneClkTicketType = function () {
    $(".ticket-desc").show(),
      $("#oneClickMticket").is(":checked") &&
        $(".oneclk-ticket-desc").html(
          "Download the m-Ticket QR Code on your mobile to enter the cinema. No PrintOut Needed. Entry will not be provided without showing QR code"
        ),
      $("#oneClickEticket").is(":checked") &&
        $(".oneclk-ticket-desc").html(
          "Download the e-Ticket on your mobile, no printout needed."
        ),
      $("#oneClickBox").is(":checked") &&
        $(".oneclk-ticket-desc").html(
          "Select this option to pick your tickets from Box Office."
        );
  },
  createModalHeight = function () {
    var e = $(window).height() - 100,
      t = $("#oneClickWalletPop .body .body-wrapper").height() + 40;
    e < t
      ? $("#oneClickWalletPop .body").css("height", e + "px")
      : $("#oneClickWalletPop .body").css("height", t + "px"),
      global.blnIsTouchScreen ||
        ($("#oneClickWalletPop").offset().top +
          $("#oneClickWalletPop").height() >
          $(window).height() &&
          BMS.Misc.fnDoFloat());
  },
  crBkInfoJsonObj = function (e) {
    e = JSON.parse(unescape(e));
    void 0 !== e.BookMyShow &&
      void 0 !== e.BookMyShow.Summary &&
      0 < e.BookMyShow.Summary.length &&
      ((objBookingInfoData = e.BookMyShow), pushLotameDataOnSummaryLoad());
  },
  ObjTT = {},
  CntObj = {};
(eventTitle = ""),
  (arFC = []),
  (arrShowInfo = []),
  (blnVistaCine = !0),
  ((glBT = null == glBT ? {} : glBT).TQ = 0),
  (glBT.SL = "Y"),
  (glBT.seats = ""),
  (pet = "MT"),
  (glBT.arrNoPriceVenues = ["KTCT", "RATC", "PITG"]),
  (blnQtySel = !1),
  null == arrFBInfo && (arrFBInfo = new Array()),
  (bln = "");
var arrCD = new Array(),
  intCDP = -1,
  TT = "",
  SQ = 0,
  aAreas = new Array(),
  aRows = new Array(),
  blnSeats = !0,
  aSS = new Array(),
  intSeats = 0,
  SS = "",
  imgSrc = "//in.bmscdn.com/bmsin/seats/",
  imgSrcNew = "/img/",
  isPP = null != isPP;
1 == isPP && (blnSeats = !0);
var intAvailSeats = 0,
  intSessionTotalSeats = 0,
  bookingHistory = {},
  skipOneClickPlay = !1,
  userValidForOneClickPay = !1,
  oneClickPayEnabled = !0,
  objBookingInfoData = {},
  prices = [],
  isDynamicSelector = !1,
  isTnCModal = !1;
(strEventName = ""),
  (strVenueName = ""),
  (strEventLan = ""),
  (strEvtMsg = ""),
  (strEventSen = ""),
  (objSeatData = "");
var arrEventCodeForSeatIcon = [
    "ET00039285",
    "ET00051918",
    "ET00051922",
    "ET00051908",
  ],
  newShowtimeUrl = BMS.Storage.get({ name: "newShowtime", defVal: "" })
    ? JSON.parse(
        decodeURIComponent(BMS.Storage.get({ name: "newShowtime", defVal: "" }))
      )
    : "";
function fnPopupSelSh(t, a, o, n, s, r, i, l, e, c, d, p) {
  try {
    "" != r && (objSeatData = r),
      $("#btnAduPopupAccept").hide(),
      $("#btnPopupCancel").hide(),
      (blnfuncin = !1),
      (blnHaspop = !1);
    var f,
      S = (l && l[0] && l[0].text) || "Content Warning",
      h =
        (l && l[1] && l[1].text) ||
        "This movie is rated “A” and is only for viewers above 18. Please carry a valid ID/Age Proof to the theatre. If you are denied entry due to age or ID issues, you will not get a refund.";
    -1 != $.inArray(a, [])
      ? (blnHaspop =
          ((blnfuncin =
            ((f =
              void 0 !== objSeatData.event[0].dimension &&
              "3D" == objSeatData.event[0].dimension
                ? {
                    msgText:
                      "Extra charge to be paid by the customers at the cinema counter towards 3D glasses for 3D movies.",
                    msgType: "AC",
                    msgTitle: "Notes",
                  }
                : {
                    msgText: objSeatData.venue[0].message.body,
                    msgType: objSeatData.venue[0].message.type,
                    msgTitle: objSeatData.venue[0].message.title,
                  }),
            !0)),
          !0))
      : -1 != $.inArray(a, ["MUAR"])
      ? (blnHaspop =
          void 0 !== objSeatData.event[0].dimension &&
          "3D" == objSeatData.event[0].dimension
            ? ((f = {
                msgText:
                  "Dear Guest, Please note that there would be additional Non Refundable 3D Glass Charges payable at the cinema for this movie.",
                msgType: "AC",
                msgTitle: "Notes",
              }),
              (blnfuncin = !0))
            : ((f = {
                msgText: objSeatData.venue[0].message.body,
                msgType: objSeatData.venue[0].message.type,
                msgTitle: objSeatData.venue[0].message.title,
              }),
              (blnfuncin = !1)))
      : -1 != $.inArray(a, [""])
      ? ((f = {
          msgText:
            "Please read this important Terms and Conditions for the Internet Booking<br> Kindly return the 3D glasses once the movie gets over. This amount is non-refundable.",
          msgType: "I",
          msgTitle: "Terms &amp; Conditions",
        }),
        (blnfuncin = !0),
        (blnHaspop = !0))
      : -1 != $.inArray(a, ["FNRC", "FNHY"])
      ? ((f = {
          msgText:
            "Please read this important Terms and Conditions for the Internet Booking<br> INR 30 will be charged per ticket for 3D glasses. Kindly return the 3D glasses once the movie gets over. This amount is non-refundable.",
          msgType: "I",
          msgTitle: "Terms &amp; Conditions",
        }),
        (blnfuncin = !0),
        (blnHaspop = !0))
      : -1 != $.inArray(a, ["MACP"])
      ? ((f = {
          msgText:
            "Please read this important Terms and Conditions for the Internet Booking<br> For 3D Glasses a refundable/non-refundable amount may have to be paid per ticket at the cinema. The exact amount will be intimated at the cinema.",
          msgType: "I",
          msgTitle: "Terms &amp; Conditions",
        }),
        (blnfuncin = !0),
        (blnHaspop = !0))
      : p
      ? ((f = {
          msgText: l.messageBody,
          msgType: "",
          msgTitle: l.messageTitle,
        }),
        (blnfuncin = !0),
        (blnHaspop = !0))
      : e
      ? ((f = { msgText: h, msgType: "", msgTitle: S }),
        (blnfuncin = !0),
        (blnHaspop = !0))
      : ((f = { msgText: "", msgType: "", msgTitle: "" }),
        "" != objSeatData.venue[0].message.body &&
          ("" != BMS.Misc.fnGQS("cid", "")
            ? ((f = {
                msgText: objSeatData.venue[0].message.body,
                msgType: objSeatData.venue[0].message.type,
                msgTitle: objSeatData.venue[0].message.title,
              }),
              (blnHaspop = !0))
            : "" != objSeatData.venue[0].message.body &&
              ((f = {
                msgText: objSeatData.venue[0].message.body,
                msgType: objSeatData.venue[0].message.type,
                msgTitle: objSeatData.venue[0].message.title,
              }),
              (blnHaspop = "" != objSeatData.venue[0].message.body)))),
      $("#dPopupMsgTitle, #dPopupMsgText, #dPopupButtonGroup").hide(),
      $("#btnPopupOK, #btnPopupAccept, #btnPopupCancel").hide(),
      ("" != f.msgTitle
        ? $("#dPopupMsgTitle").html(f.msgTitle)
        : $("#dPopupMsgTitle").html("Note")
      ).show(),
      "" != f.msgText &&
        ($("#dPopupMsgText").css({ textAlign: "left" }),
        $("#dPopupMsgText").html(f.msgText).show()),
      $("#dPopupButtonGroup").show(),
      "PVJH" == a &&
      -1 !=
        $.inArray(o.toString(), [
          "103593",
          "103590",
          "103587",
          "103595",
          "103592",
          "103589",
          "103594",
          "103591",
          "103588",
        ])
        ? (BMS.Storage.set({ name: "ShowPOp", value: "Y", storage: "C" }),
          $("#dPopupMsgText").html(""),
          (blnHaspop = !0),
          (f = {
            msgText: "https://in.bmscdn.com/webin/static/cornetto.png?1",
            msgType: "I",
            msgTitle: "Cornetto Couple",
          }),
          $("#dPopupMsgText")
            .append(
              $("<img>", {
                id: "theImg",
                src: "https://in.bmscdn.com/webin/static/cornetto.png?1",
              })
            )
            .show(),
          $("#dPopupMsgTitle").html(f.msgTitle).show(),
          global.blnIsTouchScreen || $("#tnc").css("width", "18%"),
          BMS.Misc.fnBusy(!1))
        : $("#tnc").css("width", ""),
      ("AC" == f.msgType
        ? $("#btnPopupAccept, #btnPopupCancel")
        : "I" == f.msgType
        ? $("#btnPopupOK")
        : $("#btnPopupOK, #btnPopupCancel")
      ).show(),
      $("#btnPopupOK, #btnPopupAccept").unbind("click"),
      $("#btnPopupCrossCancel, #btnPopupCancel").unbind("click");
    var u = (e && "VN" == byWhat) || !1;
    $("#btnPopupOK, #btnPopupAccept").bind("click", function () {
      var e;
      $("#dPopupMsgCallout").fadeOut(),
        BMS.Misc.modal("tnc", !1),
        $(".modal .__overlay").css("display", "none"),
        p && u
          ? fnPopupSelSh("VN", a, o, n, s, r, i, l, !0, "", d)
          : p && "ET" == byWhat
          ? fnSelSh(t, a, o, n, s, r, !1, d)
          : u || (p && "VN" == byWhat)
          ? callSeatLayout(a, o, n, s, i, c, d)
          : isTnCModal
          ? ((e =
              (e = arrShowInfo.find(function (e) {
                return (
                  e.SessionId === glBT.SSID &&
                  e.PriceCode ===
                    $("#qty-sel #category-list")
                      .find(".seat-category:checked")
                      .attr("priceCode")
                );
              })) && e.SeatLayout),
            (("VN" == byWhat && e && "N" == e) ||
              ("ET" == byWhat && "N" == arrShowInfo[0].SeatLayout)
              ? fnInitBook
              : fnPkgCl)())
          : fnSelSh(t, a, o, n, s, r, !1, d);
    }),
      $("#btnPopupCrossCancel, #btnPopupCancel").bind("click", function () {
        fntncHide();
      }),
      "block" === $(".coupons_overlay").css("display") &&
        ($(".coupons_overlay").css("display", "none"),
        $("#TickTypeForCart").css("display", "none")),
      blnHaspop
        ? (BMS.Misc.modal("tnc", !0),
          $(".modal .__overlay").css("display", "block"))
        : isTnCModal
        ? ($("#dPopupMsgCallout").fadeOut(),
          BMS.Misc.modal("tnc", !1),
          $(".modal .__overlay").css("display", "none"),
          fnPkgCl())
        : fnSelSh(t, a, o, n, s, r, !1);
  } catch (t) {
    BMS.Misc.fnErr({
      fnName: "fnPopupSelSh",
      fnParams: t + ", " + a + ", " + o + ", " + n + ", " + s,
      err: t,
    });
  }
}
function fnSelSh(e, t, a, o, n, s, r, i, l) {
  try {
    $("#snackbar").hide();
    var c = r || !1;
    "" == $("#fnb-offerimage-summerybanner").attr("src") &&
      $("#fnb-offerimage-summerybanner").attr(
        "src",
        "//in.bmscdn.com/bmsin/fnb/offerbanner/web/web-offerbanner.jpg"
      ),
      "" == $("#bas-logo-summerybanner").attr("xlink:href") &&
        $("#bas-logo-summerybanner").attr(
          "xlink:href",
          "//in.bmscdn.com/webin/common/icons/bookasmile-logo.svg"
        ),
      (isTnCModal = i || !1),
      "string" != typeof s && (objSeatData = s),
      BMS.Misc.Router.triggerRoute("seatlayout", !1),
      "undefined" != typeof ga && ga("set", 1, "Cinema-ID", t, 2),
      (isDonation = !1),
      (CntObj = {}),
      (cntFC = 0),
      (fcDetails = ""),
      $("#rEticketHO").attr("checked", !1),
      $("#rEticketBO").attr("checked", !1),
      $("#ttPrice-cart").html(""),
      $("#ttPrice").html(""),
      $("#PayTotal").html(""),
      $("#btmcntbook,#cntbook").hide(),
      $(".__seat-action").hide(),
      $("#subSeat,#btmsubSeat").hide(),
      $(".__seat-action").hide(),
      $(".header-container-grab-bite").hide(),
      $(".offer-banner-touch").hide(),
      $(".header-container").show(),
      (("" != BMS.Storage.get({ name: "lngTransId", defVal: "" }) &&
        "0" != BMS.Storage.get({ name: "lngTransId", defVal: "" })) ||
        "" != BMS.Storage.get({ name: "lngTransId", defVal: "" })) &&
        ((c && "false" != c) ||
          BMS.Misc.fnDoTrans({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: BMS.Storage.get({ name: "lngTransId" }),
            cmd: "CANCELTRANS",
            blnSupp: !0,
            p1: "webuser",
            p2: "",
            p3: "seat-layout-fn-sel-sh",
            p4: "",
            p5: "",
            p6: "",
            p7: "",
            p8: "",
            p9: "",
            p10: "",
            fnCC: "",
            fnEC: "",
          }),
        BMS.Storage.del({ name: "lngTransId" }),
        $("#bksmile").hide()),
      (glBT.VenAppType = objSeatData.venue[0].appType),
      (strVenueName = objSeatData.venue[0].name),
      BMS.Misc.fnBusy(!0),
      l &&
        fnGetSeatlayoutActivity({
          vCode: glBT.SVC,
          sId: glBT.SSID,
          etCode: glBT.SEC,
          landed: !1,
        }),
      (glBT.SVC = objSeatData.selected.venueCode),
      (glBT.SSID = a),
      (glBT.SEC = objSeatData.event[0].eventCode),
      (glBT.SST = n),
      (blnVistaCine = !!objSeatData.venue[0].isFullSeatLayout),
      (strEventName = objSeatData.event[0].title),
      (strEventLan = objSeatData.event[0].language),
      (strEventSen = objSeatData.event[0].censor),
      (strShowDate = objSeatData.selected.date),
      (strEvtMsg = objSeatData.event[0].dimension);
    var d = "",
      p = BMS.Storage.get({ name: "userCine", key: "mrs", defVal: "" }).split(
        ";"
      );
    if (-1 == $.inArray(glBT.SVC, p)) {
      for (var f = 5 < p.length ? 1 : 0; f < p.length; f++)
        "" != p[f] && (d += p[f] + ";");
      (d += glBT.SVC + ";"),
        BMS.Storage.set({
          name: "userCine",
          key: "mrs",
          value: d,
          storage: "C",
          sess: !1,
        });
    }
    "UA" == objSeatData.event[0].censor
      ? $("#sen_ua").css("display", "inline-block")
      : "U" == objSeatData.event[0].censor
      ? $("#sen_u").css("display", "inline-block")
      : "A" == objSeatData.event[0].censor
      ? $("#sen_a").css("display", "inline-block")
      : (objSeatData.event[0].censor = ""),
      $("#SLEName,#strEvtName").html(strEventName),
      $("#strEvtName").attr("onclick", "fnClCallout();"),
      -1 != strShowDate.indexOf(",")
        ? ((BookingDate = strShowDate.split(",")),
          (strWeDAY =
            "Today" == BookingDate[0]
              ? BookingDate[0]
              : BookingDate[0].slice(0, 3)),
          $("#weekday,#mobweekday").text(strWeDAY),
          "undefined" != typeof pageName &&
          -1 ==
            [
              "home",
              "experiences",
              "movies",
              "events",
              "plays",
              "sports",
              "videos",
              "bookticket",
              "offers",
              "giftcards",
              "just-for-you",
            ].indexOf(pageName)
            ? $("#date,#mobdate").text(BookingDate[1].trim().substring(0, 2))
            : $("#date,#mobdate").text(BookingDate[1].trim().substring(4, 6)),
          "undefined" != typeof pageName && "bookticket" == pageName
            ? ($("#strDate")
                .html(strShowDate + ", " + glBT.SST)
                .show(),
              $("#mob-stm").hide())
            : $("#strDate")
                .html(strShowDate + ", " + glBT.SST)
                .hide())
        : ($("#mobile-date-container,#desktop-date-container").hide(),
          $("#strDate").html(strShowDate + ", " + glBT.SST)),
      $("#strVenName").html(strVenueName),
      $("#strLan").html(strEventLan),
      "" != strEvtMsg ? $("#strEvExp").html(strEvtMsg) : $("#strExp").hide(),
      BMS.Misc.fnAjax({
        type: "GET",
        url: "/serv/getData",
        data: {
          cmd: "GETSHOWINFOJSON",
          vid: glBT.SVC,
          ssid: glBT.SSID,
          format: "json",
        },
        success: function (e) {
          (arrShowInfo =
            e && e.BookMyShow && e.BookMyShow.arrShowInfo
              ? e.BookMyShow.arrShowInfo
              : []),
            "string" == typeof s
              ? fnCallout(JSON.parse(decodeURIComponent(s)))
              : fnCallout(
                  "VN" == byWhat
                    ? objSeatData.event[0].sessions.find(function (e) {
                        return e.id === a;
                      })
                    : objSeatData.venue[0].sessions.find(function (e) {
                        return e.id === a;
                      }) || objSeatData
                );
        },
        error: function (e) {
          BMS.Misc.fnErr({ fnName: "fnSelSh", err: e });
        },
      }),
      !BMS.Storage.isset({ name: "ld" }) ||
        ("buytickets" != pageName && "seatlayout" != pageName) ||
        fnGetMemberHistory(),
      l &&
        fnGetSeatlayoutActivity({
          vCode: glBT.SVC,
          sId: glBT.SSID,
          etCode: glBT.SEC,
          landed: !0,
        });
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: "fnSelSh",
      fnParams: e + ", " + t + ", " + a + ", " + o + ", " + n,
      err: e,
    });
  }
}
function fnBookTickets(e) {
  isTnCModal
    ? fnPopupSelSh(e, glBT.SVC, glBT.SSID, glBT.SEC, glBT.SST, objSeatData)
    : fnPkgCl();
}
function fnDynamicSelector(e) {
  try {
    var t = {};
    if ("VN" == byWhat)
      t =
        BMS.Misc.Helpers.getIn(UAPI, [
          "ShowDetails",
          0,
          "Venues",
          "SeatSelector",
        ]) || {};
    else
      for (
        var a =
            BMS.Misc.Helpers.getIn(UAPI, ["ShowDetails", 0, "Venues"]) || [],
          o = 0;
        o < a.length;
        o++
      )
        if (a[o].VenueCode == glBT.SVC) {
          t = a[o].SeatSelector;
          break;
        }
    if (($("#dynamicIcons").html(""), 0 != Object.keys(t).length)) {
      $("#qty-sel-title-text").text(t.titleText),
        $("#proceed-Qty").text(t.ctaText);
      for (
        var n = "",
          s = _.template($("#pop-dynamic-ticket-quantity-template").html()),
          r = { qty: "", imageUrl: "" },
          o = 0;
        o < arrShowInfo.length;
        o++
      )
        if (e == arrShowInfo[o].PriceCode && "Y" == arrShowInfo[o].SeatsAvail)
          for (var i = 1; i <= parseInt(arrShowInfo[o].MaxTickets); i++)
            (r.imageUrl = t.baseImageUrl + "_" + i + ".png"),
              (r.qty = i),
              (n += s(r));
      $("#dynamicIcons").html(n);
    }
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnDynamicSelector", err: e });
  }
}
function onImageError(e) {
  try {
    var t = $("#popQty ._active").attr("id").split("_")[1];
    $("#popImage_" + e)
      .parent()
      .find("img")
      .remove(),
      $("#popImage_" + t).show();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "onImageError", err: e });
  }
}
function fnSelShMultiCat(e, t, a, o, n, s) {
  try {
    $("#dismiss").attr("onclick", "fnClCallout()"),
      (isDonation = !1),
      $("#rEticketHO").attr("checked", !1),
      $("#rEticketBO").attr("checked", !1),
      ("" != BMS.Storage.get({ name: "lngTransId", defVal: "" }) &&
        "0" != BMS.Storage.get({ name: "lngTransId", defVal: "" })) ||
      "" != BMS.Storage.get({ name: "lngTransId", defVal: "" })
        ? fnCanTr()
        : (objCk.del({ name: "lngTransId" }),
          objCk.del({ name: "BOOKINGID" }),
          objCk.del({ name: "merc" })),
      BMS.Misc.fnBusy(!0),
      (glBT.SVC = t),
      (glBT.SSID = a),
      (glBT.SEC = o),
      (glBT.SST = n);
    var r = "",
      i = BMS.Storage.get({ name: "userCine", key: "mrs", defVal: "" }).split(
        ";"
      );
    if (-1 == $.inArray(glBT.SVC, i)) {
      for (var l = 3 < i.length ? 1 : 0; l < i.length; l++)
        "" != i[l] && (r += i[l] + ";");
      (r += glBT.SVC + ";"),
        BMS.Storage.set({
          name: "userCine",
          key: "mrs",
          value: r,
          storage: "C",
          sess: !1,
        });
    }
    if (
      ((strEventName = ""),
      (strVenueName = ""),
      (strShowDate = glBT.dispDate),
      (strEventSen = ""),
      "undefined" != typeof aiEV)
    )
      for (l = 0; l < aiEV.length; l++)
        if (aiEV[l][1] == o) {
          (strEventName = aiEV[l][4]), (strEventSen = aiEV[l][8]);
          break;
        }
    for (l = 0; l < aVN.length; l++)
      if (aVN[l][0] == t) {
        strVenueName = aVN[l][1];
        break;
      }
    $("#EName, #EName_MC").html(strEventName),
      $("#EDtl")
        .children()
        .eq(0)
        .html(strShowDate + ", " + n),
      $("#EDtl_MC")
        .children()
        .eq(0)
        .html(strShowDate + ", " + n),
      $("#EDtl").children().eq(1).html(strVenueName),
      $("#EDtl_MC").children().eq(1).html(strVenueName),
      $("#SLEName").html(strEventName),
      $("#SLEDtl")
        .children()
        .eq(0)
        .html(strShowDate + ", " + n),
      $("#SLEDtl").children().eq(1).html(strVenueName),
      BMS.Misc.fnAjax({
        dataType: "script",
        success: function (e) {
          fnCalloutMultiCat(e, s);
        },
        type: "GET",
        url:
          "/getJSData/?file=" +
          global.dumpPath +
          "GetShowInfo_" +
          glBT.SVC +
          "_" +
          glBT.SSID +
          ".js&cmd=GETSHOWINFOWEB&vc=" +
          glBT.SVC +
          "&sc=" +
          glBT.SSID +
          "&_=" +
          fnTS(),
      });
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: "fnSelShMultiCat",
      fnParams: e + ", " + t + ", " + a + ", " + o + ", " + n,
      err: e,
    });
  }
}
function fnCalloutMultiCat(t, e) {
  try {
    var a = !1,
      o = "";
    if (
      11 < arrShowInfo[0].length &&
      0 != arrShowInfo[0].EventRating &&
      0 != arrShowInfo[0].EventRating.length &&
      3 == arrShowInfo[0].EventRating
    ) {
      a = !0;
      switch (
        ((o += "Adult "),
        ("" != BMS.Misc.fnGQS("ety", "")
          ? BMS.Misc.fnGQS("ety", "")
          : null != Etype && "" != Etype
          ? Etype
          : "MT"
        ).toUpperCase())
      ) {
        case "MT":
          o += "Movie";
          break;
        case "PL":
          o += "Play";
          break;
        default:
          o += "Event";
      }
      o += " - Children below 18 years are not allowed.";
    }
    1 == a
      ? $("#CenMsg, #CenMsg_MC").html(o).show()
      : $("#CenMsg, #CenMsg_MC").hide();
    for (var n = "", s = 0; s < arrShowInfo.length; s++) {
      if (
        ((showLayout = "N" != arrShowInfo[s].SeatLayout),
        (n +=
          '<div class="fl_100 buyselbox" data-price-code="' +
          arrShowInfo[s].PriceCode +
          '">'),
        (n +=
          '<input type="text" class="dc" readonly="readonly" value="' +
          arrShowInfo[s].PriceDescription +
          '"/>'),
        "Y" == arrShowInfo[s].SeatsAvail)
      ) {
        for (
          var r = '<option value="0">Qty</option>', i = 1;
          i <= arrShowInfo[s].MaxTickets;
          i++
        )
          r += '<option value="' + i + '">' + i + "</option>";
        (n +=
          '<div class="dq"><select id="cmbQty' +
          (s + 1) +
          '" onchange="fnDispTotal();">' +
          r +
          "</select></div>"),
          (n +=
            '<div class="dt" id="subtot_' +
            arrShowInfo[s].PriceCode +
            '">Rs. 0.00</div>');
      } else
        n +=
          '<div class="dq"><select id="cmbQty' +
          (s + 1) +
          '" disabled="disabled" onchange="fnDispTotal();"><option value="0">SOLD OUT</option></select></div>';
      n += "</div>";
    }
    $("#category_MC").html(n),
      null != e &&
        $(".buyselbox")
          .not("[data-price-code='" + e + "']")
          .hide(),
      $("#divTotal_MC").html("Rs. 0.00"),
      $("#btnProceed_MC").html(
        1 == showLayout
          ? "Proceed to Seat Selection"
          : "Proceed to Order Summary"
      ),
      BMS.Misc.fnBusy(!1),
      $("#tblClassMultiCat").show();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnCalloutMultiCat", fnParams: t, err: e });
  }
}
function fnDispTotal() {
  var e = $("#category_MC").find("select"),
    t = $("#divTotal_MC"),
    a = 0,
    o = arrShowInfo.length;
  try {
    var n = new Array();
    t.html("Rs. 0.00");
    for (var s = 0; s < arrShowInfo.length; s++)
      parseInt(e.eq(s).val()),
        (n[s] = parseFloat(arrShowInfo[s].Price) * e.eq(s).val()),
        $("#subtot_" + arrShowInfo[s].PriceCode).html(
          "Rs. " + (parseFloat(arrShowInfo[s].Price) * e.eq(s).val()).toFixed(2)
        );
    for (s = 1; s <= o; s++)
      "" != $("#cmbQty" + s).val() && (a += parseInt($("#cmbQty" + s).val()));
    for (var r = 10 - a, i = new Array(), s = 1; s <= o; s++)
      i.push($("#cmbQty" + s).val());
    for (s = 1; s <= o; s++)
      if ("" == $("#cmbQty" + s).val() || "0" == $("#cmbQty" + s).val()) {
        var l = r;
        if ("Y" == arrShowInfo[s - 1].SeatsAvail) {
          $("#cmbQty" + s + " > option").remove(),
            $("#cmbQty" + s).append('<option value="0">Qty</option>'),
            (l =
              l > parseInt(arrShowInfo[s - 1].MaxTickets)
                ? parseInt(arrShowInfo[s - 1].MaxTickets)
                : l);
          for (var c = 1; c <= l; c++)
            $("#cmbQty" + s).append(
              $("<option></option>").attr("value", c).text(c)
            );
        } else
          "C" == arrShowInfo[s - 1].SeatsAvail
            ? $("#cmbQty" + s).append(
                $("<option></option>").attr("value", 0).text("CLOSED")
              )
            : $("#cmbQty" + s).append(
                $("<option></option>").attr("value", 0).text("SOLD OUT")
              );
      }
    for (s = 1; s <= o; s++)
      if ("" != $("#cmbQty" + s).val() && "0" != $("#cmbQty" + s).val()) {
        $("#cmbQty" + s + " > option").remove(),
          $("#cmbQty" + s).append('<option value="0">Qty</option>'),
          (l =
            (l = parseInt(i[s - 1]) + r) >
            parseInt(arrShowInfo[s - 1].MaxTickets)
              ? parseInt(arrShowInfo[s - 1].MaxTickets)
              : l);
        for (c = 1; c <= l; c++)
          $("#cmbQty" + s).append(
            $("<option></option>").attr("value", c).text(c)
          );
        $("#cmbQty" + s).val(i[s - 1]);
      }
    for (var s = 0, d = 0; s < n.length; d += parseFloat(n[s++]));
    0 != d ? fnUpdtTotal(d - Math.ceil((10 * d) / 100), d) : t.html("Rs. 0.00");
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnDispTotal", err: e });
  }
}
function fnUpdtTotal(e, t) {
  var a = $("#divTotal_MC");
  try {
    if (!(e <= t)) return void a.html("Rs. " + t.toFixed(2));
    a.html("Rs. " + e.toFixed(2)), fnUpdtTotal((e += 5), t);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnUpdtTotal", err: e });
  }
}
function fnInitMultiCatBook() {
  try {
    var e = 0,
      t = "",
      a = "",
      o = $("#category_MC").find("select");
    arrCD = new Array();
    for (var n = 0; n < arrShowInfo.length; n++)
      "0" != o.eq(n).val() &&
        ("" != a && ((t += "|"), (a += "|")),
        (a += arrShowInfo[n].AreaCatCode + "-" + o.eq(n).val()),
        arrCD.push(new Array(arrShowInfo[n].PriceCode, o.eq(n).val())),
        (e += parseInt(o.eq(n).val())));
    e <= 0 &&
      fnCMsgDis("errMC", "Please select the Class/Quantity of tickets", "e"),
      0 < e &&
        (fnCnCl(),
        (OD = "") != BMS.Storage.get({ name: "oc" }) &&
          (OD = "|OFFERCODE=" + BMS.Storage.get({ name: "oc" })),
        (glBT.seats = a),
        (glBT.TQ = e),
        fnInitTrans(glBT.SVC, glBT.SSID, t, OD, showLayout));
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnInitMultiCatBook", err: e });
  }
}
var uid =
    -1 !==
    (uid =
      BMS.Storage.get({ name: "secCanTransCookie", storage: "C" }) ||
      BMS.Storage.get({ name: "UID", storage: "C" })).indexOf('"')
      ? uid.replace(/"/g, "")
      : uid,
  objSeatRankingGTM = {};
function fnCallout(t) {
  try {
    if (0 == arrShowInfo.length)
      return (
        BMS.Misc.fnBusy(!1),
        BMS.Misc.modal("tnc", !0),
        $(".modal .__overlay").css("display", "block"),
        $("#dPopupMsgTitle").text("NOTE"),
        $("#dPopupMsgText")
          .text(
            "Booking has been temporarily suspended. Kindly come back later."
          )
          .show(),
        $("#btnAduPopupAccept").hide(),
        $("#btnPopupCancel").hide(),
        $("#btnPopupOK").hide(),
        $("#btnPopupAccept").hide(),
        void $("#btnPopupOK").bind("click", function () {
          BMS.Misc.modal("tnc", !1);
        })
      );
    (blnUnpaid = !1),
      3 == arrShowInfo[0].EventRating
        ? ($("#SLNew_CenMsg").html(
            "Adult Movie - Children below 18 years are not allowed."
          ),
          $("#SetaErrMsg,#SLNew_CenMsg").css("display", "inline-block"))
        : $("#SLNew_CenMsg,#SetaErrMsg").hide(),
      (ObjTT = {});
    for (var e = 0; e < arrShowInfo.length; e++)
      (ObjTT[arrShowInfo[e].AreaCatCode] = {}),
        (ObjTT[arrShowInfo[e].AreaCatCode].TT = arrShowInfo[e].PriceCode),
        (ObjTT[arrShowInfo[e].AreaCatCode].CatagoryName =
          arrShowInfo[e].CategoryName),
        (ObjTT[arrShowInfo[e].AreaCatCode].Price = parseFloat(
          arrShowInfo[e].Price,
          10
        )),
        (ObjTT[arrShowInfo[e].AreaCatCode].Rules =
          null == arrShowInfo[e].OrphanSeats
            ? "0"
            : arrShowInfo[e].OrphanSeats);
    var a = new Array();
    if (
      ("undefined" != typeof aVN &&
        ((a.CMAX = !1),
        (a.PRSD = !1),
        (a.INZS = !1),
        (a.KTVM = !1),
        (a.GOPA = !1),
        (a["3D"] = !1),
        (a.DONE = !1),
        (a.PACK = !1),
        (a.ROTK = !1),
        (a.JYKL = !1),
        (a.NACK = !1),
        (a.TVTB = !1),
        (a.MUTB = !1),
        (a.HDIL = !1),
        (a.PrintComp = !1),
        "PRSD" == glBT.SVC && (a.PRSD = !0),
        "CMAX" == glBT.SVC && (a.CMAX = !0),
        "INZS" == glBT.SVC && (a.INZS = !0),
        "KTVM" == glBT.SVC && (a.KTVM = !0),
        -1 !=
          $.inArray(glBT.SVC, [
            "KBBH",
            "KBBV",
            "KBBE",
            "KBIN",
            "KBKK",
            "KBVS",
          ]) && (a.HDIL = !0),
        -1 !=
          $.inArray(glBT.SVC, [
            "GLRY",
            "SUHC",
            "ACWL",
            "DEWA",
            "SRVV",
            "SVMV",
            "MTBB",
            "AMRT",
            "SLTR",
          ]) && (a.PrintComp = !0),
        "GOPA" == glBT.SVC && (a.GOPA = !0),
        "ROTK" == glBT.SVC && (a.ROTK = !0),
        "JYKL" == glBT.SVC && (a.JYKL = !0),
        "NACK" == glBT.SVC && (a.NACK = !0),
        "TVTB" == glBT.SVC && (a.TVTB = !0),
        "MUTB" == glBT.SVC && (a.MUTB = !0),
        "PACK" == glBT.SVC && (a.PACK = !0),
        a.INZS
          ? ($("#dChildNote").hide(), $("#dINZSNote").show())
          : ($("#dChildNote").show(), $("#dINZSNote").hide()),
        a.KTVM || a.HDIL
          ? ($("#dChildNote").hide(), $("#dChildNote2Yrs").show())
          : (a.INZS || $("#dChildNote").show(), $("#dChildNote2Yrs").hide()),
        $("#dGopalanChildNode").hide(),
        a.GOPA && $("#dGopalanChildNode").show(),
        $("#dPrintOutComp").hide(),
        (a.PACK ||
          a.ROTK ||
          a.NACK ||
          a.TVTB ||
          a.MUTB ||
          a.JYKL ||
          a.PrintComp) &&
          $("#dPrintOutComp").show(),
        $("#d3DNote").hide(),
        $("#d3DNoteOS").hide(),
        a.PRSD && a["3D"]
          ? ($("#dPrsdNote").show(), (a.DONE = !0))
          : $("#dPrsdNote").hide(),
        a.DONE ||
          (a["3D"]
            ? ($("#d3DNote").show(), $("#d3DNoteOS").show())
            : ($("#d3DNote").hide(), $("#d3DNoteOS").hide())),
        $("#dPrintSMSCompulsoryNote").hide(),
        glBT.SVC &&
          -1 <
            $.inArray(glBT.SVC, [
              "SUHC",
              "GLRY",
              "ATBL",
              "ANBL",
              "ATSP",
              "BTBL",
              "CTCP",
              "ESBS",
              "EVTH",
              "KARD",
              "GPTB",
              "GPTH",
              "GTYT",
              "KATH",
              "KCBL",
              "LKTH",
              "MNBL",
              "MANO",
              "NARN",
              "NRBL",
              "PTBK",
              "STSN",
              "SKBG",
              "SRRT",
              "SSTB",
              "SVYK",
              "SVTH",
              "TRTH",
              "VBWT",
              "VRBL",
              "VRMR",
              "SVTB",
              "VTBY",
              "VTGB",
              "RKTS",
              "SKVN",
              "STVN",
              "WOTM",
              "PATD",
              "PTDB",
              "SYTG",
              "SMTG",
              "DEWA",
              "SABB",
            ]) &&
          $("#dPrintSMSCompulsoryNote").show(),
        $("#spAjantaTheaterNotes").hide(),
        glBT.SVC && "ATTR" == glBT.SVC && $("#spAjantaTheaterNotes").show(),
        $("#dPrasadsLargeNotImax").hide(),
        glBT.SVC && "PRHY" == glBT.SVC && $("#dPrasadsLargeNotImax").show()),
      $("#cat_sen_ua,#cat_sen_u,#cat_sen_a").hide(),
      $("#sen_u,#sen_ua,#sen_a").hide(),
      $("#EName").html(strEventName),
      showEventCensor(),
      $("#movinfo").html(strEventLan + " | " + strShowDate + ", " + glBT.SST),
      $("#dRearCircleNotes").hide(),
      $("#temp-overlay").hide(),
      "VN" == byWhat)
    )
      isDynamicSelector = BMS.Misc.Helpers.getIn(UAPI, [
        "ShowDetails",
        0,
        "Venues",
        "SeatSelector",
      ]);
    else {
      tempVenues = BMS.Misc.Helpers.getIn(UAPI, ["ShowDetails", 0, "Venues"]);
      for (e = 0; e < tempVenues.length; e++)
        if (tempVenues[e].VenueCode == glBT.SVC) {
          isDynamicSelector = tempVenues[e].SeatSelector;
          break;
        }
    }
    (isDynamicSelector = 0 < Object.keys(isDynamicSelector || {}).length),
      renderTicketCategory(t),
      -1 != $.inArray(glBT.SVC, ["ABIC"]) && $("#d3DNote").hide(),
      (isCoupleSeats = !1),
      "Y" == arrShowInfo[0].CoupleSeats && (isCoupleSeats = !0),
      (isPopUpMsg = !1),
      -1 != $.inArray(glBT.SVC, arrPopUpMsg) &&
        ((isPopUpMsg = !0), (arrShowInfo[0].HasPopUpMessage = "Y")),
      $("#seat-layout #layout").html(""),
      blnVistaCine && showLayout
        ? ((isSeatRanking = !1), fnGetSL())
        : (BMS.Misc.fnBusy(!1),
          $("#seat-layout").show(),
          setDefaultQuantity(),
          showQuantitySelectionModal(),
          (blnQtySel = !0),
          $(".__total-blk").hide(),
          $(".modal .__overlay").css("display", "block")),
      (intQuatt = 0),
      (blnInCartCoupon = !1),
      (cntAddCpn = 0),
      $("#unpaMsg,#parunpaMsg").hide(),
      $("#btn-btm-paylater").hide(),
      $("#popQty > li").on("mouseover", function () {
        fnGetSVG($(this).attr("id"), "qtyCall", isDynamicSelector);
      }),
      $("#popQty > li").on("mouseout", function () {
        fnGetSVG(
          $("#popQty ._active").attr("id"),
          "qtyCall",
          isDynamicSelector
        );
      }),
      $("#mobshtime > li").on("tap", function () {
        BMS.Misc.modal("show-sel", !1), handlePopups.releaseDocument();
      }),
      (objSeatRankingGTM = {}),
      $(".popular-seat-msg-box").hide(),
      "SVDD" == glBT.SVC &&
        ($("#dChildNote").hide(), $("#dChildNote2Yrs").hide());
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnCallout", fnParams: t, err: e });
  }
}
function renderTicketQuantity(e) {
  try {
    var t = "",
      a = "",
      o = _.template($("#ticket-quantity-template").html()),
      n = _.template($("#pop-ticket-quantity-template").html()),
      s = { qty: "" };
    if ("" != arrShowInfo[0].CategoryRange)
      for (
        var r = arrShowInfo[0].CategoryRange.split("|"), i = 0;
        i < r.length;
        i++
      )
        (s.qty = r[i]), (t += o(s)), (a += n(s));
    else
      for (i = 0; i < arrShowInfo.length; i++)
        if (e == arrShowInfo[i].PriceCode) {
          if ("Y" == arrShowInfo[i].SeatsAvail) {
            for (var l = 1; l <= parseInt(arrShowInfo[i].MaxTickets); l++)
              (s.qty = l), (t += o(s)), (a += n(s));
            break;
          }
          setTicketQuantity(0);
        }
    $("#SLcmbQty").html("").html(t),
      $("#popQty").html("").html(a),
      (showLayout && blnVistaCine) || setDefaultQuantity(),
      bindClickOnTicketQuantity();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "renderTicketQuantity", err: e });
  }
}
function bindClickOnTicketQuantity() {
  try {
    $("#popQty > li").off(),
      $("#popQty > li").on("tap", function (e) {
        global.blnIsTouchScreen
          ? "" == $("#mobintQty").text() && fnDateChkCoachmark()
          : "" == $("#intQty").text() && fnDateChkCoachmark(),
          $(this.parentElement).find("li").removeClass("_active"),
          $(this).addClass("_active"),
          setTicketQuantity($(this).text()),
          (blnQtySel = !1),
          e.preventDefault(),
          $("#btn-paynow").hide(),
          $("#cntbook").hide(),
          $("#btn-paylater").hide(),
          $("#btn-btm-paylater").hide();
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "bindClickOnTicketQuantity", err: e });
  }
}
function renderTicketCategory(e) {
  try {
    for (
      var t = getCatAvailablility(e),
        a = _.template($("#ticket-category-template").html()),
        o = "",
        n = 0,
        s = "",
        r = 0;
      r < arrShowInfo.length;
      r++
    ) {
      var i = arrShowInfo[r];
      (glBT.SLF = i.SeatLayout),
        (showLayout = "N" != i.SeatLayout),
        parseInt(i.MaxTickets) > n &&
          "N" !== i.SeatsAvail &&
          ((n = parseInt(i.MaxTickets)), (s = i.PriceCode));
    }
    for (r = 0; r < t.length; r++) {
      var l = t[r];
      (l.price = "Rs. " + l.price), (o += a(l));
    }
    var c = $("#qty-sel #category-list");
    c.html("").html(o);
    var d = c.find(".seat-category:not(:disabled)");
    blnVistaCine && showLayout
      ? (fnDynamicSelector(s), renderTicketQuantity(s))
      : d &&
        d[0] &&
        ((d[0].checked = "checked"),
        fnDynamicSelector($(d[0]).attr("priceCode")),
        renderTicketQuantity($(d[0]).attr("priceCode"))),
      bindChangeOnTicketCategory();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "renderTicketCategory", err: e });
  }
}
function removeDecimalPrice(e) {
  var t = parseFloat(e);
  return Number.isInteger(t) ? t.toString() : e;
}
function getCatAvailablility(e) {
  try {
    for (
      var t = [], a = !fnCheckIfAllSessionsHaveSeatlayout(), o = 0;
      o < e.cats.length;
      o++
    ) {
      var n = e.cats[o],
        s = {
          price: removeDecimalPrice(n.price),
          desc: n.priceDesc || n.desc || "",
          availabilityClass: n.availabilityClass,
          availabilityText: n.availabilityText,
          priceCode: n.priceCode,
          disabled: "0" !== n.availStatus ? "" : "disabled",
          radioBtnVisibility: blnVistaCine && !a ? "hidden" : "",
        };
      t.push(s);
    }
    return t;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "getCatAvailablility", err: e });
  }
}
function bindChangeOnTicketCategory() {
  try {
    if ("VN" == byWhat)
      isDynamicSelector = BMS.Misc.Helpers.getIn(UAPI, [
        "ShowDetails",
        0,
        "Venues",
        "SeatSelector",
      ]);
    else {
      tempVenues = BMS.Misc.Helpers.getIn(UAPI, ["ShowDetails", 0, "Venues"]);
      for (var e = 0; e < tempVenues.length; e++)
        if (tempVenues[e].VenueCode == glBT.SVC) {
          isDynamicSelector = tempVenues[e].SeatSelector;
          break;
        }
    }
    (isDynamicSelector = 0 < Object.keys(isDynamicSelector || {}).length),
      $("#qty-sel #category-list")
        .find(".seat-category:not(:disabled)")
        .on("change", function () {
          fnDynamicSelector($(this).attr("priceCode")),
            renderTicketQuantity($(this).attr("priceCode")),
            $(".modal .__overlay").css("display", "block"),
            $("#popQty > li").on("mouseover", function () {
              fnGetSVG($(this).attr("id"), "qtyCall", isDynamicSelector);
            }),
            $("#popQty > li").on("mouseout", function () {
              fnGetSVG(
                $("#popQty ._active").attr("id"),
                "qtyCall",
                isDynamicSelector
              );
            });
        });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "bindChangeOnTicketCategory", err: e });
  }
}
function fnGetSL() {
  try {
    "Y" == arrShowInfo[0].ShowSeatNo && fnIsSplitSeat(glBT.VenAppType)
      ? fnCheckSeatLayoutMsg()
        ? isCoupleSeats
          ? BMS.Misc.fnGetSeatlayout({
              AppC: global.strAppCode,
              venCode: glBT.SVC,
              transId: "0",
              cmd: "GETSEATLAYOUT",
              p1: glBT.SSID,
              p2: "WEB",
              p4: "|hasPopUpMessage=Y|",
              p5: "Y",
              p7: "Y",
              fnCC: fnMakeObj,
              fnEC: fnErr,
            })
          : BMS.Misc.fnGetSeatlayout({
              AppC: global.strAppCode,
              venCode: glBT.SVC,
              transId: "0",
              cmd: "GETSEATLAYOUT",
              p1: glBT.SSID,
              p2: "WEB",
              p4: "|hasPopUpMessage=Y|",
              p5: "Y",
              fnCC: fnMakeObj,
              fnEC: fnErr,
            })
        : isCoupleSeats
        ? BMS.Misc.fnGetSeatlayout({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: "0",
            cmd: "GETSEATLAYOUT",
            p1: glBT.SSID,
            p2: "WEB",
            p5: "Y",
            p7: "Y",
            fnCC: fnMakeObj,
            fnEC: fnErr,
          })
        : BMS.Misc.fnGetSeatlayout({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: "0",
            cmd: "GETSEATLAYOUT",
            p1: glBT.SSID,
            p2: "WEB",
            p5: "Y",
            fnCC: fnMakeObj,
            fnEC: fnErr,
          })
      : fnCheckSeatLayoutMsg()
      ? isCoupleSeats
        ? BMS.Misc.fnGetSeatlayout({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: "0",
            cmd: "GETSEATLAYOUT",
            p1: glBT.SSID,
            p2: "WEB",
            p4: "|hasPopUpMessage=Y|",
            p5: "Y" == arrShowInfo[0].ShowSeatNo ? "Y" : "",
            p7: "Y",
            fnCC: fnMakeObj,
            fnEC: fnErr,
          })
        : BMS.Misc.fnGetSeatlayout({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: "0",
            cmd: "GETSEATLAYOUT",
            p1: glBT.SSID,
            p2: "WEB",
            p4: "|hasPopUpMessage=Y|",
            p5: "Y" == arrShowInfo[0].ShowSeatNo ? "Y" : "",
            fnCC: fnMakeObj,
            fnEC: fnErr,
          })
      : isCoupleSeats
      ? BMS.Misc.fnGetSeatlayout({
          AppC: global.strAppCode,
          venCode: glBT.SVC,
          transId: "0",
          cmd: "GETSEATLAYOUT",
          p1: glBT.SSID,
          p2: "WEB",
          p5: "Y" == arrShowInfo[0].ShowSeatNo ? "Y" : "",
          p7: "Y",
          fnCC: fnMakeObj,
          fnEC: fnErr,
        })
      : BMS.Misc.fnGetSeatlayout({
          AppC: global.strAppCode,
          venCode: glBT.SVC,
          transId: "0",
          cmd: "GETSEATLAYOUT",
          p1: glBT.SSID,
          p2: "WEB",
          p5: "Y" == arrShowInfo[0].ShowSeatNo ? "Y" : "",
          fnCC: fnMakeObj,
          fnEC: fnErr,
        });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGetSL", fnParams: data, err: e });
  }
}
function fnCheckSeatLayoutMsg() {
  try {
    return "Y" == arrShowInfo[0].HasPopUpMessage;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnCheckSeatLayoutMsg", err: e });
  }
}
function fnGetPopupMsg(e, t) {
  try {
    var a = "";
    if (("buytickets" == t || "seatlayout" == t) && "" != e)
      if ("undefined" != typeof allShowsData) {
        for (var o in allShowsData)
          if (
            void 0 !== allShowsData[o].arrVenue &&
            0 < allShowsData[o].arrVenue.length &&
            allShowsData[o].arrVenue[0].VenueCode == glBT.SVC
          )
            for (
              var n = allShowsData[o].arrVenue[0].PopUpDescription.split("|"),
                s = 0;
              s < n.length;
              s++
            )
              "" != n[s] &&
                -1 != n[s].indexOf("=") &&
                n[s].split("=")[0] == e &&
                (a = n[s].split("=")[1]);
      } else if ("VN" == byWhat && "undefined" != typeof byWhat) {
        if (
          "undefined" != typeof UAPI &&
          void 0 !== UAPI.ShowDetails[0].Venues.PopUpDescription &&
          "" != UAPI.ShowDetails[0].Venues.PopUpDescription
        )
          for (
            n = UAPI.ShowDetails[0].Venues.PopUpDescription.split("|"), s = 0;
            s < n.length;
            s++
          )
            "" != n[s] &&
              -1 != n[s].indexOf("=") &&
              n[s].split("=")[0] == e &&
              (a = n[s].split("=")[1]);
      } else if (
        "ET" == byWhat &&
        "undefined" != typeof byWhat &&
        "undefined" != typeof aVN_details
      )
        for (var r in aVN_details)
          if (aVN_details[r].VenueCode == glBT.SVC)
            for (
              n = aVN_details[r].PopUpDescription.split("|"), s = 0;
              s < n.length;
              s++
            )
              "" != n[s] &&
                -1 != n[s].indexOf("=") &&
                n[s].split("=")[0] == e &&
                (a = n[s].split("=")[1]);
    return a;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGetPopupMsg", err: e });
  }
}
function fnGetSeatData(e, t) {
  try {
    var a = "";
    if ("POPMSG" === e)
      if (-1 != t.indexOf("+"))
        for (var o = t.split("+"), n = 0; n < o.length; n++)
          -1 != o[n].indexOf("^") && (a = o[n].split("^")[1]);
    return a;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGetSeatData", err: e });
  }
}
function fnErr(e) {
  bindErrorCloseClick();
}
function bindErrorCloseClick() {
  try {
    $("#error-div .__dismiss").one("click", function () {
      var e;
      newShowtime &&
        ((e = "" !== newShowtimeUrl ? newShowtimeUrl : "/explore/movies"),
        BMS.Misc.fnBusy(!0),
        window.location.replace(e)),
        hidelayoutBlock();
    });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "bindErrorCloseClick", err: e });
  }
}
function hidelayoutBlock() {
  try {
    $("html").removeClass("no-scroll"),
      $("body").removeClass("_fixed"),
      $("body").css("margin-top", "0"),
      BMS.Misc.modal("qty-sel", !1),
      $("#seat-layout").hide(),
      $(".modal .__overlay").css("display", "none"),
      fnGetSeatlayoutActivity({
        vCode: glBT.SVC,
        sId: glBT.SSID,
        etCode: glBT.SEC,
        landed: !1,
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "hidelayoutBlock", err: e });
  }
}
function fnSetQtyCmb() {
  try {
    var e = $("#tikCat"),
      t = $("#tikCat option:selected").html();
    if (
      ($("#dRearCircleNotes").hide(),
      $("#dRearCircleNotes #printComp").hide(),
      ((-1 != $.inArray(glBT.SVC, ["TGSR", "TGSV"]) &&
        0 == t.toUpperCase().indexOf("REAR")) ||
        ("" != e.val() &&
          -1 != $.inArray(glBT.SVC, ["SCKO", "ATTR", "SSVL", "TGSN"]))) &&
        ($("#dRearCircleNotes").show(),
        "ATTR" == glBT.SVC
          ? $("#dRearCircleNotes #printComp").show()
          : $("#dRearCircleNotes #printComp").hide()),
      $("#dVarshaFamilyNotes").hide(),
      -1 != $.inArray(glBT.SVC, ["VRSA"]) &&
        "0001" == e.val() &&
        $("#dVarshaFamilyNotes").show(),
      $("#cmbQty").html('<option value="0">Qty</option>'),
      $("#SLcmbQty").html(""),
      "" != arrShowInfo[0].CategoryRange)
    )
      for (
        var a = arrShowInfo[0].CategoryRange.split("|"), o = 0;
        o < a.length;
        o++
      )
        $("#cmbQty").append("<option value=" + a[o] + ">" + a[o] + "</option>"),
          $("#SLcmbQty").append("<li id=" + a[o] + ">" + a[o] + "</li>");
    else
      for (o = 0; o < arrShowInfo.length; o++)
        if (e.val() == arrShowInfo[o].PriceCode)
          if ("Y" == arrShowInfo[o].SeatsAvail)
            for (var n = 1; n <= parseInt(arrShowInfo[o].MaxTickets); n++)
              $("#cmbQty").append(
                '<option value="' + n + '">' + n + "</option>"
              ),
                $("#SLcmbQty").append("<li id=" + n + ">" + n + "</li>");
          else
            $("#cmbQty").append('<option value="0">Sold Out</option>'),
              $("#SLcmbQty").append("<li>Sold Out</li>");
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnSetQtyCmb", err: e });
  }
}
function fnPreInitBook() {
  try {
    if (0 == $("#cmbQty").val()) return;
    BMS.Misc.modal("cat-sel", !1),
      $(".modal .__overlay").css("display", "none"),
      fnInitBook();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnPreInitBook", err: e });
  }
}
function fnInitBook() {
  try {
    (("" != BMS.Storage.get({ name: "lngTransId", defVal: "" }) &&
      "0" != BMS.Storage.get({ name: "lngTransId", defVal: "" })) ||
      "" != BMS.Storage.get({ name: "lngTransId", defVal: "" })) &&
      (BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: BMS.Storage.get({ name: "lngTransId" }),
        cmd: "CANCELTRANS",
        blnSupp: !0,
        p1: "webuser",
        p2: "",
        p3: "seat-layout-fn-init-booking",
        p4: "",
        p5: "",
        p6: "",
        p7: "",
        p8: "",
        p9: "",
        p10: "",
        fnCC: "",
        fnEC: "",
      }),
      BMS.Storage.del({ name: "lngTransId" }));
    var e = $("#qty-sel #category-list")
        .find(".seat-category:checked")
        .attr("priceCode"),
      t = $("#intQty").html(),
      a = 0,
      o = "",
      n = "";
    fnGetSVG(t, "", isDynamicSelector), (arrCD = new Array());
    for (var s, r = 0; r < arrShowInfo.length; r++)
      if (e == arrShowInfo[r].PriceCode) {
        "" != n && ((o += "|"), (n += "|")),
          (n += arrShowInfo[r].AreaCatCode + "-" + t),
          arrCD.push(new Array(arrShowInfo[r].PriceCode, t)),
          (a += parseInt(t));
        break;
      }
    0 < a &&
      ((OD = "") != (s = BMS.Storage.get({ name: "oc", value: "" })) &&
        (OD = "|OFFERCODE=" + s + "|"),
      (glBT.seats = n),
      (glBT.TQ = a),
      fnInitTrans(glBT.SVC, glBT.SSID, o, OD, showLayout));
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnInitBook", err: e });
  }
}
function fnPkgCl() {
  try {
    $(".fnb-error").hide(), handlePopups.releaseDocument();
    var e = ObjCheckList.strSSeats.split("|")[2],
      t = [];
    if (blnVistaCine) {
      for (var a = 0; a < arrShowInfo.length; a++)
        e === arrShowInfo[a].AreaCatCode &&
          "Y" === arrShowInfo[a].Package &&
          t.push(arrShowInfo[a]);
      t.length <= 1
        ? fnPreInit()
        : 0 != ObjCheckList.SelectedSeats.length
        ? 0 != ObjCheckList.TotalSeats &&
          fnSLErrors(
            "SLError",
            "Please select exactly " + $("#SLcmbQty").val() + " seats.",
            "e"
          )
        : "" == $("#SLcmbQty").val() &&
          fnSLErrors("SLError", "Please select quantity", "e");
    } else fnPreInit();
    $("#strEvtName").attr("onclick", "fnCanTr();");
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnPkgCl", err: e });
  }
  pushPayClickLotame();
}
function fnSetTT(e) {
  try {
    (ObjTT[ObjCatagories[ObjCheckList.CatagoryToSelect].AreaCode].TT = e),
      $("#pkgseat").hide(),
      fnPreInit();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnSetTT", err: e });
  }
}
var blnException = !0;
function fnInitTrans(t, a, o, n, s) {
  try {
    (showLayout = !(blnException = !0)),
      $("#tblClass, #tblClassMultiCat").hide(),
      BMS.Misc.fnBusy(!0),
      (intCDP = -1),
      (OD = n);
    var e = $("#qty-sel #category-list")
      .find(".seat-category:checked")
      .attr("priceCode");
    glBT.SL = "N";
    for (var r = 0; r < arrShowInfo.length; r++)
      e == arrShowInfo[r].PriceCode &&
        "Y" == arrShowInfo[r].SeatLayout &&
        ((glBT.SL = "Y"), (showLayout = !0));
    var i = {};
    BMS.Misc.fnGetBranchFingerPrintId(i),
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: t,
        transId: 0,
        cmd: "INITTRANS",
        advertiserId: i.id,
        p1: "",
        p2: "",
        p3: "",
        p4: "",
        p5: "",
        p6: "",
        p7: "",
        p8: "",
        p9: "",
        p10: "",
        fnCC: fnAddSeats,
        ccObj: !0,
        fnEC: fneSc,
      });
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: "fnInitTrans",
      fnParams: t + " " + a + " " + o + " " + n + " " + s,
      err: e,
    });
  }
}
function fnAddSeats(e) {
  try {
    $("#Total").html("");
    var t,
      a = e.strData,
      o = e.intExceptionEx;
    (TT = arrCD[++intCDP][0]),
      (SQ = arrCD[intCDP][1]),
      0 == intCDP
        ? ((lngTransId = BMS.Misc.fnGVal({ key: "TRANSACTIONID", data: a })),
          BMS.Storage.set({
            name: "lngTransId",
            value: lngTransId,
            storage: "C",
          }))
        : "3" != o && (blnException = !1);
    var n = BMS.Storage.get({ name: "ld", key: "LSID", defVal: "" }),
      s = BMS.Storage.get({ name: "ld", key: "MEMBERID", defVal: "" }),
      r = BMS.Storage.get({ name: "ld", key: "MEMBEREMAIL", defVal: "" }),
      i = BMS.Storage.get({ name: "ld", key: "MOBILE", defVal: "" }),
      l = {};
    i && (l["x-phone"] = i),
      n && (l["x-lsid"] = n),
      s && (l["x-member-id"] = s),
      r && (l["x-email"] = r),
      (t = intCDP < arrCD.length - 1 ? fnAddSeats : fnGSL),
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: lngTransId,
        cmd: "ADDSEATS",
        headers: l,
        p1: glBT.SSID,
        p2: TT,
        p3: SQ,
        p4: BMS.Storage.get({ name: "strRef", defVal: "" }),
        p5: OD,
        p6: "",
        p7: "",
        p8: "",
        p9: "",
        p10: "",
        fnCC: t,
        ccObj: !0,
        fnEC: fneSc,
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnAddSeats", fnParams: a, err: e, supp: !1 });
  }
}
function fnGSL(e) {
  try {
    var t = e.strData;
    "3" != e.intExceptionEx && (blnException = !1),
      null != $("#oddsm") && $("#oddsm").hide(),
      "" != t
        ? ((strBookingId = BMS.Misc.fnGVal({ key: "BOOKINGID", data: t })),
          (strSeatInfo = BMS.Misc.fnGVal({ key: "SEATINFO", data: t })),
          (curTicketsAmt = BMS.Misc.fnGVal({ key: "TICKETSAMT", data: t })),
          (curFoodAmt = BMS.Misc.fnGVal({ key: "FOODAMT", data: t })),
          (curBookingFee = BMS.Misc.fnGVal({ key: "BOOKINGFEE", data: t })),
          (curDiscountAmt = BMS.Misc.fnGVal({ key: "DISCOUNTAMT", data: t })),
          (curTotalAmt = BMS.Misc.fnGVal({ key: "TOTALAMT", data: t })),
          (strSeatData = BMS.Misc.fnGVal({ key: "SEATDATA", data: t })),
          BMS.Storage.set({
            name: "BOOKINGID",
            value: strBookingId,
            storage: "C",
          }))
        : (lngTransId = BMS.Storage.get({ name: "lngTransId", value: "" })),
      "A" == glBT.SLF && blnException
        ? (showLayout = !0)
        : "A" != glBT.SLF || blnException || (showLayout = !1),
      0 == showLayout
        ? ("CT" != pet ? fnuSI : fnGotoPay)()
        : "Y" == arrShowInfo[0].ShowSeatNo && "TG" == glBT.VenAppType
        ? fnCheckSeatLayoutMsg()
          ? isCoupleSeats
            ? BMS.Misc.fnGetSeatlayout({
                AppC: global.strAppCode,
                venCode: glBT.SVC,
                transId: lngTransId,
                cmd: "GETSEATLAYOUT",
                p1: glBT.SSID,
                p2: "WEB",
                p3: "",
                p4: "|hasPopUpMessage=Y|",
                p5: "Y",
                p7: "Y",
                fnCC: cSL,
                fnEC: fnCanTr,
              })
            : BMS.Misc.fnGetSeatlayout({
                AppC: global.strAppCode,
                venCode: glBT.SVC,
                transId: lngTransId,
                cmd: "GETSEATLAYOUT",
                p1: glBT.SSID,
                p2: "WEB",
                p4: "|hasPopUpMessage=Y|",
                p5: "Y",
                fnCC: cSL,
                fnEC: fnCanTr,
              })
          : isCoupleSeats
          ? BMS.Misc.fnGetSeatlayout({
              AppC: global.strAppCode,
              venCode: glBT.SVC,
              transId: lngTransId,
              cmd: "GETSEATLAYOUT",
              p1: glBT.SSID,
              p2: "WEB",
              p5: "Y",
              p7: "Y",
              fnCC: cSL,
              fnEC: fnCanTr,
            })
          : BMS.Misc.fnGetSeatlayout({
              AppC: global.strAppCode,
              venCode: glBT.SVC,
              transId: lngTransId,
              cmd: "GETSEATLAYOUT",
              p1: glBT.SSID,
              p2: "WEB",
              p5: "Y",
              fnCC: cSL,
              fnEC: fnCanTr,
            })
        : fnCheckSeatLayoutMsg()
        ? isCoupleSeats
          ? BMS.Misc.fnGetSeatlayout({
              AppC: global.strAppCode,
              venCode: glBT.SVC,
              transId: lngTransId,
              cmd: "GETSEATLAYOUT",
              p1: glBT.SSID,
              p2: "WEB",
              p4: "|hasPopUpMessage=Y|",
              p7: "Y",
              fnCC: cSL,
              fnEC: fnCanTr,
            })
          : BMS.Misc.fnGetSeatlayout({
              AppC: global.strAppCode,
              venCode: glBT.SVC,
              transId: lngTransId,
              cmd: "GETSEATLAYOUT",
              p1: glBT.SSID,
              p2: "WEB",
              p4: "|hasPopUpMessage=Y|",
              fnCC: cSL,
              fnEC: fnCanTr,
            })
        : isCoupleSeats
        ? BMS.Misc.fnGetSeatlayout({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: lngTransId,
            cmd: "GETSEATLAYOUT",
            p1: glBT.SSID,
            p2: "WEB",
            p7: "Y",
            fnCC: cSL,
            fnEC: fnCanTr,
          })
        : "Y" != arrShowInfo[0].ShowSeatNo ||
          ("SP" != glBT.VenAppType &&
            "BT" != glBT.VenAppType &&
            "VS" != glBT.VenAppType &&
            "JT" != glBT.VenAppType)
        ? BMS.Misc.fnGetSeatlayout({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: lngTransId,
            cmd: "GETSEATLAYOUT",
            p1: glBT.SSID,
            p2: "WEB",
            fnCC: cSL,
            fnEC: fnCanTr,
          })
        : BMS.Misc.fnGetSeatlayout({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: lngTransId,
            cmd: "GETSEATLAYOUT",
            p1: glBT.SSID,
            p2: "WEB",
            p5: "Y",
            fnCC: fnMakeObj,
            fnEC: fnCanTr,
          });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGSL", fnParams: t, err: e });
  }
}
function cSL(e) {
  try {
    (intMaxRowLength = intSessionTotalSeats = intAvailSeats = 0),
      (aSS = new Array()),
      (aAreas = new Array()),
      (aRows = new Array()),
      (arrAreaSeat = new Array()),
      (arrSpArea = new Array()),
      (isSocialDistancing = !1),
      "" != e && fSL(e);
    var t,
      a,
      o,
      n,
      s,
      r = "",
      i = "",
      l = "",
      c = "",
      d = "",
      p = $("#layout");
    "" != p.innerHTML && (p.innerHTML = ""),
      (TQ = glBT.TQ),
      (SS = ""),
      (a = $("<tbody></tbody>")),
      (t = $("<table></table>")).attr("align", "center");
    for (var f = "", S = 0; S < aAreas.length; S++)
      f += "|" + aAreas[S][1] + "-" + aAreas[S][5];
    (f = (f += "|").substring(0, f.length)), (glBT.seats = f);
    for (var h = 0; h < aRows.length; h++) {
      if (i != aRows[h][2].substring(0, 1)) {
        (o = $("<tr></tr>")), (n = $("<td></td>")).attr("colSpan", 100);
        var i = aRows[h][2].substring(0, 1),
          u = $("#rowNDSC");
        u.html("");
        for (var g = 0; g < aAreas.length; g++) {
          if (!isPP) {
            u.show();
            for (S = 0; S < arrShowInfo.length; S++)
              if (
                aAreas[g][1] == arrShowInfo[S].AreaCatCode &&
                "P" == arrShowInfo[S].SeatLayoutType
              ) {
                u.html(
                  '<img src="//in.bmscdn.com/img/preview/' +
                    glBT.SVC +
                    "_" +
                    glBT.SSID +
                    '.jpg" alt="" />'
                ),
                  u.show();
                break;
              }
          }
          aAreas[g][0] == i &&
            ((intSeatOffSet = parseInt(aAreas[g][5])),
            n.html(aAreas[g][3] + " Rs. " + prices[aAreas[g][1]]),
            n.addClass("seatP"),
            (c = aAreas[g][1]),
            (l = aAreas[g][2]));
        }
        "KODG" != glBT.SVC && (n.addClass("cssRow"), o.append(n), a.append(o));
      }
      (o = $("<tr></tr>")),
        (n = $("<td></td>")),
        1 < aRows[h][1].length && n.css("fontSize", "5pt"),
        n.html(aRows[h][1]),
        n.addClass("seatR Setrow1"),
        n.css({ width: "17px" }),
        n.css({ height: "17px" }),
        o.append(n);
      for (var m = 2; m < aRows[h].length; m++) {
        intMaxRowLength < aRows[h].length &&
          (intMaxRowLength = aRows[h].length),
          (n = $("<div></div>")).addClass("seatI"),
          (s = $("<a>")),
          intSessionTotalSeats++,
          (rowDetails = aRows[h][m].split("+")),
          (seatData = rowDetails[0]),
          (d = aRows[h][m].substring(2)),
          (cinemaSeatNumber =
            "0" === rowDetails[1] || "00" === rowDetails[1]
              ? void 0
              : rowDetails[1]),
          (d = cinemaSeatNumber || d),
          s.text(d);
        var b = aRows[h][m].substring(1, 2);
        switch (b) {
          case "0":
            n.css({ background: "#fafafa" }),
              n.html("&nbsp;&nbsp;&nbsp;&nbsp;");
            break;
          case "1":
            s.attr("class", "_available"),
              intAvailSeats++,
              "KODG" == glBT.SVC
                ? (I =
                    gAC(aRows[h][m].substring(0, 1)) +
                    "_" +
                    l +
                    "_" +
                    aRows[h][0] +
                    "_" +
                    aRows[h][m].substring(2))
                : ((I = ""),
                  "TG" == glBT.VenAppType &&
                  "Y" == arrShowInfo[0].ShowSeatNo &&
                  -1 != aRows[h][m].indexOf("+")
                    ? -1 != aRows[h][m].indexOf("^")
                      ? ((I =
                          c +
                          "_" +
                          l +
                          "_" +
                          aRows[h][0] +
                          "_" +
                          aRows[h][m].substring(2).split("+")[0]),
                        n.css({ position: "relative" }),
                        n.append(
                          "<div class='popupmsg'><p>" +
                            fnGetPopupMsg(
                              aRows[h][m].substring(2).split("^")[1],
                              "buytickets"
                            ) +
                            "</p></div>"
                        ))
                      : (I =
                          c +
                          "_" +
                          l +
                          "_" +
                          aRows[h][0] +
                          "_" +
                          aRows[h][m].substring(2).split("+")[0])
                    : -1 != aRows[h][m].indexOf("^") &&
                      -1 != aRows[h][m].indexOf("+")
                    ? ((I =
                        c +
                        "_" +
                        l +
                        "_" +
                        aRows[h][0] +
                        "_" +
                        aRows[h][m].substring(2).split("+")[0]),
                      n.css({ position: "relative" }),
                      n.append(
                        "<div class='popupmsg'><p>" +
                          fnGetPopupMsg(
                            aRows[h][m].substring(2).split("^")[1],
                            "buytickets"
                          ) +
                          "</p></div>"
                      ))
                    : (I = c + "_" + l + "_" + aRows[h][0] + "_" + d)),
              n.attr("id", I),
              n.mouseover(function () {
                cursor(this, "hand");
              }),
              n.tap(function () {
                selectSeats(this);
              }),
              n.append(s);
            var C = "";
            if (
              (-1 !== $.inArray(glBT.VenAppType, arrShowSeat) &&
                ("TG" == glBT.VenAppType && "Y" == arrShowInfo[0].ShowSeatNo
                  ? (s.text(getSeatNumber(aRows[h][m].split("+")[1])),
                    (C = aRows[h][m].split("+")[0]))
                  : "TG" != glBT.VenAppType &&
                    (-1 != aRows[h][m].indexOf("^")
                      ? (s.text(
                          getSeatNumber(aRows[h][m].substring(2).split("^")[0])
                        ),
                        (C = aRows[h][m].substring(2)))
                      : s.text(d))),
              (C =
                -1 == aRows[h][m].substring(2).indexOf("+")
                  ? aRows[h][m].substring(2)
                  : aRows[h][m].substring(2).split("+")[0]),
              isCoupleSeats)
            ) {
              var y,
                k,
                T = !1,
                v = "",
                B = !1;
              for (k in ObjGroupSeats) v = k;
              if (
                ((y = aRows[h][0]),
                void 0 !== ObjGroupSeats[v] && void 0 !== ObjGroupSeats[v][y])
              )
                for (var w in ObjGroupSeats[v][y])
                  for (
                    var D = ObjGroupSeats[v][y][w].SeatId.split("~"), M = 0;
                    M < D.length;
                    M++
                  )
                    D[M].split("^")[1] == C &&
                      (0 == M && (B = !0), M == D.length - 1 && (T = !0));
            }
            break;
          case "2":
          case "3":
          case "9":
            s.attr("class", "_blocked"),
              "9" == aRows[h][m].substring(1, 2) && (isSocialDistancing = !0),
              n.append(s);
            d = d;
            -1 !== $.inArray(glBT.VenAppType, arrShowSeat) &&
              ("TG" == glBT.VenAppType && "Y" == arrShowInfo[0].ShowSeatNo
                ? (d = getSeatNumber(aRows[h][m].split("+")[1].split("^")[0]))
                : "TG" != glBT.VenAppType &&
                  -1 != aRows[h][m].indexOf("^") &&
                  (d = getSeatNumber(aRows[h][m].substring(2).split("^")[0]))),
              s.html(fnMakeCustomSeatSVG(b, d, !0));
            break;
          case "88":
            s.attr("class", "_selected");
            var I =
              c + "_" + l + "_" + aRows[h][0] + "_" + aRows[h][m].substring(2);
            n.attr("id", I),
              (SS += n.attr("id") + "|"),
              n.mouseover(function () {
                cursor(this, "hand");
              }),
              n.tap(function () {
                selectSeats(this);
              }),
              n.append(s),
              aSS.push(n.attr("id"));
        }
        isCoupleSeats && 1 == aRows[h][m].substring(1, 2)
          ? B
            ? ((r = "<span class='sofa_seat'>"), (r += n[0].outerHTML))
            : T
            ? (n.attr("class", "seatI seatIlast"),
              (r += n[0].outerHTML + "<div class='clear'></div></span>"),
              (r = $(r)).find("div").tap(function () {
                selectSeats(this);
              }),
              o.append(r),
              (r = ""))
            : "" != r
            ? (r += n[0].outerHTML)
            : o.append(n)
          : o.append(n);
      }
      a.append(o), t.append(a);
    }
    (o = $("<tr></tr>")),
      (n = $("<td></td>")).attr("colSpan", 999),
      o.append(n),
      a.append(o),
      t.append(a),
      p.html(""),
      p.append(t),
      $("#fbPicsHead").hide(),
      $("#fbPics").hide(),
      $("#fbPics").html("");
    for (var _ = "", O = 1, x = 0; x < arrFBInfo.length; x++)
      glBT.SVC == arrFBInfo[x][1] &&
        glBT.SSID == arrFBInfo[x][2] &&
        (++O % 2 == 0 &&
          (_ +=
            O / 2 == 1
              ? '<div id="dSlFr' + O / 2 + '" style="float: left;">'
              : '<div id="dSlFr' +
                O / 2 +
                '" style="float: left; display: none;">'),
        1 == arrFBInfo[x][3]
          ? (_ +=
              '<img src="https://graph.facebook.com/' +
              arrFBInfo[x][0] +
              '/picture" width="50" height="50" onmouseover="fnShFBSeats(\'' +
              arrFBInfo[x][6] +
              "');\" onmouseout=\"fnClFBSeats('" +
              arrFBInfo[x][6] +
              "');\" alt='" +
              arrFBInfo[x][5] +
              " booked " +
              arrFBInfo[x][3] +
              " ticket' title='" +
              arrFBInfo[x][5] +
              " booked " +
              arrFBInfo[x][3] +
              " ticket'>")
          : (_ +=
              '<img src="https://graph.facebook.com/' +
              arrFBInfo[x][0] +
              '/picture" width="50" height="50" onmouseover="fnShFBSeats(\'' +
              arrFBInfo[x][6] +
              "');\" onmouseout=\"fnClFBSeats('" +
              arrFBInfo[x][6] +
              "');\" alt='" +
              arrFBInfo[x][5] +
              " booked " +
              arrFBInfo[x][3] +
              " tickets' title='" +
              arrFBInfo[x][5] +
              " booked " +
              arrFBInfo[x][3] +
              " tickets'>"),
        O % 2 == 1 && (_ += "</div>"));
    O % 2 != 1 && (_ += "</div>");
    var A = "";
    if (
      ("" != _ &&
        ((A += "<span>Know where your friends are seated</span>"),
        (A += '<div class="fbfriends">'),
        5 < O
          ? ((A += '<a class="back fbbackmar"></a>'),
            (A += _),
            (A += '<a class="forward     fbformar"></a>'))
          : (A += _),
        (A += "</div>"),
        $("#fbPicsHead").show(),
        $("#fbPics").html(A),
        $("#fbPics").show()),
      BMS.Misc.fnBusy(!1),
      handlePopups.freezeDocument(),
      0 == intAvailSeats)
    ) {
      if (0 === $("#NoSeats").length)
        return (
          BMS.Misc.fnBusy(!1),
          hidelayoutBlock(),
          BMS.Misc.modal("tnc", !0),
          $("#dPopupMsgTitle").text("NOTE").show(),
          $("#dPopupMsgText").text("No Seats available for booking").show(),
          $("#btnAduPopupAccept").hide(),
          $("#btnPopupCancel").hide(),
          $("#btnPopupOK").hide(),
          $("#btnPopupAccept").hide(),
          $(".modal .__overlay").css("display", "block"),
          void $("#btnPopupOK").bind("click", function () {
            BMS.Misc.modal("tnc", !1);
          })
        );
      $("#NoSeats").show();
    } else $(".modal .__overlay").css("display", "none");
    showEventCensor(),
      $("#strVenName").html(strVenueName),
      -1 != strShowDate.indexOf(",")
        ? ((BookingDate = strShowDate.split(",")),
          (strWeDAY =
            "Today" == BookingDate[0]
              ? BookingDate[0]
              : BookingDate[0].slice(0, 3)),
          $("#weekday,#mobweekday").text(strWeDAY),
          "undefined" != typeof pageName &&
          "home" != pageName &&
          "movies" != pageName
            ? $("#date,#mobdate").text(BookingDate[1].trim().substring(0, 2))
            : $("#date,#mobdate").text(BookingDate[1].trim().substring(4, 6)),
          $("#strDate")
            .html(strShowDate + ", " + glBT.SST)
            .hide())
        : ($("#mobile-date-container,#desktop-date-container").hide(),
          $("#strDate").html(strShowDate + ", " + glBT.SST)),
      $("#strEvtName").html(strEventName),
      $("#strLan").html(strEventLan),
      "" != strEvtMsg ? $("#strEvExp").html(strEvtMsg) : $("#strExp").hide(),
      (blnHasPopupMsg = !1),
      (blnVista = !1),
      renderMoreShowTime(),
      fnMakeSeatLegends(),
      $("#prePay").hide(),
      $("#prePay-fnb").hide(),
      $("#btmcntbook,#cntbook").hide(),
      $("#btn-paylater").hide(),
      $(".__seat-action").hide(),
      $("#STotal").parent().hide(),
      $("html").addClass("no-scroll"),
      $(".modal .__overlay").css("display", "none"),
      $("#seat-layout").show(),
      $("#evcomp").show(),
      fnCheckIfAllSessionsHaveSeatlayout()
        ? ($(".no-of-tickets").attr(
            "onclick",
            'javascript:BMS.Misc.modal("qty-sel", 1);$(".__seat-action").hide();$("#snackbar").hide();'
          ),
          $(".no-of-tickets").show())
        : $(".no-of-tickets").attr(
            "onclick",
            'fnSelSh(event, "' +
              glBT.SVC +
              '", "' +
              glBT.SSID +
              '", "' +
              glBT.SEC +
              '", "' +
              glBT.SST +
              '", "", false);'
          ),
      $("#bksmile").hide(),
      $("#layout").css({ width: 32 * intMaxRowLength + 50 + "px" }),
      $(".seat-layout-header").show(),
      $("#seatlayoutbox, .showtime-section").show(),
      global.blnIsTouchScreen && $("#mob-qty").hide();
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: arguments.callee.name,
      fnParams: arguments,
      err: e,
      supp: !1,
    });
  }
}
function cursor(t, a) {
  try {
    "hand" == a.toLowerCase() && (t.style.cursor = "pointer");
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "cursor", fnParams: t + "," + a, err: e });
  }
}
function clsSel(t) {
  try {
    for (var e, a = new Array(), o = 0; o < aSS.length; o++)
      0 <= (e = document.getElementById(aSS[o])).id.search(t) &&
        ($("#" + e.id + " > a").removeClass("_selected _smiley"),
        (SS = SS.replace(aSS[o] + "|", "")),
        intSeats++);
    for (o = 0; o < aSS.length; o++)
      0 <= (e = document.getElementById(aSS[o])).id.search(t) && a.push(o);
    for (o = a.length - 1; 0 <= o; o--) aSS.splice(a[o], 1);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "clsSel", fnParams: t, err: e });
  }
}
function getGenre() {
  try {
    if (
      objSeatData.event &&
      objSeatData.event[0] &&
      objSeatData.event[0].genre
    ) {
      if (objSeatData.event[0].genre.Plays)
        return objSeatData.event[0].genre.Plays.join();
      if (objSeatData.event[0].genre[0] && objSeatData.event[0].genre[0].Plays)
        return objSeatData.event[0].genre[0].Plays.join();
    }
    return "";
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "getGenre", err: e });
  }
}
function selectSeats(t) {
  var e = !1;
  Qty = glBT.TQ;
  var a = t.id.split("_"),
    o = gAS(a[0]);
  (intSeats = o),
    (clrArea = a[0]),
    0 == o && (clsSel(a[0]), (o = gAS(a[0])), (intSeats = o));
  for (var n = 0, s = 0; s < t.parentNode.childNodes.length; s++)
    if (t.parentNode.childNodes[s].id == t.id) {
      n = s - 1;
      break;
    }
  for (
    var a = t.parentNode.childNodes,
      r = new Array(!1, !1, !1, !1, !1),
      i = 0,
      s = 0;
    s < arrShowInfo.length;
    s++
  )
    TT == arrShowInfo[s].PriceCode &&
      (i =
        void 0 === arrShowInfo[s].OrphanSeats
          ? "0"
          : arrShowInfo[s].OrphanSeats);
  new Array();
  for (s = r.length; 0 <= s; s--) {
    var l = Math.pow(2, s),
      c = i / l;
    1 <= c && c < 2 && ((r[s] = !0), (i -= l));
  }
  if (r[0]) {
    if (
      2 <= n &&
      a[n].childNodes.length &&
      a[n - 1].childNodes.length &&
      a[n].childNodes[0].src.match(/1_1/gi) &&
      a[n - 1].childNodes[0].src.match(/1_2/gi)
    )
      return;
    if (
      n + intSeats + 2 < a.length &&
      a[n + intSeats + 1].childNodes.length &&
      a[n + intSeats + 2].childNodes.length &&
      a[n + intSeats + 1].childNodes[0].src.match(/1_1/gi) &&
      a[n + intSeats + 2].childNodes[0].src.match(/1_2/gi)
    )
      return;
  }
  if (r[1]) {
    if (
      2 <= n &&
      a[n].childNodes.length &&
      a[n - 1].childNodes.length &&
      a[n].childNodes[0].src.match(/1_1/gi) &&
      a[n - 1].childNodes[0].src.match(/1_4/gi)
    )
      return;
    if (
      n + intSeats + 2 < a.length &&
      a[n + intSeats + 1].childNodes.length &&
      a[n + intSeats + 2].childNodes.length &&
      a[n + intSeats + 1].childNodes[0].src.match(/1_1/gi) &&
      a[n + intSeats + 2].childNodes[0].src.match(/1_4/gi)
    )
      return;
  }
  if (r[2]) {
    if (
      0 < n &&
      0 != a[n].childNodes.length &&
      a[n].childNodes[0].src.match(/1_1/gi) &&
      (0 == a[n - 1].childNodes.length ||
        null != a[n - 1].childNodes[0].nodeValue)
    )
      return;
    if (
      !(n + intSeats >= a.length - 1) &&
      !(
        n + intSeats + 1 < a.length &&
        0 == a[n + intSeats + 1].childNodes.length
      ) &&
      a[n + intSeats + 1].childNodes[0].src.match(/1_1/gi)
    ) {
      if (n + intSeats + 1 >= a.length - 1) return;
      if (
        n + intSeats + 2 < a.length &&
        0 == a[n + intSeats + 2].childNodes.length
      )
        return;
    }
  }
  try {
    if (
      "NCET" == glBT.SVC ||
      "NCGT" == glBT.SVC ||
      "NCEX" == glBT.SVC ||
      "NCTT" == glBT.SVC ||
      "NCJB" == glBT.SVC
    )
      for (s = 0; s < t.parentNode.childNodes.length; s++) {
        var d = t.parentNode.childNodes[s];
        if (
          d.id == t.id &&
          ((e = !0),
          $("#" + d.id + " > a").addClass("_selected"),
          aSS.push(d.id),
          (SS += d.id + "|"),
          (blnSeatsSelected = !0),
          0 < e && 0 < intSeats)
        ) {
          if (!d.id) break;
          $("#" + d.id + " > a").addClass("_selected"), o--, intSeats--;
          break;
        }
      }
    else
      for (s = 0; s < t.parentNode.childNodes.length; s++)
        if (
          (d = t.parentNode.childNodes[s]).id != t.id ||
          -1 != $.inArray(d.id, aSS)
        ) {
          if (0 < e && 0 < intSeats) {
            if (!d.id) break;
            -1 !== $.inArray(glBT.SEC, arrEventCodeForSeatIcon)
              ? $("#" + d.id + " > a").addClass("_selected _smiley")
              : $("#" + d.id + " > a").addClass("_selected"),
              -1 == aSS.indexOf(d.id) && (aSS.push(d.id), (SS += d.id + "|")),
              o--,
              intSeats--;
          }
        } else
          (e = !0),
            -1 !== $.inArray(glBT.SEC, arrEventCodeForSeatIcon)
              ? $("#" + d.id + " > a").addClass("_selected _smiley")
              : $("#" + d.id + " > a").addClass("_selected"),
            aSS.push(d.id),
            (SS += d.id + "|"),
            (blnSeatsSelected = !0),
            o--,
            intSeats--;
    var p = "Pay Rs." + curTicketsAmt;
    0 == intSeats
      ? ($("#subSeat,#btmsubSeat").text(p).show(),
        $("#subSeat").css("text-align", "center"),
        $(".__seat-action").show(),
        $("#Total").html("Rs." + curTicketsAmt),
        $(".__seat-action").show(),
        $("#subSeat,#btmsubSeat").text(p).show())
      : ($("#subSeat,#btmsubSeat").text("Proceed").hide(),
        $(".__seat-action").hide());
    var f = arrShowInfo.findIndex(function (e, t) {
        return (
          e.PriceCode ==
          $("#qty-sel #category-list")
            .find(".seat-category:checked")
            .attr("priceCode")
        );
      }),
      S =
        parseFloat(arrShowInfo[f].Price) *
        $("#layout ._available._selected").length;
    $("#STotal").html("Rs." + S),
      $("#STotal").parent().show(),
      (binIsLog = "" != BMS.Storage.isset({ name: "ld" })),
      BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM", "WN"], "Selected seat", {
        ProductID: glBT.SEC,
        "Event Type": "MT",
        "Event Name": strEventName,
        "Venue Name": strVenueName,
        "Venue group": glBT.SVC,
        "Seat selection place": "Events page callout",
        Appcode: global.strAppCode,
        Language: objSeatData.event ? objSeatData.event[0].language : "",
        "Is Logged in": binIsLog,
        "App Language": BMS.Storage.isset({ name: "lang" })
          ? BMS.Storage.get({ name: "lang" })
          : "eng",
        Genre: getGenre ? getGenre() : "",
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "selectSeats", fnParams: t, err: e });
  }
}
function showEventCensor() {
  try {
    -1 < ["UA", "(U/A)"].indexOf(strEventSen)
      ? $("#sen_ua").css("display", "inline-block")
      : "U" == strEventSen
      ? $("#sen_u").css("display", "inline-block")
      : "A" == strEventSen
      ? $("#sen_a").css("display", "inline-block")
      : (strEventSen = "");
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "showEventCensor", err: e });
  }
}
function checkCoupleSeat1(e, t, a) {
  try {
    var o = !1,
      n = !1;
    if (void 0 !== ObjGroupSeats[e] && void 0 !== ObjGroupSeats[e][t])
      for (var s in ObjGroupSeats[e][t])
        for (
          var r = ObjGroupSeats[e][t][s].SeatId.split("~"), i = 0;
          i < r.length;
          i++
        )
          r[i].split("^")[1] == a && (n = !0);
    if (!n) return !0;
    if (void 0 !== ObjGroupSeats[e] && void 0 !== ObjGroupSeats[e][t])
      for (var s in ObjGroupSeats[e][t])
        for (
          r = ObjGroupSeats[e][t][s].SeatId.split("~"), i = 0;
          i < r.length;
          i++
        )
          if (0 == i) {
            if (
              r[i].split("^")[1] == a &&
              parseInt($("#intQty").text(), 10) - aSS.length >=
                ObjGroupSeats[e][t][s].HwManySeater
            ) {
              o = !0;
              break;
            }
          } else r[i].split("^")[1] == a && (o = !0);
    return o;
  } catch (e) {
    void 0;
  }
}
function gAS(t) {
  try {
    for (
      var e, a = 0, o = new Array(), o = glBT.seats.split("|"), n = 0;
      n < o.length;
      n++
    )
      if ((e = o[n].split("-"))[0] == t) {
        a = parseInt(e[1]);
        break;
      }
    for (n = 0; n < aSS.length; n++) isStInA(aSS[n], t) && a--;
    return a;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "gAS", fnParams: t, err: e });
  }
  return 0;
}
function isStInA(t, a) {
  try {
    if (t.split("_")[0] == a) return !0;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "isStInA", fnParams: t + "," + a, err: e });
  }
  return !1;
}
function fSL(t) {
  try {
    new Array();
    var e = new Array(),
      a = new Array(),
      o = (new Array(), new Array()),
      n = "",
      s = "",
      n = t.split("||")[0],
      s = t.split("||")[1];
    (arrTA = n.split("|")), (prices = []);
    for (var r = 0; r < arrTA.length; r++) {
      var a = new Array(),
        i = arrTA[r].split(":");
      a.push(i[1]),
        a.push(i[2]),
        a.push(i[3]),
        a.push(i[0]),
        a.push(i[4]),
        a.push(i[5]),
        aAreas.push(a);
      var l = i[2],
        c = arrShowInfo.find(function (e) {
          return e.AreaCatCode == l;
        });
      prices[l] = parseFloat(c.Price).toFixed(2);
    }
    if (1 <= arrTA.length && isCoupleSeats)
      for (var d = 0; d < arrTA.length; d++)
        6 < arrTA[d].split(":").length && fnGroupSeatData(arrTA[d].split(":"));
    for (e = s.split("|"), d = 0; d < e.length; d++)
      if ("" != e[d]) {
        for (var o = new Array(), p = e[d].split(":"), f = 0; f < p.length; f++)
          o.push(p[f]);
        aRows.push(o);
      }
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fSL", fnParams: t, err: e });
  }
}
function fnGroupDataPartial(e) {
  try {
    for (var t = 0, a = 0; a < e.length; a++)
      for (var o = e[a].split(":"), n = 6; n < o.length; n++) {
        var s,
          r,
          i = o[1];
        -1 != o[n].indexOf("~") &&
          (6 == n && void 0 === ObjGroupSeats[i] && (ObjGroupSeats[i] = {}),
          (s = $.trim(o[n].split("~")[0])),
          (r = $.trim(o[n].split("~")[1])),
          s.split("^")[0] != r.split("^")[0]
            ? (void 0 ===
                ObjGroupSeats[i][s.split("^")[0] + "^" + r.split("^")[0]] &&
                (ObjGroupSeats[i][s.split("^")[0] + "^" + r.split("^")[0]] =
                  {}),
              (ObjGroupSeats[i][s.split("^")[0] + "^" + r.split("^")[0]][t] =
                {}),
              (ObjGroupSeats[i][s.split("^")[0] + "^" + r.split("^")[0]][
                t
              ].SeatId = {}),
              (ObjGroupSeats[i][s.split("^")[0] + "^" + r.split("^")[0]][
                t
              ].HwManySeater = {}),
              (ObjGroupSeats[i][s.split("^")[0] + "^" + r.split("^")[0]][
                t
              ].SeatId = o[n]),
              (ObjGroupSeats[i][s.split("^")[0] + "^" + r.split("^")[0]][
                t
              ].HwManySeater = o[n].split("~").length))
            : (void 0 === ObjGroupSeats[i][s.split("^")[0]] &&
                (ObjGroupSeats[i][s.split("^")[0]] = {}),
              (ObjGroupSeats[i][s.split("^")[0]][t] = {}),
              (ObjGroupSeats[i][s.split("^")[0]][t].SeatId = {}),
              (ObjGroupSeats[i][s.split("^")[0]][t].HwManySeater = {}),
              (ObjGroupSeats[i][s.split("^")[0]][t].SeatId = o[n]),
              (ObjGroupSeats[i][s.split("^")[0]][t].HwManySeater =
                o[n].split("~").length)),
          (t += 1));
      }
  } catch (e) {
    void 0;
  }
}
function gAC(t) {
  try {
    for (var e = 0; e < aAreas.length; e++)
      if (aAreas[e][0] == t) return aAreas[e][1];
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "gAC", fnParams: t, err: e });
  }
}
function fnErrSSelSeats(t) {
  try {
    var a = $("#error-div .errbtns a"),
      o = $("#error-div .__dismiss"),
      n = a.attr("href");
    o.hide(),
      a.attr("href", "javascript:;").click(function (e) {
        fnSelSh(e, glBT.SVC, glBT.SSID, glBT.SEC, glBT.SST, objSeatData, !0),
          BMS.Modal.fnHideModal(),
          setTimeout(function () {
            a.attr("href", n), o.show();
          }, 20);
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnErrSSelSeats", fnParams: t, err: e });
  }
}
function fnCanTr() {
  try {
    (fnb_banners = []),
      handlePopups.releaseDocument(),
      BMS.Misc.fnBusy(!0),
      $("html").removeClass("no-scroll"),
      $("#seat-layout").hide(),
      $("#bksmile").hide(),
      $("body").removeClass("_fixed"),
      $("body").css("margin-top", "0"),
      $("#prePay").attr("onclick", "fnPrePay()"),
      $("#prePay-fnb").attr("onclick", "fnPrePay()"),
      $("#order-proceed").addClass("order-active"),
      $("#prePay-fnb").hide(),
      BMS.Storage.set({ name: "ReserSeatCall", value: "Y", storage: "C" }),
      $(".fnb-offer-banner").hasClass("slick-initialized") &&
        $(".fnb-offer-banner").slick("unslick");
    var e = BMS.Storage.get({ name: "lngTransId", value: "" });
    BMS.Misc.fnDoTrans({
      AppC: global.strAppCode,
      venCode: glBT.SVC,
      transId: e,
      cmd: "CANCELTRANS",
      blnSupp: !0,
      p1: "webuser",
      p2: "",
      p3: "seat-layout-fn-can-tr",
      p4: "",
      p5: "",
      p6: "",
      p7: "",
      p8: "",
      p9: "",
      p10: "",
      fnCC: fneSc,
      fnEC: fneSc,
    }),
      newShowtime && (BMS.Misc.fnBusy(!0), window.history.go(-1));
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnCanTr", err: e });
  }
}
function fnCnCl() {
  try {
    $("#seat-layout").hide();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnCnCl", err: e });
  }
}
function fneSc() {
  try {
    BMS.Misc.fnBusy(!1),
      BMS.Storage.del({ name: "lngTransId" }),
      BMS.Storage.del({ name: "BOOKINGID" }),
      BMS.Storage.del({ name: "merc" }),
      bindErrorCloseClick();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fneSc", err: e });
  }
}
function chkMer() {
  try {
    (aMer = !1),
      (merId = 0),
      ($("mer1").checked || $("mer2").checked) &&
        ((aMer = !0),
        $("mer1").checked ? (merId = 1) : $("mer2").checked && (merId = 2)),
      setDisp("dHung", !1);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: arguments.callee.name, err: e });
  }
}
function fnsubSetSeats() {
  try {
    handlePopups.releaseDocument(),
      1 == valSelSts() &&
        ((blnSeats = !0),
        clSL(),
        sSelSts(SS),
        $("#subSeat,#btmsubSeat").hide(),
        $(".__seat-action").hide(),
        $("#btnseatdisab").show());
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: arguments.callee.name,
      fnParams: arguments,
      err: e,
    });
  }
}
function valSelSts() {
  try {
    return glBT.TQ > aSS.length ? !1 : !0;
  } catch (e) {
    return BMS.Misc.fnErr({ fnName: "valSelSts", err: e }), !1;
  }
}
function clSL() {
  try {
    glBT.TQ;
    if (0 == blnSeats) return;
    $("#tblSeatLayout").hide();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "clSL", err: e });
  }
}
function sSelSts(t) {
  try {
    (t = "|" + t),
      (t = strReplace((t = "|" + glBT.TQ + t), "_", "|")),
      BMS.Misc.fnBusy(!0),
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: lngTransId,
        cmd: "SETSELECTEDSEATS",
        p1: glBT.SSID,
        p2: t,
        fnCC: fnuSI,
        fnEC: fnErrSSelSeats,
      }),
      pushSeatQuantiyToAnalytics();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "sSelSts", fnParams: t, err: e });
  }
}
var glStateCode = "";
function fnSubmitGSTStateChange() {
  try {
    var e = $("#gst-state-list input[type=checkbox]:checked").attr("id").trim();
    if (!e || glStateCode == e)
      return void BMS.Misc.modal("gst-state-list", !1);
    fnUpdateGSTState(e);
  } catch (e) {
    void 0;
  }
}
function fnUpdateGSTState(e) {
  try {
    BMS.Misc.fnBusy(!0);
    var t = "|GSTTOSTATE=" + e + "|";
    BMS.Misc.fnDoTrans({
      AppC: global.strAppCode,
      venCode: glBT.SVC,
      transId: lngTransId,
      cmd: "UPDATETRANSDETAILS",
      p1: "",
      p2: "",
      p3: t,
      p4: "",
      p5: "",
      p6: "",
      p7: "",
      p8: "",
      p9: "",
      p10: "",
      fnCC: function () {
        fnGetUpdatedBookingInfo(!0);
      },
      fnEC: fnCanTr,
    });
  } catch (e) {
    void 0;
  }
}
function fnGetUpdatedBookingInfo(t) {
  try {
    (t = void 0 !== t && t),
      BMS.Misc.fnWsData({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: lngTransId,
        cmd: "GETBOOKINGINFOEX",
        eventType: "MT",
        evtCode: glBT.SEC,
        sessId: glBT.SSID,
        data: escape("|TRANSID=" + lngTransId + "|BOOKINGID=|UID=" + uid + "|"),
        retType: "json",
        fnCC: function (e) {
          fnuOS(e, t);
        },
        fnEC: fnCanTr,
      }),
      BMS.Misc.modal("gst-state-list", !1);
  } catch (e) {
    void 0;
  }
}
var glOneClickStateCode = "";
function fnOnclickUpdateTrans(e) {
  try {
    if (!e || glOneClickStateCode == e) return void fnChangeOneClickState();
    BMS.Misc.fnBusy(!0);
    var t = "|GSTTOSTATE=" + e + "|";
    BMS.Misc.fnDoTrans({
      AppC: global.strAppCode,
      venCode: glBT.SVC,
      transId: lngTransId,
      cmd: "UPDATETRANSDETAILS",
      p1: "",
      p2: "",
      p3: t,
      p4: "",
      p5: "",
      p6: "",
      p7: "",
      p8: "",
      p9: "",
      p10: "",
      fnCC: fnOneClickGetBookingInfoEx,
      fnEC: fnCanTr,
    });
  } catch (e) {
    void 0;
  }
}
function fnOneClickGetBookingInfoEx() {
  try {
    BMS.Misc.fnWsData({
      AppC: global.strAppCode,
      venCode: glBT.SVC,
      transId: lngTransId,
      cmd: "GETBOOKINGINFOEX",
      eventType: "MT",
      evtCode: glBT.SEC,
      sessId: glBT.SSID,
      data: escape("|TRANSID=" + lngTransId + "|BOOKINGID=|UID=" + uid + "|"),
      retType: "json",
      fnCC: fnOneClickPayCheck,
      fnEC: fnCanTr,
    }),
      fnChangeOneClickState();
  } catch (e) {
    void 0;
  }
}
function fnChangeGSTState() {
  try {
    $("#gst-state-list .state-search-input-box").val("").focus(),
      $("#gst-state-list .region-list .region-detail").show(),
      0 < $("#gst-state-list .no-results").length &&
        $("#gst-state-list .no-results").remove(),
      BMS.Modal.fnShowModal("gst-state-list");
  } catch (e) {
    void 0;
  }
}
function fnChangeOneClickState() {
  try {
    $(".breakdown_outer .gst_selection #gst-oneclick-search").val("").focus(),
      $(
        ".breakdown_outer .gst_selection .state_list,.breakdown_outer .gst_selection .state_list li"
      ).show(),
      $(".breakdown_outer .gst_selection .state_list .no-results").remove(),
      $(".breakdown_outer .gst_selection .gst_state_list").toggle();
  } catch (e) {
    void 0;
  }
}
function pushSeatQuantiyToAnalytics() {
  (binIsLog = "" != BMS.Storage.isset({ name: "ld" })),
    BMS.Misc.fnPushEventDataToAnalytics(
      ["WR", "KM", "WN"],
      "Selected quantity",
      {
        ProductID: glBT.SEC,
        "Event Type": "MT",
        "Event Name": strEventName,
        "Venue Name": strVenueName,
        "Venue Code": glBT.SVC,
        "Quantity selected": parseInt(glBT.TQ),
        "Quantity selection place": "Movies on clicking quantity",
        "Is Logged in": binIsLog,
        Category: "" != strSeatInfo ? strSeatInfo.split("-")[0] : "",
        Appcode: global.strAppCode,
        Language: objSeatData.event ? objSeatData.event[0].language : "",
        "App Language": BMS.Storage.get({ name: "lang" })
          ? BMS.Storage.get({ name: "lang" })
          : "eng",
        Genre: getGenre ? getGenre() : "",
      }
    );
}
function strReplace(t, a, o) {
  try {
    for (; 0 < t.search(a); ) t = t.replace(a, o);
    return t;
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: "strReplace",
      fnParams: t + "," + a + "," + o,
      err: e,
    });
  }
  return t;
}
function fnuSI() {
  try {
    $("#FLDonation").prop("checked", !1),
      0 < $("#spnSmile").length &&
        1 <= glBT.TQ &&
        ((qty = Math.min(glBT.TQ, 5)),
        $("#spnSmile").html(1 < qty ? "Rs. " + qty : "Re. " + qty)),
      fnGetGSTStateList();
    var e = BMS.Storage.get({ name: "ld", key: "LSID", defVal: "" }),
      t = BMS.Storage.get({ name: "ld", key: "MEMBERID", defVal: "" }),
      a = BMS.Storage.get({ name: "ld", key: "MEMBEREMAIL", defVal: "" }),
      o = BMS.Storage.get({ name: "ld", key: "MOBILE", defVal: "" }),
      n = {};
    o && (n["x-phone"] = o),
      e && (n["x-lsid"] = e),
      t && (n["x-member-id"] = t),
      a && (n["x-email"] = a),
      fnGetSeatlayoutActivity({
        vCode: glBT.SVC,
        sId: glBT.SSID,
        etCode: glBT.SEC,
        landed: !1,
      }),
      BMS.Misc.fnWsData({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: lngTransId,
        cmd: "GETBOOKINGINFOEX",
        eventType: "MT",
        evtCode: glBT.SEC,
        sessId: glBT.SSID,
        headers: n,
        data: escape("|TRANSID=" + lngTransId + "|BOOKINGID=|UID=" + uid + "|"),
        retType: "json",
        fnCC: fnuOS,
        fnEC: fnCanTr,
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnuSI", err: e });
  }
}
var sTot = "";
function fnuOS(t, e) {
  try {
    e = void 0 !== e && e;
    var a = "";
    void 0 !== t && "" != t && crBkInfoJsonObj(t);
    var o = e && 0 < cntFC;
    o || ((CntObj = {}), (cntFC = 0), (fcDetails = "")),
      $(":radio").prop("checked", !1),
      $(".ticket-type-container .tt-block").removeClass("_active"),
      null != $("div.__text._prices-text._highlighted").html() &&
        (a = $("div.__text._prices-text._highlighted").html());
    var n = objBookingInfoData.SessionOrder[0].Event_strName,
      s = objBookingInfoData.SessionOrder[0].Venue_strCode,
      r = objBookingInfoData.SessionOrder[0].Venue_strName,
      i =
        (objBookingInfoData.SessionOrder[0].Order_dtmShowTime,
        objBookingInfoData.SessionOrder[0].Order_dtmShowDate,
        parseInt(objBookingInfoData.SessionOrder[0].Order_intQuantity)),
      l = objBookingInfoData.SessionOrder[0].Order_strSeatInfo;
    scnAudi = objBookingInfoData.SessionOrder[0].Screen_strName;
    parseFloat(objBookingInfoData.SessionOrder[0].Ticket_mnyPrice).toFixed(2);
    var c = parseFloat(
        objBookingInfoData.Summary[0].Order_mnyTicketsTotal
      ).toFixed(2),
      d = parseInt(objBookingInfoData.SessionOrder[0].Order_intQuantity);
    (d += 1 == d ? " Ticket" : " Tickets"),
      (sTot = objBookingInfoData.Summary[0].Order_strSubTotal);
    var p,
      f = objBookingInfoData.Summary[0].Order_strTicketsBookingFee,
      S =
        (objBookingInfoData.Summary[0].Order_mnyTicketsBookingFee,
        objBookingInfoData.Summary[0].Order_mnyTotal,
        o
          ? global.strCurrencyCode +
            " " +
            (
              parseFloat(objBookingInfoData.Summary[0].Order_mnyTotal) +
              parseFloat(TotalFNBAmount)
            ).toFixed(2)
          : objBookingInfoData.Summary[0].Order_strTotal),
      h = objBookingInfoData.Summary[0].Order_strSubTotal,
      u = objBookingInfoData.Summary[0].AdditionalC_strDescription;
    (0 < parseFloat(objBookingInfoData.Summary[0].Order_mnyTicketsBookingFee) ||
      0 < objBookingInfoData.AddChgs.length) &&
      ((glStateCode = objBookingInfoData.Summary[0].Order_strToStateCode),
      (p = $('#gst-state-list label[for="' + glStateCode + '"]')),
      $("#gst-str-state").html(
        objBookingInfoData.Summary[0].Order_strToStateName
      ),
      p.length && p.click(),
      $("#gstCurrentStateId,#gstOneClickStateId").show());
    var g,
      m = "";
    0 < parseFloat(objBookingInfoData.Summary[0].Order_mnyTicketsBookingFee) &&
      ((g = ""),
      (g += "<ul>"),
      void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFBaseAmount &&
        "" !== objBookingInfoData.Summary[0].Order_strTicketBFBaseAmount &&
        ((g += "<li>"),
        (g += "<span>Base Amount</span>"),
        (g +=
          "<span>" +
          objBookingInfoData.Summary[0].Order_strTicketBFBaseAmount +
          "</span>"),
        (g += "</li>")),
      void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax1Desc &&
        void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax1 &&
        "" !== objBookingInfoData.Summary[0].order_Order_strTicketBFTax1Desc &&
        "" !== objBookingInfoData.Summary[0].Order_strTicketBFTax1 &&
        ((g += "<li>"),
        (g +=
          "<span>" +
          objBookingInfoData.Summary[0].Order_strTicketBFTax1Desc +
          "</span>"),
        (g +=
          "<span>" +
          objBookingInfoData.Summary[0].Order_strTicketBFTax1 +
          "</span>"),
        (g += "</li>")),
      void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax2 &&
        void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax2Desc &&
        "" !== objBookingInfoData.Summary[0].Order_strTicketBFTax2 &&
        "" != objBookingInfoData.Summary[0].Order_strTicketBFTax2Desc &&
        ((g += "<li>"),
        (g +=
          "<span>" +
          objBookingInfoData.Summary[0].Order_strTicketBFTax2Desc +
          "</span>"),
        (g +=
          "<span>" +
          objBookingInfoData.Summary[0].Order_strTicketBFTax2 +
          "</span>"),
        (g += "</li>")),
      void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax3 &&
        void 0 !== objBookingInfoData.Summary[0].Order_strTicketBFTax3Desc &&
        "" !== objBookingInfoData.Summary[0].Order_strTicketBFTax3 &&
        "" !== objBookingInfoData.Summary[0].Order_strTicketBFTax3Desc &&
        ((g += "<li>"),
        (g +=
          "<span>" +
          objBookingInfoData.Summary[0].Order_strTicketBFTax3Desc +
          "</span>"),
        (g +=
          "<span>" +
          objBookingInfoData.Summary[0].Order_strTicketBFTax3 +
          "</span>"),
        (g += "</li>")),
      (g += "</ul>"),
      $("#intHandlingFeeBreakdown").html(g));
    var b = "";
    if (
      ("Y" == objBookingInfoData.SessionOrder[0].Order_strShowTicketTaxSplitup
        ? ((b += "<ul>"),
          void 0 !== objBookingInfoData.SessionOrder[0].Order_mnyBasePrice &&
            "" !== objBookingInfoData.SessionOrder[0].Order_mnyBasePrice &&
            0 !=
              parseFloat(
                objBookingInfoData.SessionOrder[0].Order_mnyBasePrice
              ) &&
            ((b += "<li>"),
            (b += "<span>Ticket Base Price</span>"),
            (b +=
              "<span>Rs. " +
              parseFloat(
                objBookingInfoData.SessionOrder[0].Order_mnyBasePrice
              ).toFixed(2) +
              "</span>"),
            (b += "</li>")),
          void 0 !==
            objBookingInfoData.SessionOrder[0].Order_strTicketTax1Desc &&
            void 0 !== objBookingInfoData.SessionOrder[0].Order_strTicketTax1 &&
            "" !==
              objBookingInfoData.SessionOrder[0]
                .order_Order_strTicketTax1Desc &&
            "" !== objBookingInfoData.SessionOrder[0].Order_strTicketTax1 &&
            0 !=
              parseFloat(
                objBookingInfoData.SessionOrder[0].Order_mnyTicketTax1
              ) &&
            ((b += "<li>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_strTicketTax1Desc +
              "</span>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_strTicketTax1 +
              "</span>"),
            (b += "</li>")),
          void 0 !== objBookingInfoData.SessionOrder[0].Order_strTicketTax2 &&
            void 0 !==
              objBookingInfoData.SessionOrder[0].Order_strTicketTax2Desc &&
            "" !== objBookingInfoData.SessionOrder[0].Order_strTicketTax2 &&
            "" != objBookingInfoData.SessionOrder[0].Order_strTicketTax2Desc &&
            0 !=
              parseFloat(
                objBookingInfoData.SessionOrder[0].Order_mnyTicketTax2
              ) &&
            ((b += "<li>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_strTicketTax2Desc +
              "</span>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_strTicketTax2 +
              "</span>"),
            (b += "</li>")),
          void 0 !== objBookingInfoData.SessionOrder[0].Order_strTicketTax3 &&
            void 0 !==
              objBookingInfoData.SessionOrder[0].Order_strTicketTax3Desc &&
            "" !== objBookingInfoData.SessionOrder[0].Order_strTicketTax3 &&
            "" != objBookingInfoData.SessionOrder[0].Order_strTicketTax3Desc &&
            0 !=
              parseFloat(
                objBookingInfoData.SessionOrder[0].Order_mnyTicketTax3
              ) &&
            ((b += "<li>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_strTicketTax3Desc +
              "</span>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_strTicketTax3 +
              "</span>"),
            (b += "</li>")),
          void 0 !== objBookingInfoData.SessionOrder[0].Order_strTicketTax4 &&
            void 0 !==
              objBookingInfoData.SessionOrder[0].Order_strTicketTax4Desc &&
            "" !== objBookingInfoData.SessionOrder[0].Order_strTicketTax4 &&
            "" != objBookingInfoData.SessionOrder[0].Order_strTicketTax4Desc &&
            0 !=
              parseFloat(
                objBookingInfoData.SessionOrder[0].Order_mnyTicketTax4
              ) &&
            ((b += "<li>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_strTicketTax4Desc +
              "</span>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_strTicketTax4 +
              "</span>"),
            (b += "</li>")),
          void 0 !== objBookingInfoData.SessionOrder[0].Order_mny3DCharges &&
            void 0 !==
              objBookingInfoData.SessionOrder[0].Order_str3DChargesDesc &&
            "" !== objBookingInfoData.SessionOrder[0].Order_mny3DCharges &&
            "" !== objBookingInfoData.SessionOrder[0].Order_str3DChargesDesc &&
            0 !=
              parseFloat(
                objBookingInfoData.SessionOrder[0].Order_mny3DCharges
              ) &&
            ((b += "<li>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_str3DChargesDesc +
              "</span>"),
            (b +=
              "<span>" +
              objBookingInfoData.SessionOrder[0].Order_str3DCharges +
              "</span>"),
            (b += "</li>")),
          (b += "</ul>"),
          $("#HandlingGstChenFeeBreakdown").html(b),
          $("#naGstBrkp").addClass("__active"))
        : ($("#HandlingGstChenFeeBreakdown").hide(),
          $("#naGstBrkp").removeClass("__active"),
          $("#naGstBrkp .__up-icon").hide()),
      (l += "<span id='TickQuantity'> ( " + d + " )</span>"),
      $("#basCheckbox").unbind("change"),
      $("#web_food_and_beverages").html("").hide(),
      $(".ticket-desc").hide(),
      $("#no_seat").hide(),
      $("#btn-paylater").hide(),
      $("#btn-btm-paylater").hide(),
      $("#evcomp").hide(),
      $("#seatlayoutbox, .showtime-section").hide(),
      $("#TickCat").html(l),
      $("#seatPri").html("Rs. " + c),
      $("#bkPri").html("Rs. " + c),
      $("#subTT").html(h),
      $("#bkfee").html(f),
      $("#basPrice").html("Rs. 0"),
      $(".txt_brkp").html(u),
      $("#ttPrice").html(S),
      $("#ttPrice-cart").html(S),
      $("#audiInfo").html(scnAudi),
      $("#OffDis").text("").hide(),
      $("html").addClass("no-scroll"),
      global.blnIsTouchScreen && $("#total-item-counter").html("(" + d + ")"),
      "" != objBookingInfoData.Summary[0].Order_strDiscountText &&
        $("#OffDis")
          .text(objBookingInfoData.Summary[0].Order_strDiscountText)
          .show(),
      "Y" == arrShowInfo[0].VenueHasETicket
        ? ($("#TickType h2").text("SELECT TICKET TYPE"),
          "Y" == arrShowInfo[0].strHasMTTicket
            ? ($("#TickType").css("display", "inline-block"),
              $("#shbox").show(),
              $("#shmticket").show(),
              dispTicketType("#shmticket"),
              $("#sheticket").hide())
            : ($("#TickType").css("display", "inline-block"),
              $("#shbox").show(),
              $("#sheticket").show(),
              $("#shmticket").hide()),
          o || ($("#prePay").hide(), $("#prePay-fnb").hide()))
        : ($("#TickType").hide(), $("#prePay").show(), $("#prePay-fnb").show()),
      "Y" === objBookingInfoData.SessionOrder[0].DisableBoxOfficePickup &&
        ($("#shmticket").css("width", "100%"), $("#shbox").hide()),
      global.blnIsTouchScreen && $(".mticketwrap").hide(),
      $("#OSTikAmt, #OSBKFee").show(),
      -1 != $.inArray(s, glBT.arrNoPriceVenues) &&
        $("#OSTikAmt, #OSBKFee").hide(),
      $("#dOSNoPrice").hide(),
      -1 != $.inArray(s, glBT.arrNoPriceVenues) && $("#dOSNoPrice").show(),
      0 <= r.indexOf("INOX") ? $("#inoxnotes").show() : $("#inoxnotes").hide(),
      $("#dPrithviNotes").hide(),
      -1 != $.inArray(s, ["PTHV"]) && $("#dPrithviNotes").show(),
      $("#dPrasadsLargeNotImax").hide(),
      glBT.SVC && "PRHY" == glBT.SVC && $("#dPrasadsLargeNotImax").show(),
      0 == objBookingInfoData.AddChgs.length)
    )
      $("#dOtherCharges").hide();
    else {
      for (var C = 0; C < objBookingInfoData.AddChgs.length; C++)
        (m += "<div class='otherChargesContainer'><p>"),
          (m +=
            "<span class='__up-icon up-icon-tax' onclick=\"showTaxBreakup('show', this)\">"),
          (m +=
            "<svg width='100%' height='100%' version='1.1' xmlns='//www.w3.org/2000/svg' xmlns:xlink='//www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 100 100' xml:space='preserve'>"),
          (m +=
            "<use xlink:href='/icons/fnb-icons.svg#icon-downwards'></use></svg>"),
          (m += "</span>"),
          (m +=
            "<span class='__down-icon down-icon-tax' onclick=\"showTaxBreakup('hide', this)\" style=\"display:none;\">"),
          (m +=
            "<svg width='100%' height='100%' version='1.1' xmlns='//www.w3.org/2000/svg' xmlns:xlink='//www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 100 100' xml:space='preserve'>"),
          (m +=
            "<use xlink:href='/icons/fnb-icons.svg#icon-dropdown'></use></svg>"),
          (m += "</span>"),
          (m +=
            "<span> " +
            objBookingInfoData.AddChgs[C].AdditionalCharge_strDescription +
            ": </span></p>"),
          (m += "</div>"),
          (m +=
            "<div><span>" +
            objBookingInfoData.AddChgs[C].AdditionalCharge_mnyAmount +
            "</span></div>"),
          (m += '<div class="__breakdown">'),
          (m += "<ul>"),
          "" != objBookingInfoData.AddChgs[C].AdditionalCharge_mnyBaseAmount &&
            0 <
              parseFloat(
                objBookingInfoData.AddChgs[C].AdditionalCharge_mnyBaseAmount
              ) &&
            ((m += "<li>"),
            (m +=
              "<span>" +
              objBookingInfoData.AddChgs[C].AdditionalCharge_strDescription +
              "</span>"),
            (m +=
              "<span>" +
              global.strCurrencyCode +
              objBookingInfoData.AddChgs[C].AdditionalCharge_mnyBaseAmount +
              "</span>"),
            (m += "</li>")),
          "" != objBookingInfoData.AddChgs[C].AdditionalCharge_mnyTax1 &&
            0 <
              parseFloat(
                objBookingInfoData.AddChgs[C].AdditionalCharge_mnyTax1
              ) &&
            ((m += "<li>"),
            (m +=
              "<span>" +
              objBookingInfoData.AddChgs[C].Tax1_strDescription +
              "</span>"),
            (m +=
              "<span>" +
              global.strCurrencyCode +
              objBookingInfoData.AddChgs[C].AdditionalCharge_mnyTax1 +
              "</span>"),
            (m += "</li>")),
          "" != objBookingInfoData.AddChgs[C].AdditionalCharge_mnyTax2 &&
            0 <
              parseFloat(
                objBookingInfoData.AddChgs[C].AdditionalCharge_mnyTax2
              ) &&
            ((m += "<li>"),
            (m +=
              "<span>" +
              objBookingInfoData.AddChgs[C].Tax2_strDescription +
              "</span>"),
            (m +=
              "<span>" +
              global.strCurrencyCode +
              objBookingInfoData.AddChgs[C].AdditionalCharge_mnyTax2 +
              "</span>"),
            (m += "</li>")),
          "" != objBookingInfoData.AddChgs[C].AdditionalCharge_mnyTax3 &&
            0 <
              parseFloat(
                objBookingInfoData.AddChgs[C].AdditionalCharge_mnyTax3
              ) &&
            ((m += "<li>"),
            (m +=
              "<span>" +
              objBookingInfoData.AddChgs[C].Tax3_strDescription +
              "</span>"),
            (m +=
              "<span>" +
              global.strCurrencyCode +
              objBookingInfoData.AddChgs[C].AdditionalCharge_mnyTax3 +
              "</span>"),
            (m += "</li>")),
          (m += "</ul>"),
          (m += "</div>"),
          (m += "</div>");
      $("#dOtherCharges").html(m), $("#dOtherCharges").show();
    }
    (CpnDetails = ""),
      (IscpnAvl = "No"),
      $("#cpnDeta").html(""),
      $("#cpnDeta").parent().hide(),
      $("#cpnfdd").parent().hide(),
      BMS.Misc.fnPushEventDataToAnalytics(
        ["GA"],
        "",
        {},
        {
          event: "addToCart",
          ecommerce: {
            currencyCode: "INR",
            add: {
              products: [
                {
                  name: objBookingInfoData.SessionOrder[0].Event_strName,
                  id: objBookingInfoData.SessionOrder[0].Event_strCode,
                  price: parseInt(
                    objBookingInfoData.SessionOrder[0].Price_curPrice,
                    10
                  ),
                  brand: "",
                  category: "Movie",
                  variant: strEvtMsg + "" + strEventLan,
                  quantity:
                    objBookingInfoData.SessionOrder[0].Order_intQuantity,
                  dimension13:
                    objBookingInfoData.SessionOrder[0].Event_strLanguage,
                  dimension14:
                    objBookingInfoData.SessionOrder[0].Order_dtmShowStamp,
                  dimension15:
                    BMS.Storage.get({ name: "Rgn", key: "Code" }) +
                    "|" +
                    objBookingInfoData.SessionOrder[0].Order_dtmShowTime +
                    "|" +
                    a +
                    "| PRESSED",
                  dimension16: "",
                  dimension17:
                    objBookingInfoData.SessionOrder[0].Order_strSeatData,
                  dimension18:
                    objBookingInfoData.SessionOrder[0].Venue_strShortName,
                  "Coupons Selected": IscpnAvl,
                },
              ],
            },
          },
        }
      ),
      0 == objBookingInfoData.AddChgs.length &&
      parseInt(objBookingInfoData.Summary[0].Order_strTicketBFBaseAmount, 10) <=
        0
        ? $(".txtServiceTaxShowHide").hide()
        : ($(".txtServiceTaxShowHide").show(),
          $(".order-summary").off("click", ".txtServiceTaxShowHide"),
          $(".order-summary").on(
            "click",
            ".txtServiceTaxShowHide",
            function () {
              var e = $(this).children().closest(".__show"),
                t = $(this).children().closest(".__hide"),
                a = $(".__breakdown");
              "block" == e.css("display")
                ? (t.show(), e.hide(), a.show())
                : (e.show(), t.hide(), a.hide());
            }
          ));
    var y = -1 < n.indexOf("3D");
    $("#dDynNotes, #dDynNotes > div").hide(),
      $("#dDynNotes > div").each(function () {
        var e = glBT.SVC + (y ? "-3D" : ""),
          t = $(this).attr("id");
        t == e && ($("#dDynNotes").show(), $("#dDynNotes > #" + t).show());
      }),
      $("#dChildNote3Yrs,#CPGR-3D").hide(),
      (-1 != $.inArray(s, ["FNAN", "FNCM", "GOLC"]) ||
        -1 < r.indexOf("Cinepolis") ||
        -1 < r.indexOf("Fun Cinemas")) &&
        $("#dChildNote3Yrs").show(),
      1 < n.indexOf("3D") &&
        -1 != $.inArray(s, ["GOLC"]) &&
        $("#CPGR-3D").show(),
      $("#funCinema").hide(),
      -1 != $.inArray(s, ["FNRC", "FNPP", "FNDB", "FNHY"]) &&
        1 < n.indexOf("3D") &&
        ($("#funCinema").show(), $("#d3DNoteOS").hide(), (blnHasPopupMsg = !0)),
      $("#muktaCinema").hide(),
      -1 != $.inArray(s, ["MACP", "MACR"]) &&
        1 < n.indexOf("3D") &&
        ($("#muktaCinema").show(),
        $("#d3DNoteOS").hide(),
        (blnHasPopupMsg = !0)),
      -1 != $.inArray(s, ["MAYJ", "ABIC"]) && $("#d3DNoteOS").hide(),
      $("#strDate").show(),
      global.blnIsTouchScreen &&
        ($(".__total-blk").hide(), $("#mobile-date-container").hide()),
      blnUnpaid
        ? (BMS.Misc.fnPushEventDataToAnalytics(
            ["WR", "KM", "WN"],
            "Viewed Order Summary",
            {
              ProductID: objBookingInfoData.SessionOrder[0].Event_strCode,
              "Event Type": objBookingInfoData.Summary[0].Event_strType,
              "Event Name": objBookingInfoData.SessionOrder[0].Event_strName,
              "Venue Name": objBookingInfoData.SessionOrder[0].Venue_strName,
              "Venue Code": objBookingInfoData.SessionOrder[0].Venue_strCode,
              "Quantity selected": parseInt(
                objBookingInfoData.SessionOrder[0].Order_intQuantity
              ),
              Category: objBookingInfoData.SessionOrder[0].Order_strSeatInfo,
              "Reserved a seat": "Yes",
              "Coupons Selected": IscpnAvl,
              Appcode: global.strAppCode,
            }
          ),
          $("#ordPayLat,#unpaNote").show(),
          $(".__total-blk").hide(),
          $("#bksmile").show(),
          $("#hdBksmile").hide(),
          $("#TickType").hide(),
          o || ($("#prePay,#spNote").hide(), $("#prePay-fnb").hide()),
          $(".touch-fnb-proceed").hide(),
          $("#payLat").show(),
          o || $("#fnbDiscount,#fnbTotal,#fdd").hide(),
          $("#FCDtl").html("").hide(),
          $("#cutMin").text(objBookingInfoData.Summary[0].UPCutOffShowTime),
          $(".cutTime").text(objBookingInfoData.Summary[0].UPCutOffShowTime),
          $(".rehTime").text(objBookingInfoData.Summary[0].UPCutOffShowTime),
          $(".cuthour").text(unpaid_CutOff_time),
          BMS.Misc.fnBusy(!1),
          setTimeout(function () {
            (wow.scroll = !0), wow.scrollHandler();
          }, 100),
          handlePopups.freezeDocument())
        : (BMS.Misc.fnPushEventDataToAnalytics(
            ["WR", "KM", "WN"],
            "Viewed Order Summary",
            {
              ProductID: objBookingInfoData.SessionOrder[0].Event_strCode,
              "Event Type": objBookingInfoData.Summary[0].Event_strType,
              "Event Name": objBookingInfoData.SessionOrder[0].Event_strName,
              "Venue Name": objBookingInfoData.SessionOrder[0].Venue_strName,
              "Venue Code": objBookingInfoData.SessionOrder[0].Venue_strCode,
              "Quantity selected": parseInt(
                objBookingInfoData.SessionOrder[0].Order_intQuantity
              ),
              Category: objBookingInfoData.SessionOrder[0].Order_strSeatInfo,
              "Reserved a seat": "No",
              "Coupons Selected": IscpnAvl,
              Appcode: global.strAppCode,
            }
          ),
          $("#ordPayLat,#unpaNote").hide(),
          $("#payLat").hide(),
          "Y" == arrShowInfo[0].VenueAllowFoodSales
            ? (o
                ? (fnShowAds(), BMS.Misc.fnBusy(!1))
                : fnGFC(glBT.SVC, glBT.SEC, ""),
              $("#PayTotal").text(S),
              $("#PayTotal").parent().show(),
              $("#prePay").addClass("__fnb-btn"))
            : (o || $("#fnbDiscount,#fnbTotal,#fdd").hide(),
              $("#FLDonation").prop("checked", !0),
              $(".bkf-order-summary-container").css("margin-top", "0px"),
              $("#seat-layout").show(),
              $("#evcomp").hide(),
              $("#bksmile").show(),
              $("#hdBksmile").show(),
              $("#BksmileOver").css("display", "block"),
              $("#DT_Chandigarh").hide(),
              $("#shfnb").hide(),
              $("#prePay").show(),
              global.blnIsTouchScreen &&
                ($(".order-summarywrap").removeClass("order-summarywrap-touch"),
                $(".order-summarywrap").show()),
              $(".touch-fnb-proceed").hide(),
              $(".fnb-offer-banner").hide(),
              global.blnIsTouchScreen || $("#fnbcont").css("margin-top", "0px"),
              $("#fnb-flow-notes").hide(),
              o || ($("#prePay-fnb").hide(), $("#FCDtl").html("").hide()),
              BMS.Misc.fnBusy(!1),
              setTimeout(function () {
                (wow.scroll = !0), wow.scrollHandler();
              }, 100),
              handlePopups.freezeDocument(),
              $("#PayTotal").text(""),
              $("#PayTotal").parent().hide(),
              $("#prePay").addClass("_centered"),
              $("#prePay").removeClass("__fnb-btn"))),
      $("#btmcntbook,#cntbook").hide(),
      $(".__seat-action").hide(),
      $("#subSeat,#btmsubSeat").hide(),
      $(".__seat-action").hide(),
      $("#btnseatdisab").hide(),
      $("#oddsm").show(),
      $(".offappl").fadeOut(500, function () {
        $(this).fadeIn();
      }),
      $("#basCheckbox").html("Add Rs. " + i),
      $("#FLDonation").change(function () {
        flDonationUpdate();
      }),
      $(".type-details").tap(function () {
        $(".tt-block").removeClass("_active"),
          $(this).parent(".tt-block").find(".__radio").prop("checked", !0),
          $(this).parent(".tt-block").addClass("_active"),
          $("#prePay").show(),
          $("#prePay-fnb").show();
      }),
      $("input[type=radio][name=tickettype]").change(function () {
        $(".tt-block").removeClass("_active"),
          $(this).parent(".tt-block").find(".__radio").prop("checked", !0),
          $(this).parent(".tt-block").addClass("_active"),
          $("#prePay").show(),
          $("#prePay-fnb").show();
      }),
      $("#dismiss").attr("onclick", "fnCanTr()"),
      $("#disback").attr("onclick", "fnCanTr()"),
      global.blnIsTouchScreen
        ? $("#basTNC").click(function () {
            var e = $(".__bas-tnc-block-touch");
            "block" == e.css("display") ? e.slideUp() : e.slideDown();
          })
        : ($("#basInfo").hover(function () {
            var e = $(".__bas-info-block");
            "block" == e.css("display") ? e.hide() : e.show();
          }),
          $("#basInfo").click(function (e) {
            e.preventDefault();
          }),
          $("#basTNC").hover(function () {
            var e = $(".__bas-tnc-block, #bas-tnc-arrow-down");
            "block" == e.css("display") ? e.hide() : e.show();
          })),
      global.blnIsIE && $(".__donate").addClass("__isIE"),
      0 != objBookingInfoData.CancellationPolicy.length &&
        ($(".cancellation-policy-cri .cancellation-policy-text").text(
          objBookingInfoData.CancellationPolicy[0].CancellationText
        ),
        $(".cancellation-policy-cri .cancellation-policy-link").text(
          objBookingInfoData.CancellationPolicy[0].CancellationPolicyText
        ),
        $("#cancellationRulesCRI").html(""),
        $.each(
          objBookingInfoData.CancellationPolicy[0].CancellationRules,
          function (e, t) {
            $("#cancellationRulesCRI").append("<li>" + t + "</li>");
          }
        ),
        $(".cancellation-policy-cri").show()),
      global.blnIsTouchScreen && !o && $(".order-summarywrap-touch").hide(),
      BMS.Storage.get({ name: "recommended_movie" }) &&
        BMS.Storage.del({ name: "recommended_movie" }),
      "undefined" != typeof recommended_movie &&
        BMS.Storage.set({
          name: "recommended_movie",
          value: recommended_movie,
          storage: "C",
        }),
      fireSeatsSelectedEvent(),
      fireBookingSummaryLoadEvent(),
      fnGetSeatlayoutActivity({
        vCode: glBT.SVC,
        sId: glBT.SSID,
        etCode: glBT.SEC,
        landed: !1,
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnuOS", fnParams: t, err: e });
  }
}
function flDonationUpdate() {
  var t = glBT.TQ;
  void 0 !== objBookingInfoData.SessionOrder && (t = Math.min(t, 5)),
    $("#FLDonation").is(":checked")
      ? ($("#FLDonation").prop("disabled", !0),
        BMS.Misc.fnDoTrans({
          AppC: global.strAppCode,
          venCode: "BMSI",
          transId: lngTransId,
          cmd: "ADDITEMEX",
          p1: "382",
          p2: "1",
          p3: t,
          fnCC: function (e) {
            $("#FLDonation").removeAttr("disabled");
            e = parseFloat(
              BMS.Misc.fnGVal({ data: e, key: "TOTALTRANSAMOUNT" })
            ).toFixed(2);
            $("#ttPrice").text("Loading..."),
              setTimeout(
                '$("#ttPrice").text("Rs. ' + parseFloat(e).toFixed(2) + '");',
                300
              ),
              $("#FLDonation").prop("disabled", !1),
              $("#basCheckbox").html("Add Rs. "),
              $("#basPrice").html("Rs. 0");
          },
          ecObj: !0,
          fnEC: function (e) {
            $("#FLDonation").removeAttr("disabled"),
              $("#FLDonation").attr("checked", !1),
              $("#basCheckbox").html("Remove"),
              $("#basPrice").html("Rs. 0");
          },
        }))
      : ($("#FLDonation").prop("disabled", !0),
        BMS.Misc.fnDoTrans({
          AppC: global.strAppCode,
          venCode: "BMSI",
          transId: lngTransId,
          cmd: "REMOVEITEMEX",
          p1: "382",
          p2: "1",
          p3: t,
          fnCC: function (e) {
            $("#FLDonation").removeAttr("disabled");
            e = parseFloat(
              BMS.Misc.fnGVal({ data: e, key: "TOTALTRANSAMOUNT" })
            ).toFixed(2);
            $("#ttPrice").text("Loading..."),
              setTimeout(
                '$("#ttPrice").text("Rs. ' + parseFloat(e).toFixed(2) + '");',
                300
              ),
              $("#FLDonation").prop("disabled", !1),
              $("#basCheckbox").html("Add Rs. " + t),
              $("#basPrice").html("Rs. 0");
          },
          ecObj: !0,
          fnEC: function (e) {
            $("#FLDonation").removeAttr("disabled"),
              $("#FLDonation").attr("checked", !1),
              $("#basCheckbox").html("Remove"),
              $("#basPrice").html("Rs. 0");
          },
        }));
}
var GnCRCount = 1;
function fnFrdDC(t) {
  try {
    var e,
      a = Math.ceil(cntFC / 3);
    switch (t) {
      case "PREV":
        1 < GnCRCount &&
          ((e = parseInt($("#outerBox > div").css("margin-left"), 10) - -524),
          $("#outerBox > div").animate({ "margin-left": e + "px" }, "fast"),
          GnCRCount--);
        break;
      case "NEXT":
        GnCRCount < a &&
          ((e = parseInt($("#outerBox > div").css("margin-left"), 10) + -524),
          $("#outerBox > div").animate({ "margin-left": e + "px" }, "fast"),
          GnCRCount++);
    }
  } catch (e) {
    fnErr({ fnName: "fnFrdDC", fnParams: t, err: e });
  }
}
function fnRemoveValidation() {
  try {
    $("#fnb_seat_interval_option").removeClass("fnb_option_required");
  } catch (e) {}
}
var AddCharges = [];
function fnSAddChrgs() {
  try {
    for (var e = 0; e < AddCharges.length; e++)
      fnDoTrans({
        venCode: glBT.SVC,
        transId: lngTransId,
        cmd: "SETTRANSADDITIONALCHARGES",
        p1: AddCharges[e],
        fnEC: fnCanTr,
      });
  } catch (e) {
    fnErr({ fnName: "fnSAddChrgs", err: e });
  }
}
var isDonation = !1,
  adFC = !1;
function fnPrePay() {
  try {
    if (
      ($("#FLDonation").is(":checked") && (isDonation = !0),
      $("#basDtl").is(":visible") &&
        (isDonation = "Remove" == $("#basCheckbox").html()),
      !global.blnIsTouchScreen)
    ) {
      if (
        "Y" == arrShowInfo[0].VenueHasETicket &&
        "Y" != arrShowInfo[0].strHasMTTicket &&
        !$("#eticket").is(":checked") &&
        !$("#box").is(":checked") &&
        !$("#mticket").is(":checked")
      )
        return (
          BMS.Misc.fnSCusErrDisplay(
            "seatErr",
            "Please select ticket type",
            "e"
          ),
          $("#shmticket").addClass("highlight-ttype"),
          void $("#shbox").addClass("highlight-ttype")
        );
      if (
        "Y" == arrShowInfo[0].VenueHasETicket &&
        "Y" == arrShowInfo[0].strHasMTTicket &&
        !$("#mticket").is(":checked") &&
        !$("#box").is(":checked") &&
        !$("#eticket").is(":checked")
      )
        return (
          BMS.Misc.fnSCusErrDisplay(
            "seatErr",
            "Please select ticket type",
            "e"
          ),
          $("#shmticket").addClass("highlight-ttype"),
          void $("#shbox").addClass("highlight-ttype")
        );
    }
    $("#prePay").removeAttr("onclick"),
      $("#order-proceed").removeAttr("onclick"),
      $("#prePay-fnb").removeAttr("onclick"),
      $("#btnPopupCancel , #btnAduPopupAccept").unbind("click"),
      $("#oddsm").hide(),
      BMS.Misc.fnBusy(!0),
      fnAddFCItm(),
      pushLotameDataOnProceed();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnPrePay", err: e });
  }
}
function showTNC() {
  try {
    $("#basTNC").is(":visible") ? $("#basTNC").hide() : $("#basTNC").show();
  } catch (e) {
    fnErr({ fnName: "showTNC", err: e });
  }
}
function fnGotoPay() {
  try {
    var e =
        $("#mticket").is(":checked") || mticketChecked ? "&etk=Y&mtk=Y" : "",
      t = $("#eticket").is(":checked") || eticketChecked ? "&etk=Y" : "",
      a = objBookingInfoData.SessionOrder[0].Cinema_strCompanyCode || "";
    "ET00055918" == glBT.SEC
      ? setTimeout(
          'BMS.Misc.fnGoTo ("https://' +
            location.host +
            "/payment_bb2/?cid=" +
            glBT.SVC +
            "&cc=" +
            a +
            "&sid=" +
            glBT.SSID +
            "&ety=" +
            pet +
            t +
            e +
            "&ec=" +
            glBT.SEC +
            '");',
          3e3
        )
      : setTimeout(
          'BMS.Misc.fnGoTo ("https://' +
            location.host +
            "/payment/?cid=" +
            glBT.SVC +
            "&cc=" +
            a +
            "&sid=" +
            glBT.SSID +
            "&ety=" +
            pet +
            t +
            e +
            "&ec=" +
            glBT.SEC +
            '");',
          3e3
        );
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGotoPay", err: e });
  }
}
function fnCMsgDis(t, a, o) {
  try {
    $("#" + t).show(), $("#" + t).text(a), $("#" + t).fadeIn();
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: "fnCMsgDis",
      fnParams: t + ", " + a + ", " + o,
      err: e,
    });
  }
}
function showDynamicSelectedImage(e, t) {
  if ("qtyCall" == e)
    switch (t) {
      case "pop_1":
        $("#popImage_1").css("display", "inline-block");
        break;
      case "pop_2":
        $("#popImage_2").css("display", "inline-block");
        break;
      case "pop_3":
        $("#popImage_3").css("display", "inline-block");
        break;
      case "pop_4":
        $("#popImage_4").css("display", "inline-block");
        break;
      case "pop_5":
        $("#popImage_5").css("display", "inline-block");
        break;
      case "pop_6":
        $("#popImage_6").css("display", "inline-block");
        break;
      case "pop_7":
        $("#popImage_7").css("display", "inline-block");
        break;
      case "pop_8":
        $("#popImage_8").css("display", "inline-block");
        break;
      case "pop_9":
        $("#popImage_9").css("display", "inline-block");
        break;
      case "pop_10":
        $("#popImage_10").css("display", "inline-block");
        break;
      case "pop_11":
        $("#popImage_11").css("display", "inline-block");
        break;
      case "pop_12":
        $("#popImage_12").css("display", "inline-block");
    }
  else
    switch (t) {
      case "1":
        $("#popImage_1").css("display", "inline-block");
        break;
      case "2":
        $("#popImage_2").css("display", "inline-block");
        break;
      case "3":
        $("#popImage_3").css("display", "inline-block");
        break;
      case "4":
        $("#popImage_4").css("display", "inline-block");
        break;
      case "5":
        $("#popImage_5").css("display", "inline-block");
        break;
      case "6":
        $("#popImage_6").css("display", "inline-block");
        break;
      case "7":
        $("#popImage_7").css("display", "inline-block");
        break;
      case "8":
        $("#popImage_8").css("display", "inline-block");
        break;
      case "9":
        $("#popImage_9").css("display", "inline-block");
        break;
      case "10":
        $("#popImage_10").css("display", "inline-block");
        break;
      case "11":
        $("#popImage_11").css("display", "inline-block");
        break;
      case "12":
        $("#popImage_12").css("display", "inline-block");
    }
}
function showDefaultSelectedSVG(e, t) {
  if ("qtyCall" == e)
    switch (t) {
      case "pop_1":
        $("#qty_cycle").css("display", "inline-block");
        break;
      case "pop_2":
        $("#qty_motorbike").css("display", "inline-block");
        break;
      case "pop_3":
        $("#qty_auto").css("display", "inline-block");
        break;
      case "pop_4":
        $("#qty_car").css("display", "inline-block");
        break;
      case "pop_5":
      case "pop_6":
      case "pop_7":
        $("#qty_xuv").css("display", "inline-block");
        break;
      case "pop_8":
      case "pop_9":
      case "pop_10":
      case "pop_11":
        $("#qty_bus").css("display", "inline-block");
        break;
      case "pop_12":
        $("#qty_bigbus").css("display", "inline-block");
    }
  else
    switch (t) {
      case "1":
        $("#qty_cycle").css("display", "inline-block");
        break;
      case "2":
        $("#qty_motorbike").css("display", "inline-block");
        break;
      case "3":
        $("#qty_auto").css("display", "inline-block");
        break;
      case "4":
        $("#qty_car").css("display", "inline-block");
        break;
      case "5":
      case "6":
      case "7":
        $("#qty_xuv").css("display", "inline-block");
        break;
      case "8":
      case "pop_9":
      case "10":
      case "11":
        $("#qty_bus").css("display", "inline-block");
        break;
      case "12":
        $("#qty_bigbus").css("display", "inline-block");
    }
}
function fnGetSVG(e, t, a) {
  "qtyCall" == t
    ? ($(".hidicon").hide(),
      (a ? showDynamicSelectedImage : showDefaultSelectedSVG)(t, e))
    : ($(".hdsvg").hide(),
      a
        ? ($(".hidicon").hide(), showDynamicSelectedImage(t, e))
        : showDefaultSelectedSVG(t, e));
}
function fntncHide() {
  BMS.Misc.modal("tnc", !1),
    $(".modal .__overlay").css("display", "none"),
    $("#prePay").attr("onclick", "fnPrePay()"),
    $("#prePay-fnb").attr("onclick", "fnPrePay()"),
    $("#order-proceed").addClass("order-active");
  var e = arrShowInfo.find(function (e) {
      return (
        e.SessionId === glBT.SSID &&
        e.PriceCode ===
          $("#qty-sel #category-list")
            .find(".seat-category:checked")
            .attr("priceCode")
      );
    }),
    e = e && e.SeatLayout;
  if ("VN" == byWhat && e && "N" == e && isTnCModal)
    return BMS.Misc.fnBusy(!0), void window.history.go(-1);
  "ET" == byWhat &&
    "N" == arrShowInfo[0].SeatLayout &&
    $("#seat-layout").hide();
}
function fnCouponTnc() {
  BMS.Misc.modal("couponTnc", !1),
    $(".modal .__overlay").css("display", "none");
}
function fnMdShowHide() {
  BMS.Misc.modal("show-sel", !1), $(".modal .__overlay").css("display", "none");
}
function fnDateChkCoachmark() {
  try {
    if ("booking-history" == pageName) return;
    var e,
      t = new Date();
    "buytickets" == pageName || "cinema" == pageName || "seatlayout" == pageName
      ? strShowDate.split(",")[0].toLowerCase()
      : (strShowDate.split(",")[1].split(" ")[2], t.getDate());
    strShowDate.split(",")[1].split(" ")[2] != t.getDate() &&
      "buytickets" != pageName &&
      "cinema" != pageName &&
      (global.blnIsTouchScreen
        ? ($("#seat-layout .container").after(
            '\t\t\t\t\t<div class="tooltip-dc" style="display: none; position: absolute; right: 0px; margin-top: 0px; top: 0px; z-index: 200;"> \t\t\t\t\t\t<span class="__arrow" style="width: 0; height: 0; border-left: 6px solid hsla(0, 0%, 0%, 0); border-right: 6px solid hsla(0, 0%, 0%, 0); border-bottom: 6px solid hsl(222, 24%, 16%); top: -5px; left: 175px; position: absolute;"></span> \t\t\t\t\t\t<span class="__content" style="display: table; background: #000; font-size: 12px; color: #fff; padding: 8px;">Check your date before booking</span> \t\t\t\t\t</div> \t\t\t\t'
          ),
          $(".tooltip-dc").css(
            "top",
            $("#seat-layout .bkf-header").height() + 20
          ),
          $(".tooltip-dc").css(
            "right",
            $(window).width() -
              ($("#mobile-date-container").offset().left +
                $("#mobile-date-container").width())
          ))
        : ($("#seat-layout .container").after(
            '\t\t\t\t\t<div class="tooltip-dc" style="display: none; position: absolute; left: 0px; margin-top: 0px; top: 0px; z-index: 200;"> \t\t\t\t\t\t<span class="__arrow" style="width: 0; height: 0; border-left: 6px solid hsla(0, 0%, 0%, 0); border-right: 6px solid hsla(0, 0%, 0%, 0); border-bottom: 6px solid hsl(222, 24%, 16%); top: -5px; left: 104px; position: absolute;"></span> \t\t\t\t\t\t<span class="__content" style="display: table; background: #000; font-size: 12px; color: #fff; padding: 8px;">Check your date before booking</span> \t\t\t\t\t</div> \t\t\t\t'
          ),
          $(".tooltip-dc").css(
            "top",
            $("#desktop-date-container .__event-date-wrapper").offset().top +
              ($("#desktop-date-container .__event-date-wrapper").height() + 20)
          ),
          $(".tooltip-dc").css(
            "left",
            $("#desktop-date-container .__event-date-wrapper").offset().left -
              ($(".tooltip-dc").width() -
                $("#desktop-date-container .__event-date-wrapper").width()) /
                2
          )),
      $(".tooltip-dc").show(),
      (e = $(".tooltip-dc")).animate({ marginTop: "+=15" }, 500, function () {
        e.animate({ marginTop: "-=20" }, 250, function () {
          e.animate({ marginTop: "+=5" }, 250);
        });
      }),
      setTimeout(function () {
        $(".tooltip-dc").remove();
      }, 2500));
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnDateChkCoachmark", err: e });
  }
}
var fnGetGSTStateList = function () {
    try {
      var t;
      $.ajax({
        url: "/serv/getData?cmd=GETSTATELIST",
        dataType: "json",
        success: function (e) {
          var a, o, n, s;
          void 0 !== (t = e).BookMyShow &&
            void 0 !== t.BookMyShow.StateList &&
            ((o = a = ""),
            $.each(t.BookMyShow.StateList, function (e, t) {
              (a += '<div class="region-detail">'),
                (a +=
                  '<input type="checkbox" name="region" id="' +
                  t.SCode +
                  '" class="radioRegion" />'),
                (a +=
                  '<label for="' +
                  t.SCode +
                  '" data-state-label="' +
                  BMS.Misc.fnUrlName(t.SName) +
                  '">' +
                  t.SName +
                  "</label>"),
                (a += "</div>"),
                (o +=
                  '<li data-state-code="' +
                  t.SCode +
                  '" data-state-name="' +
                  BMS.Misc.fnUrlName(t.SName) +
                  '" onclick="fnOnclickUpdateTrans(\'' +
                  t.SCode +
                  "');\">" +
                  t.SName +
                  "</li>");
            }),
            $("#gst-state-list .region-list").html(a),
            (o = "" != o ? "<ul>" + o + "</ul>" : ""),
            $(".breakdown_outer .gst_selection .state_list").html(o),
            $("#gst-state-list .region-list label").on("click", function (e) {
              $("#gst-state-list input[type=checkbox]").prop("checked", !1),
                $(e).prev().prop("checked", !0);
            }),
            (n = $("#gst-state-list .region-list label")),
            $("#gst-state-list .state-search-input-box").on(
              "keyup",
              function () {
                var e = BMS.Misc.fnUrlName($(this).val()),
                  t = new RegExp(e, "i");
                n.each(function () {
                  t.test($(this).attr("data-state-label"))
                    ? $(this).parent().show()
                    : $(this).parent().hide();
                }),
                  0 < $("#gst-state-list .no-results").length &&
                    $("#gst-state-list .no-results").remove(),
                  0 == $("[data-state-label]:visible").length &&
                    $("#gst-state-list .region-list").append(
                      '<div class="no-results"><label>No matching results</label></div>'
                    );
              }
            ),
            (s = $(".breakdown_outer .gst_selection .state_list li")),
            $(".breakdown_outer .gst_selection #gst-oneclick-search").on(
              "keyup",
              function () {
                var e = BMS.Misc.fnUrlName($(this).val()),
                  t = new RegExp(e, "i");
                s.each(function () {
                  t.test($(this).attr("data-state-name"))
                    ? $(this).show()
                    : $(this).hide();
                }),
                  0 <
                    $(".breakdown_outer .gst_selection .state_list .no-results")
                      .length &&
                    $(
                      ".breakdown_outer .gst_selection .state_list .no-results"
                    ).remove(),
                  0 == $("[data-state-name]:visible").length &&
                    $(".breakdown_outer .gst_selection .state_list ul").append(
                      '<li class="no-results">No matching results</li>'
                    );
              }
            ));
        },
      });
    } catch (e) {
      void 0;
    }
  },
  fnDispCancellationRules = function () {
    try {
      BMS.Misc.modal("cancellationPolicyCRI", !0);
    } catch (e) {
      BMS.Misc.fnErr({ fnName: "fnDispCancellationRules", err: e });
    }
  };
function fnGetMemberHistory() {
  try {
    var e,
      t,
      a,
      o = $(".__double-booking");
    o.hasClass("none") || o.addClass("none"),
      _.isEmpty(bookingHistory)
        ? ((e = BMS.Storage.get({
            name: "ld",
            key: "MEMBEREMAIL",
            defVal: "",
          })),
          (t = BMS.Storage.get({ name: "ld", key: "LSID", defVal: "" })),
          (a = BMS.Storage.get({ name: "ld", key: "MEMBERID", defVal: "" })),
          BMS.Misc.fnWsData({
            AppC: global.strAppCode,
            cmd: "GETMEMBERHISTORY",
            email: e,
            lsid: t,
            data: "|MEMBERID=" + a + "|",
            blnSupp: !0,
            retType: "json",
            fnCC: function (e) {
              e = JSON.parse(unescape(e));
              $.each(e.BookMyShow.arrBookingHistory, function (e, t) {
                (e = t.Venue_strCode + t.Session_lngSessionId),
                  (bookingHistory[e] = {
                    ticketQuantity: t.TransQty,
                    transStatus: t.TransStatus,
                  });
              }),
                fnShowDoubleBookingMsg();
            },
          }))
        : fnShowDoubleBookingMsg();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGetMemberHistory", err: e });
  }
}
function fnGetSeatlayoutActivity(e) {
  try {
    var t = window.location.hostname,
      a = {
        localhost: "https://in-sit.bms.bz/api/movies/v1/trending/seatlayout",
        "in.bookmyshow.com":
          "https://in.bookmyshow.com/api/movies/v1/trending/seatlayout",
        "in-preprod.bms.bz":
          "https://in-preprod.bms.bz/api/movies/v1/trending/seatlayout",
        "in-sit.bms.bz":
          "https://in-sit.bms.bz/api/movies/v1/trending/seatlayout",
      }[t],
      o = BMS.Misc.getUniqueId() + e.sId,
      n = {
        VENUECODE: e.vCode,
        EVENTCODE: e.etCode,
        SESSIONID: e.sId,
        HASHUNIQUEKEY: "BMSSOCIALNUDGESSEATLAYOUT",
        UNIQUEIDENTIFIER: o,
        APPCODE: "WEB",
      },
      s =
        "VENUECODE|EVENTCODE|SESSIONID|HASHUNIQUEKEY|UNIQUEIDENTIFIER|APPCODE|".replace(
          /([a-zA-Z0-9_]+)\|/g,
          (e, t) => n[t] || e
        ),
      r = CryptoJS.SHA512(s + "QfEoTdWhIfBcShIhRfHdQdJkIy^4@1*5").toString();
    e.vCode &&
      e.sId &&
      BMS.Misc.fnAjax({
        type: "POST",
        url: a + "/activity",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
          vCode: e.vCode,
          sId: e.sId,
          etCode: e.etCode,
          uId: o,
          landed: e.landed,
          secureKey: r,
        }),
        headers: { "Content-Type": "application/json", "x-app-code": "WEB" },
        success: function (e) {},
        error: function (e) {
          BMS.Misc.fnErr({ fnName: "fnGetSeatlayoutActivity", err: e });
        },
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGetSeatlayoutActivity", err: e });
  }
}
function fnShowDoubleBookingMsg() {
  try {
    var e = bookingHistory[glBT.SVC + glBT.SSID];
    if (!_.isEmpty(e) && "P" === e.transStatus) {
      var t = e.ticketQuantity,
        a = 1 == t ? " ticket" : " tickets",
        o = $(".__double-booking");
      return $(".tktQuantity").html(t + a), o.removeClass("none"), !1;
    }
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnShowDoubleBookingMsg", err: e });
  }
}
$(document).ready(function () {
  void 0 !== location.hash.split("#!/")[1] && fnClCallout();
}),
  $(document).on("click", "#proceed-Qty", function () {
    $("#temp-overlay").hide();
    var e = arrShowInfo.find(function (e) {
        return (
          e.SessionId === glBT.SSID &&
          e.PriceCode ===
            $("#qty-sel #category-list")
              .find(".seat-category:checked")
              .attr("priceCode")
        );
      }),
      e = e && e.SeatLayout;
    showLayout && blnVistaCine
      ? (BMS.Modal.fnHideModal(),
        fnSQty(),
        BMS.Misc.modal("qty-sel", !1),
        $(".modal .__overlay").css("display", "none"))
      : ("VN" == byWhat && e && "N" == e && isTnCModal) ||
        ("ET" == byWhat && "N" == arrShowInfo[0].SeatLayout && isTnCModal)
      ? fnPopupSelSh(
          byWhat,
          glBT.SVC,
          glBT.SSID,
          glBT.SEC,
          glBT.SST,
          objSeatData
        )
      : (fnInitBook(),
        BMS.Misc.modal("qty-sel", !1),
        $(".modal .__overlay").css("display", "none"));
  }),
  BMS.Misc.Router.registerRoute(
    "seatlayout",
    "seatlayoutcallback",
    null,
    function () {
      fnClCallout(!1);
    }
  ),
  (BMS.Misc.fnGQS = function (e, t) {
    try {
      if (-1 != window.location.href.indexOf("?")) {
        for (
          var a = null != a ? a : "",
            o = window.location.search.substring(1).split("&"),
            n = 0;
          n < o.length;
          n++
        ) {
          var s = o[n].split("=");
          if (s[0] == j) return s[1];
        }
        return a;
      }
      var r = window.location.href.split("/"),
        i = r[5].split("-"),
        l = {};
      return (
        (l.srid = i[1].toUpperCase()),
        (l.eid = "movie" == i[0] ? i[2] : ""),
        (l.cid = "cinema" == i[0] ? i[2] : ""),
        (l.ety = i[3]),
        (l.did = r[6]),
        null == l[e] ? a : l[e]
      );
    } catch (e) {
      fnErr({ fnName: "misc.js - fnGQS", fnParams: arguments, err: e });
    }
  }),
  $(document).keyup(function (e) {
    (27 !== e.keyCode && 27 !== e.which) ||
      ("couponTnc" == $(BMS.Modal.currentModal).attr("id") ||
      "seerulesTnc" == $(BMS.Modal.currentModal).attr("id")
        ? BMS.Misc.modal("couponTnc", !1)
        : "undefined" != typeof abc && 1 == abc
        ? "qty-sel" != $(BMS.Modal.currentModal).attr("id") &&
          $("#seat-layout .coupons_overlay,.win-intrc").hide()
        : (1 <= $(".fnb-offer-banner").length &&
            $(".fnb-offer-banner").is(":visible")
            ? fnCanTr
            : fnClCallout)());
  });
var ObjCatagories = {},
  ObjGroupSeats = {},
  ObjLayout = [],
  arrColorCodes = ["#f9a425", "#49ba8e", "#6dcff6", "#008cd6", "#a864a8"],
  arrShowSeat = [
    "SB",
    "UT",
    "UF",
    "TG",
    "KC",
    "JT",
    "SI",
    "AG",
    "TC",
    "AC",
    "AV",
  ],
  objSelectedTypes = { "Best Seats": 0 },
  customSeatInfoText =
    "Best Seats are the most in-demand seats for any cinema.",
  customSelectionText = "You have selected {tixqty} of our best seats!",
  snackBarTimeout = null,
  ObjColor = {},
  ObjCheckList = {
    TotalSeats: 0,
    SelectedSeats: [],
    strSSeats: "",
    CatagoryToSelect: "",
    OtherCatSeat: "",
    AllowMultiCatSel: !1,
    ShowInvertedLayout: !1,
    AllowSingleClick: !1,
    SeatLayoutHere: !0,
    SatClrNo: [],
  },
  intMaxRowLength = 0,
  intAvailSeats = 0,
  intSessionTotalSeats = 0,
  qtyIcons = {},
  isSeatRanking = !1,
  isCoupleSeats = !1,
  isPopUpMsg = !1,
  blnAnimateSeatRanking = !1,
  arrSeatRankingVenues = [],
  arrCoupleSeatsVenues = ["PGBD", "MTSU"],
  WalletCurrBal = 0,
  oneClk = { walletPayId: 0, walletCurrBal: 0 },
  arrPopUpMsg = [
    "FMTK",
    "FSCK",
    "FCDH",
    "FMMA",
    "FMLB",
    "FMVS",
    "FMBS",
    "FMDA",
    "FSSM",
  ],
  strCatagory = "",
  ObjGroupSeats = {},
  arrEventCodeForSeatIcon = [],
  cuponPrice = "",
  isSocialDistancing = !1,
  isDynamicSelector = !1,
  newShowtimeUrl = BMS.Storage.get({ name: "newShowtime", defVal: "" })
    ? JSON.parse(
        decodeURIComponent(BMS.Storage.get({ name: "newShowtime", defVal: "" }))
      )
    : "";
function removeDecimalPrice(e) {
  var t = parseFloat(e);
  return Number.isInteger(t) ? t.toString() : e;
}
function fnRSet() {
  try {
    (objSelectedTypes["Best Seats"] = 0),
      (ObjCheckList = {
        TotalSeats: (intSessionTotalSeats = intAvailSeats = 0),
        SelectedSeats: [],
        strSSeats: "",
        CatagoryToSelect: "",
        OtherCatSeat: "",
        AllowMultiCatSel: !(ObjColor = {}),
        ShowInvertedLayout: !(ObjLayout = []),
        AllowSingleClick: !(ObjGroupSeats = {}),
        SeatLayoutHere: !(isSocialDistancing = !(ObjCatagories = {})),
        SatClrNo: [],
      }),
      $("#SLcmbQty").val(""),
      $("#QtyToolTip, #sdCover, #ShwMorSeats").show(),
      $("#MulCatErr").removeClass("bounce1"),
      $("#SLHere").removeClass("bounce2"),
      $("#SLHere").hide(),
      $("#STotal").html(""),
      $("#btnSTotal").html(""),
      $("#btnSTotal_reserve").html(""),
      $(".qytVal").text("Qty");
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnRSet", err: e });
  }
}
function fnGroupSeatData(e) {
  try {
    for (var t = 0, a = 6; a < e.length; a++)
      for (var o, n, s = e[a].split("*"), r = 0; r < s.length; r++)
        -1 != s[r].indexOf("~") &&
          (0 == r &&
            void 0 === ObjGroupSeats[e[1]] &&
            (ObjGroupSeats[e[1]] = {}),
          (o = $.trim(s[r].split("~")[0])),
          (n = $.trim(s[r].split("~")[1])),
          o.split("^")[0] != n.split("^")[0]
            ? (void 0 ===
                ObjGroupSeats[e[1]][o.split("^")[0] + "^" + n.split("^")[0]] &&
                (ObjGroupSeats[e[1]][o.split("^")[0] + "^" + n.split("^")[0]] =
                  {}),
              (ObjGroupSeats[e[1]][o.split("^")[0] + "^" + n.split("^")[0]][t] =
                {}),
              (ObjGroupSeats[e[1]][o.split("^")[0] + "^" + n.split("^")[0]][
                t
              ].SeatId = {}),
              (ObjGroupSeats[e[1]][o.split("^")[0] + "^" + n.split("^")[0]][
                t
              ].HwManySeater = {}),
              (ObjGroupSeats[e[1]][o.split("^")[0] + "^" + n.split("^")[0]][
                t
              ].SeatId = s[r]),
              (ObjGroupSeats[e[1]][o.split("^")[0] + "^" + n.split("^")[0]][
                t
              ].HwManySeater = s[r].split("~").length))
            : (void 0 === ObjGroupSeats[e[1]][o.split("^")[0]] &&
                (ObjGroupSeats[e[1]][o.split("^")[0]] = {}),
              (ObjGroupSeats[e[1]][o.split("^")[0]][t] = {}),
              (ObjGroupSeats[e[1]][o.split("^")[0]][t].SeatId = {}),
              (ObjGroupSeats[e[1]][o.split("^")[0]][t].HwManySeater = {}),
              (ObjGroupSeats[e[1]][o.split("^")[0]][t].SeatId = s[r]),
              (ObjGroupSeats[e[1]][o.split("^")[0]][t].HwManySeater =
                s[r].split("~").length)),
          (t += 1));
  } catch (e) {
    void 0;
  }
}
function fnMakeObj(t) {
  try {
    fnRSet(), $("#snackbar").hide();
    for (
      var e = t.split("||"), a = e[0].split("|"), o = "normal", n = 0;
      n < a.length;
      n++
    ) {
      var s = a[n].split(":");
      (ObjCatagories[s[1]] = {}),
        (ObjCatagories[s[1]].AreaName = s[0]),
        (ObjCatagories[s[1]].AreaCode = s[2]),
        (ObjCatagories[s[1]].AreaID = s[3]),
        (ObjCatagories[s[1]].AreaQty = parseInt(s[5], 10)),
        (ObjCatagories[s[1]].CoupleSeats = 6 < s.length ? "Y" : "N"),
        6 < s.length && isCoupleSeats && fnGroupSeatData(s);
    }
    var r = e[1].split("|");
    ObjCheckList.ShowInvertedLayout && (r = r.reverse());
    for (
      var i = { flag: !1, SeatQty: 0, left: 0 }, n = (intMaxRowLength = 0);
      n < r.length;
      n++
    )
      if ("" != r[n]) {
        var l = r[n].split(":");
        intMaxRowLength < l.length && (intMaxRowLength = l.length);
        var c = l[0],
          d = l[1],
          p = {};
        (p.rowname = d),
          (p.rowcode = c),
          (p.catagories = []),
          (p.rawcatorder = []),
          (p.catorder = []),
          (p.seats = []);
        for (var f = 2; f < l.length; f++) {
          var S,
            h = l[f],
            u = h.substr(0, 1),
            g = h.substr(1, 1);
          "4" == g && (o = "best"),
            ("1" != h.substr(1, 1) && "3" != h.substr(1, 1)) ||
              (-1 != $.inArray(glBT.VenAppType, ["VT", "VS"]) &&
                fnCheckIfAllSessionsHaveSeatlayout() &&
                (g = "1"));
          var m = "",
            b = "",
            b =
              ((m =
                "Y" == arrShowInfo[0].ShowSeatNo &&
                fnIsSplitSeat(glBT.VenAppType)
                  ? -1 != h.indexOf("+")
                    ? ((S = h.substr(2, h.split("+")[0].length - 2)),
                      h.split("+")[1])
                    : ((S = h.substr(2, h.length - 1)),
                      h.substr(2, h.length - 1))
                  : -1 == h.indexOf("^") && -1 == h.indexOf("~")
                  ? ((S =
                      -1 != h.indexOf("+")
                        ? h.substr(2, h.length - 1).split("+")[0]
                        : h.substr(2, h.length - 1)),
                    -1 != h.indexOf("+")
                      ? h.split("+")[1]
                      : h.substr(2, h.length - 1))
                  : ((S = h.substr(2, h.length - 1).split("+")[0]),
                    h.substr(2, h.length - 1).split("+")[0])),
              fnGetSeatData("POPMSG", h)),
            C = "1" == g || "7" == g || "8" == g || "4" == g ? "Y" : "N";
          "Y" == C && intAvailSeats++,
            intSessionTotalSeats++,
            -1 == $.inArray(u, p.catagories) && p.catagories.push(u),
            "0" !== g
              ? (p.catorder[p.catorder.length - 1] != u && p.catorder.push(u),
                p.rawcatorder.push(u))
              : void 0 === p.catorder[p.catorder.length - 1]
              ? ("GW" != p.catorder[p.catorder.length - 1] &&
                  p.catorder.push("GW"),
                p.rawcatorder.push("GW"))
              : p.rawcatorder.push(p.catorder[p.catorder.length - 1]);
          var y = {};
          if (
            ((y.catcode = u),
            (y.seattype = g),
            (y.seatno = S),
            (y.isavail = C),
            (y.shSeatNo = m),
            (y.seatRanking = ""),
            (y.seatPopMsg = b),
            null != ObjGroupSeats[u])
          )
            if (null != ObjGroupSeats[u][c]) {
              for (
                var k = ObjGroupSeats[u][c], T = !1, v = 0;
                v < k.length;
                v++
              )
                S == fnGnSeatNo(k[v].StartSeat, "ADD") &&
                  ((y.HwManySeater =
                    "0" == g ? 0 : parseInt(k[v].Plus, 10) + 1),
                  (T = !0),
                  (i.flag = !0),
                  (i.SeatQty = parseInt(k[v].Plus, 10) + 1),
                  (i.left = parseInt(k[v].Plus, 10)));
              T ||
                (i.flag
                  ? ((y.HwManySeater = "0" == g ? 0 : i.SeatQty),
                    (i.left = i.left - 1),
                    (i.flag = 0 != i.left))
                  : (y.HwManySeater = "0" == g ? 0 : 1));
            } else y.HwManySeater = "0" == g ? 0 : 1;
          else y.HwManySeater = "0" == g ? 0 : 1;
          p.seats.push(y);
        }
        ObjLayout.push(p);
      }
    (glBT.visibleSeats = o),
      0 == intAvailSeats
        ? (BMS.Misc.fnBusy(!1),
          BMS.Misc.modal("tnc", !0),
          $(".modal .__overlay").css("display", "block"),
          $("#dPopupMsgTitle").text("NOTE"),
          $("#dPopupMsgText")
            .text(
              "Sorry! there are no seats available.Kindly select another showtime ."
            )
            .show(),
          $("#btnAduPopupAccept").hide(),
          $("#btnPopupCancel").hide(),
          $("#btnPopupOK").hide(),
          $("#btnPopupAccept").hide())
        : fnMakeSL();
    var B,
      w = 0;
    blnVistaCine &&
      ((B =
        (w = $("#layout ._available").length) /
        ($("#layout ._available").length + $("#layout ._blocked").length)),
      global.blnIsTouchScreen
        ? ($("#seat-layout .bkf-header .rem-seats").hide(),
          $("#seat-layout .bkf-header .rem-seats span").html(""),
          B <= 0.2 &&
            ($("#seat-layout .bkf-header .rem-seats").show(),
            $("#seat-layout .bkf-header .rem-seats span").html(
              w + " seats remaining"
            ),
            $("#cntbook, #subSeat, #btn-paylater").on("tap", function () {
              $("#seat-layout .bkf-header .rem-seats").hide();
            })))
        : ($("#seat-layout .seat-container .rem-seats").hide(),
          $("#seat-layout .seat-container .rem-seats span").html(""),
          B <= 0.2 &&
            ($("#seat-layout .seat-container .rem-seats").show(),
            $("#seat-layout .seat-container .rem-seats span").html(
              w + " seats remaining"
            )))),
      global.blnIsTouchScreen ||
        ($("#slPromoImage").remove(),
        -1 !== $.inArray(glBT.SEC, arrEventCodeForSeatIcon) &&
          $(".seat-container").append(
            "<img id='slPromoImage' src='//in.bmscdn.com/webin/static/xxx-seatlayout-offer-banner.png' style='position: absolute; left: 1px; top: 1px; width: 350px;' />"
          ));
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnMakeObj", fnParams: t, err: e });
  }
}
function fnGnSeatNo(t, a) {
  try {
    switch (a) {
      case "SUB":
        return 0 == parseInt(t.substr(0, 1), 10) ? t.substr(1, 1) : t;
      case "ADD":
        return 1 == t.toString().length ? (t = "0" + t.toString()) : t;
    }
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGnSeatNo", fnParams: t + ", " + a, err: e });
  }
}
function fnMakeSL() {
  try {
    var e = "",
      t = "",
      a = [],
      o = [],
      n = "";
    (blnAnimateSeatRanking = !1),
      (e += '<table cellspacing="0" cellpadding="0" class="setmain">');
    for (var s = 0; s < ObjLayout.length; s++) {
      for (
        var r = ObjLayout[s].rowname, i = [], l = 0;
        l < arrShowInfo.length;
        l++
      )
        i.push(arrShowInfo[l].AreaCatCode);
      var c,
        d = [];
      for (c in ObjCatagories)
        ObjCatagories.hasOwnProperty(c) &&
          -1 != $.inArray(ObjCatagories[c].AreaCode, i) &&
          d.push(c);
      var p = ObjLayout[s];
      if (1 < p.catagories.length) {
        if (((a = p.catagories), !_.isEqual(o, p.catorder))) {
          for (
            var t = "", f = 0, S = 0, o = p.catorder, h = 0;
            h < p.catorder.length;
            h++
          ) {
            for (
              S = 0;
              f < p.rawcatorder.length && p.catorder[h] === p.rawcatorder[f];

            )
              S++, f++;
            "GW" !== p.rawcatorder[f - 1]
              ? (t +=
                  '<div class="seatP" style="width:' +
                  33 * S +
                  'px; ">' +
                  (void 0 !== ObjTT[ObjCatagories[p.catorder[h]].AreaCode]
                    ? ObjTT[ObjCatagories[p.catorder[h]].AreaCode]
                        .CatagoryName +
                      " - Rs." +
                      removeDecimalPrice(
                        ObjTT[
                          ObjCatagories[p.catorder[h]].AreaCode
                        ].Price.toFixed(2)
                      )
                    : ObjCatagories[p.catorder[h]].AreaName) +
                  "</div>")
              : (t +=
                  '<div class="seatP" style="width:' +
                  33 * S +
                  'px; ">&nbsp;</div>');
          }
          0 < o.length &&
            ((e += "<tr>"),
            (e += '<td colspan="2">&nbsp;</td>'),
            (e += "</tr>")),
            (e += "<tr>"),
            (e += '<td class="PriceB1" colspan="2">'),
            (e += "<div class='seat-cat-container'>"),
            (e += t),
            (e += "</div>"),
            (e +=
              '<div id="Clear_' +
              g +
              '" class="canset" style="margin: 12px 12px 0 0; display:none;"><img src="//in.bmscdn.com/bmsin/SLIMG/1_4.png?v1" style="margin-bottom:-4px;" /><a href="javascript:;" onclick="fnClearSel(\'' +
              g +
              '\');" style="text-decoration:underline;">&nbsp;Clear Selaction</a></div>'),
            (e +=
              '<div id="MultiErr_' +
              g +
              '" class="canset" style="margin: 12px 12px 0 0; display:none;"><span> X </span> &nbsp; You can\'t select multiple sets categories </div>'),
            (e += "</td>"),
            (e += "</tr>");
        }
      } else if (((o = p.catagories), 0 == a.length)) {
        for (var u = "", g = "", l = 0; l < p.catagories.length; l++)
          a.push(p.catagories[l]),
            null != ObjTT[ObjCatagories[p.catagories[l]].AreaCode]
              ? ((u +=
                  0 == l
                    ? ObjTT[ObjCatagories[p.catagories[l]].AreaCode]
                        .CatagoryName
                    : " & " +
                      ObjTT[ObjCatagories[p.catagories[l]].AreaCode]
                        .CatagoryName),
                (n =
                  "Rs. " +
                  removeDecimalPrice(
                    ObjTT[
                      ObjCatagories[p.catagories[l]].AreaCode
                    ].Price.toFixed(2)
                  )))
              : (u +=
                  0 == l
                    ? ObjCatagories[p.catagories[l]].AreaName
                    : " & " + ObjCatagories[p.catagories[l]].AreaName),
            (g = ObjCatagories[p.catagories[l]].AreaCode);
        (e += "<tr>"),
          (e += '<td class="PriceB1" colspan="2">'),
          (e += '<div class="seatP">' + n + " " + u + "</div>"),
          (e +=
            '<div id="Clear_' +
            g +
            '" class="canset" style="margin: 12px 12px 0 0; display:none;"><img src="//in.bmscdn.com/bmsin/SLIMG/1_4.png?v1" style="margin-bottom:-4px;" /><a href="javascript:;" onclick="fnClearSel(\'' +
            g +
            '\');" style="text-decoration:underline;">&nbsp;Clear Selaction</a></div>'),
          (e +=
            '<div id="MultiErr_' +
            g +
            '" class="canset" style="margin: 12px 12px 0 0; display:none;"><span> X </span> &nbsp; You can\'t select multiple sets categories </div>'),
          (e += "</td>"),
          (e += "</tr>");
      } else {
        var m = !1,
          u = "",
          g = "",
          n = "";
        if ((m = !_.isEqual(a, p.catagories) ? !0 : m)) {
          for (a = [], l = 0; l < p.catagories.length; l++)
            a.push(p.catagories[l]),
              void 0 !== ObjTT[ObjCatagories[p.catagories[l]].AreaCode]
                ? ((u +=
                    0 == l
                      ? ObjTT[ObjCatagories[p.catagories[l]].AreaCode]
                          .CatagoryName
                      : " & " +
                        ObjTT[ObjCatagories[p.catagories[l]].AreaCode]
                          .CatagoryName),
                  (n =
                    "Rs. " +
                    removeDecimalPrice(
                      ObjTT[
                        ObjCatagories[p.catagories[l]].AreaCode
                      ].Price.toFixed(2)
                    )))
                : (u +=
                    0 == l
                      ? ObjCatagories[p.catagories[l]].AreaName
                      : " & " + ObjCatagories[p.catagories[l]].AreaName),
              (g = ObjCatagories[p.catagories[l]].AreaCode);
          (e += "<tr>"),
            (e += '<td colspan="2">&nbsp;</td>'),
            (e += "</tr>"),
            (e += "<tr>"),
            (e += '<td class="PriceB1" colspan="2">'),
            (e += '<div class="seatP">' + n + " " + u + "</div>"),
            (e +=
              '<div id="Clear_' +
              g +
              '" class="canset" style="margin: 12px 12px 0 0; display:none;"><img src="//in.bmscdn.com/bmsin/SLIMG/1_4.gif?v1" style="margin-bottom:-4px;" /><a href="javascript:;" onclick="fnClearSel(\'' +
              g +
              '\');" style="text-decoration:underline;">&nbsp;Clear Selaction</a></div>'),
            (e +=
              '<div id="MultiErr_' +
              g +
              '" class="canset" style="margin: 12px 12px 0 0; display:none;"><span> X </span> &nbsp; You can\'t select multiple sets categories </div>'),
            (e += "</td>"),
            (e += "</tr>");
        }
      }
      (e += "<tr>"),
        (e += '<td><div class="seatR Setrow1">' + r + "</div></td>"),
        (e += '<td class="SRow1">');
      for (var b = p.seats, h = 0; h < b.length; h++) {
        if ("0" == b[h].seattype) e += '<div class="seatI">&nbsp;</div>';
        else {
          if (isCoupleSeats) {
            var C = !1,
              y = b[h].catcode,
              k = !1,
              T = p.rowcode;
            if (void 0 !== ObjGroupSeats[y] && void 0 !== ObjGroupSeats[y][T])
              for (var v in ObjGroupSeats[y][T])
                for (
                  var B = ObjGroupSeats[y][T][v].SeatId.split("~"), w = 0;
                  w < B.length;
                  w++
                )
                  $.trim(B[w].split("^")[1]) == $.trim(b[h].seatno) &&
                    (0 == w && (k = !0), w == B.length - 1 && (C = !0));
          }
          if (null != ObjGroupSeats[b[h].catcode])
            if (null != ObjGroupSeats[b[h].catcode][p.rowcode]) {
              for (
                var D = ObjGroupSeats[b[h].catcode][p.rowcode], M = !1, I = 0;
                I < D.length;
                I++
              )
                if (fnGnSeatNo(b[h].seatno, "SUB") == D[I].StartSeat) {
                  for (
                    var O = parseInt(D[I].Plus, 10) + 1,
                      x = b[h].seattype,
                      A = b[h].seatno,
                      j = [],
                      P = h + 1;
                    P <= h + (O - 1);
                    P++
                  )
                    j.push(b[P].seatno);
                  for (
                    var N = b[h].catcode + "_" + p.rowcode + "_" + A,
                      E = b[h].catcode + "_" + p.rowcode + "_" + A,
                      L = 0;
                    L < j.length;
                    L++
                  )
                    (N += "_" + b[h].catcode + "_" + p.rowcode + "_" + j[L]),
                      (E += "|" + b[h].catcode + "_" + p.rowcode + "_" + j[L]);
                  (e +=
                    '<div id="' +
                    N +
                    '" class="seatI"><a href="javascript:;" onclick="fnSelectSeat(\'' +
                    E +
                    '\');"><img src="//in.bmscdn.com/bmsin/SLIMG/' +
                    O +
                    "_" +
                    x +
                    '.png?v1" /></a></div>'),
                    (h += parseInt(D[I].Plus, 10)),
                    (M = !0);
                }
              M ||
                ((F = intSeatNo = ""),
                (V = fnGetPopupMsg(b[h].seatPopMsg, "buytickets")),
                (-1 === $.inArray(glBT.VenAppType, arrShowSeat) &&
                  "Y" != arrShowInfo[0].ShowSeatNo) ||
                  (intSeatNo = getSeatNumber(b[h].shSeatNo)),
                "1" == b[h].seattype ||
                "7" == b[h].seattype ||
                "8" == b[h].seattype ||
                "4" == b[h].seattype
                  ? -1 == $.inArray(b[h].catcode, d)
                    ? (e +=
                        '<div class="seatI"><a class="_blocked" href="javascript:;">' +
                        intSeatNo +
                        "</a></div>")
                    : (e += k
                        ? "" != F && 0 < F
                          ? "" != V
                            ? fnMakeSeatHTML(
                                b[h].catcode,
                                p.rowcode,
                                b[h].seatno,
                                b[h].seattype,
                                intSeatNo,
                                !0,
                                !0,
                                V,
                                !0,
                                !1
                              )
                            : fnMakeSeatHTML(
                                b[h].catcode,
                                p.rowcode,
                                b[h].seatno,
                                b[h].seattype,
                                intSeatNo,
                                !0,
                                !1,
                                "",
                                !0,
                                !1
                              )
                          : "" != V
                          ? fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !0,
                              V,
                              !1,
                              !1
                            )
                          : fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !1,
                              "",
                              !1,
                              !1
                            )
                        : C
                        ? "" != F && 0 < F
                          ? "" != V
                            ? fnMakeSeatHTML(
                                b[h].catcode,
                                p.rowcode,
                                b[h].seatno,
                                b[h].seattype,
                                intSeatNo,
                                !0,
                                !0,
                                V,
                                !0,
                                !0
                              )
                            : fnMakeSeatHTML(
                                b[h].catcode,
                                p.rowcode,
                                b[h].seatno,
                                b[h].seattype,
                                intSeatNo,
                                !0,
                                !1,
                                "",
                                !0,
                                !0
                              )
                          : "" != V
                          ? fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !0,
                              V,
                              !1,
                              !0
                            )
                          : fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !1,
                              "",
                              !1,
                              !0
                            )
                        : fnMakeSeatHTML(
                            b[h].catcode,
                            p.rowcode,
                            b[h].seatno,
                            b[h].seattype,
                            intSeatNo,
                            !1,
                            !1,
                            "",
                            "" != F && 0 < F,
                            !1
                          ))
                  : (e += isCoupleSeats
                      ? k
                        ? fnMakeBlockedSeatHTML(
                            intSeatNo,
                            b[h].seattype,
                            !0,
                            !1
                          )
                        : C
                        ? fnMakeBlockedSeatHTML(
                            intSeatNo,
                            b[h].seattype,
                            !0,
                            !0
                          )
                        : fnMakeBlockedSeatHTML(
                            intSeatNo,
                            b[h].seattype,
                            !1,
                            !1
                          )
                      : fnMakeBlockedSeatHTML(
                          intSeatNo,
                          b[h].seattype,
                          !1,
                          !1
                        )));
            } else {
              var F = (intSeatNo = ""),
                V = fnGetPopupMsg(b[h].seatPopMsg, "buytickets");
              (-1 === $.inArray(glBT.VenAppType, arrShowSeat) &&
                "Y" != arrShowInfo[0].ShowSeatNo) ||
                (intSeatNo = getSeatNumber(b[h].shSeatNo)),
                "1" == b[h].seattype ||
                "7" == b[h].seattype ||
                "8" == b[h].seattype ||
                "4" == b[h].seattype
                  ? -1 == $.inArray(b[h].catcode, d)
                    ? (e +=
                        '<div class="seatI"><a class="_blocked" href="javascript:;">' +
                        intSeatNo +
                        "</a></div>")
                    : (e += k
                        ? "" != F && 0 < F
                          ? "" != V
                            ? fnMakeSeatHTML(
                                b[h].catcode,
                                p.rowcode,
                                b[h].seatno,
                                b[h].seattype,
                                intSeatNo,
                                !0,
                                !0,
                                V,
                                !0,
                                !1
                              )
                            : fnMakeSeatHTML(
                                b[h].catcode,
                                p.rowcode,
                                b[h].seatno,
                                b[h].seattype,
                                intSeatNo,
                                !0,
                                !1,
                                "",
                                !0,
                                !1
                              )
                          : "" != V
                          ? fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !0,
                              V,
                              !1,
                              !1
                            )
                          : fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !1,
                              "",
                              !1,
                              !1
                            )
                        : C
                        ? "" != F && 0 < F
                          ? "" != V
                            ? fnMakeSeatHTML(
                                b[h].catcode,
                                p.rowcode,
                                b[h].seatno,
                                b[h].seattype,
                                intSeatNo,
                                !0,
                                !0,
                                V,
                                !0,
                                !0
                              )
                            : fnMakeSeatHTML(
                                b[h].catcode,
                                p.rowcode,
                                b[h].seatno,
                                b[h].seattype,
                                intSeatNo,
                                !0,
                                !1,
                                "",
                                !0,
                                !0
                              )
                          : "" != V
                          ? fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !0,
                              V,
                              !1,
                              !0
                            )
                          : fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !1,
                              "",
                              !1,
                              !0
                            )
                        : fnMakeSeatHTML(
                            b[h].catcode,
                            p.rowcode,
                            b[h].seatno,
                            b[h].seattype,
                            intSeatNo,
                            !1,
                            !1,
                            "",
                            "" != F && 0 < F,
                            !1
                          ))
                  : (e += isCoupleSeats
                      ? k
                        ? fnMakeBlockedSeatHTML(
                            intSeatNo,
                            b[h].seattype,
                            !0,
                            !1
                          )
                        : C
                        ? fnMakeBlockedSeatHTML(
                            intSeatNo,
                            b[h].seattype,
                            !0,
                            !0
                          )
                        : fnMakeBlockedSeatHTML(
                            intSeatNo,
                            b[h].seattype,
                            !1,
                            !1
                          )
                      : fnMakeBlockedSeatHTML(
                          intSeatNo,
                          b[h].seattype,
                          !1,
                          !1
                        ));
            }
          else {
            (F = intSeatNo = ""),
              (V = fnGetPopupMsg(b[h].seatPopMsg, "buytickets"));
            (-1 === $.inArray(glBT.VenAppType, arrShowSeat) &&
              "Y" != arrShowInfo[0].ShowSeatNo) ||
              (intSeatNo = getSeatNumber(b[h].shSeatNo)),
              "1" == b[h].seattype ||
              "7" == b[h].seattype ||
              "8" == b[h].seattype ||
              "4" == b[h].seattype
                ? -1 == $.inArray(b[h].catcode, d)
                  ? (e +=
                      '<div class="seatI"><a class="_blocked" href="javascript:;">' +
                      intSeatNo +
                      "</a></div>")
                  : (e += k
                      ? "" != F && 0 < F
                        ? "" != V
                          ? fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !0,
                              V,
                              !0,
                              !1
                            )
                          : fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !1,
                              "",
                              !0,
                              !1
                            )
                        : "" != V
                        ? fnMakeSeatHTML(
                            b[h].catcode,
                            p.rowcode,
                            b[h].seatno,
                            b[h].seattype,
                            intSeatNo,
                            !0,
                            !0,
                            V,
                            !1,
                            !1
                          )
                        : fnMakeSeatHTML(
                            b[h].catcode,
                            p.rowcode,
                            b[h].seatno,
                            b[h].seattype,
                            intSeatNo,
                            !0,
                            !1,
                            "",
                            !1,
                            !1
                          )
                      : C
                      ? "" != F && 0 < F
                        ? "" != V
                          ? '<div id="' +
                            b[h].catcode +
                            "_" +
                            p.rowcode +
                            "_" +
                            b[h].seatno +
                            "\" class=\"seatI\" style='position:relative;'><div class='popupmsg'><p>" +
                            V +
                            '</p></div><a href="javascript:;" class="_available _seat-ranking-shadow add-shadow"  onclick="fnSelectSeat(\'' +
                            b[h].catcode +
                            "_" +
                            p.rowcode +
                            "_" +
                            b[h].seatno +
                            "')\">" +
                            intSeatNo +
                            "</a></div></div>"
                          : fnMakeSeatHTML(
                              b[h].catcode,
                              p.rowcode,
                              b[h].seatno,
                              b[h].seattype,
                              intSeatNo,
                              !0,
                              !1,
                              "",
                              !0,
                              !0
                            )
                        : "" != V
                        ? fnMakeSeatHTML(
                            b[h].catcode,
                            p.rowcode,
                            b[h].seatno,
                            b[h].seattype,
                            intSeatNo,
                            !0,
                            !0,
                            V,
                            !1,
                            !0
                          )
                        : fnMakeSeatHTML(
                            b[h].catcode,
                            p.rowcode,
                            b[h].seatno,
                            b[h].seattype,
                            intSeatNo,
                            !0,
                            !1,
                            "",
                            !1,
                            !0
                          )
                      : "" != F && 0 < F
                      ? fnMakeSeatHTML(
                          b[h].catcode,
                          p.rowcode,
                          b[h].seatno,
                          b[h].seattype,
                          intSeatNo,
                          !1,
                          !1,
                          "",
                          !0,
                          !1
                        )
                      : "" != V
                      ? fnMakeSeatHTML(
                          b[h].catcode,
                          p.rowcode,
                          b[h].seatno,
                          b[h].seattype,
                          intSeatNo,
                          !1,
                          !0,
                          V,
                          !1,
                          !1
                        )
                      : fnMakeSeatHTML(
                          b[h].catcode,
                          p.rowcode,
                          b[h].seatno,
                          b[h].seattype,
                          intSeatNo,
                          !1,
                          !1,
                          "",
                          !1,
                          !1
                        ))
                : (e += isCoupleSeats
                    ? k
                      ? fnMakeBlockedSeatHTML(intSeatNo, b[h].seattype, !0, !1)
                      : C
                      ? fnMakeBlockedSeatHTML(intSeatNo, b[h].seattype, !0, !0)
                      : fnMakeBlockedSeatHTML(intSeatNo, b[h].seattype, !1, !1)
                    : fnMakeBlockedSeatHTML(intSeatNo, b[h].seattype, !1, !1));
          }
        }
        "88" == b[h].seattype &&
          (ObjCheckList.SelectedSeats.push(E),
          (ObjCheckList.TotalSeats = parseInt(ObjCheckList.TotalSeats, 10) - O),
          fnMakeSSString());
      }
      e += "</tr>";
    }
    (e += "</table>"),
      $("#fnbcall").html(""),
      $("#shfnb").hide(),
      $("#seatcall,#evcomp").show(),
      $("#bksmile").hide(),
      $("#layout").css({ width: 32 * intMaxRowLength + 50 + "px" }),
      $("#layout").html(e),
      $("#seatlayoutbox").show(),
      $("html").addClass("no-scroll"),
      $("#dismiss").attr("onclick", "fnClCallout()"),
      $("#disback").attr("onclick", "fnClCallout()"),
      "" == $("#intQty").text()
        ? (showQuantitySelectionModal(),
          setTimeout(function () {
            (wow.scroll = !0), wow.scrollHandler();
          }, 100),
          (blnQtySel = !0))
        : (fnSQty(),
          setTimeout(function () {
            fnDateChkCoachmark();
          }, 200)),
      setDefaultQuantity(),
      $("#strVenName").html(strVenueName),
      renderMoreShowTime(),
      fnMakeSeatLegends(),
      document.querySelector(".seat-legend-info.status-4") &&
        (document
          .querySelector(".seat-legend-info.status-4")
          .addEventListener("mouseenter", function () {
            $(".__best-legend-message").show(),
              $(".__best-legend-message-text").html(customSeatInfoText);
          }),
        document
          .querySelector(".seat-legend-info.status-4")
          .addEventListener("mouseleave", function () {
            $(".__best-legend-message").hide();
          })),
      $("#STotal").parent().show(),
      fnCheckIfAllSessionsHaveSeatlayout()
        ? ($(".no-of-tickets").attr(
            "onclick",
            'javascript:BMS.Misc.modal("qty-sel", 1);$(".__seat-action").hide();$("#snackbar").hide();'
          ),
          $(".no-of-tickets").show())
        : $(".no-of-tickets").attr(
            "onclick",
            'fnSelSh(event, "' +
              glBT.SVC +
              '", "' +
              glBT.SSID +
              '", "' +
              glBT.SEC +
              '", "' +
              glBT.SST +
              '", "", false);'
          ),
      $(".icon-u,.icon-ua,.icon-a").hide(),
      showEventCensor(),
      BMS.Misc.fnBusy(!1),
      handlePopups.freezeDocument(),
      $("#prePay").hide(),
      $("#seat-layout").show(),
      $(".seat-layout-header").show(),
      $("#subSeat").hide(),
      $("#btnseatdisab").hide(),
      $("#btn-paylater").hide(),
      $("#no_seat").show();
    $("#mobshtime > li").on("click", function () {
      BMS.Misc.modal("show-sel", !1), handlePopups.releaseDocument();
    });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnMakeSL", err: e });
  }
}
function fnMakeSeatHTML(e, t, a, o, n, s, r, i, l, c) {
  var d = "";
  return (
    (n = fnMakeCustomSeatSVG(o, n, !1)),
    !c && s && 4 == o
      ? (d += '<div class="sofa_seat _best">')
      : !c && s && (d += '<div class="sofa_seat">'),
    (d += r
      ? '<div id="' +
        e +
        "_" +
        t +
        "_" +
        a +
        '" data-seat-type="' +
        o +
        "\" class=\"seatI\" style='position:relative;'>                        <div class='popupmsg'>                            <p>" +
        i +
        '</p>                        </div>                        <a href="javascript:;" class="_available" onclick="fnSelectSeat(\'' +
        e +
        "_" +
        t +
        "_" +
        a +
        "')\">                            " +
        n +
        "                        </a>                    </div>"
      : 4 == o
      ? '<div id="' +
        e +
        "_" +
        t +
        "_" +
        a +
        '" data-seat-type="' +
        o +
        '" class="seatI">                        <a href="javascript:;" class="_available _best" onclick="fnSelectSeat(\'' +
        e +
        "_" +
        t +
        "_" +
        a +
        "')\">                            " +
        n +
        "                        </a>                    </div>"
      : '<div id="' +
        e +
        "_" +
        t +
        "_" +
        a +
        '" data-seat-type="' +
        o +
        '" class="seatI">                        <a href="javascript:;" class="_available" onclick="fnSelectSeat(\'' +
        e +
        "_" +
        t +
        "_" +
        a +
        "')\">                            " +
        n +
        "                        </a>                    </div>"),
    c && (d += "</div>"),
    d
  );
}
function fnMakeBlockedSeatHTML(e, t, a, o) {
  var n = "";
  e = fnMakeCustomSeatSVG(t, e, !0);
  var s = "_blocked";
  return (
    !o &&
      a &&
      (9 == t && (isSocialDistancing = !0),
      (n += "<div class='sofa_seat _blocked'>")),
    9 != t || a || (isSocialDistancing = !0),
    (n +=
      '<div class="seatI"><a class="' +
      (s = a ? "" : s) +
      '" href="javascript:;">' +
      e +
      "</a></div>"),
    o && (n += "</div>"),
    n
  );
}
function fnSetClearSelectionSeatHTML(e, t, a, o, n) {
  var s = "";
  (a = fnMakeCustomSeatSVG(o, a, !1)),
    (s =
      "4" == o
        ? '<a class="_available _best"  onclick="fnSelectSeat(\'' +
          t +
          '\');" href="javascript:;">' +
          a +
          "</a>"
        : '<a class="_available"  onclick="fnSelectSeat(\'' +
          t +
          '\');" href="javascript:;">' +
          a +
          "</a>"),
    $("#" + e).html(s);
}
function fnMakeCustomSeatSVG(e, t, a) {
  a = a ? "#eeeeee" : "#1EA83C";
  return 7 == e
    ? '<div class="seat-svg-container">                    <?xml version="1.0" encoding="UTF-8"?>                    <svg class="seat-handicapped" width="16" height="16"  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42331 4.17023C8.24351 4.17023 8.90841 3.50533 8.90841 2.68513C8.90841 1.86494 8.24351 1.20004 7.42331 1.20004C6.60312 1.20004 5.93822 1.86494 5.93822 2.68513C5.93822 3.50533 6.60312 4.17023 7.42331 4.17023ZM5.29617 14.8035C6.58486 15.0606 7.90206 14.5198 8.63822 13.4313C8.76589 13.2489 8.78182 13.0107 8.67956 12.8129C8.57731 12.6151 8.37376 12.4904 8.15111 12.4891C7.96057 12.4847 7.78053 12.5762 7.67172 12.7327C7.17955 13.4909 6.25296 13.8429 5.38149 13.6028C4.51002 13.3628 3.89446 12.5858 3.86001 11.6826C3.82557 10.7793 4.38017 9.95776 5.23083 9.652C5.47404 9.56933 5.63859 9.34215 5.64131 9.08529C5.64036 8.88885 5.5436 8.70524 5.38208 8.59342C5.22057 8.4816 5.01465 8.45566 4.83045 8.52392C3.44852 9.0198 2.56709 10.3766 2.67568 11.8408C2.78427 13.305 3.85621 14.5169 5.29617 14.8035ZM6.53226 10.7046C6.53226 11.1967 6.9312 11.5957 7.42331 11.5957H10.0965C10.1989 11.5957 10.2941 11.6484 10.3483 11.7353L11.7146 13.85C11.8782 14.1094 12.1636 14.2665 12.4702 14.2659C12.795 14.2663 13.0943 14.0901 13.2514 13.8058C13.4085 13.5215 13.3985 13.1743 13.2253 12.8996L11.859 10.7848C11.4793 10.1777 10.8125 9.81021 10.0965 9.81357H8.61139C8.44735 9.81357 8.31437 9.68059 8.31437 9.51655V8.77401V6.69488V5.95233C8.31437 5.46022 7.91543 5.06128 7.42331 5.06128C6.9312 5.06128 6.53226 5.46022 6.53226 5.95233V10.7046Z" fill="' +
        a +
        '"/>                    </svg>                </div>'
    : 8 == e
    ? '<div class="seat-svg-container">                    <?xml version="1.0" encoding="UTF-8"?>                    <svg class="seat-companion" version="1.1" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">                        <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M2.5947 1.2C3.36504 1.2 3.98952 1.8505 3.98952 2.65294C3.98952 3.45538 3.36504 4.10588 2.5947 4.10588C1.82436 4.10588 1.19987 3.45538 1.19987 2.65294C1.19987 1.8505 1.82436 1.2 2.5947 1.2ZM9.15934 4.40173C9.96178 4.40173 10.6123 3.75123 10.6123 2.94879C10.6123 2.14635 9.96178 1.49585 9.15934 1.49585C8.35691 1.49585 7.7064 2.14635 7.7064 2.94879C7.7064 3.75123 8.35691 4.40173 9.15934 4.40173ZM7.07826 14.8048C8.33904 15.0564 9.62773 14.5272 10.348 13.4623C10.4729 13.2838 10.4884 13.0508 10.3884 12.8573C10.2884 12.6638 10.0892 12.5418 9.87139 12.5405C9.68498 12.5362 9.50883 12.6257 9.40238 12.7788C8.92087 13.5206 8.01434 13.865 7.16173 13.6301C6.30913 13.3953 5.70689 12.6352 5.67319 11.7514C5.63949 10.8677 6.18209 10.064 7.01433 9.76484C7.25228 9.68396 7.41326 9.4617 7.41592 9.21039C7.415 9.01821 7.32032 8.83857 7.16231 8.72918C7.00429 8.61978 6.80283 8.5944 6.62262 8.66118C5.27061 9.14633 4.40826 10.4738 4.5145 11.9062C4.62074 13.3387 5.66947 14.5244 7.07826 14.8048ZM8.28758 10.7947C8.28758 11.2761 8.67788 11.6664 9.15934 11.6664H11.7746C11.8748 11.6664 11.968 11.7181 12.0211 11.803L13.3578 13.872C13.5178 14.1258 13.797 14.2795 14.097 14.2788C14.4148 14.2793 14.7076 14.1068 14.8613 13.8287C15.015 13.5506 15.0052 13.2109 14.8357 12.9421L13.499 10.8731C13.1276 10.2791 12.4752 9.91963 11.7746 9.92291H10.3217C10.1612 9.92291 10.0311 9.79281 10.0311 9.63232V8.90585V6.87173V6.14526C10.0311 5.6638 9.64081 5.2735 9.15934 5.2735C8.67788 5.2735 8.28758 5.6638 8.28758 6.14526V10.7947ZM1.58285 13.8945L1.62194 5.7738C1.62327 5.43836 1.83875 5.14254 2.16379 5.02993C2.48884 4.91733 2.85615 5.01124 3.08745 5.26609L3.25322 5.4469C4.00352 6.27524 5.12641 6.69382 6.24392 6.56175C6.70288 6.50819 7.12733 6.82488 7.19195 7.26909C7.25657 7.7133 6.93689 8.11683 6.47793 8.17039C5.45716 8.29122 4.41632 8.10643 3.49555 7.64089C3.45227 7.61902 3.40078 7.62012 3.35948 7.6438C3.31818 7.66748 3.29295 7.71036 3.2928 7.75713L3.29018 8.78034L3.27908 11.1135L3.26592 13.9349C3.26348 14.3824 2.88561 14.736 2.42193 14.7248C1.95824 14.7135 1.58433 14.3416 1.58677 13.8941L1.58285 13.8945Z" fill="' +
      a +
      '"/>                    </svg>                </div>'
    : 9 == e
    ? '<div class="seat-svg-container">                    <svg class="seat-social-distancing" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">                        <path d="M12.1379 1.16943L12.0615 1.14484L11.9851 1.16933L0.846942 4.73703L0.673204 4.79268V4.97512V11.7454C0.645832 18.5907 4.67116 24.8484 11.0572 27.883C11.0573 27.8831 11.0574 27.8832 11.0576 27.8832L11.9261 28.2995L12.0342 28.3513L12.1422 28.2995L13.0108 27.8832C13.0109 27.8832 13.011 27.8831 13.0111 27.883C19.3972 24.8484 23.4225 18.5907 23.3951 11.7454C23.3951 11.7453 23.3951 11.7451 23.3951 11.7449L23.3951 4.97512V4.79296L23.2218 4.73714L12.1379 1.16943Z" fill="white" stroke="white" stroke-width="0.5"/>                    </svg>                </div>'
    : t;
}
function fnShowSeatMessage(t) {
  try {
    var e,
      a = "",
      o = "";
    "undefined" != typeof aVN_details && "undefined" != typeof strVenueName
      ? (o =
          0 !=
          (e = aVN_details.filter(function (e) {
            if (e.VenueName == strVenueName) return e;
          })).length
            ? e[0].PopUpDescription
            : "")
      : "undefined" != typeof UAPI &&
        (o = UAPI.ShowDetails[0].Venues.PopUpDescription),
      "" !=
      (a =
        0 !=
        (a = o.split("|").filter(function (e) {
          if (-1 != e.indexOf(t + "=")) return e;
        })).length
          ? a[0].split(t + "=")[1]
          : "")
        ? ($(".__seat-message").show(), $(".__seat-message-text").html(a))
        : $(".__seat-message").hide();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnShowSeatMessage", err: e });
  }
}
function fnDismissSeatsMessage() {
  $(".__seat-message").hide();
}
function fnCheckIfAllSessionsHaveSeatlayout() {
  try {
    return (
      arrShowInfo.filter(function (e) {
        return "N" == e.SeatLayout;
      }).length < 1
    );
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnCheckIfAllSessionsHaveSeatlayout", err: e });
  }
}
function fnMakeSeatLegends() {
  try {
    var e = (apiVenueLegends = fnGetVenueLegendDetails()),
      t =
        '<div class="legend-icon">                                        <svg viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">                                            <path d="M12.1379 1.16943L12.0615 1.14484L11.9851 1.16933L0.846942 4.73703L0.673204 4.79268V4.97512V11.7454C0.645832 18.5907 4.67116 24.8484 11.0572 27.883C11.0573 27.8831 11.0574 27.8832 11.0576 27.8832L11.9261 28.2995L12.0342 28.3513L12.1422 28.2995L13.0108 27.8832C13.0109 27.8832 13.011 27.8831 13.0111 27.883C19.3972 24.8484 23.4225 18.5907 23.3951 11.7454C23.3951 11.7453 23.3951 11.7451 23.3951 11.7449L23.3951 4.97512V4.79296L23.2218 4.73714L12.1379 1.16943Z" fill="white" stroke="white" stroke-width="0.5"/>                                        </svg>                                    </div>';
    if (e.length) {
      for (var a = 0; a < e.length; a++)
        if (9 == e[a].status) {
          e[a].seatLegendsCustomIcon = t;
          break;
        }
    } else
      (e = [
        { label: "Sold", status: "2" },
        { label: "Available", status: "1" },
        { label: "Selected", status: "88" },
      ]),
        isSocialDistancing &&
          e.push({
            label: "Social Distancing Seat",
            status: "9",
            seatLegendsCustomIcon: t,
          });
    for (
      var o = $("#seat-legend-template")[0].innerHTML, n = "", a = 0;
      a < e.length;
      a++
    )
      4 == e[a].status &&
        ((customSeatInfoText = e[a].infoText || customSeatInfoText),
        (customSelectionText = e[a].selectionText || customSelectionText)),
        (n += BMS.Misc.Helpers.render(o, {
          seatLegendText: e[a].label,
          seatLegendClass: "status-" + e[a].status,
          seatLegendCustomIcon: e[a].seatLegendsCustomIcon || "",
        }));
    $(".seat-legends-wrapper")[0].innerHTML = n;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnMakeSeatLegends", err: e });
  }
}
function fnGetVenueLegendDetails() {
  if ("VN" == byWhat)
    return (
      BMS.Misc.Helpers.getIn(UAPI, [
        "ShowDetails",
        0,
        "Venues",
        "seatLegends",
      ]) || []
    );
  for (
    var e = BMS.Misc.Helpers.getIn(UAPI, ["ShowDetails", 0, "Venues"]) || [],
      t = [],
      a = 0;
    a < e.length;
    a++
  )
    if (e[a].VenueCode == glBT.SVC) {
      t = e[a].seatLegends;
      break;
    }
  return t;
}
function showQuantitySelectionModal() {
  BMS.Misc.modal("qty-sel", !0);
}
function setDefaultQuantity() {
  try {
    var e = $("#intQty").text().trim();
    "" != e && 0 < $("#popQty #pop_" + e).length
      ? ($("#popQty #pop_" + e).addClass("_active"),
        $(".modal .__overlay").css("display", "none"))
      : (showQuantitySelectionModal(),
        ($selectQty =
          2 <= $("#popQty li").length
            ? $($("#popQty li")[1])
            : $($("#popQty li")[0])),
        $selectQty.addClass("_active"),
        setTicketQuantity($selectQty.text()));
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "setDefaultQuantity", err: e });
  }
}
function setTicketQuantity(e) {
  try {
    (e = e || 0), $("#intQty").text(e), $("#mobintQty").text(e);
    var t = "Ticket";
    1 < parseInt(e) && (t = "Tickets"),
      $("#ticket-text").text(t),
      fnGetSVG($("#popQty ._active").attr("id"), "qtyCall", isDynamicSelector);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "setTicketQuantity", err: e });
  }
}
function renderMoreShowTime() {
  try {
    var e = getMoreShowTimesData(),
      t =
        0 < $("#more-show-time-template").length
          ? _.template($("#more-show-time-template").html())
          : "",
      a = "";
    $(".showtime-section").show(), $("#mrshtime").hide();
    for (var o = 0; o < e.length; o++) a += t(e[o]);
    $("#mrshow").removeClass("slick-initialized").html(a),
      1 < e.length && $("#mrshtime").show(),
      8 <= e.length &&
        $.getScript(getSlickScript, function (e, t, a) {
          initMoreShowTimesSlick();
        });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "renderMoreShowTime", err: e });
  }
}
function updateArrows(e) {
  var t = e.slick("slickCurrentSlide"),
    a = e.find(".slick-slide").not(".slick-cloned").length,
    o = e.find(".slick-prev"),
    e = e.find(".slick-next");
  0 === t ? o.addClass("slick-disabled") : o.removeClass("slick-disabled"),
    a - 8 <= t ? e.addClass("slick-disabled") : e.removeClass("slick-disabled");
}
function initMoreShowTimesSlick() {
  try {
    var e = $("#mrshow");
    e.slick({ infinite: !1, slidesToShow: 8, slidesToScroll: 8, autoplay: !1 });
    var t = -1;
    e.find(".slick-slide").each(function (e) {
      if ($(this).hasClass("_active")) return (t = e), !1;
    }),
      -1 !== t && e.slick("slickGoTo", t),
      updateArrows(e),
      e.on("afterChange", function () {
        updateArrows(e);
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "initMoreShowTimesSlick", err: e });
  }
}
function getMoreShowTimesData() {
  try {
    for (
      var e = ("ET" == byWhat ? objSeatData.venue : objSeatData.event)[0]
          .sessions,
        t = [],
        a = 0;
      a < e.length;
      a++
    ) {
      var o = {},
        n = e[a];
      "Y" == n.isAvailable &&
        ((o.attributes = void 0 !== n.attributes ? n.attributes : ""),
        (o.Vcode = glBT.SVC),
        (o.SSID = n.id),
        (o.Ecode = glBT.SEC),
        (o.shTime = n.time),
        (o.dolby = "N"),
        (o.isTnCPop = !0),
        (o.active = glBT.SSID == n.id ? "_active" : ""),
        (o.noAttr = o.attributes ? "" : "_noAttr"),
        (o.availabilityClass =
          "2" === n.overallAvailStatus || "1" === n.overallAvailStatus
            ? "_filling"
            : ""),
        (o.sessionData = encodeURIComponent(JSON.stringify(n))),
        t.push(o));
    }
    return t;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "getMoreShowTimesData", err: e });
  }
}
function getSeatNumber(e) {
  var t = "";
  return "" == e
    ? t
    : (t =
        0 !=
        (t =
          1 <= e.indexOf("-")
            ? ((intSeatNo = e.split("-")[1]),
              -1 != intSeatNo.search(/[a-z]/i)
                ? intSeatNo
                : parseInt(intSeatNo))
            : -1 != e.search(/[a-z]/i)
            ? e
            : parseInt(e, 10))
          ? t
          : "");
}
function fnIsSplitSeat(e) {
  return (
    (IsSplit = !1),
    (arrData = ["VS", "BT", "TG"]),
    (IsSplit = -1 !== $.inArray(e, arrData)),
    IsSplit
  );
}
function fnClearSnackBar() {
  $("#snackbar").hide();
}
function fnSelectSeat(t) {
  try {
    0 == ObjCheckList.TotalSeats && fnClearSelection();
    var e = t.split("_")[0],
      a = t.split("_")[1],
      o = t.split("_")[2];
    if (-1 != t.indexOf("_") && isCoupleSeats) {
      var n = !1;
      if (void 0 !== ObjGroupSeats[e] && void 0 !== ObjGroupSeats[e][a])
        for (var s in ObjGroupSeats[e][a]) {
          for (
            var r = ObjGroupSeats[e][a][s].SeatId.split("~"), n = !1, i = 0;
            i < r.length;
            i++
          )
            r[i].split("^")[1] == o && (n = !0);
          if (n) {
            if (
              0 == ObjCheckList.SelectedSeats.length &&
              parseInt(Qty, 10) <
                parseInt(ObjGroupSeats[e][a][s].HwManySeater, 10)
            )
              return (
                BMS.Misc.modal("tnc", !0),
                $("#dPopupMsgText").text(
                  "The seat you are trying to select is " +
                    ObjGroupSeats[e][a][s].HwManySeater +
                    " seater. And your remaining quantity is " +
                    parseInt(ObjCheckList.TotalSeats, 10) +
                    "."
                ),
                $("#btnPopupAccept").hide(),
                void $("#btnPopupCancel").hide()
              );
            if (
              0 < ObjCheckList.SelectedSeats.length &&
              0 < ObjCheckList.TotalSeats &&
              ObjCheckList.TotalSeats <
                parseInt(ObjGroupSeats[e][a][s].HwManySeater, 10) &&
              e == ObjCheckList.CatagoryToSelect
            )
              return (
                BMS.Misc.modal("tnc", !0),
                $("#dPopupMsgText").text(
                  "The seat you are trying to select is " +
                    ObjGroupSeats[e][a][s].HwManySeater +
                    " seater. And your remaining quantity is " +
                    parseInt(ObjCheckList.TotalSeats, 10) +
                    "."
                ),
                $("#btnPopupAccept").hide(),
                void $("#btnPopupCancel").hide()
              );
            if (
              0 < ObjCheckList.SelectedSeats.length &&
              0 == ObjCheckList.TotalSeats &&
              parseInt(Qty, 10) <
                parseInt(ObjGroupSeats[e][a][s].HwManySeater, 10) &&
              e == ObjCheckList.CatagoryToSelect
            )
              return (
                BMS.Misc.modal("tnc", !0),
                $("#dPopupMsgText").text(
                  "The seat you are trying to select is " +
                    ObjGroupSeats[e][a][s].HwManySeater +
                    " seater. And your remaining quantity is " +
                    parseInt(ObjCheckList.TotalSeats, 10) +
                    "."
                ),
                $("#btnPopupAccept").hide(),
                void $("#btnPopupCancel").hide()
              );
            (prevSeatID =
              ObjGroupSeats[e][a][s].SeatId.split("~")[0].split("^")[1]),
              (t = e + "_" + a + "_" + prevSeatID),
              $("#" + t)
                .parent("div")
                .addClass("sofa_seat_selected");
            break;
          }
        }
    }
    var l = t.split("|");
    if (
      ((strCatagory = l[0].split("_")[0]),
      ObjCheckList.AllowMultiCatSel ||
        (0 == ObjCheckList.SelectedSeats.length
          ? (ObjCheckList.CatagoryToSelect = strCatagory)
          : ObjCheckList.CatagoryToSelect != strCatagory &&
            (ObjCheckList.OtherCatSeat = t)),
      l.length > ObjCheckList.TotalSeats)
    )
      return;
    var c = fnGetNextSeats(fnGetRowNSeatData(l[0])),
      d = c.rowcode,
      p = c.seats;
    if (null != ObjTT[ObjCatagories[strCatagory].AreaCode])
      if ("0" != ObjTT[ObjCatagories[strCatagory].AreaCode].Rules)
        if (
          !(c = fnApplyRules(
            ObjTT[ObjCatagories[strCatagory].AreaCode].Rules,
            d,
            p
          )).blnPass
        )
          return (
            fnSLErrors("SLError", c.errMsg, "e"),
            void (0 == ObjCheckList.SelectedSeats.length && $(".canset").hide())
          );
    objSeatRankingProceed = { numberofBestSeats: 0, numberofNormalSeats: 0 };
    for (var f = 0; f < p.length; ) {
      for (var S = "", h = "", u = "", g = 0; g < p[f].HwManySeater; g++)
        (S +=
          0 == g
            ? p[f].catcode + "_" + d + "_" + p[f + g].seatno
            : "_" + p[f].catcode + "_" + d + "_" + p[f + g].seatno),
          (h +=
            0 == g
              ? p[f].catcode + "_" + d + "_" + p[f + g].seatno
              : "|" + p[f].catcode + "_" + d + "_" + p[f + g].seatno),
          (u += p[f].shSeatNo);
      fnUpdateObj(h, "N"),
        (S = S.replace(/[.]/g, "\\.")),
        (objSeatRankingProceed.numberofNormalSeats =
          objSeatRankingProceed.numberofNormalSeats + 1);
      var m = $("#" + S).data("seatType");
      (7 != m && 8 != m) ||
        ($("#" + S + " > a ").html(getSeatNumber(u)), fnShowSeatMessage(m)),
        4 == m && (objSelectedTypes["Best Seats"] += 1),
        -1 !== $.inArray(glBT.SEC, arrEventCodeForSeatIcon)
          ? $("#" + S + " > a").addClass("_selected _smiley")
          : (f % 2 == 0 &&
              isCoupleSeats &&
              $("#" + S)
                .parent()
                .addClass("sofa_seat_selected"),
            $("#" + S + " > a").addClass("_selected")),
        ObjCheckList.SelectedSeats.push(h),
        ObjCheckList.SatClrNo.push(u),
        (ObjCheckList.TotalSeats =
          parseInt(ObjCheckList.TotalSeats, 10) -
          parseInt(p[f].HwManySeater, 10)),
        (f += parseInt(p[f].HwManySeater, 10));
    }
    var b = customSelectionText.replace(
        /{.*.}/,
        objSelectedTypes["Best Seats"]
      ),
      C =
        '<div class="_best-seat">                                     <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">                                        <path fill-rule="evenodd" clip-rule="evenodd"  d="M5.80803 14.3996C5.87035 14.4183 5.93494 14.4284 6 14.4296C6.0637 14.4382 6.12827 14.4382 6.19197 14.4296C7.88967 13.8653 9.36551 12.7788 10.4085 11.3253C11.4515 9.87173 12.0083 8.12568 11.9992 6.33669V2.43122C12.006 2.3004 11.9698 2.17094 11.8962 2.06261C11.8225 1.95428 11.7154 1.87304 11.5912 1.8313L6.19197 0.0315452C6.06745 -0.0105151 5.93255 -0.0105151 5.80803 0.0315452L0.40876 1.8313C0.284589 1.87304 0.177493 1.95428 0.10383 2.06261C0.0301677 2.17094 -0.00601243 2.3004 0.000815864 2.43122V6.33669C-0.0019341 8.12056 0.557755 9.8599 1.60031 11.3074C2.64286 12.7549 4.11521 13.8369 5.80803 14.3996ZM1.20065 6.33669V2.86316L6 1.26138L10.7993 2.86316V6.33669C10.8007 7.83424 10.3407 9.29585 9.48198 10.5227C8.62326 11.7496 7.40748 12.6822 6 13.1938C4.59252 12.6822 3.37674 11.7496 2.51802 10.5227C1.65931 9.29585 1.19933 7.83424 1.20065 6.33669ZM7.47576 10.0024C7.56332 10.0035 7.65005 9.9855 7.72989 9.94954C7.80972 9.91358 7.88071 9.86058 7.93788 9.79426C7.99506 9.72794 8.03702 9.64991 8.06082 9.56565C8.08463 9.48139 8.0897 9.39294 8.07568 9.30651L7.84171 7.86671L8.83158 6.85285C8.90749 6.77358 8.9602 6.67501 8.98398 6.56786C9.00775 6.46071 9.00167 6.34909 8.96641 6.24516C8.93115 6.14122 8.86805 6.04895 8.78398 5.9784C8.69991 5.90784 8.5981 5.86169 8.48962 5.84498L7.14581 5.64101L6.54589 4.35119C6.49817 4.24645 6.42133 4.15765 6.32453 4.09538C6.22773 4.03311 6.11506 4 5.99996 4C5.88487 4 5.7722 4.03311 5.6754 4.09538C5.5786 4.15765 5.50176 4.24645 5.45404 4.35119L4.85412 5.64101L3.5103 5.84498C3.40183 5.86169 3.30002 5.90784 3.21595 5.9784C3.13188 6.04895 3.06878 6.14122 3.03352 6.24516C2.99825 6.34909 2.99218 6.46071 3.01595 6.56786C3.03973 6.67501 3.09244 6.77358 3.16835 6.85285L4.14622 7.89071L3.91225 9.33051C3.89888 9.43987 3.91589 9.55081 3.96141 9.65114C4.00693 9.75148 4.07921 9.83734 4.1703 9.89931C4.2614 9.96128 4.36781 9.99697 4.47785 10.0025C4.58789 10.0079 4.69732 9.98303 4.79413 9.93043L5.99397 9.27052L7.1938 9.93043C7.28048 9.97722 7.37732 10.0019 7.47576 10.0024ZM6.28792 8.05868C6.20004 8.00885 6.10099 7.98203 5.99996 7.98069C5.89894 7.98203 5.79989 8.00885 5.712 8.05868L5.31006 8.28065L5.39405 7.76472C5.40932 7.67205 5.40262 7.57708 5.37449 7.48747C5.34635 7.39786 5.29757 7.31611 5.23207 7.24879L4.84812 6.85285L5.35205 6.77486C5.44877 6.75981 5.54033 6.72133 5.61875 6.66277C5.69718 6.60421 5.76009 6.52736 5.80199 6.4389L5.99996 6.01296L6.19194 6.4389C6.23384 6.52736 6.29675 6.60421 6.37517 6.66277C6.4536 6.72133 6.54516 6.75981 6.64188 6.77486L7.14581 6.85285L6.76186 7.24879C6.69636 7.31611 6.64758 7.39786 6.61944 7.48747C6.59131 7.57708 6.58461 7.67205 6.59988 7.76472L6.68987 8.28065L6.28792 8.05868Z" fill="#F1B103" />                                    </svg>                                    </div>';
    (C += "<div>" + b + "</div>"),
      (C +=
        '<div class="_cross-icon" onclick="fnClearSnackBar();">                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">                                                <path style="fill:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 18 6 L 6 18 " transform="matrix(0.583333,0,0,0.583333,0,0)"/>                                                <path style="fill:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 6 6 L 18 18 " transform="matrix(0.583333,0,0,0.583333,0,0)"/>                                        </svg>                                    </div>'),
      0 < objSelectedTypes["Best Seats"]
        ? ((glBT.selectedSeatTypes = "Best Seat"),
          $("#snackbar").html(C).show())
        : $("#snackbar").hide(),
      fnMakeSSString(),
      fnUTotal(),
      $("#MulCatErr").hide(),
      $("#MulCatErr").removeClass("bounce1"),
      $("#SLHere").hide();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnSelectSeat", fnParams: t, err: e });
  }
}
function fnUTotal() {
  try {
    var e = ObjCheckList.SelectedSeats.length,
      t = ObjTT[ObjCatagories[ObjCheckList.CatagoryToSelect].AreaCode].Price;
    Qty == e
      ? ($("#btmcntbook,#cntbook").show(),
        $("#btmcntbook,#cntbook").css("display", "flex"),
        $(".__seat-action").show(),
        $("#STotal,#CpnsubTT").html(
          "Rs." + removeDecimalPrice((e * t).toFixed(2))
        ),
        $("#cpnttPrice").html("Rs." + removeDecimalPrice((e * t).toFixed(2))),
        $("#subTT").html("Rs." + removeDecimalPrice((e * t).toFixed(2))),
        $("#btnSTotal").html("Rs." + removeDecimalPrice((e * t).toFixed(2))),
        $("#btnSTotal_reserve")
          .text("Rs." + removeDecimalPrice((e * t).toFixed(2)))
          .show(),
        (TicCpnPrice = t),
        BMS.Misc.fnPushEventDataToAnalytics(
          ["WR", "KM", "WN"],
          "Selected seat",
          {
            ProductID: glBT.SEC,
            "Event Type": "MT",
            "Event Name": strEventName,
            "Venue Name": strVenueName,
            "Venue group": glBT.SVC,
            "Seat selection place": "Events page callout",
            Appcode: global.strAppCode,
            Language: objSeatData.event ? objSeatData.event[0].language : "",
            "Is Logged in": BMS.Storage.isset({ name: "ld" }) ? "Yes" : "No",
            "App Language": BMS.Storage.isset({ name: "lang" })
              ? BMS.Storage.get({ name: "lang" })
              : "eng",
            Genre: getGenre ? getGenre() : "",
          }
        ),
        $("#txtBtn").text("Proceed"),
        $("#cntbook").removeClass("ab_test_paynow"))
      : ($("#btmcntbook,#cntbook").hide(),
        $(".__seat-action").hide(),
        $("#btn-paylater").hide(),
        $("#STotal,#CpnsubTT").html(
          "Rs." + removeDecimalPrice((e * t).toFixed(2))
        ),
        $("#cpnttPrice").html("Rs." + removeDecimalPrice((e * t).toFixed(2))),
        $("#btnSTotal").html("Rs." + removeDecimalPrice((e * t).toFixed(2))),
        $("#btnSTotal_reserve").html(
          "Rs." + removeDecimalPrice((e * t).toFixed(2))
        )),
      ObjCheckList.CatagoryToSelect != strCatagory &&
        (fnClearSel(),
        Qty != e &&
          ($("#btmcntbook,#cntbook").hide(),
          $(".__seat-action").hide(),
          $("#STotal,#CpnsubTT").html(
            "Rs." + removeDecimalPrice((e * t).toFixed(2))
          ),
          $("#cpnttPrice").html("Rs." + removeDecimalPrice((e * t).toFixed(2))),
          $("#btnSTotal").html(
            "Rs." + removeDecimalPrice((e * t).toFixed(2))
          )));
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnUTotal", err: e });
  }
}
function fnMakeSSString() {
  try {
    if (0 == ObjCheckList.TotalSeats) {
      for (var e = "", t = 0, a = 0; a < ObjCheckList.SelectedSeats.length; a++)
        for (
          var o = ObjCheckList.SelectedSeats[a].split("|"), n = 0;
          n < o.length;
          n++
        ) {
          var s = o[n].split("_")[0];
          (e +=
            ObjCatagories[s].AreaCode +
            "|" +
            ObjCatagories[s].AreaID +
            "|" +
            o[n].split("_")[1] +
            "|" +
            o[n].split("_")[2] +
            "|"),
            t++;
        }
      var r = "|" + (glBT.TQ = t) + "|" + e;
      ObjCheckList.strSSeats = r;
    } else ObjCheckList.strSSeats = "";
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnMakeSSString", err: e });
  }
}
function fnClearSel() {
  try {
    $("#MulCatErr").hide(),
      $("#MulCatErr").removeClass("bounce1"),
      fnClearSelection(),
      fnSelectSeat(ObjCheckList.OtherCatSeat),
      (ObjCheckList.OtherCatSeat = "");
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnClearSel", err: e });
  }
}
function fnClearSelection() {
  try {
    for (
      var e = (objSelectedTypes["Best Seats"] = 0);
      e < ObjCheckList.SelectedSeats.length;
      e++
    ) {
      for (
        var t = ObjCheckList.SelectedSeats[e].split("|"), a = "", o = "", n = 0;
        n < t.length;
        n++
      ) {
        (a += 0 == n ? t[n] : "_" + t[n]), (o += 0 == n ? t[n] : "|" + t[n]);
        var s = $("#" + o + " a").text(),
          r = o.split("_")[2];
        clrsano = s === r ? r : s;
      }
      fnUpdateObj(ObjCheckList.SelectedSeats[e], "Y"),
        (ObjCheckList.TotalSeats = ObjCheckList.TotalSeats + t.length),
        (a = a.replace(/[.]/g, "\\.")),
        (clrsano =
          -1 !== $.inArray(glBT.VenAppType, arrShowSeat) &&
          "TG" != glBT.VenAppType
            ? isNaN(clrsano)
              ? clrsano
              : parseInt(clrsano, 10)
            : fnIsSplitSeat(glBT.VenAppType) && "Y" == arrShowInfo[0].ShowSeatNo
            ? 0 != ObjCheckList.SatClrNo[e]
              ? isNaN(ObjCheckList.SatClrNo[e])
                ? ObjCheckList.SatClrNo[e]
                : parseInt(ObjCheckList.SatClrNo[e])
              : ""
            : "SP" == glBT.VenAppType &&
              "Y" == arrShowInfo[0].ShowSeatNo &&
              "" != ObjCheckList.SatClrNo[e]
            ? ObjCheckList.SatClrNo[e]
            : "");
      var i = $("#" + a).data("seatType");
      fnSetClearSelectionSeatHTML(a, o, clrsano, i, !1);
    }
    isCoupleSeats &&
      ($("#layout").find("td > div").removeClass("sofa_seat_selected"),
      $("#layout").find("a").removeClass("_selected")),
      $("#STotal").html(""),
      $("#btnSTotal").html(""),
      $("#btnSTotal_reserve").html(""),
      fnDismissSeatsMessage(),
      (ObjCheckList.SelectedSeats = []),
      (ObjCheckList.SatClrNo = []);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnClearSelection", err: e });
  }
}
function fnUpdateObj(t, a) {
  try {
    for (
      var e = t.split("|"),
        o = e[0].split("_")[0],
        n = e[0].split("_")[1],
        s = 0;
      s < e.length;
      s++
    ) {
      for (var r = 0; r < ObjLayout.length; r++)
        if (
          ObjLayout[r].rowcode == n &&
          -1 != $.inArray(o, ObjLayout[r].catagories)
        ) {
          var i = ObjLayout[r].seats;
          break;
        }
      if (null != i && 0 != i.length)
        for (var l, c = 0; c < i.length; c++)
          i[c].seatno == e[s].split("_")[2] &&
            ((l = $("#" + e).data("seatType")
              ? $("#" + e).data("seatType")
              : "1"),
            (i[c].isavail = a),
            (i[c].seattype = "N" == a ? "88" : l));
    }
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnUpdateObj", fnParams: t + "," + a, err: e });
  }
}
function fnGetRowNSeatData(t) {
  try {
    for (
      var e = t.split("_"), a = e[0], o = e[1], n = e[2], s = {}, r = 0;
      r < ObjLayout.length;
      r++
    )
      if (
        ObjLayout[r].rowcode == o &&
        -1 != $.inArray(a, ObjLayout[r].catagories)
      ) {
        (s.SeatsDataObj = ObjLayout[r].seats), (s.RowIndex = r);
        break;
      }
    for (r = 0; r < s.SeatsDataObj.length; r++)
      if (s.SeatsDataObj[r].seatno == n) {
        (s.SeatIndex = r),
          (s.catcode = s.SeatsDataObj[r].catcode),
          (s.SeatHwManySeater = s.SeatsDataObj[r].HwManySeater);
        break;
      }
    return s;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGetRowNSeatData", fnParams: t, err: e });
  }
}
function fnGetNextSeats(t) {
  try {
    var e = t.SeatIndex,
      a = t.RowIndex,
      o = t.SeatHwManySeater,
      n = t.catcode,
      s = t.SeatsDataObj,
      r = {};
    (r.rowcode = ObjLayout[a].rowcode), (r.seats = []);
    var i,
      l = ObjCheckList.TotalSeats;
    i = ObjCheckList.AllowSingleClick ? e + parseInt(o, 10) : s.length;
    for (var c = e; c < i && null != s[c]; c++)
      if (isCoupleSeats) {
        if (
          s[c].catcode != n ||
          "Y" != s[c].isavail ||
          s[c].HwManySeater != o ||
          0 == l ||
          !checkCoupleSeat(n, r.rowcode, s[c].seatno, r.seats.length)
        )
          break;
        r.seats.push(s[c]), l--;
      } else {
        if (
          s[c].catcode != n ||
          "Y" != s[c].isavail ||
          s[c].HwManySeater != o ||
          0 == l
        )
          break;
        r.seats.push(s[c]), l--;
      }
    return r;
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnGetNextSeats", fnParams: t, err: e });
  }
}
function checkCoupleSeat(e, t, a, o) {
  try {
    var n = !1,
      s = !1;
    if (void 0 !== ObjGroupSeats[e] && void 0 !== ObjGroupSeats[e][t])
      for (var r in ObjGroupSeats[e][t])
        for (
          var i = ObjGroupSeats[e][t][r].SeatId.split("~"), l = 0;
          l < i.length;
          l++
        )
          i[l].split("^")[1] == a && (s = !0);
    if (!s) return !0;
    for (r in ObjGroupSeats[e][t])
      for (
        i = ObjGroupSeats[e][t][r].SeatId.split("~"), l = 0;
        l < i.length;
        l++
      )
        if (0 == l) {
          if (
            i[l].split("^")[1] == a &&
            ObjCheckList.TotalSeats - o >= ObjGroupSeats[e][t][r].HwManySeater
          ) {
            n = !0;
            break;
          }
        } else i[l].split("^")[1] == a && (n = !0);
    return n;
  } catch (e) {
    void 0;
  }
}
function fnApplyRules(t, a, o) {
  try {
    for (var e = parseInt(t), n = {}, s = 5; 0 <= s; s--) {
      var r = Math.pow(2, s);
      r <= e && ((e -= r), (n[r] = !0));
    }
    var i = o[0].catcode,
      l = fnGetRowNSeatData(i + "_" + a + "_" + o[0].seatno),
      c = l.RowIndex,
      d = l.SeatIndex,
      p = fnGetRowNSeatData(
        i + "_" + a + "_" + o[o.length - 1].seatno
      ).SeatIndex,
      f = { blnPass: !0, errMsg: "" },
      S = ObjLayout[c].seats[d - 1],
      h = ObjLayout[c].seats[d - 2],
      u = ObjLayout[c].seats[p + 1],
      g = ObjLayout[c].seats[p + 2];
    return (
      null != n[1] &&
        n[1] &&
        ((S && "1" == S.seattype && h && "2" == h.seattype) ||
          (u && "1" == u.seattype && g && "2" == g.seattype)) &&
        ((f.blnPass = !1),
        (f.errMsg =
          "A single seat cannot be left between your current selection and a sold seat")),
      null != n[2] &&
        n[2] &&
        ((null != ObjLayout[c].seats[d - 1] &&
          "1" == ObjLayout[c].seats[d - 1].seattype &&
          null != ObjLayout[c].seats[d - 2] &&
          "88" == ObjLayout[c].seats[d - 2].seattype) ||
          (null != ObjLayout[c].seats[p + 1] &&
            "1" == ObjLayout[c].seats[p + 1].seattype &&
            null != ObjLayout[c].seats[p + 2] &&
            "88" == ObjLayout[c].seats[p + 2].seattype)) &&
        ((f.blnPass = !1),
        (f.errMsg =
          "A single seat cannot be left between your previous and current selection")),
      null != n[4] &&
        n[4] &&
        ((null != ObjLayout[c].seats[d - 1] &&
          "1" == ObjLayout[c].seats[d - 1].seattype &&
          ((null != ObjLayout[c].seats[d - 2] &&
            "0" == ObjLayout[c].seats[d - 2].seattype) ||
            null == ObjLayout[c].seats[d - 2])) ||
          (null != ObjLayout[c].seats[p + 1] &&
            "1" == ObjLayout[c].seats[p + 1].seattype &&
            ((null != ObjLayout[c].seats[p + 2] &&
              "0" == ObjLayout[c].seats[p + 2].seattype) ||
              null == ObjLayout[c].seats[p + 2]))) &&
        ((f.blnPass = !1),
        (f.errMsg =
          "A single seat cannot be left between your current selection and the gangway")),
      f
    );
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: "fnApplyRules",
      fnParams: t + "," + a + "," + o,
      err: e,
    });
  }
}
function fnClCallout(e) {
  try {
    newShowtime && (BMS.Misc.fnBusy(!0), window.history.go(-1)),
      (objSelectedTypes["Best Seats"] = 0),
      hidelayoutBlock();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnClCallout", err: e });
  }
}
function fnSQty() {
  try {
    if (
      ($("#SLError").hide(),
      $("#QtyToolTip").removeClass("bounce"),
      $("#SLHere").addClass("bounce2"),
      $("#SLHere").show(),
      $("#STotal").html("Rs.0"),
      $("#btnSTotal").html("Rs.0"),
      (Qty = $("#intQty").text()),
      "" != Qty
        ? ($("#sdCover").hide(),
          $("#QtyToolTip").hide(),
          void 0 !== BMS.Misc.fnPushEventDataToAnalytics &&
            fnPushSelectedQuantityToAnalytics())
        : ($("#SLHere").hide(),
          $("#SLHere").removeClass("bounce2"),
          $("#MulCatErr").hide(),
          $("#sdCover").show(),
          $("#QtyToolTip").show()),
      "VN" == byWhat)
    )
      isDynamicSelector = BMS.Misc.Helpers.getIn(UAPI, [
        "ShowDetails",
        0,
        "Venues",
        "SeatSelector",
      ]);
    else {
      tempVenues = BMS.Misc.Helpers.getIn(UAPI, ["ShowDetails", 0, "Venues"]);
      for (var e = 0; e < tempVenues.length; e++)
        if (tempVenues[e].VenueCode == glBT.SVC) {
          isDynamicSelector = tempVenues[e].SeatSelector;
          break;
        }
    }
    (isDynamicSelector = 0 < Object.keys(isDynamicSelector || {}).length),
      fnGetSVG(Qty, "", isDynamicSelector),
      fnClearSelection(),
      $("#coupons_list").html(""),
      $(".canset").hide(),
      $("#prePay").hide(),
      $("#prePay-fnb").hide(),
      $("#TickType").hide(),
      $("#no_seat").show(),
      $("#btnseatdisab").hide(),
      $("#btnSTotal_reserve").html(""),
      (ObjCheckList.TotalSeats = "" == Qty ? 0 : parseInt(Qty, 10)),
      fireQuantitySelectedEvent(),
      fireSeatLayoutLoadEvent();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnSQty", err: e });
  }
}
function fnPreInit() {
  try {
    var e, t;
    BMS.Misc.fnBusy(!0),
      $("#btmcntbook,#cntbook").hide(),
      $("#btn-paylater").hide(),
      $(".__seat-action").hide(),
      $("#btnseatdisab").show(),
      0 != ObjCheckList.SelectedSeats.length
        ? 0 != ObjCheckList.TotalSeats
          ? (fnSLErrors(
              "SLError",
              "Please select exactly " + $("#intQty").text() + " seats.",
              "e"
            ),
            (i = 0),
            (j = 0),
            (e = setInterval(function () {
              $("._available").addClass("_selected"),
                1 === i && clearInterval(e),
                i++;
            }, 500)),
            (t = setInterval(function () {
              j++,
                $("._available").removeClass("_selected"),
                1 === j && clearInterval(t);
            }, 1e3)))
          : ($("#tblClassNew").hide(),
            $("html").addClass("no-scroll"),
            fnInitTransSL())
        : "" == $("#intQty").text()
        ? fnSLErrors("SLError", "Please select quantity", "e")
        : fnSLErrors(
            "SLError",
            "Please select exactly " + $("#intQty").text() + " seats.",
            "e"
          );
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnPreInit", err: e });
  }
}
function fnInitTransSL() {
  try {
    glBT.SL = "Y";
    var e = {};
    BMS.Misc.fnGetBranchFingerPrintId(e),
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: 0,
        cmd: "INITTRANS",
        advertiserId: e.id,
        fnCC: fnSLAddSeats,
        fnEC: fneSc,
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnInitTransSL", err: e });
  }
}
function fnSLAddSeats(t) {
  try {
    (lngTransId = BMS.Misc.fnGVal({ key: "TRANSACTIONID", data: t })),
      BMS.Storage.set({ name: "lngTransId", value: lngTransId, storage: "C" });
    var e = $("#intQty").text(),
      a = ObjTT[ObjCatagories[ObjCheckList.CatagoryToSelect].AreaCode].TT,
      o = BMS.Storage.get({ name: "ld", key: "LSID", defVal: "" }),
      n = BMS.Storage.get({ name: "ld", key: "MEMBERID", defVal: "" }),
      s = BMS.Storage.get({ name: "ld", key: "MEMBEREMAIL", defVal: "" }),
      r = BMS.Storage.get({ name: "ld", key: "MOBILE", defVal: "" }),
      i = {};
    r && (i["x-phone"] = r),
      o && (i["x-lsid"] = o),
      n && (i["x-member-id"] = n),
      s && (i["x-email"] = s),
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: lngTransId,
        cmd: "ADDSEATS",
        headers: i,
        p1: glBT.SSID,
        p2: a,
        p3: e,
        p4: BMS.Storage.get({ name: "strRef", defVal: "" }),
        fnCC: fnSSelectedSeats,
        fnEC: fneSc,
      });
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnSLAddSeats", fnParams: t, err: e });
  }
}
function fnSSelectedSeats(t) {
  try {
    var e = BMS.Misc.fnGVal({ key: "BOOKINGID", data: t });
    BMS.Storage.set({ name: "BOOKINGID", value: e, storage: "C" }),
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: glBT.SVC,
        transId: lngTransId,
        cmd: "SETSELECTEDSEATS",
        p1: glBT.SSID,
        p2: ObjCheckList.strSSeats,
        fnCC: fnuSI,
        fnEC: fnErrSSelSeats,
      }),
      fnPushSelectedQuantityToAnalytics();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fnSSelectedSeats", fnParams: t, err: e });
  }
}
function fnPushSelectedQuantityToAnalytics() {
  (binIsLog = BMS.Storage.isset({ name: "ld" }) ? "Yes" : "No"),
    BMS.Misc.fnPushEventDataToAnalytics(
      ["WR", "KM", "WN"],
      "Selected quantity",
      {
        ProductID: glBT.SEC,
        "Event Type": "MT",
        "Event Name": strEventName,
        "Venue Name": strVenueName,
        "Venue group": glBT.SVC,
        "Quantity seleted": $("#intQty").text(),
        "Quantity selection place": "Movies on clicking quantity",
        "Is Logged in": binIsLog,
        Appcode: global.strAppCode,
        Language: objSeatData.event ? objSeatData.event[0].language : "",
        "App Language": BMS.Storage.get({ name: "lang" })
          ? BMS.Storage.get({ name: "lang" })
          : "eng",
        Genre: getGenre ? getGenre() : "",
      }
    );
}
function fnSLErrors(t, a, o) {
  try {
    $("#QtyToolTip, #SLHere, #MulCatErr").hide(), fnCMsgDis(t, a, o);
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: "fnSLErrors",
      fnParams: t + "," + a + "," + o,
      err: e,
    });
  }
}
var getOrderType,
  deliveryTime,
  CntObj = {},
  fnbObj = [],
  fcDetails = "",
  cntFC = 0,
  TotalDiscount = 0,
  TotalFNBAmount = 0,
  intFCCount = 0,
  calcIntFCCount = 0,
  arrFCAdd = [],
  BASAmount = 0,
  isBASUpdated = !1,
  isSeatDeliveryEnabled = !1,
  mticketwrapChecked = !1,
  seatDeliveryChecked = !1,
  FnBFilters = [],
  banner_details = {},
  fnb_banners = [],
  mticketChecked = !1,
  eticketChecked = !1;
function fnGFC(t, a, o) {
  try {
    BMS.Misc.fnAjax({
      url: "/serv/getData",
      type: "GET",
      dataType: "json",
      data: {
        cmd: "GETINVENTORYDETAILS",
        type: "FD",
        vid: glBT.SVC,
        eid: glBT.SEC,
        tf: "BF",
        sc: glBT.SSID,
        transId: lngTransId,
      },
      success: function (e) {
        var t = { BookMyShow: e.foodComboBeverages };
        (banner_details = e.arrAds),
          (fnb_banners = []),
          $.each(banner_details, function (e, t) {
            "Generic" === t.CardType &&
              -1 !== t.screens.indexOf("FNB") &&
              fnb_banners.push(t);
          }),
          fnSFC(t);
      },
      error: function (e) {
        fnSFC("");
      },
    });
  } catch (e) {
    fnErr({ fnName: "fnGFC", fnParams: t + ", " + a + ", " + o, err: e });
  }
}
function fnSFC(e) {
  try {
    resetSeatDelivery();
    var t = !1;
    $("#FCDtl").html("").hide();
    var a,
      o = "";
    if (
      ($("#DT_Chandigarh").hide(),
      "" !== e && e.BookMyShow.arrFC && (cntFC = e.BookMyShow.arrFC.length),
      "" !== e &&
        e.BookMyShow.seatDelivery &&
        (void 0 === (a = e.BookMyShow.seatDelivery) ||
          ("Y" != a[0].FNBSeatDelivery &&
            "Y" != a[0].IsFNBDeliveryCompulsory) ||
          ((isSeatDeliveryEnabled = !0),
          "Y" == a[0].IsFNBDeliveryCompulsory && (getOrderType = "Y"))),
      (fcDetails = e),
      0 < cntFC)
    ) {
      var n, s, r, i, l, c;
      for (s in (1 <= fnb_banners.length
        ? ($(".fnb-offer-banner").empty(),
          $.each(fnb_banners, function (e, t) {
            "" !== t.popupGenericImageDestinationUrl &&
              ((n = t.popupGenericImageDestinationUrl),
              $(".fnb-offer-banner").append(
                '<img id="fnb-offerimage-summerybanner" src=' +
                  n +
                  ' alt="Offer Banner" />'
              ));
          }))
        : $(".fnb-offer-banner").html(
            '<img id="fnb-offerimage-summerybanner" src="' +
              strContentUrl +
              '/bmsin/fnb/offerbanner/web/web-offerbanner.jpg" alt="Offer Banner" />'
          ),
      e.BookMyShow.arrFC))
        void 0 !== e.BookMyShow.arrFC[s].ItemCode &&
          (40 < (r = e.BookMyShow.arrFC[s].ItemDesc).length &&
            (r = r.slice(0, 36) + " ..."),
          0,
          void 0 !== e.BookMyShow.arrFC[s].subItems &&
            (_.isEmpty(e.BookMyShow.arrFC[s].subItems) ||
              (e.BookMyShow.arrFC[s].ItemDesc,
              e.BookMyShow.arrFC[s].AvailableQuantity,
              e.BookMyShow.arrFC[s].ItemSell,
              _.each(e.BookMyShow.arrFC[s].subItems, function (e) {
                e.ItemDesc, e.AvailableQuantity, e.ItemSell;
              }),
              0)),
          (o +=
            "<aside class='food-card-list' data-category='" +
            e.BookMyShow.arrFC[s].FoodCategory +
            "'>"),
          (o += "<div class='food-card-image'>"),
          (o +=
            "<img src=" +
            global.fnBNewImgPath +
            e.BookMyShow.arrFC[s].FNBImageName +
            ".png onerror=\"this.src='//in.bmscdn.com/m6/images/common/food-and-bev-placeholder.png'\" width='100px' height='115px'>"),
          (o += "<span class='tag-svg'>"),
          "V" == e.BookMyShow.arrFC[s].FoodType
            ? ((o +=
                "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='14' height='14' viewBox='0 0 26 24' fill='none'>"),
              (o += "<use xlink:href='/icons/fnb-icons.svg#icon-veg'></use>"),
              (o += "</svg>"))
            : "NV" == e.BookMyShow.arrFC[s].FoodType &&
              ((o +=
                "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='14' height='14' viewBox='0 0 26 24' fill='none'>>"),
              (o +=
                "<use xlink:href='/icons/fnb-icons.svg#icon-non-veg'></use>"),
              (o += "</svg>")),
          (o += "</span>"),
          (o += "</div>"),
          (o += "<div class='food-card-details'>"),
          (o += "<div class='title-wrapper'>"),
          (o += "<h4 class='catd-title'>"),
          (o += e.BookMyShow.arrFC[s].ItemSN),
          (o += "</h4>"),
          (o += "<h6 class='card-info'>"),
          (o += e.BookMyShow.arrFC[s].ItemDesc),
          (o += "</h4>"),
          (o += "</div>"),
          (o += "<div class='card-amount'>"),
          (o += "<div class='amount'>"),
          (o += "₹" + e.BookMyShow.arrFC[s].ItemSell),
          "" != e.BookMyShow.arrFC[s].DiscountPrice &&
            "EXCLUSIVE" != e.BookMyShow.arrFC[s].DiscountPrice &&
            ((o += "<span class='display-amount'>"),
            (o += "<s>"),
            (o += "₹" + e.BookMyShow.arrFC[s].DisplayPrice),
            (o += " </s>"),
            (o += "</span>")),
          "" != e.BookMyShow.arrFC[s].DiscountPrice &&
            "EXCLUSIVE" != e.BookMyShow.arrFC[s].DiscountPrice &&
            "" == e.BookMyShow.arrFC[s].CustomPlaceholder &&
            ((o +=
              "<span class='discount-percentage'>" +
              e.BookMyShow.arrFC[s].DiscountPrice),
            (o += "</span>")),
          (o += "</div>"),
          (o += "<div class='fnb-add'>"),
          (o +=
            "<div class='add-cta add-btn' id=\"add-btn_" +
            e.BookMyShow.arrFC[s].ItemCode +
            "\" onclick=\"fnAddFC('ADD','" +
            e.BookMyShow.arrFC[s].ItemCode +
            "')\">Add"),
          (o += "</div>"),
          (o += "<div class='add-wrapper'>"),
          (o +=
            '<span id="rm_' +
            e.BookMyShow.arrFC[s].ItemCode +
            '"style="display:none;" class="icon-minus plus" onclick="fnAddFC(\'REMOVE\', \'' +
            e.BookMyShow.arrFC[s].ItemCode +
            "')\">"),
          (o += "<div class='minus-icon'>"),
          (o += "</div>"),
          (o += "</span>"),
          (o +=
            '<span id="FD_' +
            e.BookMyShow.arrFC[s].ItemCode +
            "\" class='__holder'>"),
          (o += "</span>"),
          (o +=
            '<span id="add_' +
            e.BookMyShow.arrFC[s].ItemCode +
            "\" style=\"display:none;\" class='icon-minus minus' onclick=\"fnAddFC('ADD','" +
            e.BookMyShow.arrFC[s].ItemCode +
            "')\" >"),
          (o += "<div class='plus-icon'>"),
          (o += "</div>"),
          (o += "</span>"),
          (o += "</div>"),
          (o += "</div>"),
          (o += "</div>"),
          (o += "</div>"),
          (o += "</aside>"),
          (CntObj[e.BookMyShow.arrFC[s].ItemCode] = {}),
          (CntObj[e.BookMyShow.arrFC[s].ItemCode].added = 0),
          (CntObj[e.BookMyShow.arrFC[s].ItemCode].FoodCategory =
            e.BookMyShow.arrFC[s].FoodCategory),
          (CntObj[e.BookMyShow.arrFC[s].ItemCode].FoodCategoryName =
            e.BookMyShow.arrFC[s].FoodCategoryName),
          (CntObj[e.BookMyShow.arrFC[s].ItemCode].ItemSeq =
            e.BookMyShow.arrFC[s].ItemSeq),
          (CntObj[e.BookMyShow.arrFC[s].ItemCode].ItemSell =
            e.BookMyShow.arrFC[s].ItemSell),
          "EX" != e.BookMyShow.arrFC[s].FoodCategory &&
            ((i = e.BookMyShow.arrFC[s].FoodCategory),
            (l = e.BookMyShow.arrFC[s].FoodCategoryName),
            (c = e.BookMyShow.arrCat.indexOf(l)),
            FnBFilters.push({
              FoodCategory: i,
              FoodCategoryName: l,
              FoodCategoryOrder: c,
            })),
          "EX" == e.BookMyShow.arrFC[s].FoodCategory && (t = !0),
          "SNBN" == glBT.SVC
            ? (CntObj[e.BookMyShow.arrFC[s].ItemCode].left = 10)
            : "SFSC" == glBT.SVC
            ? (CntObj[e.BookMyShow.arrFC[s].ItemCode].left = +glBT.TQ)
            : (CntObj[e.BookMyShow.arrFC[s].ItemCode].left = 5 * glBT.TQ));
      "DT" == glBT.SVC.substr(0, 2) &&
        ($("#").html(
          "The combo will be served on your seats during the interval"
        ),
        $("#ColMod").hide()),
        t &&
          1 <= FnBFilters.length &&
          $(".exclusive-fullmenu-container").show();
      var d,
        p,
        f = _.uniq(FnBFilters, function (e) {
          return e.FoodCategory;
        });
      1 <
        (f = f.sort(function (e, t) {
          return parseInt(e.FoodCategoryOrder) - parseInt(t.FoodCategoryOrder);
        })).length &&
        ((d = ""),
        (d +=
          "<span class='cat-filter _active-cat-filter' onclick=\"showFilteredCards(this, 'ALL')\">ALL</span>"),
        $.each(f, function (e, t) {
          d +=
            "<span class='cat-filter' onclick=\"showFilteredCards(this, '" +
            t.FoodCategory +
            "')\">" +
            t.FoodCategoryName.toUpperCase() +
            "</span>";
        })),
        e.BookMyShow.fnbNotes &&
          ((p = ""),
          (p += "<span>'" + e.BookMyShow.fnbNotes + "'</span>"),
          $("#fnb-flow-notes").html(p),
          $("#fnb-flow-notes").show()),
        $("#bkng-flow-filters").html(d),
        $("#fnbcall").html(o),
        $("#fdd").hide(),
        $("#bksmile").show(),
        $("#shfnb").show(),
        t
          ? ($("#bkng-flow-filters").hide(),
            $(".tabs-menu").removeClass("tabs-active"),
            $(".tabs-menu:first-child").addClass("tabs-active"),
            $("#fnbcall aside").hide(),
            $("#fnbcall aside[data-category='EX']").show())
          : $("#bkng-flow-filters").show(),
        global.blnIsTouchScreen &&
          ($("#fnbDiscount").hide(),
          $(".proceed-touch").removeClass("handleDiscount"),
          $(".touch-fnb-proceed").show(),
          $("#prePay").hide(),
          $("#TickType").hide(),
          $(".order-summarywrap").addClass("order-summarywrap-touch"),
          $(".order-summarywrap-touch").hide(),
          $(".touch-fnb-proceed").css("bottom", "0"),
          $("#fnbcont").css("position", "relative"),
          $(".touch-fnb-proceed").css("border-bottom", "0px"),
          $(".header-container").hide(),
          $(".header-container-grab-bite").show(),
          $(".offer-banner-touch").show(),
          $(".header-container-grab-bite").css({
            padding: "10px 16px",
            "text-align": "center",
          }),
          $(".offer-banner-touch > img").css({ width: "100%", height: "90px" }),
          $(".offer-banner-touch").css("margin-bottom", "-4px"),
          $(".add-ons-container").css({
            "padding-left": "0px",
            "padding-right": "0px",
          }),
          $("#bksmile").css({ "padding-left": "0px", "padding-right": "0px" }),
          t
            ? ($(".header-container-grab-bite").html(
                '<div class="grab-bite">Grab a bite</div><div class="exclusive-text">Exclusively available on BookMyShow!</div>'
              ),
              $(".grab-bite").css({
                "font-size": "14px",
                color: "#ffffff",
                "font-weight": "700",
              }),
              $(".exclusive-text").css({
                color: "#ffffff",
                "font-size": "14px",
              }))
            : ($(".header-container-grab-bite").html(
                '<div class="grab-bite">Grab a bite</div><div class="prebook-txt">Prebook your meal and save more!</div>'
              ),
              $(".prebook-txt").css("color", "#ffffff"),
              $(".prebook-txt").css({ color: "#ffffff", "font-size": "14px" }),
              $(".grab-bite").css({ "font-size": "14px", color: "#ffffff" })),
          $("#bksmile").css("padding-top", $(".bkf-header").height()),
          $(".fnb-div").on("swipeleft", function () {
            swipeCards("left");
          }),
          $(".fnb-div").on("swiperight", function () {
            swipeCards("right");
          })),
        global.blnIsTouchScreen ||
          ($(".fnb-offer-banner").show(),
          2 <= fnb_banners.length &&
            $(".fnb-offer-banner").slick({
              prevArrow:
                '<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;"><svg version="1.1" style="stroke-width: 10px; stroke: #FFF; fill: #FFF;" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-prev-arrow"></use></svg></button>',
              nextArrow:
                '<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;"><svg version="1.1" style="stroke-width: 5px; stroke: #FFF; fill: #FFF;" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-next-arrow"></use></svg></button>',
              slidesToShow: 1,
              centerMode: !1,
              variableWidth: !1,
            })),
        (TotalFNBAmount = 0),
        global.blnIsTouchScreen ||
          ($("#prePay").show(), $("#prePay-fnb").show()),
        $("#hdBksmile").hide(),
        $("#btmcntbook,#cntbook").hide(),
        $(".__seat-action").hide(),
        $("#subSeat,#btmsubSeat").hide(),
        $(".__seat-action").hide(),
        $("#OSFodCmb").show(),
        $(".price-tag .__price-tag").removeClass("all-excl-combos"),
        $(".price-tag .__price-tag").addClass("all-excl-combos");
      BMS.Misc.fnBusy(!1),
        $("#basDtl").show(),
        $("#basDtl").is(":visible") &&
          0 < $("#basPriceDesc").length &&
          1 <= glBT.TQ &&
          ((qty = glBT.TQ),
          /\+/.test($("#basPrice").html()) && $("#basPrice").html("Rs. " + qty),
          $("#basPrice").css("color", "#000000"),
          $("#basPriceDesc").html("(₹1 per ticket has been added)")),
        showLayout || $("#seat-layout").show(),
        fnShowAds();
    } else
      $("#fnbDiscount,#fnbTotal,#fdd").hide(),
        $("#FLDonation").prop("checked", !0),
        $("#seat-layout").show(),
        $("#evcomp").hide(),
        $("#bksmile").show(),
        $("#hdBksmile").show(),
        $("#BksmileOver").css("display", "block"),
        $("#DT_Chandigarh").hide(),
        $("#shfnb").hide(),
        $("#prePay").show(),
        global.blnIsTouchScreen &&
          ($(".order-summarywrap").removeClass("order-summarywrap-touch"),
          $(".order-summarywrap").show()),
        $(".touch-fnb-proceed").hide(),
        $(".fnb-offer-banner").hide(),
        $(".ticket-desc").hide(),
        global.blnIsTouchScreen || $("#fnbcont").css("margin-top", "0px"),
        $(".bkf-order-summary-container").css("margin-top", "0px"),
        $("#bksmile").css("margin-top", "20px"),
        $("#fnb-flow-notes").hide(),
        $("#prePay-fnb").hide(),
        $("#FCDtl").html("").hide(),
        BMS.Misc.fnBusy(!1),
        setTimeout(function () {
          (wow.scroll = !0), wow.scrollHandler();
        }, 100),
        handlePopups.freezeDocument(),
        $("#PayTotal").text(""),
        $("#PayTotal").parent().hide(),
        $("#prePay").removeClass("__fnb-btn"),
        $("#web_food_and_beverages").html("").hide();
  } catch (e) {
    fnErr({ fnName: "fnSFC", err: e });
  }
}
function fnShowAds() {
  try {
    var e =
        void 0 !== fcDetails.BookMyShow.fnbAdunit
          ? fcDetails.BookMyShow.fnbAdunit
          : "",
      t = (e && e.customFilters) || "",
      a = JSON.parse(global.fnbAdspotCode);
    $("#web_food_and_beverages").show(),
      BMS.Misc.serveAd(
        "web_food_and_beverages",
        a,
        {
          publisher: "bms",
          env: global.Tier,
          size: "FLUID",
          venueCode: glBT.SVC,
          heightRatio: global.blnIsTouchScreen ? 5 : 9,
          customFilters: t,
        },
        function (e) {
          "success" === e
            ? global.blnIsTouchScreen
              ? $("#bksmile") && $("#bksmile").css("margin-top", "-56px")
              : $(".bkf-order-summary-container") &&
                $(".bkf-order-summary-container").css("margin-top", "-103px")
            : ($("#web_food_and_beverages").hide(),
              $(".bkf-order-summary-container") &&
                $(".bkf-order-summary-container").css("margin-top", "0px"),
              $("#bksmile") &&
                $("#bksmile").css({
                  "margin-top": "0px",
                  "padding-top": "0px",
                }));
        },
        { type: "carousel" }
      ),
      setTimeout(function () {
        document.getElementById("adtech-sdk-wrapper") ||
          ($(".bkf-order-summary-container").css("margin-top", "0px"),
          $("#bksmile") && $("#bksmile").css("margin-top", "0px"));
      }, 500);
  } catch (e) {
    void 0;
  }
}
function fnAddFC(t, a) {
  try {
    switch (t) {
      case "ADD":
        $("#fdd").show();
        var e,
          o = "" != $("#FD_" + a).text() ? $("#FD_" + a).text() : 0;
        0 != CntObj[a].left
          ? ($("#FD_" + a).text(parseInt(o, 10) + 1),
            $("#rm_" + a).show(),
            $("#add_" + a).show(),
            $("#add-btn_" + a).hide(),
            $("#add-btn_" + a)
              .parent()
              .css("right", "8px"),
            (CntObj[a].added = parseInt(o, 10) + 1),
            global.blnIsTouchScreen &&
              ((n = parseFloat($("#total-item-counter").html().slice(1, -1))),
              $("#total-item-counter").html("(" + (parseFloat(n) + 1) + ")")),
            void 0 !== fcDetails.BookMyShow &&
              "" != fcDetails.BookMyShow.arrFC[0].DiscountPrice &&
              ($("#FCDtl").show(), $("#fdAll").html("Hide All")),
            fnUpdLft("ADD"))
          : ((e = `You can select upto <strong>${5 * glBT.TQ} Items</strong>`),
            $(".fnb-error").html(e),
            $(".fnb-error").fadeIn(),
            $(".add-btn").css("color", "#cccccc"),
            $(".add-btn").css("border-color", "#cccccc"),
            $(".plus-icon").addClass("disabled"));
        break;
      case "REMOVE":
        var n,
          o = "" != $("#FD_" + a).text() ? $("#FD_" + a).text() : 0,
          s = 0;
        if (
          (global.blnIsTouchScreen &&
            ((n = parseFloat($("#total-item-counter").html().slice(1, -1))),
            $("#total-item-counter").html("(" + (parseFloat(n) - 1) + ")")),
          0 < o)
        ) {
          for (var r in ((rmQty = parseInt(o, 10) - 1),
          0 < rmQty
            ? ($("#FD_" + a).text(rmQty),
              $("#rm_" + a).show(),
              $("#FCDtl").html(""))
            : ($("#FD_" + a).text(""),
              $("#rm_" + a).hide(),
              $("#add_" + a).hide(),
              $("#add-btn_" + a).show(),
              $("#add-btn_" + a)
                .parent()
                .css("right", "-5px")),
          (CntObj[a].added = parseInt(o, 10) - 1),
          fnUpdLft("MINUS"),
          $(".fnb-error").fadeOut(),
          $(".add-btn").css("color", ""),
          $(".add-btn").css("border-color", ""),
          $(".plus-icon").removeClass("disabled"),
          CntObj))
            s += CntObj[r].added;
          0 == s && $("#fdd").hide();
        }
    }
  } catch (e) {
    fnErr({ fnName: "fnAddFC", fnParams: t + "," + a, err: e });
  }
}
function fnUpdLft(t) {
  try {
    switch (t) {
      case "ADD":
        $.each(CntObj, function (e, t) {
          CntObj[e].left = parseInt(CntObj[e].left) - 1;
        }),
          calcIntFCCount++;
        break;
      case "MINUS":
        $.each(CntObj, function (e, t) {
          CntObj[e].left = parseInt(CntObj[e].left) + 1;
        }),
          calcIntFCCount--;
    }
    fnUpdtPrData();
  } catch (e) {
    fnErr({ fnName: "fnUpdLft", fnParams: t, err: e });
  }
}
function fnUpdtPrData() {
  try {
    $("#PayTotal").parent().show();
    var a = [];
    $.each(CntObj, function (e, t) {
      0 != CntObj[e].added ? a.push(e) : $("#FCDtl").html("");
    }),
      "" != a && $("#FCDtl").html(""),
      $("#FCDtl > li").find(".liFB").remove();
    var e = 0,
      t =
        void (TotalDiscount = TotalFNBAmount = 0) !==
        fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryCharge
          ? fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryCharge
          : 0,
      o = "";
    fnbObj = [];
    for (var n, s, r, i, l, c = 0; c < a.length; c++)
      for (var d in fcDetails.BookMyShow.arrFC)
        a[c] == fcDetails.BookMyShow.arrFC[d].ItemCode &&
          ((e +=
            parseFloat(CntObj[fcDetails.BookMyShow.arrFC[d].ItemCode].added) *
            parseFloat(fcDetails.BookMyShow.arrFC[d].ItemSell)),
          (TotalFNBAmount +=
            fcDetails.BookMyShow.arrFC[d].ItemSell *
            CntObj[fcDetails.BookMyShow.arrFC[d].ItemCode].added),
          "" != fcDetails.BookMyShow.arrFC[d].DiscountPrice &&
            "EXCLUSIVE" != fcDetails.BookMyShow.arrFC[d].DiscountPrice &&
            (TotalDiscount +=
              (fcDetails.BookMyShow.arrFC[d].DisplayPrice -
                fcDetails.BookMyShow.arrFC[d].ItemSell) *
              CntObj[fcDetails.BookMyShow.arrFC[d].ItemCode].added),
          (o += '<li class="liFB">'),
          (o += "<div>"),
          (o += "<p>"),
          (o +=
            '<span class="icon-cancel" onclick="fnRemoveAll(\'' +
            fcDetails.BookMyShow.arrFC[d].ItemCode +
            "','" +
            CntObj[fcDetails.BookMyShow.arrFC[d].ItemCode].added +
            "')\">"),
          (o +=
            "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'>"),
          (o += "<use xlink:href='/icons/common-icons.svg#icon-close'></use>"),
          (o += "</svg>"),
          (o += "</span>"),
          (o += "<span>" + fcDetails.BookMyShow.arrFC[d].ItemSN + "</span>"),
          (o +=
            " (Qt. " +
            CntObj[fcDetails.BookMyShow.arrFC[d].ItemCode].added +
            ")"),
          (o += "</p>"),
          (o += "</div>"),
          (o += "<div>"),
          (o +=
            "<span>Rs. " +
            (
              fcDetails.BookMyShow.arrFC[d].ItemSell *
              CntObj[fcDetails.BookMyShow.arrFC[d].ItemCode].added
            ).toFixed(2)),
          (o += "</span>"),
          (o += "</div>"),
          (o += "</li>"),
          (n = {
            ItemCode: fcDetails.BookMyShow.arrFC[d].ItemCode,
            added: CntObj[fcDetails.BookMyShow.arrFC[d].ItemCode].added,
            DateTime: fcDetails.BookMyShow.arrFC[d].DateTime,
            ItemDesc: fcDetails.BookMyShow.arrFC[d].ItemDesc,
            ItemType: fcDetails.BookMyShow.arrFC[d].ItemType,
          }),
          fnbObj.push(n));
    0 != t &&
      "Y" == getOrderType &&
      0 < a.length &&
      ((o += '<li class="liFB">'),
      (o += "<div>"),
      (o += "<p>"),
      (o += "<span>Seat Delivery Fees</span>"),
      (o += "</p>"),
      (o += "</div>"),
      (o += "<div>"),
      (o += "<span>Rs. " + t),
      (o += "</span>"),
      (o += "</div>"),
      (o += "</li>")),
      $("#FCDtl").html(o),
      $("#fnbTotal").html("Rs. " + TotalFNBAmount.toFixed(2)),
      0 < TotalDiscount
        ? ($("#fnbDiscount")
            .html("You saved Rs. " + TotalDiscount.toFixed(2) + "!")
            .show(),
          global.blnIsTouchScreen &&
            ($(".mticketwrap").css("bottom", "70px"),
            $(".proceed-touch").addClass("handleDiscount")))
        : ($("#fnbDiscount").html("").hide(),
          global.blnIsTouchScreen &&
            ($(".mticketwrap").css("bottom", "50px"),
            $(".proceed-touch").removeClass("handleDiscount"))),
      "" != a
        ? ($("#OSFC")
            .children()
            .children(".wt75")
            .html("Rs. " + e + ".00"),
          (r = blnInCartCoupon
            ? parseFloat(intTotAmt, 10)
            : ((s = sTot.replace("Rs.", "")), parseFloat(s, 10))),
          0 < TotalFNBAmount &&
            ((e =
              0 != t && "Y" == getOrderType
                ? parseFloat(e) + parseFloat(BASAmount) + parseFloat(t)
                : parseFloat(e) + parseFloat(BASAmount)),
            (isBASUpdated = !1)),
          $("#ttPrice,#PayTotal,#ttPrice-cart").text("Loading..."),
          $("#ttPrice").text("Rs. " + (r + e).toFixed(2)),
          $("#ttPrice-cart").text("Rs. " + (r + e).toFixed(2)),
          $("#PayTotal").text("Rs. " + (r + e).toFixed(2)),
          setTimeout(
            "$('#FCDtl').animate({'height':'show'},'fast'); $('#OSFC').animate({'height':'show'},'fast');",
            601
          ),
          isSeatDeliveryEnabled &&
            fnFCTaken() &&
            ($("#prePay").attr("onclick", "fnSeatDel()"),
            $("#prePay-fnb").attr("onclick", "fnSeatDel()")))
        : ((i = sTot.replace("Rs.", "")),
          (l = parseFloat(i, 10)),
          $("#ttPrice,#PayTotal,#ttPrice-cart").text("Loading..."),
          $("#fdd").hide(),
          $("#ttPrice").text(
            "Rs. " + (parseFloat(l) + parseFloat(BASAmount)).toFixed(2)
          ),
          $("#ttPrice-cart").text(
            "Rs. " + (parseFloat(l) + parseFloat(BASAmount)).toFixed(2)
          ),
          $("#PayTotal").text(
            "Rs. " + (parseFloat(l) + parseFloat(BASAmount)).toFixed(2)
          ),
          setTimeout(
            "$('#FCDtl').animate({'height':'hide'},'fast'); $('#OSFC').animate({'height':'hide'},'fast');",
            601
          ),
          $("#fnb_delivery_option").hide(),
          $("#fnb_pickup_option").hide(),
          $("#fnb_seat_delivery_option").hide(),
          $("#fnb_seat_interval_option").hide(),
          $("#pick_up").prop("checked", !1),
          $("#seat_delivery").prop("checked", !1),
          $("#before-show").prop("checked", !1),
          $("#at-interval").prop("checked", !1),
          $("#before_show").show(),
          $("#at_interval").show(),
          $("#fnb_seat_interval_option").removeClass("fnb_option_required"),
          $("#prePay").attr("onclick", "fnPrePay()"),
          $("#prePay-fnb").attr("onclick", "fnPrePay()"));
  } catch (e) {
    fnErr({ fnName: "fnUpdtPrData", err: e });
  }
}
function fnAddFCItm() {
  try {
    0 < cntFC && fnFCTaken()
      ? ($.each(CntObj, function (e, t) {
          0 != CntObj[e].added &&
            (intFCCount++,
            arrFCAdd.push(
              Array(e, CntObj[e].added, CntObj[e].ItemSeq, CntObj[e].ItemSell)
            ));
        }),
        fnFCCall())
      : fnGotoPay();
  } catch (e) {
    fnErr({ fnName: "fnAddFCItm", err: e });
  }
}
function fnFCTaken() {
  try {
    var a = !1;
    return (
      $.each(CntObj, function (e, t) {
        0 != parseInt(CntObj[e].added, 10) && (a = !0);
      }),
      a
    );
  } catch (e) {
    fnErr({ fnName: "fnFCTaken", err: e });
  }
}
function fnFCCall() {
  try {
    var e = [],
      a = [];
    for (
      $.each(arrFCAdd, function (e, t) {
        a.push({
          Item_lngId: t[0],
          OrderI_intQuantity: t[1],
          ItemVar_intSequence: t[2],
          OrderI_mnyPrice: t[3],
        });
      }),
        e.push({
          Order_lngId: lngTransId,
          Venue_strCode: glBT.SVC,
          Session_lngSessionId: glBT.SSID,
          Item: a,
        }),
        e = (e = JSON.stringify(e)).substring(1, e.length - 1),
        BMS.Misc.fnDoTrans({
          AppC: global.strAppCode,
          venCode: glBT.SVC,
          transId: lngTransId,
          cmd: "ADDMULTIPLEITEM",
          p1: e,
          p2: glBT.VenAppType,
          fnCC: isSeatDeliveryEnabled ? fnSDel : fnGotoPay,
          fnEC: fnCanTr,
        }),
        i = 0;
      i < fnbObj.length;
      i++
    )
      BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM", "WN"], "Select F&B", {
        "Venue Name": objBookingInfoData.SessionOrder[0].Venue_strName,
        "Quantity selected": fnbObj[i].added,
        "No of Items": fnbObj.length,
        Delivery: fnbObj[i].DateTime,
        "Merchandise Name": fnbObj[i].ItemDesc,
        Appcode: global.strAppCode,
        "Item Type": fnbObj[i].ItemType,
        "Logged In": BMS.Storage.isset({ name: "ld" }) ? "Yes" : "No",
      });
  } catch (e) {
    fnErr({ fnName: "fnFCCall", err: e });
  }
}
function fnSDel(e) {
  try {
    var t = BMS.Misc.fnGVal({ key: "BOOKINGID", data: e });
    "Y" == getOrderType
      ? BMS.Misc.fnDoTrans({
          venCode: glBT.SVC,
          transId: lngTransId,
          cmd: "SETFNBPICKUPORDELIVERY",
          p1: t,
          p2: "Y",
          p3: deliveryTime,
          p4: glBT.VenAppType,
          fnCC: fnGotoPay,
          fnEC: fnCanTr,
        })
      : fnGotoPay();
  } catch (e) {
    fnErr({ fnName: "fnSDel", err: e });
  }
}
function fnShowSeatDeliveryOption(e) {
  try {
    "pick_up" == e
      ? $("#fnb_seat_interval_option").hide()
      : $("#fnb_seat_interval_option").show();
  } catch (e) {
    void 0;
  }
}
function showBeverages() {
  try {
    $("#FCDtl").is(":visible")
      ? ($("#FCDtl").hide(),
        $(".up-icon-fandb").css("display", "inline-block"),
        $(".down-icon-fandb").hide())
      : ($("#FCDtl").show(),
        $(".down-icon-fandb").css("display", "inline-block"),
        $(".up-icon-fandb").hide());
  } catch (e) {
    void 0;
  }
}
function showFCDetails(e) {
  try {
    $("#desc_" + e).hasClass("detailed-desc")
      ? ($("#desc_" + e).removeClass("detailed-desc"),
        $("#desc_" + e + " .tr-desc").show(),
        $("#desc_" + e + " .detail-desc").hide(),
        $("#desc_" + e + " .detail-sname").addClass("item-sname"),
        $("#desc_" + e + " .qty").css("top", "35px"))
      : ($("#desc_" + e).addClass("detailed-desc"),
        $("#desc_" + e + " .tr-desc").hide(),
        $("#desc_" + e + " .detail-desc").show(),
        $("#desc_" + e + " .detail-sname").removeClass("item-sname"),
        $("#desc_" + e + " .qty").css("top", "40px"));
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "showFCDetails", fnParams: arguments, err: e });
  }
}
function fnToggleBasCheckState(e) {
  try {
    e
      ? ($("#basCheckbox").prop("disabled", !0),
        $("#basCheckbox").removeAttr("onClick"))
      : $("#basCheckbox").attr("onClick", "basUpdate(); isBASUpdated = true;");
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: "fnToggleBasCheckState",
      fnParams: arguments,
      err: e,
    });
  }
}
function basUpdate() {
  var a = glBT.TQ;
  $("#basCheckbox").html().includes("Add")
    ? (fnToggleBasCheckState(!0),
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: "BMSI",
        transId: lngTransId,
        cmd: "ADDITEMEX",
        p1: "382",
        p2: "1",
        p3: a,
        fnCC: function (e) {
          var t;
          global.blnIsTouchScreen &&
            ((t = parseFloat($("#total-item-counter").html().slice(1, -1))),
            $("#total-item-counter").html("(" + (parseFloat(t) + 1) + ")")),
            $("#basCheckbox").attr(
              "onClick",
              "basUpdate(); isBASUpdated = true;"
            ),
            (BASAmount = parseFloat(
              BMS.Misc.fnGVal({ data: e, key: "AMT" })
            ).toFixed(2));
          (e = parseFloat(
            BMS.Misc.fnGVal({ data: e, key: "TOTALTRANSAMOUNT" })
          ).toFixed(2)),
            (e =
              "Y" == getOrderType &&
              void 0 !== fcDetails.BookMyShow.seatDelivery &&
              0 != fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryCharge &&
              0 != calcIntFCCount
                ? parseFloat(e) +
                  parseFloat(TotalFNBAmount) +
                  parseFloat(
                    fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryCharge
                  )
                : parseFloat(e) + parseFloat(TotalFNBAmount));
          setTimeout(
            '$("#ttPrice").text("Rs. ' + parseFloat(e).toFixed(2) + '");',
            300
          ),
            setTimeout(
              '$("#ttPrice-cart").text("Rs. ' +
                parseFloat(e).toFixed(2) +
                '");',
              300
            ),
            setTimeout(
              '$("#PayTotal").text("Rs. ' + parseFloat(e).toFixed(2) + '");',
              300
            ),
            fnToggleBasCheckState(!1),
            $("#basCheckbox").html("Remove"),
            $("#basPrice").html("Rs. " + a),
            $("#basText").html("Donation to BookAChange"),
            $("#basPriceDesc").html("(₹1 per ticket has been added)"),
            $("#basPrice").css("color", "#000000"),
            $("#basText").css("color", "#000000");
        },
        ecObj: !0,
        fnEC: function (e) {
          $("#basCheckbox").attr(
            "onClick",
            "basUpdate(); isBASUpdated = true;"
          ),
            $("#basCheckbox").html("Add Rs. " + a);
        },
      }))
    : (fnToggleBasCheckState(!0),
      BMS.Misc.fnDoTrans({
        AppC: global.strAppCode,
        venCode: "BMSI",
        transId: lngTransId,
        cmd: "REMOVEITEMEX",
        p1: "382",
        p2: "1",
        p3: a,
        fnCC: function (e) {
          var t;
          global.blnIsTouchScreen &&
            ((t = parseFloat($("#total-item-counter").html().slice(1, -1))),
            $("#total-item-counter").html("(" + (parseFloat(t) - 1) + ")")),
            $("#basCheckbox").attr(
              "onClick",
              "basUpdate(); isBASUpdated = true;"
            ),
            (BASAmount = parseFloat(
              BMS.Misc.fnGVal({ data: e, key: "AMT" })
            ).toFixed(2));
          (e = parseFloat(
            BMS.Misc.fnGVal({ data: e, key: "TOTALTRANSAMOUNT" })
          ).toFixed(2)),
            (e =
              "Y" == getOrderType &&
              0 != fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryCharge &&
              0 != calcIntFCCount
                ? parseFloat(e) +
                  parseFloat(TotalFNBAmount) +
                  parseFloat(
                    fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryCharge
                  )
                : parseFloat(e) + parseFloat(TotalFNBAmount));
          setTimeout(
            '$("#ttPrice").text("Rs. ' + parseFloat(e).toFixed(2) + '");',
            600
          ),
            setTimeout(
              '$("#ttPrice-cart").text("Rs. ' +
                parseFloat(e).toFixed(2) +
                '");',
              300
            ),
            setTimeout(
              '$("#PayTotal").text("Rs. ' + parseFloat(e).toFixed(2) + '");',
              600
            ),
            fnToggleBasCheckState(!1),
            $("#basCheckbox").html("Add Rs. " + a),
            $("#basPrice").html("Rs. 0"),
            $("#basText").html("Donate to BookAChange"),
            $("#basPriceDesc").html("(₹1 per ticket will be added)");
        },
        ecObj: !0,
        fnEC: function (e) {
          $("#basCheckbox").attr(
            "onClick",
            "basUpdate(); isBASUpdated = true;"
          ),
            $("#basCheckbox").html("Remove");
        },
      }));
}
function fnRemoveAll(e, t) {
  try {
    for (var a = 0; a < t; a++) fnAddFC("REMOVE", e);
    global.blnIsTouchScreen && calcOverlayHeight();
  } catch (e) {
    void 0;
  }
}
function fnRemoveAllItems() {
  try {
    0 < cntFC &&
      (fnFCTaken() &&
        $.each(CntObj, function (e, t) {
          0 != CntObj[e].added && fnRemoveAll(e, CntObj[e].added);
        }),
      global.blnIsTouchScreen && calcOverlayHeight());
  } catch (e) {
    fnErr({ fnName: "fnRemoveAllItems", err: e });
  }
}
function showTaxBreakup(e, t) {
  var a = $(t).parents("li").find(".__breakdown");
  switch (e) {
    case "show":
      $(a).show(), $(t).next().show(), $(t).hide();
      break;
    case "hide":
      $(a).hide(), $(t).hide(), $(t).prev().show();
  }
}
function fnSeatDel() {
  if (isSeatDeliveryEnabled) {
    var e = fcDetails.BookMyShow.seatDelivery[0].IsFNBDeliveryCompulsory,
      t = fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryCharge,
      a = "0" == t ? "" : "Rs." + t + " will be charged as seat delivery fees.",
      o = "",
      n = fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryOptions;
    if (
      ((deliveryTime = "B"),
      $("#__seat-delivery").removeClass("_active only-sd"),
      $("#__pick-up").removeClass("_active"),
      $("#order-proceed").removeClass("order-active"),
      $("#__seat-delivery, #__pick-up, #order-proceed").off("click"),
      $("#__seat-del, #__pickup-option").hide(),
      $("#__extra-info").html(""),
      "Y" == e
        ? ((getOrderType = "Y"),
          $("#fnb-delivery").css("padding", "0px"),
          $("#__seat-del").show(),
          $(".__or-circle, .__top-circle, .__bottom-circle, #__pick-up").hide(),
          $("#__pickup-option").html(
            "This cinema only provides seat delivery."
          ),
          $("#__pickup-option").show(),
          $("#__extra-info").html(a),
          $("#__seat-delivery").addClass("only-sd"),
          $(".delivery-types").removeClass("top-space"),
          $(".__delivery-type").html("SELECT DELIVERY TIME"))
        : ($("#__seat-del, #__pickup-option").hide(),
          $(".delivery-types").addClass("top-space"),
          $(".__or-circle, .__top-circle, .__bottom-circle, #__pick-up").show(),
          $("#__pick-up").click(function () {
            $("#__seat-del").hide(),
              $("#__pickup-option").show(),
              $("#__pick-up").addClass("_active"),
              $("#__seat-delivery").removeClass("_active"),
              $("#order-proceed").addClass("order-active"),
              $("#__extra-info").html(""),
              (getOrderType = "N");
          }),
          $("#__seat-delivery").click(function () {
            $("#__pickup-option").hide(),
              $("#__seat-delivery").addClass("_active"),
              $("#__pick-up").removeClass("_active"),
              1 != n.length
                ? ($('input[type="radio"]:checked[name="delivery-time"]').prop(
                    "checked"
                  ) || $("#order-proceed").removeClass("order-active"),
                  $("#__seat-del").show())
                : $("#order-proceed").addClass("order-active"),
              $("#__extra-info").html(a),
              (getOrderType = "Y");
          })),
      _.each(n, function (e) {
        o +=
          '<label><input type="radio" name="delivery-time" data-id="' +
          e.optionId +
          '"><span class="radio-element">' +
          e.optionText +
          "</span></label>";
      }),
      1 != n.length)
    )
      $("#__seat-del").html(o);
    else {
      if ("Y" == e) return (deliveryTime = n[0].optionId), void fnPrePay();
      $("#__seat-del").hide(), (deliveryTime = n[0].optionId);
    }
    $('input[type="radio"][name="delivery-time"]').change(function () {
      (deliveryTime = $(this).data("id")),
        $("#order-proceed").addClass("order-active");
    }),
      $("#order-proceed").click(function () {
        $("#order-proceed").hasClass("order-active") &&
          (BMS.Misc.modal("fnbSeatDelivery", !1), fnPrePay());
      }),
      BMS.Misc.modal("fnbSeatDelivery", !0);
  }
}
function dispTicketType(e) {
  $(e).find("input").prop("checked", !0),
    $(".ticket-desc").show(),
    $("#shmticket").removeClass("highlight-ttype"),
    $("#shbox").removeClass("highlight-ttype"),
    $("#sheticket").removeClass("highlight-ttype"),
    $("#seatErr").hide(),
    $("#mticket").is(":checked") &&
      $(".ticket-desc").html(
        "Show the m-ticket QR Code on your mobile to enter the cinema."
      ),
    $("#box").is(":checked") &&
      $(".ticket-desc").html(
        "Select this option to pick your tickets from Box Office."
      ),
    $("#eticket").is(":checked") &&
      $(".ticket-desc").html(
        "Download the e-Ticket on your mobile. No printout needed."
      );
}
function dispOrderSummary() {
  $(".coupons_overlay").hide(),
    $(".order-summarywrap-touch #basDtl").css("background", "#fff"),
    0 < $("#basPriceDesc").length &&
      1 <= glBT.TQ &&
      ((qty = glBT.TQ),
      /\+/.test($("#basPrice").html()) && $("#basPrice").html("Rs. " + qty),
      $("#basPrice").css("color", "#000000"),
      $("#basPriceDesc").html("(₹1 per ticket has been added)")),
    $(".__totcounter").hasClass("orderSummTouch-expanded")
      ? ($("#fnbcont").css("position", "relative"),
        $(".__totcounter").removeClass("orderSummTouch-expanded"),
        $(".touch-fnb-proceed").css("bottom", "0px"),
        $(".touch-fnb-proceed").removeProp("box-shadow"),
        $(".touch-fnb-proceed").css("border-bottom", "0px"),
        $("#TickTypeForCart").hide(),
        $(".order-summarywrap").hide(),
        $(".order-sum-arrow-down").show(),
        $(".order-sum-arrow-up").hide())
      : ($("#fnbcont").css("position", "fixed"),
        $(".__totcounter").addClass("orderSummTouch-expanded"),
        $(".touch-fnb-proceed").css("bottom", "250px"),
        $(".touch-fnb-proceed").removeProp("box-shadow"),
        $(".touch-fnb-proceed").css("border-bottom", "12px solid #f2f2f2"),
        $("#TickTypeForCart").hide(),
        $(".order-summarywrap").addClass("order-summarywrap-touch"),
        $(".order-summarywrap").show(),
        $(".order-sum-arrow-down").hide(),
        $(".order-sum-arrow-up").show(),
        global.blnIsTouchScreen &&
          (calcOverlayHeight(),
          $(".order-summarywrap-touch").is(":visible") &&
            $(".coupons_overlay").click(function () {
              $(".coupons_overlay").hide(),
                $("#fnbcont").css("position", "relative"),
                $(".__totcounter").removeClass("orderSummTouch-expanded"),
                $(".touch-fnb-proceed").css("bottom", "0px"),
                $(".touch-fnb-proceed").removeProp("box-shadow"),
                $(".touch-fnb-proceed").css("border-bottom", "0px"),
                $("#TickTypeForCart").hide(),
                $(".order-summarywrap").hide(),
                $(".order-sum-arrow-down").show(),
                $(".order-sum-arrow-up").hide();
            })));
}
function resetSeatDelivery() {
  (seatDeliveryChecked = mticketwrapChecked = !1), (getOrderType = "N");
}
function showPopupForResponsive() {
  $(".mticketResponsive").hasClass("_active") && (mticketChecked = !0),
    $("#fnbcont").css("position", "relative"),
    $(".__totcounter").removeClass("orderSummTouch-expanded"),
    $(".touch-fnb-proceed").css("bottom", "0px"),
    $(".touch-fnb-proceed").removeProp("box-shadow"),
    $(".touch-fnb-proceed").css("border-bottom", "0px"),
    $(".mticketwrap").removeClass("mticketwrap-padding-sd"),
    $(".first-option").removeClass("_active"),
    $(".first-option").off("click"),
    $(".second-option").removeClass("_active"),
    $(".second-option").removeClass("only-sd"),
    $(".second-option").off("click"),
    $(".select-types").addClass("select-types-color"),
    $(".order-summarywrap, .first-option-type, .second-option-type").hide(),
    $(
      ".mticketwrap, .first-option, .__or-circle, .__top-circle, .__bottom-circle, .coupons_overlay"
    ).show(),
    $("#fnbcont").css("position", "fixed"),
    $(".coupons_overlay").css("background", "rgba(0, 0, 0, 0.5)");
  var e,
    t,
    a,
    o = "",
    n = "",
    s = "";
  "Y" != arrShowInfo[0].VenueHasETicket || mticketwrapChecked
    ? isSeatDeliveryEnabled &&
      fnFCTaken() &&
      (mticketwrapChecked || "Y" != arrShowInfo[0].VenueHasETicket) &&
      !seatDeliveryChecked
      ? ($(".select-types").removeClass("mticket-styling"),
        $(".proceed-touch").addClass("disable-proceed-touch"),
        (e = fcDetails.BookMyShow.seatDelivery[0].IsFNBDeliveryCompulsory),
        (t =
          "0" ==
          (t =
            void 0 !== fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryCharge
              ? fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryCharge
              : "0")
            ? ""
            : "Rs." + t + " will be charged as seat delivery fees."),
        (a = fcDetails.BookMyShow.seatDelivery[0].FNBDeliveryOptions),
        (o +=
          "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'>"),
        (o +=
          "<use xlink:href='/icons/fnb-icons.svg#icon-Icon_Pick-Up'></use>"),
        (o += "</svg>"),
        (o += "<span class='__fnb-text'>Pick-Up</span>"),
        (n +=
          "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'>"),
        (n +=
          "<use xlink:href='/icons/fnb-icons.svg#icon-Icon_Seat-Delivery'></use>"),
        (n += "</svg>"),
        (n += "<span class='__fnb-text'>Seat Delivery</span>"),
        _.each(a, function (e) {
          s +=
            '<label for="sd' +
            e.optionId +
            '"><input id="sd' +
            e.optionId +
            '" type="radio" name="delivery-time" data-id="' +
            e.optionId +
            '"><span class="radio-element">' +
            e.optionText +
            "</span></label>";
        }),
        (s += "<div class='extra-info'>" + t + "</div>"),
        $(".first-option").html(o),
        $(".second-option").html(n),
        $(".first-option-type").html("Pick it up anytime during the show"),
        $(".second-option-type").html(s),
        "Y" == e
          ? 1 != a.length
            ? ($(
                ".__or-circle, .__top-circle, .__bottom-circle, .first-option"
              ).hide(),
              $(".__fnb-text").addClass("fnb-font"),
              $(".second-option").addClass("only-sd"),
              $(".second-option-type, .first-option-type").show(),
              $(".first-option-type").html(
                "This cinema only provides seat delivery."
              ),
              $(".second-option").off("click"),
              $(".select-types").addClass("select-types-color"),
              $(".mticketwrap").addClass("mticketwrap-padding-sd"))
            : ((deliveryTime = a[0].optionId),
              $(
                ".order-summarywrap-touch, .mticketwrap, .coupons_overlay"
              ).hide(),
              $("#fnbcont").addClass("__relative"),
              fnPrePay())
          : $(".first-option-type").hide(),
        $(".first-option").click(function () {
          (getOrderType = "N"),
            (seatDeliveryChecked = !0),
            $(".proceed-touch").removeClass("disable-proceed-touch"),
            $(".first-option").addClass("_active"),
            $(".second-option").removeClass("_active"),
            $(".first-option-type").show(),
            $(".second-option-type").hide();
        }),
        $(".second-option").click(function () {
          (seatDeliveryChecked = !(getOrderType = "Y")),
            $(".proceed-touch").addClass("disable-proceed-touch"),
            $(".first-option").removeClass("_active"),
            $(".second-option").addClass("_active"),
            $(".first-option-type").hide(),
            1 != a.length
              ? $(".second-option-type").show()
              : ($(".second-option-type").show(),
                $(".second-option-type").children("label").hide(),
                $(".proceed-touch").removeClass("disable-proceed-touch"),
                (deliveryTime = a[0].optionId));
        }),
        $('input[type="radio"][name="delivery-time"]').change(function () {
          (seatDeliveryChecked = !0),
            $(".proceed-touch").removeClass("disable-proceed-touch"),
            (deliveryTime = $(this).data("id"));
        }))
      : ($(".order-summarywrap-touch, .mticketwrap, .coupons_overlay").hide(),
        $("#fnbcont").css("position", "relative"),
        fnPrePay())
    : ($(".select-types").addClass("mticket-styling"),
      $(".proceed-touch").addClass("disable-proceed-touch"),
      (o +=
        "<svg width='100%' height='100%' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 100 100' xml:space='preserve'>"),
      (o += "<use xlink:href='/icons/fnb-icons.svg#icon-M-Ticket'></use>"),
      (o += "</svg>"),
      "Y" == arrShowInfo[0].strHasMTTicket
        ? (o += "<span class='__fnb-text'>M-Ticket</span>")
        : (o += "<span class='__fnb-text'>E-Ticket</span>"),
      (n +=
        "<svg width='100%' height='100%' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 100 100' xml:space='preserve'>"),
      (n += "<use xlink:href='/icons/fnb-icons.svg#icon-Box-Office'></use>"),
      (n += "</svg>"),
      (n += "<span class='__fnb-text'>Box-Office Pickup</span>"),
      $(".first-option").html(o),
      $(".second-option").html(n),
      $(".first-option").attr("id", "mticket"),
      $(".second-option").attr("id", "box"),
      $(".first-option").addClass("mticketResponsive"),
      $(".second-option").addClass("boxResponsive"),
      "Y" == arrShowInfo[0].strHasMTTicket
        ? $(".first-option-type").html(
            "Download the m-Ticket on your mobile. No printout needed. Show the QR code at the cinema entrance."
          )
        : $(".first-option-type").html(
            "Download the e-Ticket on your mobile. No printout needed."
          ),
      $(".second-option-type").html(
        "Select this option to pick your tickets from Box Office."
      ),
      (n = o = ""),
      $(".first-option").click(function () {
        (mticketwrapChecked = !0),
          $(".proceed-touch").removeClass("disable-proceed-touch");
      }),
      $(".second-option").click(function () {
        (mticketwrapChecked = !0),
          $(".proceed-touch").removeClass("disable-proceed-touch");
      })),
    (isSeatDeliveryEnabled &&
      fnFCTaken() &&
      (mticketwrapChecked || "Y" != arrShowInfo[0].VenueHasETicket) &&
      !seatDeliveryChecked) ||
      ($(".first-option-type, .second-option-type").hide(),
      $(".first-option").click(function () {
        $(".first-option").addClass("_active"),
          $(".second-option").removeClass("_active"),
          $(".first-option-type").show(),
          $(".second-option-type").hide();
      }),
      $(".second-option").click(function () {
        $(".first-option").removeClass("_active"),
          $(".second-option").addClass("_active"),
          $(".first-option-type").hide(),
          $(".second-option-type").show();
      })),
    $(".mticketwrap").is(":visible") &&
      $(".coupons_overlay").click(function () {
        $("#fnbcont").css("position", "relative"),
          $(".__totcounter").removeClass("orderSummTouch-expanded"),
          $(".touch-fnb-proceed").css("bottom", "0px"),
          $(".touch-fnb-proceed").removeProp("box-shadow"),
          $(".touch-fnb-proceed").css("border-bottom", "0px"),
          $(".order-sum-arrow-down").show(),
          $(
            ".mticketwrap, .order-sum-arrow-up, .order-summarywrap, .coupons_overlay, #TickTypeForCart"
          ).hide();
      });
}
function showFilteredCards(e, t) {
  $(".cat-filter").removeClass("_active-cat-filter"),
    $(e).addClass("_active-cat-filter"),
    "ALL" == t
      ? ($("#fnbcall aside").show(),
        $("#fnbcall aside[data-category='EX']").hide())
      : ($("#fnbcall aside").hide(),
        $("#fnbcall aside[data-category=" + t + "]").show());
}
function exclFullmenuCategorization(e, t) {
  $(".exclusive-fullmenu-container .tabs-menu").removeClass("tabs-active"),
    $(e).addClass("tabs-active"),
    "EXCLUSIVE" == t
      ? ($("#bkng-flow-filters").hide(),
        $("#fnbcall aside").hide(),
        $("#fnbcall aside[data-category='EX']").show(),
        $("#text-none").html(
          "<span class='highlight-text'>Exclusively </span> available on BookMyShow!"
        ),
        $(".header-container-grab-bite").html(
          '<div class="grab-bite">Grab a bite</div><div class="exclusive-text">Exclusively available on BookMyShow!</div>'
        ),
        $(".exclusive-text").css({ color: "#ffffff", "font-size": "14px" }),
        $(".grab-bite").css({ "font-size": "14px", color: "#ffffff" }))
      : "FULL" == t &&
        ($(".cat-filter").removeClass("_active-cat-filter"),
        $(".cat-filter:first-child").addClass("_active-cat-filter"),
        $("#bkng-flow-filters").show(),
        $("#fnbcall aside").show(),
        $("#fnbcall aside[data-category='EX']").hide(),
        $("#text-none").html(
          'Prebook Your Meal and <span class="highlight-text">Save More!</span>'
        ),
        $(".header-container-grab-bite").html(
          '<div class="grab-bite">Grab a bite</div><div class="prebook-txt">Prebook Your Meal and Save More!</div>'
        ),
        $(".prebook-txt").css({ color: "#ffffff", "font-size": "14px" }),
        $(".grab-bite").css({ "font-size": "14px", color: "#ffffff" }));
}
function swipeCards(e) {
  var t,
    a = $(".tabs-active").html();
  "EXCLUSIVE MENU" != (a = a && a.trim()) &&
    ((a = $("._active-cat-filter")),
    "left" == e &&
      (a.next().trigger("click"),
      $("._active-cat-filter").visible() ||
        ((t = $("._active-cat-filter").position().left),
        $(".container-fnb-filters").scrollLeft(t))),
    "right" == e &&
      (a.prev().trigger("click"),
      $("._active-cat-filter").visible() ||
        ((t = $("._active-cat-filter").position().left),
        $(".container-fnb-filters").scrollLeft(t))));
}
function calcOverlayHeight() {
  $(".coupons_overlay").css("background", "rgba(0, 0, 0, 0.5)"),
    $(".coupons_overlay").show();
}
function fireQuantitySelectedEvent() {
  try {
    var e = new Date(),
      t = {
        app_code: global.strAppCode,
        event: "gtm_std_event",
        event_code: glBT.SEC,
        event_group: eventGroup,
        event_name: "quantity_selected",
        event_type: "click",
        experiment: "",
        category: glBT.VenAppType,
        format: eventDetails.dimension,
        genre: eventGenre,
        language: eventDetails.language,
        pagetype: "quantity_selection",
        product: "movies",
        quantity: Qty,
        session_id: BMS.Storage.get({ name: "sessionId" }),
        screen_name: "quantity_selection",
        show_date: strShowDate,
        show_session_id: glBT.SSID,
        show_time: glBT.SST,
        timestamp: e.toISOString(),
        title: strEventName,
        venue_code: glBT.SVC,
      },
      t = $.extend({}, t, BMS.Analytics.commonClickStreamParams());
    BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, t);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fireQuantitySelectedEvent", err: e });
  }
}
function fireSeatLayoutLoadEvent() {
  try {
    var e = new Date(),
      t =
        $("#layout ._blocked").length /
        ($("#layout ._available").length + $("#layout ._blocked").length),
      a = {
        app_code: global.strAppCode,
        event: "gtm_allpages",
        event_code: glBT.SEC,
        event_group: "undefined" != typeof eventGroup ? eventGroup : "",
        event_name: "seat_layout_viewed",
        event_type: "screen_view",
        eventName: "seat_layout_viewed",
        experiment: "",
        category: glBT.VenAppType,
        format: eventDetails.dimension,
        genre: eventGenre,
        language: eventDetails.language,
        occupancy_rate: t.toFixed(2),
        pagetype: "seat_layout",
        product: "movies",
        quantity: Qty,
        session_id: BMS.Storage.get({ name: "sessionId" }),
        screen_name: "seat_layout",
        seats: glBT.visibleSeats,
        show_date: strShowDate,
        show_session_id: glBT.SSID,
        show_time: glBT.SST,
        timestamp: e.toISOString(),
        title: strEventName,
        venue_code: glBT.SVC,
      };
    BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, a);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fireSeatLayoutLoadEvent", err: e });
  }
}
function fireSeatsSelectedEvent() {
  try {
    var e = new Date(),
      t = {
        app_code: global.strAppCode,
        event: "gtm_std_event",
        event_code: glBT.SEC,
        event_group: eventGroup,
        event_name: "seats_selected",
        event_type: "click",
        eventName: "seats_selected",
        experiment: "",
        category: glBT.VenAppType,
        format: eventDetails.dimension,
        genre: eventGenre,
        language: eventDetails.language,
        seat_price: TicCpnPrice,
        pagetype: "seat_layout",
        product: "movies",
        quantity: Qty,
        seats: glBT.selectedSeatTypes,
        session_id: BMS.Storage.get({ name: "sessionId" }),
        screen_name: "seat_layout",
        show_date: strShowDate,
        show_session_id: glBT.SSID,
        show_time: glBT.SST,
        timestamp: e.toISOString(),
        title: strEventName,
        venue_code: glBT.SVC,
      },
      t = $.extend({}, t, BMS.Analytics.commonClickStreamParams());
    BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, t);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fireSeatsSelectedEvent", err: e });
  }
}
function fireBookingSummaryLoadEvent() {
  try {
    var e = new Date(),
      t = {
        member_id: BMS.Storage.get({ name: "ld", key: "memberid" }),
        app_code: global.strAppCode,
        event: "gtm_allpages",
        event_name: "booking_summary_viewed",
        event_type: "screen_view",
        screen_name: "booking_summary",
        product: "movies",
        experiment: "",
        title: strEventName,
        event_code: glBT.SEC,
        venue_code: glBT.SVC,
        timestamp: e.toISOString(),
        session_id: BMS.Storage.get({ name: "sessionId" }),
        show_session_id: glBT.SSID,
        branch_standard_event_name: "ADD_TO_CART",
        branch_event_alias: "MOVIES_ADD_TO_CART",
        transaction_id: BMS.Storage.get({ name: "lngTransId", value: "" }),
        quantity: qty,
        revenue: bookingFee,
        price: bookingPrice,
        currency: "INR",
        user_mode: BMS.Storage.get({ name: "ld", key: "memberid" })
          ? "logged_in"
          : "guest",
        user_type:
          "new" ===
          (
            BMS.Storage.get({ name: "cohorts", storage: "C" }) || ""
          ).toLowerCase()
            ? "new"
            : "existing",
        audience: BMS.Storage.get({ name: "cohorts", storage: "C" }) || "",
      };
    BMS.Misc.fnPushEventDataToAnalytics(["GA", "BR"], "", {}, t);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "fireBookingSummaryLoadEvent", err: e });
  }
}
var pushLotameDataOnSummaryLoad = function () {
  try {
    var e, t, a, o, n, s, r;
    objBookingInfoData.SessionOrder &&
      objBookingInfoData.SessionOrder.length &&
      ((e = objBookingInfoData.SessionOrder[0]),
      (t = getOrderSummaryLotamePrefix()),
      (a = {}),
      (n = (
        void 0 !== (o = "" != dateSelected ? sanitizeDate(dateSelected) : "")
          ? o.toDateString()
          : ""
      ).substr(0, 3)),
      (s = getDayTimePart(e.Order_dtmShowTime)),
      (r = 0 === o.getDay() || 5 <= o.getDay() ? "Weekend" : "Weekday"),
      (a[t + ":TicketQuantity"] = e.Order_intQuantity),
      (a[t + ":TicketCategory"] =
        e.TType_strDescription + "(" + parseFloat(e.Price_curPrice) + ")"),
      (a[t + ":" + r] = n),
      (a[t + ":Date"] =
        o.getDate() + "/" + (o.getMonth() + 1) + "/" + o.getFullYear()),
      (a[t + ":Time"] = s));
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "pushAnalyticsData", err: e });
  }
};
function pushLotameDataOnProceed() {
  try {
    var e = $("input[name='tickettype']:checked").length
        ? $("input[name='tickettype']:checked")
            .parent()
            .find("label")[0]
            .innerText.trim()
        : "",
      t = getOrderSummaryLotamePrefix(),
      a = {};
    (a[t + ":FnbAddons"] = 0 < arrFCAdd.length ? "Yes" : "No"),
      (a[t + ":TicketType"] = "" !== e ? e : "M-Ticket"),
      (a[t + ":TransactionValue"] = BMS.Misc.fnGetPriceRange(
        $("#ttPrice").text().replace("Rs.", "")
      )),
      (a[t + ":Donation"] = isDonation ? "Yes" : "No"),
      pushVenueDetailsLotame();
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "pushLotameDataOnProceed", err: e });
  }
}
function getOrderSummaryLotamePrefix() {
  try {
    var e = getEventPrefix();
    return BMS.Misc.fnGetEventProductType(e) + ":OrderSummary";
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "getOrderSummaryLotamePrefix", err: e });
  }
}
function getEventPrefix() {
  try {
    return objBookingInfoData.Summary && objBookingInfoData.Summary.length
      ? objBookingInfoData.Summary[0].Event_strType
      : "MT";
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "getEventPrefix", err: e });
  }
}
var sanitizeDate = function (e) {
    try {
      return new Date(
        e.substr(0, 4) +
          "/" +
          e.substr(4, 2) +
          "/" +
          e.substr(6, 2) +
          " " +
          e.substr(8, 2) +
          ":" +
          e.substr(10, 2)
      );
    } catch (e) {
      BMS.Misc.fnErr({ fnName: "sanitizeDate", err: e });
    }
  },
  getDayTimePart = function (e) {
    try {
      var t = [
        { range: [0, 1159], text: "Morning" },
        { range: [1200, 1559], text: "Afternoon" },
        { range: [1600, 1859], text: "Evening" },
        { range: [1900, 2359], text: "Night" },
      ];
      for (index in ((time = parseInt(
        e.replace(/[a-z]/g, "").replace(/:/g, "")
      )),
      "12" === e.trim().substr(0, 2)
        ? -1 < e.indexOf("am") && (time -= 1200)
        : (time = -1 < e.indexOf("pm") ? time + 1200 : time),
      t))
        if (time >= t[index].range[0] && time <= t[index].range[1])
          return t[index].text;
    } catch (e) {
      BMS.Misc.fnErr({ fnName: "getDayTimePart", err: e });
    }
  };
function pushVenueDetailsLotame() {
  try {
    var e,
      t = {},
      a = getLotamePrefix();
    "ET" === byWhat
      ? void 0 !==
          (e = aVN_details.find(function (e) {
            return e.VenueCode === glBT.SVC;
          })) &&
        ((t[a + ":VenueLocation"] = e.VenueAdd),
        (t[a + ":Venue"] = e.VenueName))
      : (t[a + ":Venue"] = strVenueName);
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "pushVenueDetailsLotame", err: e });
  }
}
function pushPayClickLotame() {
  try {
  } catch (e) {
    BMS.Misc.fnErr({ fnName: "pushPayClickLotame", err: e });
  }
}
function fnPushNearbyVenueClickDataToAnalytics(e) {
  try {
    var t = e.dataset,
      a = BMS.Storage.get({ name: "Rgn", key: "Code" }).trim(),
      o = BMS.Storage.get({ name: "Rgn", key: "subregionDetails" }),
      n = "" != o ? JSON.parse(o).SubRegionCode.toLowerCase() : "NA",
      s = {
        event: "tvc_gtmstdevent",
        eventCategory: "nearby_cinemas_clicked",
        eventAction: "click",
        label: t.venueName,
        app_code: "WEB",
        user_mode: BMS.Storage.isset({ name: "ld" }) ? "logged_in" : "guest",
        tvc_userid: BMS.Storage.isset({ name: "ld" })
          ? BMS.Storage.get({ name: "ld", key: "memberid" })
          : "NA",
        pagetype: "cinema" == pageName ? "cinema_showtimes" : "movie_showtimes",
        page_url: window.location.href,
        in_widget_position: +t.venuePosition + 1,
        bms_id: BMS.Storage.isset({ name: "bmsId" })
          ? BMS.Storage.get({ name: "bmsId" }).replace(/['"]+/g, "")
          : "NA",
        region_code: a,
        venue_code: t.venueCode,
        sub_region_code: n,
        product: "movies",
      };
    return BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, s), !0;
  } catch (e) {
    BMS.Misc.fnErr({
      fnName: "BMS.Misc.fnPushVenueClickDataToAnalytics",
      err: e,
    });
  }
}
