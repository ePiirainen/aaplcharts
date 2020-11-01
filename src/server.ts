import routes from './routes';
import express from 'express';

const app: express.Application = express()

const PORT = process.env.PORT || 4200;

//app.use(express.json());
app.use(routes);
app.listen(PORT, () => {
  console.log("Node backend listening on port " + PORT)
});