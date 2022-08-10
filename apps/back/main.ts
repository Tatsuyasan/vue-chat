import router from './src/routes/index.js';
import Message from './src/models/Message.js';
import WebSocket from './src/models/WebSocket.js';
import webSocketApi from './src/socket/index.js';
import 'dotenv/config';
import cors from 'cors';

import express from 'express';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);
const webSocket = new WebSocket(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.json());
app.use('/api', router);

export const io = webSocketApi(webSocket).init();

// Starts the server.
httpServer.listen(5001, '0.0.0.0', function () {
  console.log('Started server on port 5001');
});
