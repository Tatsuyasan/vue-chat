<script lang="ts" setup>
import { useStore } from '@/hooks/useStore.js';
import { onMounted } from 'vue';
import { defaultRooms, DEFAULT_ROOMS } from 'shared';
import { userService } from '@/services/api/user';
import { roomService } from '@/services/api/room';

const store = useStore();

onMounted(async () => {
  try {
    defaultRooms.map(async (r) => {
      await userService.connectUserToRoom(r.id);
      const room = await roomService.getRoom(r.id);
      const messages = await roomService.getMessages(room.id);
      room.messages = messages;

      store.addRoom(room);
    });

    store.selectRoom(DEFAULT_ROOMS.PUBLIC);
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <header />
    <div class="chat-page h-full">
      <header-room-list />
      <header-room-view />

      <room-list />
      <room-view />
      <user-list />
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  height: 25px;
  background-color: var(--background-700);
}
.chat-page {
  display: grid;
  grid-template-columns: repeat(24, minmax(0, 1fr));
  grid-template-rows: 7vh minmax(0, 1fr);

  .user-list {
    grid-column: 21 / 25;
    background-color: var(--background-500);
  }

  .room-list {
    grid-column: 1 / 5;
    background-color: var(--background-500);
  }
  .room-view {
    grid-column: 5 / 21;
    background-color: var(--background-400);
  }

  .header-room-list {
    grid-column: 1 / 5;
    background-color: var(--background-500);
  }

  .header-room-view {
    grid-column: 5 / 25;
    background-color: var(--background-400);
  }

  .header-room-view,
  .header-room-list {
    box-shadow: 0px 2px 5px -3px rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
}
</style>

<route lang="json">
{
  "name": "ChatPage",
  "path": "/chat",
  "meta": {
    "needUser": true
  }
}
</route>
