import { Prisma, User as UserPrisma } from '@prisma/client';
import { AxiosInstance } from 'axios';

export type Callback = (cb: () => void) => void;

export type AxiosContext = {
  axios: AxiosInstance;
  onRequest: Callback;
  onResponse: Callback;
};

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
