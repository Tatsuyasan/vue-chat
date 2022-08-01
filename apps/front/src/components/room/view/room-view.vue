<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '@/hooks/useStore';
import Message from '@/models/Message';

const store = useStore();

const currentMessage = ref('');

const submit = () => {
  const { currentUser, currentRoom } = store;
  if (!currentUser || !currentRoom) return;

  try {
    const message = new Message({
      author: currentUser,
      content: currentMessage.value
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
      <section-provider>
        <section-heading class="mb-4 text-center">
          {{ store.currentRoom?.name }}
        </section-heading>
      </section-provider>
      <ul>
        <li v-for="(message, index) in store.currentMessages" :key="index">
          <span v-if="message.author">{{ message.author?.username }} :</span>
          {{ message.content }}
        </li>
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
  </section>
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
