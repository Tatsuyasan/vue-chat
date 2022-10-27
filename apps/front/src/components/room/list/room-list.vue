<script setup>
import { DEFAULT_ROOMS } from 'shared';
</script>

<template>
  <aside class="room-list">
    <ul>
      <li
        v-for="room in DEFAULT_ROOMS"
        :key="room"
        class="room-list-item cursor-pointer hover:bg-gray-300"
      >
        {{ room }}
      </li>
    </ul>
  </aside>
</template>
<style lang="scss" scoped>
.room-list-item {
  padding: var(--spacing-md) var(--spacing-lg);
}
</style>
