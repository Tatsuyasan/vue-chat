import roomHandler from './roomHandler';
import disconnectHandler from './disconnectHandler';
import { SOCKET_EVENT } from 'shared';
import { on } from '../services/webSocket';
import { SocketEventFn } from '../types';

const register: SocketEventFn = (socket, io) => {
  console.log('register / connection ON');
  roomHandler(socket, io);
  disconnectHandler(socket, io);
};

export const initSocketEvents = () =>
  on(SOCKET_EVENT.CONNECTION, (socket, io) => register(socket, io));
