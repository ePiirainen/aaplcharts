var express = require('express')
var app = express()
var request = require('request')


app.get('/aapl', function(req, res, next) {
    console.log(req);
    request({
      uri: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=OE26UIAXBKHI4UIJ',
    }).pipe(res);
  });

app.listen(4200);