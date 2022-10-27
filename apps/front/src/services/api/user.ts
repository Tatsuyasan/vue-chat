import { useJwt } from '@/hooks/useJwt';
import { useStore } from '@/hooks/useStore';
import { Room, User } from 'shared';
import { http } from '../http.service';

export const userService = {
  updateUser: async (user: Partial<User>) => {
    await http.put(`/user/${user.id}`, { user });
  },
  updateSocketId: async (socketId: string) => {
    const store = useStore();
    await http.put(`/user/${store.currentUser?.id}`, { socketId });
  },
  getCurrentUser: async () => {
    const { decodedJwt } = useJwt();
    const { data } = await http.get(`/user/${decodedJwt.value.id}`);
    return data;
  },
  connectUserToRoom: async (roomId: string) => {
    const store = useStore();
    await http.post(`/user/${store.currentUser?.id}`, { roomId });
  }
};
