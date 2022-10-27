// import { activeRooms } from '../store/index.js';
import prisma from '../prisma/prisma.js';
import { SocketEventFn } from '../types/index.js';
import { SOCKET_EVENT } from 'shared';

type JoinRoomOptions = { roomId: string; userId: string };

const roomHandler: SocketEventFn = socket => {
  // const joinRoom = async ({ roomId, userId }: JoinRoomOptions) => {
  //   try {
  //     socket.join(roomId);
  //     const user = await prisma.user.findUnique({
  //       where: { id: userId },
  //       select: { username: true }
  //     });

  //     if (!user) throw new Error('User not found');

  //     console.log('joinRoom || server');
  //     socket.to(roomId).emit(SOCKET_EVENT.USER_JOINROOM, user?.username);
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // };

  // const leaveRoom = (roomId: string) => {
  //   socket.leave(roomId);
  //   socket.to(roomId).emit('user left ', socket.id);
  // };

  // socket.on(SOCKET_EVENT.ROOM_JOIN, joinRoom);SocketListener
  // socket.on(SOCKET_EVENT.USER_LEAVEROOM, leaveRoom);
};

export default roomHandler;
