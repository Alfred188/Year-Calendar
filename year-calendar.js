(function($) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // });

    $.fn.Calendar = function(options) {
        var settings = $.extend({
            // These are the defaults.
            year: "2022",
            displayYear: 8,
            date: []
        }, options);

        var str = calendarFunc(this.attr('id'), settings.year, settings.date, settings.displayYear);

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
            var stertDay = dy.getDay();

            var dim = daysInMonth((m + 1), year);

            var start = false;
            for (var w = 0; w < 6; w++) {
                str += "<tr role=\"row\" class=\"odd\">";
                for (var d = 0; d < 7; d++) {
                    //alert(stertDay + '/' + w);
                    if (stertDay == d) {
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
                                    title = " onclick=\"alert('" + element.title + "');\"";
                                }
                            });
                            if (bg.toLowerCase() == "light" || bg.toLowerCase() == "warning") {
                                fg = "dark";
                            } else {
                                fg = "light";
                            }
                            // if (isDate) {
                            str += "<td class=\"rounded text-" + fg + " bg-" + bg + "\" " + title + ">" + day + "</td>";
                            // } else {
                            //     str += "<td>" + day + "</td>";
                            // }

                            day++;
                        } else {
                            //alert(check + 'day');
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
        return str;
    }

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
})(jQuery);
