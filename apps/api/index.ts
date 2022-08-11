import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes';
import cors from 'cors';
import http, { Server } from 'http';

import { io } from './src/services/WebSocket';
import { initSocketEvents } from './src/events';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT as string);
const httpServer: Server = http.createServer(app);
io.attach(httpServer);

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

initSocketEvents();

httpServer.listen(port, '0.0.0.0', function () {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
