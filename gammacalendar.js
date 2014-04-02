(function() {

function isDate(object) {
    return Object.prototype.toString.call(object) === '[object Date]';
}

function removeTime(date) {
    return new Date(date.setHours(0, 0, 0, 0));
}

function addDays(date, offset) {
    return new Date(date.valueOf() + (offset * 24 * 60 * 60 * 1000));
}

function getRgba(r, g, b, a) {
    if(typeof r === 'object') {
        return getRgba(r.r, r.g, r.b, g || 1);
    } else {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }
}

function getWidth(object) {
    var clone = object.clone();

    clone.css({
        position: 'absolute',
        visibility: 'hidden',
        display: 'inline-block'
    });

    $(document.body).append(clone);
    var width = clone.width();

    clone.remove();

    return width;
}

var i18n = {
    pt: {
        daysOfWeek: ['SEG', 'TER', 'QUA',
                     'QUI', 'SEX', 'SAB', 'DOM'],

        months: ['JAN', 'FEV', 'MAR',
                 'ABR', 'MAI', 'JUN',
                 'JUL', 'AGO', 'SET',
                 'OUT', 'NOV', 'DEZ']
    },

    en: {
        daysOfWeek: ['MON', 'TUE', 'WED',
                     'THU', 'FRI', 'SAT', 'SUN'],

        months: ['JAN', 'FEV', 'MAR',
                 'APR', 'MAY', 'JUN',
                 'JUL', 'AUG', 'SEP',
                 'OCT', 'NOV', 'DEC']
    }
};

$.fn.gammacalendar = function(data, options) {
    options = $.extend(true, {
        baseColor: {
            r: 0, g: 136, b: 204
        },
        nullColor: {
            r: 238, g: 238, b: 238
        },
        weeks: 4,
        i18n: i18n.en,
        startOnSunday: false,
        highlightToday: true
    }, options);

    if(typeof options.i18n === 'string') {
        options.i18n = i18n[options.i18n];
    }

    var today = removeTime(new Date()),
        maximum;

    this.addClass('gammacalendar');

    if(data.length > 1) {
        data.sort(function(a, b) {
            if(!isDate(a.date)) {
                a.date = new Date(a.date);
            }

            if(!isDate(b.date)) {
                b.date = new Date(b.date);
            }

            return b.date - a.date;
        });

        maximum = data.reduce(function(a, b) {
            return {
                value: a.value > b.value ? a.value : b.value
            };
        }).value;
    } else if(data.length === 1) {
        if(!isDate(data[0].date)) {
            data[0].date = new Date(data[0].date);
        }

        maximum = data[0].value;
    } else {
        maximum = 1;
    }

    maximum = maximum === 0 ? 1 : maximum;

    var startDay = (data.length > 0 ? data[0].date : new Date());

    var offset = (options.startOnSunday ? 6 : 7) - startDay.getDay(),
        firstDay = removeTime(addDays(startDay, offset)),
        currentDay = firstDay;

    var container = $('<div />'),
        months = $('<div class="months" />'),
        weeks = $('<div class="weeks" />'),
        calendar = $('<div class="calendar" />');

    calendar.append(months);
    calendar.append($('<br class="clear" />'));
    calendar.append(weeks);
    container.append(calendar);

    for ( var i = 0; i < options.weeks; i++) {
        var week = $('<div class="week" />'),
            shouldAddMonthName = null;

        for ( var j = 0; j < 7; j++) {

            var value = null;

            if(data.length > 0) {
                var next = removeTime(data[0].date);

                if(currentDay.valueOf() === next.valueOf()) {
                    value = data[0].value;
                    data.shift();
                }
            }

            var backgroundColor = getRgba(options.nullColor);
            if(value !== null && value > 0) {
                backgroundColor = getRgba(options.baseColor, value/maximum);
            }

            var day = $('<div class="day" style="background-color: ' + backgroundColor + ';" />');

            day.attr('data-date', currentDay.toISOString());
            day.attr('data-value', value || 0);

            if(options.highlightToday && currentDay.valueOf() === today.valueOf()) {
                day.addClass('today');
            }

            if(shouldAddMonthName === null) {
                shouldAddMonthName = currentDay.getDate() === 1 ? currentDay : null;
            }

            currentDay = removeTime(addDays(currentDay, -1));
            week.prepend(day);
        }

        if(shouldAddMonthName !== null) {
            months.append($('<div class="month">' + options.i18n.months[shouldAddMonthName.getMonth()] + '</div>'));
        } else {
            months.append($('<div class="daySpacer" />'));
        }

        weeks.prepend(week);
    }

    var daysOfWeek = $('<div class="daysOfWeek"></div>');
    daysOfWeek.append($('<div class="dayOfWeek">' + options.i18n.daysOfWeek[options.startOnSunday ? 6 : 0] + '</div>'));
    daysOfWeek.append($('<div class="dayOfWeek">' + options.i18n.daysOfWeek[options.startOnSunday ? 0 : 1] + '</div>'));
    daysOfWeek.append($('<div class="dayOfWeek">' + options.i18n.daysOfWeek[options.startOnSunday ? 1 : 2] + '</div>'));
    daysOfWeek.append($('<div class="dayOfWeek">' + options.i18n.daysOfWeek[options.startOnSunday ? 2 : 3] + '</div>'));
    daysOfWeek.append($('<div class="dayOfWeek">' + options.i18n.daysOfWeek[options.startOnSunday ? 3 : 4] + '</div>'));
    daysOfWeek.append($('<div class="dayOfWeek">' + options.i18n.daysOfWeek[options.startOnSunday ? 4 : 5] + '</div>'));
    daysOfWeek.append($('<div class="dayOfWeek">' + options.i18n.daysOfWeek[options.startOnSunday ? 5 : 6] + '</div>'));

    weeks.prepend(daysOfWeek);
    months.width(getWidth(weeks));
    months.append($('<br class="clear" />'));
    calendar.append($('<br class="clear" />'));

    this.html(container.html());
};

})();
