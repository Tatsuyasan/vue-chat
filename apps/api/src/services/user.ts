import { User } from '@prisma/client';
import prisma from '../prisma/prisma';

export const createUser = async (data: User) => {
  return await prisma.user.create({ data });
};
export const updateUserById = async (data: Partial<User>) => {
  return await prisma.user.update({
    where: { id: data.id },
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
