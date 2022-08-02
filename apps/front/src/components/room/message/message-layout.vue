<script lang="ts" setup>
import Message from '@/models/Message.js';

const props = defineProps({
  message: {
    type: Message,
    default: null
  }
});
</script>

<template>
  <div v-if="message.author" class="message-layout">
    <span v-if="message.author">{{ message.author?.username }} :</span>
    {{ message.content }}
  </div>
  <div v-else class="message-layout">
    {{ message.content }}
  </div>
</template>
<style lang="scss" scoped></style>
