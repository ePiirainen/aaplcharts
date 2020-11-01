import { Router } from 'express';
import aaplRouter from './aapl.routes';

const routes = Router();

routes.use('/aapl', aaplRouter);

export default routes;
