import {
  Prisma,
  User as UserPrisma,
  Message as MessagePrisma
} from '@prisma/client';

export type Room = Prisma.RoomGetPayload<{
  include: { messages: true; users: true };
}>;

export type Message = MessagePrisma;

export type User = UserPrisma;

export type PrivateRoomOptions = {
  id: string;
  name: string;
  users: User[];
  messages: Message[];
};
