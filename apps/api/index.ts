import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes';
import cors from 'cors';
import http, { Server } from 'http';
import cookieParser from 'cookie-parser';

import { attachServer } from './src/services/webSocket';
import { errorHandler, errorMiddleware } from './src/services/errorHandler';
import config from './config';
import { initSocketEvents } from './src/events';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT as string);
const httpServer: Server = http.createServer(app);

const corsOptions = {
  credentials: true,
  origin: config.FRONT_BASE_URL
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

app.get('/', (req, res, next) => {
  res.status(200).json({ status: 'ok' });
  next(errorHandler.notFound());
});

attachServer(httpServer);
initSocketEvents();

httpServer.listen(port, '0.0.0.0', function () {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
