<script lang="ts" setup>
type Status = 'success' | 'error' | 'warning';
interface Props {
  status: Status;
}
const props = defineProps<Props>();

const status = {
  success: 'bg-green-300 text-gray-600',
  error: 'bg-red-600',
  warning: 'bg-yellow-200 text-gray-600'
};
</script>

<template>
  <button
    v-bind="$attrs"
    class="p-y-2 p-x-4 cursor-pointer"
    :class="status[props.status]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
