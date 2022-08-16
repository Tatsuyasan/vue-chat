import { defineStore } from 'pinia';
import { ref, computed, ComputedRef } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { LoginUserDto, Message, Room, User } from '@/types/app';
import { nanoid } from 'nanoid';
import { authService } from '@/services/auth';

const userCookies = useCookies(['username']);

export const useStore = defineStore('app', () => {
  const user = ref<User>();
  const selectedRoomId = ref<string>();
  const rooms = ref<Room[]>([]);

  const getRoomById = (id: string) => rooms.value.find((c) => c.id === id);

  const currentRoom: ComputedRef<Room | undefined> = computed(() => {
    return rooms.value.find((r) => r.id === selectedRoomId.value);
  });

  const currentRoomMessages = computed(() => {
    return currentRoom.value?.messages;
  }) as ComputedRef<Message[] | undefined>;

  const currentUser: ComputedRef<User | undefined> = computed(() => {
    return user.value;
  });

  const selectRoom = (roomId: string) => {
    selectedRoomId.value = roomId;
  };

  const login = async (data: LoginUserDto) => {
    authService.login(data);
  };

  const logout = () => {
    userCookies.remove('username');
  };

  const addRoom = (room: Room) => {
    rooms.value.push(room);
  };

  const addPrivateRoom = (room: Room) => {
    addRoom({
      id: room.id,
      name: room.name,
      users: room.users,
      messages: room.messages ? room.messages : []
    });
  };

  const createUserMessageToCurrentRoom = (message: Message) => {
    currentRoom.value?.messages.push(message);
  };

  const createAutoMessageToCurrentRoom = (content: string) => {
    currentRoom.value?.messages.push({
      id: nanoid(),
      content,
      dateCreated: new Date(),
      authorId: null,
      roomId: currentRoom.value.id
    });
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
    currentRoomMessages,

    // actions
    selectRoom,
    login,
    logout,
    addRoom,
    removeRoom,
    getRoomById,
    addPrivateRoom,
    createUserMessageToCurrentRoom,
    createAutoMessageToCurrentRoom
  };
});
