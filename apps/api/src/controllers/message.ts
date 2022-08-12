import { Message } from '@prisma/client';
import prisma from '../prisma/prisma';
import { RequestHandler } from 'express';
import { io } from '../services/webSocket';
import { SOCKET_EVENT } from 'shared';

export const create: RequestHandler = async (req, res, next) => {
  const roomId: string = req.params.roomId;
  const message: Message = req.body;

  console.log('roomId ==> ', roomId);
  console.log('message ==> ', message);
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

export const update: RequestHandler = async (req, res, next) => {
  // type Message = Prisma.MessageGetPayload<{include:{: true}}>
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
