<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '@/hooks/useStore';
import { Message } from '@/types/app';
import { nanoid } from 'nanoid';
import { messageService } from '@/services/api/message';

const store = useStore();

const currentMessage = ref('');

const submit = async () => {
  const { currentUser, currentRoom } = store;
  const messageTrimed = currentMessage.value.trim();
  if (!currentUser || !currentRoom || !messageTrimed) return;

  try {
    const message: Message = {
      id: nanoid(),
      content: messageTrimed,
      roomId: currentRoom.id,
      authorId: currentUser.id,
      dateCreated: new Date(),
      author: currentUser
    };

    await messageService.createMessage(message);
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
      <ul class="room-view-list">
        <li v-for="(message, index) in store.currentRoomMessages" :key="index">
          <message-layout :index="index" :message="message" />
        </li>
      </ul>
      <div class="view-form p-5 flex">
        <form class="w-full" @submit.prevent="submit">
          <input-text
            v-model="currentMessage"
            class="w-full"
            type="textearea"
          />
        </form>
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

  view-form {
    form {
      width: 100%;
    }
  }

  .room-view-list {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
