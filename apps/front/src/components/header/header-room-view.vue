<script setup>
import { useStore } from '@/hooks/useStore';

const store = useStore();
</script>

<template>
  <div class="header-room-view">
    <span>#{{ store.currentRoom?.name }}</span>
  </div>
</template>
<style lang="scss" scoped>
.header-room-view {
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-lg);
}
</style>
