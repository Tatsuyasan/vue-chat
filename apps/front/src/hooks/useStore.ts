import { defineStore } from 'pinia';
import { ref, computed, ComputedRef } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import Room from '@/models/Room';
import User from '@/models/User';
import { PrivateRoomOptions, SupervisorMessage } from '@/types/app';
import Message from '@/models/Message';

const userCookies = useCookies(['username']);

export const useStore = defineStore('app', () => {
  const user = ref<User>();
  const selectedRoomId = ref<string>();
  const rooms = ref<Room[]>([]);

  const getRoomById = (id: string) => rooms.value.find((c) => c.id === id);

  const currentRoom: ComputedRef<Room | undefined> = computed(() => {
    return rooms.value.find((r) => r.id === selectedRoomId.value);
  });

  const currentMessages: ComputedRef<Message[] | undefined> = computed(() => {
    return currentRoom.value?.messages;
  });

  const currentUser: ComputedRef<User | undefined> = computed(() => {
    return user.value;
  });

  const selectRoom = (roomId: string) => {
    selectedRoomId.value = roomId;
  };

  const login = (name: string) => {
    user.value = new User({ username: name });
    userCookies.set('username', name);
  };

  const logout = () => {
    userCookies.remove('username');
  };

  const addRoom = (room: Room) => {
    rooms.value.push(room);
  };

  const addPrivateRoom = (room: PrivateRoomOptions) => {
    addRoom(
      new Room({
        id: room.id,
        name: room.name,
        users: room.users,
        isClosable: true,
        isPrivateRoom: true,
        hasUnreadMessage: false,
        messages: room.messages ? room.messages : []
      })
    );
  };

  const createMessageToCurrentRoom = (message: Message | SupervisorMessage) => {
    currentRoom.value?.messages.push(message);
  };

  const removeRoom = (room: Room) => {
    rooms.value = rooms.value.filter((r) => r !== room);
  };

  return {
    // state
    user,
    selectedRoomId,
    rooms,

    // getters
    currentRoom,
    currentUser,
    currentMessages,

    // actions
    selectRoom,
    login,
    logout,
    addRoom,
    removeRoom,
    getRoomById,
    addPrivateRoom,
    createMessageToCurrentRoom
  };
});
