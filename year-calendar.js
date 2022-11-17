(function($) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // });

    $.fn.Calendar = function(options) {
        var settings = $.extend({
            // These are the defaults.
            year: new Date().getFullYear(),
            month: 1,
            yearly: true,
            displayYear: 8,
            date: []
        }, options);
        
        var str = "";
        if(settings.yearly)
            str = calendarFunc(this.attr('id'), settings.year, settings.date, settings.displayYear);
        else
            str = monthcalendarFunc(this.attr('id'), settings.year, settings.date, settings.month);

        return this.html(str);
    };

    function calendarFunc(e, year, date, displayYear) {
        var xDate = JSON.stringify(date);
        xDate = xDate.replaceAll("\"", "'");
        //alert(xDate);
        //date = date.map(x => "'" + x + "'").toString();

        var str = "";
        str += "<div class=\"col-12 col-md-12 col-lg-12 text-center text-light bg-dark\"><ul class=\"ul\">";
        for (var ct = 2022; ct < 2022 + displayYear; ct++) {
            str += "<li><a href=\"#\" id=\"std\" onclick=\"$('#" + e + "').Calendar({year: '" + ct + "',displayYear:" + displayYear + ",date:" + xDate + "});\">" + ct + "</a></li>";
        }
        str += "</ul></div><div id=\"YearTitle\" class=\"col-12 col-md-12 col-lg-12 text-center text-light bg-dark\">" +
            "<h3>" + year + "</h3></div>";
        for (var m = 0; m < 12; m++) {
            str += "<div class=\"col-12 col-md-6 col-lg-4\"><div class=\"row\"><div class=\"col-12 col-md-12 col-lg-12 text-center text-light bg-dark\"><h5>" + months[m] + "</h5></div></div>" +
                "<table class=\"table align-items-center table-flush table-hover dataTable\" id=\"dataTableHover\" role=\"grid\" aria-describedby=\"dataTableHover_info\">" +
                "<thead class=\"thead-light\"><tr role=\"row\"><th >sun</th><th >Mon</th><th >Tue</th>" +
                "<th >Wed</th><th >Thu</th><th >Fri</th>" +
                "<th >Sat</th></tr></thead><tbody>";

            var day = 1;
            const dy = new Date(year + '/' + (m + 1) + '/' + day);
            var startDay = dy.getDay();

            var dim = daysInMonth((m + 1), year);

            var start = false;
            for (var w = 0; w < 6; w++) {
                str += "<tr role=\"row\" class=\"odd\">";
                for (var d = 0; d < 7; d++) {
                    if (startDay == d) {
                        start = true;
                    }
                    if (start) {
                        if (day <= dim) {
                            var mc = m + 1;
                            var ms = mc.toString();
                            if (mc < 10) {
                                ms = '0' + ms;
                            }

                            var ds = day.toString();
                            if (day < 10) {
                                ds = '0' + ds;
                            }
                            var isDate = false;
                            var bg = "light";
                            var fg = "light";
                            var title = "";
                            date.forEach(element => {
                                if (element.date == (year + "-" + ms + "-" + ds)) {
                                    isDate = true;
                                    bg = element.color;
                                    title = " onclick=\"showMoreData('" + element.title + "','" + element.text + "');\"";
                                }
                            });
                            if (bg.toLowerCase() == "light" || bg.toLowerCase() == "warning") {
                                fg = "dark";
                            } else {
                                fg = "light";
                            }
                            // if (isDate) {
                            str += "<td class=\"rounded text-" + fg + " bg-" + bg + "\" " + title + ">" + day + "</td>";

                            day++;
                        } else {
                            str += "<td class=\"sorting_1\"></td>";
                        }
                    } else {
                        str += "<td class=\"sorting_1\"></td>";
                    }
                }
                str += "</tr>";
            }
            str += "</tbody></table></div>";
        }
        str += "</div>";
        str += "<div class=\"modal fade\" id=\"CalModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">" +
            "<div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\">" +
            "<h5 class=\"modal-title\" id=\"dataTitle\">title</h5>" +
            "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">" +
            "<span aria-hidden=\"true\">&times;</span></button></div>" +
            "<div class=\"modal-body\" id=\"dataText\"></div><div class=\"modal-footer\">" +
            "<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>" +
            "</div></div></div></div>";
        return str;
    }

    function monthcalendarFunc(e, year, date,month) {
        var xDate = JSON.stringify(date);
        xDate = xDate.replaceAll("\"", "'");
        //alert(xDate);
        //date = date.map(x => "'" + x + "'").toString();

        var str = "";
        str += "<div id=\"YearTitle\" class=\"col-12 col-md-12 col-lg-12 text-center text-light bg-dark\"><h3>" + year + "</h3></div>";
        m = month - 1;

                var pyear = parseInt(year);
        var nyear = parseInt(year);
        var pm = month;
        if (month - 1 < 1) {
            pm = 12;
            pyear = parseInt(year) - 1;
        } else
            pm = month - 1;

        var nm = month;
        if (month + 1 > 12) {
            nm = 1;
            nyear = parseInt(year) + 1;
        } else
            nm = month + 1;


        str += "<div class=\"container-fluid\"><div class=\"row d-flex justify-content-between bg-dark\"><div class=\"col-1 col-md-1 col-lg-1 text-center text-light\">" +
            "<a class=\"text-white\" href=\"#\" onclick=\"$('#" + e + "').Calendar({year: '" + pyear + "',yearly:false,month:" + pm + ",date:" + xDate + "});\"><b><</b></a></div>" +
            "<div class=\"col-9 col-md-9 col-lg-9 text-center text-light bg-dark\"><h5>" + months[m] + "</h5></div>" +
            "<div class=\"col-1 col-md-1 col-lg-1 text-center text-light bg-dark\">" +
            "<a class=\"text-white\" href=\"#\" onclick=\"$('#" + e + "').Calendar({year: '" + nyear + "',yearly:false,month:" + nm + ",date:" + xDate + "});\"><b>></b></a></div></div>" +
            "<div class=\"row\"><div class=\"col-12 col-md-12 col-lg-12 text-center table-responsive\">" +
            "<table class=\"table align-items-center table-flush table-hover dataTable\" id=\"dataTableHover\" role=\"grid\" aria-describedby=\"dataTableHover_info\">" +
            "<thead class=\"thead-light\"><tr role=\"row\"><th >sun</th><th >Mon</th><th >Tue</th>" +
            "<th >Wed</th><th >Thu</th><th >Fri</th>" +
            "<th >Sat</th></tr></thead><tbody>";

            var day = 1;
            const dy = new Date(year + '/' + (m + 1) + '/' + day);
            var startDay = dy.getDay();

            var dim = daysInMonth((m + 1), year);

            var start = false;
            for (var w = 0; w < 6; w++) {
                str += "<tr role=\"row\" class=\"odd\">";
                for (var d = 0; d < 7; d++) {
                    if (startDay == d) {
                        start = true;
                    }
                    if (start) {
                        if (day <= dim) {
                            var mc = m + 1;
                            var ms = mc.toString();
                            if (mc < 10) {
                                ms = '0' + ms;
                            }

                            var ds = day.toString();
                            if (day < 10) {
                                ds = '0' + ds;
                            }
                            var isDate = false;
                            var bg = "light";
                            var fg = "light";
                            var title = "";
                            date.forEach(element => {
                                if (element.date == (year + "-" + ms + "-" + ds)) {
                                    isDate = true;
                                    bg = element.color;
                                    title = " onclick=\"showMoreData('" + element.title + "','" + element.text + "');\"";
                                }
                            });
                            if (bg.toLowerCase() == "light" || bg.toLowerCase() == "warning") {
                                fg = "dark";
                            } else {
                                fg = "light";
                            }
                            // if (isDate) {
                            str += "<td class=\"rounded text-" + fg + " bg-" + bg + "\" " + title + ">" + day + "</td>";

                            day++;
                        } else {
                            str += "<td class=\"sorting_1\"></td>";
                        }
                    } else {
                        str += "<td class=\"sorting_1\"></td>";
                    }
                }
                str += "</tr>";
            }
             str += "</tbody></table>";

        str += "</div></div></div>";
        str += "<div class=\"modal fade\" id=\"CalModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">" +
            "<div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\">" +
            "<h5 class=\"modal-title\" id=\"dataTitle\">title</h5>" +
            "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">" +
            "<span aria-hidden=\"true\">&times;</span></button></div>" +
            "<div class=\"modal-body\" id=\"dataText\"></div><div class=\"modal-footer\">" +
            "<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>" +
            "</div></div></div></div>";
        return str;
    }



    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
})(jQuery);

function showMoreData(title, text) {
    $('#dataTitle').html(title);
    $('#dataText').html(text);
    $('#CalModal').modal('show');
}
