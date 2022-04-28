# Year-Calendar
A yearlly calnder plugin
* Tested with bootstrap 4

## How to use
_ place this part in header
```
<link href="~/year-calendar.css" rel="stylesheet" type="text/css">
```

_ place this parts after html tags
```
<script src="~/year-calendar/js/year-calendar.js" type='text/javascript'></script>   
<script>
        $('#calendar').Calendar({year:'2022', //default year to preview, years start from 2022
                                displayYear:9, //Count of years
                                date:[{"date":"2022-01-27","color":"danger"}, //date list to mark on calendar
                                    {"date":"2022-02-02","color":"secondary"},
                                    {"date":"2022-02-28","color":"warning"},
                                    {"date":"2022-05-28","color":"info"},
                                    {"date":"2022-04-28","color":"dark"},
                                    {"date":"2022-04-29","color":"primary"},
                                    {"date":"2022-03-07","color":"success"}]});
</script> 
```

![This is an image](https://github.com/Alfred188/Year-Calendar/blob/main/preview.png)

![This is an image](https://github.com/Alfred188/Year-Calendar/blob/main/preview2.png)
