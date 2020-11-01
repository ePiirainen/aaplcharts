import routes from './client/src/routes';
import express from 'express';
const path = require('path')

const app: express.Application = express()

const PORT = process.env.PORT || 4200;
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log("Node backend listening on port " + PORT)
});