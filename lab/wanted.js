function fSLGlol() {
  var t =
    "0||A:A:A000:A401:A402:A403:A104:A405:A406:A407:A408:A409:A410:A411:A412:A413:A114|B:B:A000:A101:A402:A403:A104:A405:A406:A407:A408|C:C:A000:A101:A102:A103:A104:A105:A406:A407:A408:A000:A409:A410:A411:A112:A113:A114:A115|D:D:A000:A101:A102:A103:A104:A105:A106:A407:A408:A000:A409:A410:A111:A112:A113:A114:A115|E:E:A000:A101:A102:A103:A104:A105:A106:A107:A108:A000:A109:A110:A111:A112:A113:A114:A115|F:F:A000:A101:A102:A103:A104:A105:A106:A107:A108:A000:A109:A110:A111:A112:A113:A114:A115|G:G:A000:A101:A102:A103:A104:A105:A106:A107:A108:A000:A109:A110:A111:A112:A113:A114:A115|H:H:A000:A101:A102:A103:A104:A105:A106:A107:A108:A000:A109:A110:A111:A112:A113:A114:A115|";
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
    console.log(arrTA);
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
    console.log(a, o, n, s, t.split("||")[0], t.split("||")[1]);
  } catch (e) {
    console.log(e);
    BMS.Misc.fnErr({ fnName: "fSL", fnParams: t, err: e });
  }
}

function fnMakeSLx() {
  console.log(ObjLayout);
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

ObjLayout;

function fnMakeObjG() {
  t =
    "0||A:A:A000:A401:A402:A403:A104:A405:A406:A407:A408:A409:A410:A411:A412:A413:A114|B:B:A000:A101:A402:A403:A104:A405:A406:A407:A408|C:C:A000:A101:A102:A103:A104:A105:A406:A407:A408:A000:A409:A410:A411:A112:A113:A114:A115|D:D:A000:A101:A102:A103:A104:A105:A106:A407:A408:A000:A409:A410:A111:A112:A113:A114:A115|E:E:A000:A101:A102:A103:A104:A105:A106:A107:A108:A000:A109:A110:A111:A112:A113:A114:A115|F:F:A000:A101:A102:A103:A104:A105:A106:A107:A108:A000:A109:A110:A111:A112:A113:A114:A115|G:G:A000:A101:A102:A103:A104:A105:A106:A107:A108:A000:A109:A110:A111:A112:A113:A114:A115|H:H:A000:A101:A102:A103:A104:A105:A106:A107:A108:A000:A109:A110:A111:A112:A113:A114:A115|";
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
        console.log(p);
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
    console.log(e);
  }
}

// const key = CryptoJS.enc.Utf8.parse("kYp3s6v9y$B&E)H+MbQeThWmZq4t7w!z");

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
// const encryptedData = "ljxG4c60/ygSeds0vnxDH3edf1R2aQS/HAugyT3pzEYiwrwToEEndPDUIQgHMgYdN50qB4EtorPgzGfLmU76dQRZ4EKcVfUvKJVmau1ZrktcxJm9pM63prjglboUDFqIvh8DRESejHbM+uqYHi83+07QBpArK/AbtcbFTQ4AvAj10TWeoniIStFlncZscwo+2jpW211c/INznOQnvuZKongYZ+pMcJhCBfpF0SORVD9X6Ek2apfxeBgdvAGNkRkHGYfwiUpN5QevJXIgylrQ2sZKV9AMBqxpzxXHO6hK748SowH6Y8tzLLvgXXiV18FXAFRvE2PMO6shuhzmk+mtERxgoyneZwfOUO0SQq5MwgCNOAde9heMaGz/YF6VgSZxFFmkQS2FL3QbKqEIrefeae9b4lEbKgMntlzndZeOmFXv49u4nwzB9WUroUOxJIJoNoKmR/h/JGAkRuwlzTvhUl9b8vOl3rEKdcmfN0ET2rdKsOCVUo4BT/hlFz/kN358V6S12zLGHKkLGudwDvuhPnGSrAYvM3Ltou2O681cfIVB1Ez2FXRdPGocytpEL6C4aoB3dQgAwaDuedgELLzaojpCqySU6r7SHVll6g/eYhAIUJ9L0XBLRg4hlcMFQTW6GN4gtSCimNUi6cidCMEl7nzrBHaJka8jtcqjBGnURFDC6G3c1MhJKHEsgv9O46q13R/OpgcvUX267YKGvA7P9a5RZdwwhT5btUbnPogOe7R7rvOl+uGxLj7b4qEdLbI1NuCZ9EhzHIClwjTVLg4IGHtThJ+YmcnUdbjMYnnOxqh4UNN5gj3M6xVT+ciww/1MjtaOJ67gC0kogpWkaY9pIyFUH+8NR0cnKFyK35/jH8ISkimafXw2WjNsJ7610yxGEXyKMjBK76Ze27p5JxbhRA==";

