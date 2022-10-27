import roomHandler from './roomHandler';
import disconnectHandler from './disconnectHandler';
import { Socket } from 'socket.io';
import { on } from '../services/webSocket';
import { SOCKET_EVENT } from 'shared';

export const initSocketEvents = () => {
  // roomHandler();
  disconnectHandler();
};
