import { Message, Room } from 'shared';
import { http } from '../http.service';

export const roomService = {
  joinRoom: () => {
    return;
  },
  getRoom: async (roomId: string): Promise<Room> => {
    const { data } = await http.get(`/room/${roomId}`);
    return data;
  },
  getMessages: async (roomId: string): Promise<Message[]> => {
    const { data } = await http.get(`/room/${roomId}/messages`);
    return data.messages;
  }
};
