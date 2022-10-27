import { Message } from 'shared';
import prisma from '../prisma/prisma';
import { RequestHandler } from 'express';
import { io } from '../services/webSocket';
import { SOCKET_EVENT } from 'shared';

export const create: RequestHandler = async (req, res, next) => {
  const roomId: string = req.params.roomId;
  const message: Message = req.body.message;

  try {
    await prisma.message.create({
      data: {
        content: message.content,
        room: {
          connect: {
            id: roomId
          }
        },
        author: {
          connect: {
            id: message.authorId as string
          }
        }
      }
    });

    res.sendStatus(201);
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  } finally {
    console.log('emit to => ', roomId);
    io.to(roomId).emit(SOCKET_EVENT.ROOM_NEWMESSAGE, message);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  const message: Message = req.body;
  const roomId = req.params.roomId;
  const id = req.params.messageId;
  try {
    await prisma.message.updateMany({
      where: {
        id: id,
        roomId: roomId
      },
      data: message
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const deleteMessage: RequestHandler = async (req, res, next) => {
  const roomId = req.params.roomId;
  const id = req.params.messageId;
  try {
    await prisma.message.deleteMany({
      where: {
        id: id,
        roomId: roomId
      }
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};
