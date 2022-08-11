import { Prisma, User as UserPrisma } from '@prisma/client';

export type Message = Prisma.MessageGetPayload<{
  include: { author: true };
}>;

export type Room = Prisma.RoomGetPayload<{
  include: { messages: true; users: true };
}>;

export type User = UserPrisma;

export type PrivateRoomOptions = {
  id: string;
  name: string;
  users: User[];
  messages: Message[];
};
