import { nanoid } from 'nanoid';
import { DEFAULT_ROOMS } from '../utils/constants.js';
import { activeRooms } from '../store/index.js';

import Room from '../models/Room.js';
import { SOCKET_EVENT } from '~shared';

const roomHandler = (socket, io) => {
  const joinDefaultRoom = () => {
    DEFAULT_ROOMS.forEach(roomName => {
      const room = new Room(nanoid(), roomName, []);
      activeRooms.push(room);
      socket.join(room.name);
      console.log(`connecting to room ${room.name}`);
    });
    socket.emit('user:joined');
  };

  const leaveRoom = roomName => {
    socket.leave(roomName);
    socket.to(roomName).emit('user left ', socket.id);
  };

  const newMessage = payload => {
    console.log('le nouveau message ==> ', payload);
  };

  // socket.on('rooms:default', joinDefaultRoom);
  socket.on(SOCKET_EVENT.USER_LEAVEROOM, leaveRoom);
  socket.on(SOCKET_EVENT.USER_NEWMESSAGE, newMessage);
};

export default roomHandler;
