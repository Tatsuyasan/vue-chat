import User from '@/models/User';
import Message from '@/models/Message';

export interface RoomDto {
  id: string;
  name: string;
  users: User[];
  isClosable: boolean;
  isPrivateRoom: boolean;
  hasUnreadMessage: boolean;
  messages: Message[];
}

export default class Room {
  id!: string;
  name!: string;
  users!: User[];
  isClosable!: boolean;
  isPrivateRoom!: boolean;
  hasUnreadMessage!: boolean;
  messages!: any[];

  constructor(dto: RoomDto) {
    Object.assign(this, dto);
  }
}
