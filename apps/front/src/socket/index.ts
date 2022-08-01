import { useStore } from '@/hooks/useStore';
import Message from '@/models/Message';
import User from '@/models/User';
import { SOCKET_EVENT } from '@libs/shared';
import { Socket } from 'socket.io-client';

const { createMessageToCurrentRoom } = useStore();

export const webSocketListeners = (socket: Socket) => {
  const roomHasNewMessage = (message: Message) => {
    createMessageToCurrentRoom(message);
  };

  const roomHasNewUser = (user: User) => {
    createMessageToCurrentRoom({
      content: `${user.username} has joined the room`
    });
  };

  return {
    init: () => {
      socket.on(SOCKET_EVENT.ROOM_NEWMESSAGE, roomHasNewMessage);
      socket.on(SOCKET_EVENT.USER_JOINROOM, roomHasNewUser);
    }
  };
};
