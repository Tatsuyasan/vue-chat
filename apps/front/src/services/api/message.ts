import { Message } from 'shared';
import { http } from '../http.service';

export const messageService = {
  createMessage: async (message: Message) => {
    await http.post(`/message/${message.roomId}`, { message });
  }
};
