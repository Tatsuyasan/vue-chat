import { Room } from '../types';

export const SOCKET_EVENT = {
  CONNECT: 'connect',
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  DISCONNECTING: 'disconnecting',
  USER_JOINROOM: 'USER_JOINROOM',
  USER_LEAVEROOM: 'USER_LEAVEROOM',
  USER_NEWMESSAGE: 'USER_NEWMESSAGE',
  ROOM_NEWMESSAGE: 'ROOM_NEWMESSAGE',
  ROOM_JOIN: 'ROOM_JOIN'
} as const;

export const DEFAULT_ROOMS = {
  PUBLIC: 'public'
} as const;

export const defaultRooms: Room[] = [
  {
    id: DEFAULT_ROOMS.PUBLIC,
    name: 'Général',
    users: [],
    messages: []
  }
];
