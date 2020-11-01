import routes from './client/src/routes';
import express from 'express';
const path = require('path')

const app: express.Application = express()

const PORT = process.env.PORT || 4200;

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname = 'client/build/index.html'), {root: __dirname});
 })
}

app.use(routes);
app.listen(PORT, () => {
  console.log("Node backend listening on port " + PORT)
});