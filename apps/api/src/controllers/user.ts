import { User } from '@prisma/client';
import prisma from '../prisma/prisma';
import { RequestHandler } from 'express';

export const read: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await prisma.user.findUnique({
      where: {
        id: id
      }
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
