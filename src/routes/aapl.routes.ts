import { Router } from 'express';
const request = require('request');

const aaplRouter = Router();

aaplRouter.get('/', function(req, res, next) {
    console.log(req);
    request({
      url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=OE26UIAXBKHI4UIJ',
    }).pipe(res);
  });

  export default aaplRouter;