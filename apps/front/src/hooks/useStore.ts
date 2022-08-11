import { defineStore } from 'pinia';
import { ref, computed, ComputedRef } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { Message, Room, User } from '@/types/app';
import { nanoid } from 'nanoid';

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

  const login = ({ username, socketId, id }: User) => {
    user.value = { username, socketId, id };
    console.log('user.value ==> ', user.value);
    userCookies.set('username', user.value);
    try {
      fetch(`http://localhost:5001/api/user`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user.value)
      });
    } catch (error) {
      console.error(error);
    }
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
