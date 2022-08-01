<script lang="ts" setup>
import { useStore } from '@/hooks/useStore.js';
import { useRooms } from '@/hooks/useRooms.js';
import { onMounted } from 'vue';
import { defaultRoom, DEFAULT_ROOMS } from '@/utils/constants';

const store = useStore();
const { add } = useRooms();

onMounted(() => {
  add(defaultRoom);
  store.selectRoom(DEFAULT_ROOMS.PUBLIC);
});
</script>

<template>
  <div class="chat-page h-screen">
    <room-view />
    <room-list />
  </div>
</template>

<style lang="scss" scoped>
.chat-page {
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  .room-list {
    grid-column: -4 / span 3;
    background-color: grey;
  }
  .room-view {
    grid-column: span 9;
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