console.log(
  "Decrypted Data:",
  decryptStrData(
    "ljxG4c60/ygSeds0vnxDH3edf1R2aQS/HAugyT3pzEYiwrwToEEndPDUIQgHMgYdN50qB4EtorPgzGfLmU76dQRZ4EKcVfUvKJVmau1ZrktcxJm9pM63prjglboUDFqIvh8DRESejHbM+uqYHi83+07QBpArK/AbtcbFTQ4AvAj10TWeoniIStFlncZscwo+2jpW211c/INznOQnvuZKongYZ+pMcJhCBfpF0SORVD9X6Ek2apfxeBgdvAGNkRkHGYfwiUpN5QevJXIgylrQ2sZKV9AMBqxpzxXHO6hK748SowH6Y8tzLLvgXXiV18FXAFRvE2PMO6shuhzmk+mtERxgoyneZwfOUO0SQq5MwgCNOAde9heMaGz/YF6VgSZxFFmkQS2FL3QbKqEIrefeae9b4lEbKgMntlzndZeOmFXv49u4nwzB9WUroUOxJIJoNoKmR/h/JGAkRuwlzTvhUl9b8vOl3rEKdcmfN0ET2rdKsOCVUo4BT/hlFz/kN358V6S12zLGHKkLGudwDvuhPnGSrAYvM3Ltou2O681cfIVB1Ez2FXRdPGocytpEL6C4aoB3dQgAwaDuedgELLzaojpCqySU6r7SHVll6g/eYhAIUJ9L0XBLRg4hlcMFQTW6GN4gtSCimNUi6cidCMEl7nzrBHaJka8jtcqjBGnURFDC6G3c1MhJKHEsgv9O46q13R/OpgcvUX267YKGvA7P9a5RZdwwhT5btUbnPogOe7R7rvOl+uGxLj7b4qEdLbI1NuCZ9EhzHIClwjTVLg4IGHtThJ+YmcnUdbjMYnnOxqh4UNN5gj3M6xVT+ciww/1MjtaOJ67gC0kogpWkaY9pIyFUH+8NR0cnKFyK35/jH8ISkimafXw2WjNsJ7610yxGEXyKMjBK76Ze27p5JxbhRA=="
  )
);

