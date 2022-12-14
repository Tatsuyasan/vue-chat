<script lang="ts" setup>
import { Message } from '@/types/app.js';
import { format, isToday } from 'date-fns';
import { useStore } from '@/hooks/useStore';
import { computed, ref } from 'vue';
import { vHoverChangeNotify } from '@/directives/index';

interface Props {
  message: Message;
  index: number;
}

const props = defineProps<Props>();
const store = useStore();
const displayHours = ref(false);
const isHovering = (bool: boolean) => {
  displayHours.value = bool;
};

const messageDate = computed(() => {
  if (isToday(new Date(props.message.dateCreated)))
    return `Aujourd'hui à ${format(
      new Date(props.message.dateCreated),
      'HH:hh'
    )}`;

  return format(new Date(props.message.dateCreated), 'dd/mm/yyyy');
});

const isAvatarDisplayed = computed(() => {
  if (!store.currentRoomMessages || props.index === 0) return true;
  if (
    !store.currentRoomMessages[props.index - 1].authorId ||
    !props.message.authorId
  )
    return true;

  const lastMessageIsMine =
    store.currentRoomMessages[props.index - 1].author?.id ===
    props.message.author?.id;

  if (!lastMessageIsMine) return true;

  return false;
});
</script>

<template>
  <div
    v-if="message?.author"
    v-hover-change-notify="isHovering"
    class="message-layout--user"
  >
    <avatar v-if="isAvatarDisplayed" class="avatar" :user="message.author" />
    <span v-else-if="!isAvatarDisplayed && displayHours" class="hours">
      {{ format(new Date(props.message.dateCreated), 'HH:hh') }}
    </span>

    <div class="content">
      <span v-if="isAvatarDisplayed" class="username">
        {{ message.author?.username }}
        <span class="date">{{ messageDate }}</span>
      </span>

      <span>
        {{ message.content }}
      </span>
    </div>
  </div>

  <div v-else class="message-layout--auto">
    {{ message.content }}
  </div>
</template>
<style lang="scss" scoped>
.message-layout--auto {
  text-align: center;
}
.message-layout--user {
  display: grid;
  grid-template-columns: var(--spacing-xl) minmax(0, 1fr);
  padding: 0 var(--spacing-md);

  gap: var(--spacing-md);
  &:hover {
    background-color: var(--background-500);
  }

  .date {
    font-size: var(--font-size-sm);
    margin: 0 var(--spacing-xs);
  }

  .content {
    grid-column: 2 / 3;
    display: flex;
    flex-flow: column nowrap;
    line-height: var(--spacing-md);

    > span {
      padding: var(--spacing-xxs) 0;
    }
  }

  .hours {
    display: flex;
    align-items: center;
    justify-content: end;
    font-size: var(--font-size-xs);
  }

  .message {
    padding: var(--spacing-xs) 0;
  }

  .username {
    font-size: var(--font-size-md);
  }
}
</style>
