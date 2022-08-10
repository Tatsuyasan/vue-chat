import { Server, Socket } from 'socket.io';

export type SocketEventFn = (socket: Socket, io: Server) => void;
