import User from '@/models/User';

export interface MessageDto {
  author: User;
  content: string;
}

export default class Message {
  author!: User;
  content!: string;
  created: Date;

  constructor(dto: MessageDto) {
    Object.assign(this, dto);
    this.created = new Date();
  }
}
