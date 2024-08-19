import express from 'express';
import bodyParser from 'body-parser';
import { configureRoutes } from './routes/routes';

const app = express();

app.use(bodyParser.json());
configureRoutes(app);

export default app;