<script setup>
import { DEFAULT_ROOMS } from '@/utils/constants';
const goToRoom = (roomName) => {
  return;
};
</script>

<template>
  <aside class="room-list">
    <ul>
      <li
        v-for="room in DEFAULT_ROOMS"
        :key="room"
        class="p-3 cursor-pointer hover:bg-gray-300"
        @click="goToRoom(room)"
      >
        {{ room }}
      </li>
    </ul>
  </aside>
</template>
<style lang="scss" scoped></style>
