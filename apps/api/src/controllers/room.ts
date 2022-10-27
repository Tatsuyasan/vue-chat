import { Prisma, Room } from '@prisma/client';
import prisma from '../prisma/prisma';
import { RequestHandler } from 'express';

export const read: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const room = await prisma.room.findUnique({
      where: {
        id: id
      },
      include: {
        users: true
      }
    });
    res.status(200).json(room);
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
    res.sendStatus(201);
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
    res.sendStatus(200);
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

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const messages: RequestHandler = async (req, res, next) => {
  type Room = Prisma.RoomGetPayload<{ include: { messages: true } }>;

  const roomId = req.params.id;
  try {
    const room = (await prisma.room.findUnique({
      where: {
        id: roomId
      },
      include: {
        messages: {
          include: {
            author: true
          },
          orderBy: {
            dateCreated: 'desc'
          }
        }
      }
    })) as Room;

    res.status(200).json({ messages: room.messages });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};
