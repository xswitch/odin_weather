Create a weather app using async functions to get information using an API.

TODO

> Get different types of weather, like forecast, current, search, maybe something else

>Search
> main search function split 
>> get dropdown of top 5 choices - Use dropdown module
>> Show current
>>> on click choose that one, on enter choose top one

function for displaying details
add a more menu or just a button to toggle C and F

Create arrows for scrolling through hourly and daily


Get 24 hours in hourly, so get from next day whatever's missing
check length of array and subtract 23 with it.(23-array.length)
Slice next day array from 0 to result

join today and tomorrow instead of just today when getting hourly.
use current date.getHour() and skip anything with an index lower than current hour in array
if current hour + index > 24 subtract 24 from text instead of showing 25:00


Make days clickable, to get more info
Could do the same with every hour of current day.