import { Router } from 'express';
const request = require('request');

const aaplRouter = Router();

const api_key = "OE26UIAXBKHI4UIJ";

aaplRouter.get('/', function (req, res, next) {
  console.log(req);
  request({
    url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=' + api_key,
  }).pipe(res);
});

export default aaplRouter;