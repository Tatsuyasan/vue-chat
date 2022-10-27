<script lang="ts" setup>
import { User } from 'shared';
import { computed } from 'vue';

interface Props {
  user: User;
}

const props = defineProps<Props>();

const initials = computed(() => {
  return props.user.username.charAt(0).toUpperCase();
});
</script>

<template>
  <div class="avatar">
    <div class="flex items-center gap-4 h-full">
      <div class="img bg-red">
        {{ initials }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.avatar {
  .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: var(--font-size-xl);
  }
}
</style>
