import { User } from '@prisma/client';
import { Server, Socket } from 'socket.io';

export type SocketEventFn = (socket: Socket, io: Server) => void;

export type UserPartial = Partial<User>;
export type UserLogin = User;

export type Uid = string;
