<script setup>
import { useSocket } from '@/hooks/useSocket';
import { useStore } from '@/hooks/useStore';

const store = useStore();
const socket = useSocket();

const disconnect = () => {
  store.user = null;
  socket.disconnect();
};
</script>

<template>
  <header v-if="store.user">
    <div class="flex justify-center items-center h-full">
      <span class="mx-5">
        {{ store.user }}
      </span>
      <button @click="disconnect">disconnect</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100vw;
  height: 50px; /* to delete */
  background-color: lightgray;
}
</style>
