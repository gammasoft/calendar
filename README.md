calendar
========

jQuery plugin for a simple calendar, much like the GitHub contribution chart, to show daily contributions.

The darker the day is the largest the value for that day. Gammacalendar takes the maximum value as 100% of opacity to calculate the others.

![Example](https://raw.githubusercontent.com/gammasoft/calendar/master/examples/example.png)

### Examples

See a full [working example here!](https://github.com/gammasoft/calendar/blob/master/examples/examples.html)

```javascript
$('#calendar').gammacalendar([{
    date: new Date(2014, 2, 12),
    value: 10
}]);
```

```javascript
$('#calendar').gammacalendar([{
    date: new Date(2014, 2, 12),
    value: 10
}], {
    weeks: 24,
    i18n: 'en',
    startOnSunday: true,
    highlightToday: false,
    baseColor: {
        r: 120,
        g: 120,
        b: 0
    }
});
```

### API

```javascript
$('#yourSelector').gammacalendar(data[, options]);
````

Where `data` is an array of the form:

```javascript
var data = [{date: dateObject, value: someNumberGreaterThanZero}, ... ];
```

And `options` is an object containing optional configuration;

```javascript
var options = {
    weeks: 24, //default: 4
    i18n: 'en', //default: 'en', can be 'en', 'pt' or i18n objects (described below) 
    startOnSunday: false, //default: true
    highlightToday: true, //default: true
    baseColor: { //the darkest color for values greater than zero
        r: 0, g: 136, b: 204
    },
    nullColor: { //color for value === 0 or null
        r: 238, g: 238, b: 238
    }
}
```

### I18n

You can pass i18n objects to adapt `gammacalendar` to your language. I18n object are like the following:

```javascript
var myCulture = {
    daysOfWeek: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],

    months: ['JAN', 'FEV', 'MAR', 'APR', 'MAY', 'JUN',
             'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
};
```

### License MIT
 
