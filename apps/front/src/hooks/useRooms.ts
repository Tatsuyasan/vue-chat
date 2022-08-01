import { useSocket } from './useSocket';
import { SOCKET_EVENT } from '@libs/shared';
import { useStore } from './useStore';
import Room from '@/models/Room';

export const useRooms = () => {
  const socket = useSocket();
  const store = useStore();

  return {
    join: (room: Room) => {
      const roomHadAlreadyJoined = store.rooms.some((r) => r.id === room.id);
      if (!roomHadAlreadyJoined) {
        store.addRoom(room);
        socket.emit(SOCKET_EVENT.ROOM_JOIN, { room, user: store.currentUser });
      }
    },
    add: (room: Room) => {
      store.addRoom(room);
      socket.emit(SOCKET_EVENT.ROOM_JOIN, { room, user: store.currentUser });
    }
  };
};
