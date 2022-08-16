import { User } from '@prisma/client';
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
