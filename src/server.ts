import routes from './routes';
import express from 'express';

const app: express.Application = express()


//app.use(express.json());
app.use(routes);
app.listen(4200, () => {
  console.log("Node backend listening on port 4200")
});