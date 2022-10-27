import { User } from 'shared';
import { Uid } from 'types';
import prisma from '../prisma/prisma';

export const createUser = async (data: User) => {
  return await prisma.user.create({ data });
};

export const updateUserById = async ({ id, ...data }: Partial<User>) => {
  return await prisma.user.update({
    where: { id: id },
    data
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email
    }
  });
};

export const findUserById = async (id: Uid) => {
  return await prisma.user.findUnique({
    where: {
      id
    }
  });
};

export const findUserByRefreshToken = async (refreshToken: string) => {
  return await prisma.user.findUnique({
    where: {
      refreshToken: refreshToken
    }
  });
};

export const findUserBySocketId = async (socketId: Uid) => {
  return await prisma.user.findUnique({
    where: {
      socketId: socketId
    }
  });
};

export const resetSocketId = async (id: Uid) => {
  return await prisma.user.update({
    where: { id },
    data: {
      socketId: null
    }
  });
};
