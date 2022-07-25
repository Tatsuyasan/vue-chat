<script lang="ts" setup>
import { useApp } from '@/hooks/useApp';
import { ref } from 'vue';
import { useSocket } from '@/hooks/useSocket';
import { SOCKET_EVENT } from '~shared';

const { messages } = useApp();
const { emit } = useSocket();

const currentMessage = ref('');

const submit = () => {
  messages.value.push(currentMessage.value);
  emit(SOCKET_EVENT.USER_NEWMESSAGE, { message: currentMessage.value });
  currentMessage.value = '';
};
</script>

<template>
  <aside class="room-view">
    <div>
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
      <form class="view-form p-5 flex" @submit.prevent="submit">
        <input-text
          v-model="currentMessage"
          class="flex-grow-1 w-full p-1"
          type="textearea"
        />
        <button>Envoyer</button>
      </form>
    </div>
  </aside>
</template>
<style lang="scss" scoped>
.room-view {
  > div {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100%;
  }
  ul {
    flex-grow: 1;
  }
}
</style>
