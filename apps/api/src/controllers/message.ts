import { Message } from '@prisma/client';
import { RequestHandler } from 'express';
import { SOCKET_EVENT } from 'shared';
import { io } from '../services/WebSocket';

export const createMessage: RequestHandler = async (req, res, next) => {
  const roomId: string = req.params.roomId;
  const message: Message = req.body;
  try {
    io.to(roomId).emit(SOCKET_EVENT.ROOM_NEWMESSAGE, message);
    await prisma.message.create({
      data: {
        content: message.content,
        roomId: roomId,
        authorId: message.authorId
      }
    });
    res.sendStatus(201);
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};
