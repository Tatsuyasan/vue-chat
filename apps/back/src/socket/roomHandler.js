import { nanoid } from 'nanoid';

import Room from '../models/Room.js';
import { activeRooms } from '../store/index.js';
import { SOCKET_EVENT } from 'shared';

const roomHandler = (socket, io) => {
  const joinRoom = ({ room, user }) => {
    room = new Room({ id: room.id, name: room.name, messages: [] });
    socket.join(room.id);

    console.log('joinRoom || server');
    socket.to(room.id).emit(SOCKET_EVENT.USER_JOINROOM, user);
  };

  const leaveRoom = roomName => {
    socket.leave(roomName);
    socket.to(roomName).emit('user left ', socket.id);
  };

  // const newMessage = payload => {
  //   socket.to(payload.room).emit(SOCKET_EVENT.ROOM_NEWMESSAGE, payload);
  //   console.log('le nouveau message ==> ', payload);
  // };

  socket.on(SOCKET_EVENT.ROOM_JOIN, joinRoom);
  socket.on(SOCKET_EVENT.USER_LEAVEROOM, leaveRoom);
  // socket.on(SOCKET_EVENT.USER_NEWMESSAGE, newMessage);
};

export default roomHandler;
