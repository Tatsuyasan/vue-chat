import { User } from 'shared';
import prisma from '../prisma/prisma';
import { RequestHandler } from 'express';
import { findUserById } from '../services/user';
import { errorHandler } from '../services/errorHandler';

export const read: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await findUserById(id);

    if (!user) throw errorHandler.notFound();

    const { password, refreshToken, ...userDto } = user;

    res.status(200).json({
      user: userDto
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  const user: User = req.body;
  const id = req.params.id;

  try {
    await prisma.user.update({
      where: {
        id: id
      },
      data: user
    });

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const connectUserToRoom: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  const roomId: string = req.body.roomId;

  try {
    await prisma.roomsOnUsers.upsert({
      where: {
        userId_roomId: {
          userId: id,
          roomId: roomId
        }
      },
      update: {},
      create: {
        user: {
          connect: {
            id: id
          }
        },
        room: {
          connect: {
            id: roomId
          }
        }
      }
    });

    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deleteRoomOnUsers = prisma.roomsOnUsers.deleteMany({
      where: {
        userId: id
      }
    });

    const deleteUser = prisma.user.delete({
      where: {
        id: id
      }
    });

    await prisma.$transaction([deleteRoomOnUsers, deleteUser]);
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};