function TESTME(e) {
  try {
    console.log("Function cSL started with parameter:", e);

    // Initialize variables
    (intMaxRowLength = intSessionTotalSeats = intAvailSeats = 0),
      (aSS = new Array()),
      (aAreas = new Array()),
      (aRows = new Array()),
      (arrAreaSeat = new Array()),
      (arrSpArea = new Array()),
      (isSocialDistancing = !1);

    console.log("Variables initialized");

    if ("" != e) {
      console.log("Calling fSL with parameter:", e);
      fSL(e);
      console.log("After fSL call, arrays populated:");
      console.log("aAreas:", aAreas);
      console.log("aRows:", aRows);
    }

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

    console.log("Layout element:", p);

    if ("" != p.innerHTML) {
      console.log("Clearing layout innerHTML");
      p.innerHTML = "";
    }

    (TQ = glBT.TQ),
      (SS = ""),
      (a = $("<tbody></tbody>")),
      (t = $("<table></table>")).attr("align", "center");

    console.log("Created table and tbody elements");

    // Building the seats string
    var f = "";
    for (var S = 0; S < aAreas.length; S++)
      f += "|" + aAreas[S][1] + "-" + aAreas[S][5];

    f = (f += "|").substring(0, f.length);
    glBT.seats = f;
    console.log("Built seats string:", f);

    // Process each row
    for (var h = 0; h < aRows.length; h++) {
      console.log("Processing row index:", h, "Row data:", aRows[h]);

      if (i != aRows[h][2].substring(0, 1)) {
        console.log("New area detected");
        (o = $("<tr></tr>")), (n = $("<td></td>")).attr("colSpan", 100);
        var i = aRows[h][2].substring(0, 1),
          u = $("#rowNDSC");
        u.html("");

        // Process areas for the current row
        for (var g = 0; g < aAreas.length; g++) {
          if (!isPP) {
            u.show();
            for (S = 0; S < arrShowInfo.length; S++)
              if (
                aAreas[g][1] == arrShowInfo[S].AreaCatCode &&
                "P" == arrShowInfo[S].SeatLayoutType
              ) {
                console.log("Preview image for area:", aAreas[g][1]);
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

          if (aAreas[g][0] == i) {
            console.log("Matching area found:", aAreas[g]);
            (intSeatOffSet = parseInt(aAreas[g][5])),
              n.html(aAreas[g][3] + " Rs. " + prices[aAreas[g][1]]),
              n.addClass("seatP"),
              (c = aAreas[g][1]),
              (l = aAreas[g][2]);
          }
        }

        if ("KODG" != glBT.SVC) {
          n.addClass("cssRow"), o.append(n), a.append(o);
          console.log("Added header row for area");
        }
      }

      // Create row for seats
      (o = $("<tr></tr>")),
        (n = $("<td></td>")),
        1 < aRows[h][1].length && n.css("fontSize", "5pt"),
        n.html(aRows[h][1]),
        n.addClass("seatR Setrow1"),
        n.css({ width: "17px" }),
        n.css({ height: "17px" }),
        o.append(n);
      console.log("Created row label cell:", aRows[h][1]);

      // Process each seat in the row
      for (var m = 2; m < aRows[h].length; m++) {
        console.log("Processing seat index:", m, "Seat data:", aRows[h][m]);

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
        console.log("Seat type:", b, "Seat display text:", d);

        // Process different seat types
        switch (b) {
          case "0":
            console.log("Empty seat");
            n.css({ background: "#fafafa" }),
              n.html("&nbsp;&nbsp;&nbsp;&nbsp;");
            break;
          case "1":
            console.log("Available seat");
            s.attr("class", "_available"), intAvailSeats++;

            // Set seat ID based on venue type
            var I = "";
            if ("KODG" == glBT.SVC) {
              I =
                gAC(aRows[h][m].substring(0, 1)) +
                "_" +
                l +
                "_" +
                aRows[h][0] +
                "_" +
                aRows[h][m].substring(2);
            } else {
              if (
                "TG" == glBT.VenAppType &&
                "Y" == arrShowInfo[0].ShowSeatNo &&
                -1 != aRows[h][m].indexOf("+")
              ) {
                if (-1 != aRows[h][m].indexOf("^")) {
                  I =
                    c +
                    "_" +
                    l +
                    "_" +
                    aRows[h][0] +
                    "_" +
                    aRows[h][m].substring(2).split("+")[0];
                  n.css({ position: "relative" });
                  n.append(
                    "<div class='popupmsg'><p>" +
                      fnGetPopupMsg(
                        aRows[h][m].substring(2).split("^")[1],
                        "buytickets"
                      ) +
                      "</p></div>"
                  );
                } else {
                  I =
                    c +
                    "_" +
                    l +
                    "_" +
                    aRows[h][0] +
                    "_" +
                    aRows[h][m].substring(2).split("+")[0];
                }
              } else if (
                -1 != aRows[h][m].indexOf("^") &&
                -1 != aRows[h][m].indexOf("+")
              ) {
                I =
                  c +
                  "_" +
                  l +
                  "_" +
                  aRows[h][0] +
                  "_" +
                  aRows[h][m].substring(2).split("+")[0];
                n.css({ position: "relative" });
                n.append(
                  "<div class='popupmsg'><p>" +
                    fnGetPopupMsg(
                      aRows[h][m].substring(2).split("^")[1],
                      "buytickets"
                    ) +
                    "</p></div>"
                );
              } else {
                I = c + "_" + l + "_" + aRows[h][0] + "_" + d;
              }
            }

            console.log("Seat ID:", I);
            n.attr("id", I),
              n.mouseover(function () {
                cursor(this, "hand");
              }),
              n.tap(function () {
                selectSeats(this);
              }),
              n.append(s);

            // Handle special seat number display
            var C = "";
            if (-1 !== $.inArray(glBT.VenAppType, arrShowSeat)) {
              if ("TG" == glBT.VenAppType && "Y" == arrShowInfo[0].ShowSeatNo) {
                s.text(getSeatNumber(aRows[h][m].split("+")[1]));
                C = aRows[h][m].split("+")[0];
              } else if ("TG" != glBT.VenAppType) {
                if (-1 != aRows[h][m].indexOf("^")) {
                  s.text(getSeatNumber(aRows[h][m].substring(2).split("^")[0]));
                  C = aRows[h][m].substring(2);
                } else {
                  s.text(d);
                }
              }
            }

            C =
              -1 == aRows[h][m].substring(2).indexOf("+")
                ? aRows[h][m].substring(2)
                : aRows[h][m].substring(2).split("+")[0];

            // Handle couple seats
            if (isCoupleSeats) {
              console.log("Processing couple seat logic");
              var y,
                k,
                T = !1,
                v = "",
                B = !1;
              for (k in ObjGroupSeats) v = k;

              if (
                ((y = aRows[h][0]),
                void 0 !== ObjGroupSeats[v] && void 0 !== ObjGroupSeats[v][y])
              ) {
                for (var w in ObjGroupSeats[v][y]) {
                  for (
                    var D = ObjGroupSeats[v][y][w].SeatId.split("~"), M = 0;
                    M < D.length;
                    M++
                  ) {
                    if (D[M].split("^")[1] == C) {
                      if (0 == M) B = !0;
                      if (M == D.length - 1) T = !0;
                    }
                  }
                }
              }
            }
            break;

          case "2":
          case "3":
          case "9":
            console.log("Blocked seat type:", b);
            s.attr("class", "_blocked");
            if ("9" == aRows[h][m].substring(1, 2)) {
              isSocialDistancing = !0;
              console.log("Social distancing seat detected");
            }
            n.append(s);

            // Handle seat number display for blocked seats
            if (-1 !== $.inArray(glBT.VenAppType, arrShowSeat)) {
              if ("TG" == glBT.VenAppType && "Y" == arrShowInfo[0].ShowSeatNo) {
                d = getSeatNumber(aRows[h][m].split("+")[1].split("^")[0]);
              } else if (
                "TG" != glBT.VenAppType &&
                -1 != aRows[h][m].indexOf("^")
              ) {
                d = getSeatNumber(aRows[h][m].substring(2).split("^")[0]);
              }
            }
            s.html(fnMakeCustomSeatSVG(b, d, !0));
            break;

          case "88":
            console.log("Selected seat");
            s.attr("class", "_selected");
            var I =
              c + "_" + l + "_" + aRows[h][0] + "_" + aRows[h][m].substring(2);
            n.attr("id", I);
            SS += n.attr("id") + "|";
            n.mouseover(function () {
              cursor(this, "hand");
            });
            n.tap(function () {
              selectSeats(this);
            });
            n.append(s);
            aSS.push(n.attr("id"));
        }

        // Add seat to row, with special handling for couple seats
        if (isCoupleSeats && 1 == aRows[h][m].substring(1, 2)) {
          if (B) {
            console.log("First seat in couple");
            r = "<span class='sofa_seat'>";
            r += n[0].outerHTML;
          } else if (T) {
            console.log("Last seat in couple");
            n.attr("class", "seatI seatIlast");
            r += n[0].outerHTML + "<div class='clear'></div></span>";
            r = $(r);
            r.find("div").tap(function () {
              selectSeats(this);
            });
            o.append(r);
            r = "";
          } else if ("" != r) {
            console.log("Middle seat in couple");
            r += n[0].outerHTML;
          } else {
            console.log("Single seat");
            o.append(n);
          }
        } else {
          o.append(n);
        }
      }

      a.append(o);
      t.append(a);
      console.log("Row completed and added to table");
    }

    // Add final row and append table to layout
    o = $("<tr></tr>");
    (n = $("<td></td>")).attr("colSpan", 999);
    o.append(n);
    a.append(o);
    t.append(a);
    p.html("");
    p.append(t);
    console.log("Table appended to layout");

    // Reset Facebook pics section
    $("#fbPicsHead").hide();
    $("#fbPics").hide();
    $("#fbPics").html("");

    // Process Facebook info
    console.log("Processing Facebook info");
    var _ = "",
      O = 1;
    for (var x = 0; x < arrFBInfo.length; x++) {
      if (glBT.SVC == arrFBInfo[x][1] && glBT.SSID == arrFBInfo[x][2]) {
        if (++O % 2 == 0) {
          _ +=
            O / 2 == 1
              ? '<div id="dSlFr' + O / 2 + '" style="float: left;">'
              : '<div id="dSlFr' +
                O / 2 +
                '" style="float: left; display: none;">';
        }

        if (1 == arrFBInfo[x][3]) {
          _ +=
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
            " ticket'>";
        } else {
          _ +=
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
            " tickets'>";
        }

        if (O % 2 == 1) {
          _ += "</div>";
        }
      }
    }

    if (O % 2 != 1) {
      _ += "</div>";
    }

    // Build Facebook friends section if needed
    var A = "";
    if ("" != _) {
      console.log("Building Facebook friends section");
      A += "<span>Know where your friends are seated</span>";
      A += '<div class="fbfriends">';
      if (5 < O) {
        A += '<a class="back fbbackmar"></a>';
        A += _;
        A += '<a class="forward fbformar"></a>';
      } else {
        A += _;
      }
      A += "</div>";
      $("#fbPicsHead").show();
      $("#fbPics").html(A);
      $("#fbPics").show();
    }

    // Finish processing
    BMS.Misc.fnBusy(!1);
    handlePopups.freezeDocument();

    // Check if there are any available seats
    console.log("Available seats:", intAvailSeats);
    if (0 == intAvailSeats) {
      if (0 === $("#NoSeats").length) {
        console.log("No seats available, showing message");
        BMS.Misc.fnBusy(!1);
        hidelayoutBlock();
        BMS.Misc.modal("tnc", !0);
        $("#dPopupMsgTitle").text("NOTE").show();
        $("#dPopupMsgText").text("No Seats available for booking").show();
        $("#btnAduPopupAccept").hide();
        $("#btnPopupCancel").hide();
        $("#btnPopupOK").hide();
        $("#btnPopupAccept").hide();
        $(".modal .__overlay").css("display", "block");
        $("#btnPopupOK").bind("click", function () {
          BMS.Misc.modal("tnc", !1);
        });
        return;
      }
      $("#NoSeats").show();
    } else {
      $(".modal .__overlay").css("display", "none");
    }

    // Final UI setup
    console.log("Setting up final UI elements");
    showEventCensor();
    $("#strVenName").html(strVenueName);

    // Format date and time display
    if (-1 != strShowDate.indexOf(",")) {
      BookingDate = strShowDate.split(",");
      strWeDAY =
        "Today" == BookingDate[0] ? BookingDate[0] : BookingDate[0].slice(0, 3);
      $("#weekday,#mobweekday").text(strWeDAY);

      if (
        "undefined" != typeof pageName &&
        "home" != pageName &&
        "movies" != pageName
      ) {
        $("#date,#mobdate").text(BookingDate[1].trim().substring(0, 2));
      } else {
        $("#date,#mobdate").text(BookingDate[1].trim().substring(4, 6));
      }

      $("#strDate")
        .html(strShowDate + ", " + glBT.SST)
        .hide();
    } else {
      $("#mobile-date-container,#desktop-date-container").hide();
      $("#strDate").html(strShowDate + ", " + glBT.SST);
    }

    // Set event info
    $("#strEvtName").html(strEventName);
    $("#strLan").html(strEventLan);

    if ("" != strEvtMsg) {
      $("#strEvExp").html(strEvtMsg);
    } else {
      $("#strExp").hide();
    }

    // Set flags and render additional elements
    blnHasPopupMsg = !1;
    blnVista = !1;
    renderMoreShowTime();
    fnMakeSeatLegends();

    // Hide and show various UI elements
    $("#prePay").hide();
    $("#prePay-fnb").hide();
    $("#btmcntbook,#cntbook").hide();
    $("#btn-paylater").hide();
    $(".__seat-action").hide();
    $("#STotal").parent().hide();
    $("html").addClass("no-scroll");
    $(".modal .__overlay").css("display", "none");
    $("#seat-layout").show();
    $("#evcomp").show();

    // Set up ticket quantity selection
    if (fnCheckIfAllSessionsHaveSeatlayout()) {
      $(".no-of-tickets").attr(
        "onclick",
        'javascript:BMS.Misc.modal("qty-sel", 1);$(".__seat-action").hide();$("#snackbar").hide();'
      );
      $(".no-of-tickets").show();
    } else {
      $(".no-of-tickets").attr(
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
      );
    }

    // Final UI adjustments
    $("#bksmile").hide();
    $("#layout").css({ width: 32 * intMaxRowLength + 50 + "px" });
    $(".seat-layout-header").show();
    $("#seatlayoutbox, .showtime-section").show();

    if (global.blnIsTouchScreen) {
      $("#mob-qty").hide();
    }

    console.log("Function cSL completed successfully");
  } catch (e) {
    console.error("Error in cSL function:", e);
    BMS.Misc.fnErr({
      fnName: arguments.callee.name,
      fnParams: arguments,
      err: e,
      supp: !1,
    });
  }
}

function TESTUS(e) {
  console.log("Function fnGSL started");
  console.log("Input parameter:", e);

  try {
    var t = `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`;
    console.log("strData:", t);

    // Parse booking data if strData is not empty
    if ("" != t) {
      console.log("Processing booking data from strData");

      strBookingId = BMS.Misc.fnGVal({ key: "BOOKINGID", data: t });
      console.log("strBookingId:", strBookingId);

      strSeatInfo = BMS.Misc.fnGVal({ key: "SEATINFO", data: t });
      console.log("strSeatInfo:", strSeatInfo);

      curTicketsAmt = BMS.Misc.fnGVal({ key: "TICKETSAMT", data: t });
      console.log("curTicketsAmt:", curTicketsAmt);

      curFoodAmt = BMS.Misc.fnGVal({ key: "FOODAMT", data: t });
      console.log("curFoodAmt:", curFoodAmt);

      curBookingFee = BMS.Misc.fnGVal({ key: "BOOKINGFEE", data: t });
      console.log("curBookingFee:", curBookingFee);

      curDiscountAmt = BMS.Misc.fnGVal({ key: "DISCOUNTAMT", data: t });
      console.log("curDiscountAmt:", curDiscountAmt);

      curTotalAmt = BMS.Misc.fnGVal({ key: "TOTALAMT", data: t });
      console.log("curTotalAmt:", curTotalAmt);

      strSeatData = BMS.Misc.fnGVal({ key: "SEATDATA", data: t });
      console.log("strSeatData:", strSeatData);

      // Store booking ID in cookie
      BMS.Storage.set({
        name: "BOOKINGID",
        value: strBookingId,
        storage: "C",
      });
      console.log("Saved BOOKINGID to cookie storage");
    } else {
      // If no strData, get transaction ID from storage
      lngTransId = BMS.Storage.get({ name: "lngTransId", value: "" });
      console.log("No strData, retrieved lngTransId from storage:", lngTransId);
    }

    // Determine whether to show seat layout
    console.log(
      "Current values - glBT.SLF:",
      glBT.SLF,
      "blnException:",
      blnException
    );
    if ("A" == glBT.SLF && blnException) {
      showLayout = true;
      console.log("Setting showLayout to true (A and exception)");
    } else if ("A" != glBT.SLF || blnException) {
      // No change to showLayout
      console.log("No change to showLayout value");
    } else {
      showLayout = false;
      console.log("Setting showLayout to false (A but no exception)");
    }

    console.log("Final showLayout value:", showLayout);

    // Based on showLayout, either proceed to payment or get seat layout
    if (0 == showLayout) {
      console.log("showLayout is 0, skipping seat layout");
      if ("CT" != pet) {
        console.log("pet is not CT, calling fnuSI()");
        fnuSI();
      } else {
        console.log("pet is CT, calling fnGotoPay()");
        fnGotoPay();
      }
    } else {
      console.log("showLayout is not 0, getting seat layout");
      console.log(
        "Checking conditions - ShowSeatNo:",
        arrShowInfo[0].ShowSeatNo,
        "VenAppType:",
        glBT.VenAppType
      );

      // Complex conditional logic for different seat layout scenarios
      if ("Y" == arrShowInfo[0].ShowSeatNo && "TG" == glBT.VenAppType) {
        const hasSeatLayoutMsg = fnCheckSeatLayoutMsg();
        console.log("fnCheckSeatLayoutMsg() returned:", hasSeatLayoutMsg);

        if (hasSeatLayoutMsg) {
          if (isCoupleSeats) {
            console.log(
              "Calling GetSeatlayout with couple seats + popup message for TG venue"
            );
            BMS.Misc.fnGetSeatlayout({
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
            });
          } else {
            console.log(
              "Calling GetSeatlayout with popup message for TG venue"
            );
            BMS.Misc.fnGetSeatlayout({
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
            });
          }
        } else {
          if (isCoupleSeats) {
            console.log("Calling GetSeatlayout with couple seats for TG venue");
            BMS.Misc.fnGetSeatlayout({
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
            });
          } else {
            console.log("Calling GetSeatlayout for TG venue");
            BMS.Misc.fnGetSeatlayout({
              AppC: global.strAppCode,
              venCode: glBT.SVC,
              transId: lngTransId,
              cmd: "GETSEATLAYOUT",
              p1: glBT.SSID,
              p2: "WEB",
              p5: "Y",
              fnCC: cSL,
              fnEC: fnCanTr,
            });
          }
        }
      } else {
        const hasSeatLayoutMsg = fnCheckSeatLayoutMsg();
        console.log(
          "For non-TG venue, fnCheckSeatLayoutMsg() returned:",
          hasSeatLayoutMsg
        );

        if (hasSeatLayoutMsg) {
          if (isCoupleSeats) {
            console.log(
              "Calling GetSeatlayout with couple seats + popup message for non-TG venue"
            );
            BMS.Misc.fnGetSeatlayout({
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
            });
          } else {
            console.log(
              "Calling GetSeatlayout with popup message for non-TG venue"
            );
            BMS.Misc.fnGetSeatlayout({
              AppC: global.strAppCode,
              venCode: glBT.SVC,
              transId: lngTransId,
              cmd: "GETSEATLAYOUT",
              p1: glBT.SSID,
              p2: "WEB",
              p4: "|hasPopUpMessage=Y|",
              fnCC: cSL,
              fnEC: fnCanTr,
            });
          }
        } else if (isCoupleSeats) {
          console.log(
            "Calling GetSeatlayout with couple seats for non-TG venue"
          );
          BMS.Misc.fnGetSeatlayout({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: lngTransId,
            cmd: "GETSEATLAYOUT",
            p1: glBT.SSID,
            p2: "WEB",
            p7: "Y",
            fnCC: cSL,
            fnEC: fnCanTr,
          });
        } else if (
          "Y" != arrShowInfo[0].ShowSeatNo ||
          ("SP" != glBT.VenAppType &&
            "BT" != glBT.VenAppType &&
            "VS" != glBT.VenAppType &&
            "JT" != glBT.VenAppType)
        ) {
          console.log("Calling GetSeatlayout - standard case");
          BMS.Misc.fnGetSeatlayout({
            AppC: global.strAppCode,
            venCode: glBT.SVC,
            transId: lngTransId,
            cmd: "GETSEATLAYOUT",
            p1: glBT.SSID,
            p2: "WEB",
            fnCC: cSL,
            fnEC: fnCanTr,
          });
        } else {
          console.log("Calling GetSeatlayout with special venue handling");
          BMS.Misc.fnGetSeatlayout({
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
        }
      }
    }
  } catch (e) {
    console.error("Error in fnGSL:", e);
    BMS.Misc.fnErr({ fnName: "fnGSL", fnParams: t, err: e });
  }
}
