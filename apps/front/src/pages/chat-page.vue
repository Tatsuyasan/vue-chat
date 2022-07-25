<script lang="ts" setup>
// import { useApp } from '@/hooks/useApp';
import { useSocket } from '@/hooks/useSocket';
const socket = useSocket();

socket.connect();

// const { user } = useApp();
</script>

<template>
  <div class="chat-page">
    <room-view />
    <room-list />
  </div>
</template>

<style lang="scss" scoped>
.chat-page {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 100%;

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
