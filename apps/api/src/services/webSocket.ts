import { defaultRooms, SOCKET_EVENT } from 'shared';
import { Server, Socket } from 'socket.io';
import http from 'http';
type SocketListenerArgs<T> = {
  socket: Socket;
  io: Server;
  payload: T;
};
export type SocketListener<T = unknown> = (arg: SocketListenerArgs<T>) => void;

const listeners = new Map<string, SocketListener<any>[]>();
const io = new Server({
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

const attachListeners = (socket: Socket) => {
  [...listeners.entries()].forEach(([eventName, listeners]) => {
    socket.on(eventName, payload => {
      listeners.forEach(listener => listener({ socket, io, payload }));
    });
  });
};

const attachServer = (httpServer: http.Server) => {
  io.attach(httpServer);
};

const on = <T = unknown>(eventName: string, callback: SocketListener<T>) => {
  if (!listeners.has(eventName)) listeners.set(eventName, []);

  listeners.get(eventName)?.push(callback);
};

io.on(SOCKET_EVENT.CONNECTION, socket => {
  console.log('connected :', socket.id);
  defaultRooms.map(r => {
    socket.join(r.id);
  });

  attachListeners(socket);
});

export { io, on, attachServer };
