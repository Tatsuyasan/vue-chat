import { Prisma, Room } from '@prisma/client';
import prisma from '../prisma/prisma';
import { RequestHandler } from 'express';

export const read: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await prisma.room.findUnique({
      where: {
        id: id
      }
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const room: Room = req.body;

  try {
    await prisma.room.create({
      data: room
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  const room: Room = req.body;
  const id = req.params.id;

  try {
    await prisma.room.update({
      where: {
        id: id
      },
      data: room
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const deleteRoom: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deleteRoomOnUsers = prisma.roomsOnUsers.deleteMany({
      where: {
        roomId: id
      }
    });

    const deleteRoom = prisma.room.delete({
      where: {
        id: id
      }
    });

    await prisma.$transaction([deleteRoomOnUsers, deleteRoom]);
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const getMessages: RequestHandler = async (req, res, next) => {
  type Room = Prisma.RoomGetPayload<{ include: { messages: true } }>;

  const roomId = req.params.roomId;
  try {
    const room = (await prisma.room.findUnique({
      where: {
        id: roomId
      }
    })) as Room | null;

    return room?.messages;
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};
