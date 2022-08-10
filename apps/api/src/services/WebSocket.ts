import { Server, Socket } from 'socket.io';
type Callback = (socket: Socket, io: Server) => void;
type SocketListener = (socket: Socket, io: Server) => void;

const listeners = new Map<string, SocketListener[]>();
const io = new Server({
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

io.on('connection', (socket: Socket) => attachListeners(socket));

const attachListeners = (socket: Socket) => {
  [...listeners.entries()].forEach(([eventName, listeners]) => {
    socket.on(eventName, () => {
      listeners.forEach(listener => listener(socket, io));
    });
  });
};

const on = (eventName: string, callback: Callback) => {
  if (!listeners.has(eventName)) listeners.set(eventName, []);
  console.log('listeners ==> ', listeners);

  listeners.get(eventName)?.push(callback);
};

export { io, on };
