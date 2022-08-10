<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '@/hooks/useStore';
import Message from '@/models/Message';

const store = useStore();

const currentMessage = ref('');

const submit = () => {
  const { currentUser, currentRoom } = store;
  const messageTrimed = currentMessage.value.trim();
  if (!currentUser || !currentRoom || !messageTrimed) return;

  try {
    const message = new Message({
      author: currentUser,
      content: messageTrimed
    });
    const roomId = currentRoom.id;

    fetch(`http://localhost:5001/api/message/${roomId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  } catch (e) {
    console.error(e);
  } finally {
    currentMessage.value = '';
  }
};
</script>

<template>
  <section class="room-view">
    <div>
      <ul>
        <li v-for="(message, index) in store.currentRoomMessages" :key="index">
          <message-layout :index="index" :message="message" />
        </li>
      </ul>
      <div class="view-form p-5 flex">
        <input-text
          v-model="currentMessage"
          class="flex-grow-1 w-full"
          type="textearea"
          @keyup.stop.enter="submit"
        />
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.room-view {
  > div {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100%;
    max-height: 10vh;
  }
  ul {
    flex-grow: 1;
    overflow: auto;
    padding-top: var(--spacing-md);
  }
}
</style>
