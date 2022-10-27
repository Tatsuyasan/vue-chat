import { useStore } from '@/hooks/useStore';
import { SOCKET_EVENT } from 'shared';
import { Socket } from 'socket.io-client';
import { Message, User } from '@/types/app';

const { createUserMessageToCurrentRoom, createAutoMessageToCurrentRoom } =
  useStore();

export const webSocketListeners = (socket: Socket) => {
  console.log('webSocketListeners');
  const roomHasNewMessage = (message: Message) => {
    console.log('emit from ');
    console.log('PING ||||| PING');
    console.log('message ==> ', message);
    createUserMessageToCurrentRoom(message);
  };

  const roomHasNewUser = (username: User['username']) => {
    if (!username) return;
    createAutoMessageToCurrentRoom(`${username} has joined the room`);
  };

  return {
    init: () => {
      socket.on(SOCKET_EVENT.ROOM_NEWMESSAGE, roomHasNewMessage);
      socket.on(SOCKET_EVENT.USER_JOINROOM, roomHasNewUser);
    }
  };
};
