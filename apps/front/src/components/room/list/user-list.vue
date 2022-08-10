<script setup>
import { useSocket } from '@/hooks/useSocket';
import { DEFAULT_ROOMS } from '@/utils/constants';

const { socket } = useSocket();
</script>

<template>
  <aside class="user-list">
    <ul>
      <!-- <li v-for="" :key="client">
        {{ client }}
      </li> -->
    </ul>
  </aside>
</template>
<style lang="scss" scoped></style>
