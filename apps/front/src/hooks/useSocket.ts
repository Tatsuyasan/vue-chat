import { io } from 'socket.io-client';
import { webSocketListeners } from '@/socket';
const socket = io(import.meta.env.VITE_API_URL);

webSocketListeners(socket).init();

export const useSocket = () => {
  return {
    socket: socket,
    connect: () => {
      return socket.connect();
    },
    disconnect: () => {
      socket.disconnect();
    },
    emit: (eventName: string, payload: any) => {
      socket.emit(eventName, payload);
    },
    on: <T>(eventName: string, callback: (payload: T) => void) => {
      socket.on(eventName, callback);
    }
  };
};
