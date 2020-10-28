import express from 'express';
import routes from './routes/';

const app = express();

//app.use(express.json());
app.use(routes);
app.listen(4200, () => {
  console.log("Node backend listening on port 4200")
});