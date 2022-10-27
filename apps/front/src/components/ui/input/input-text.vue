<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  readonly: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Enter a text' }
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});
</script>

<template>
  <div>
    <input
      v-model="model"
      :placeholder="placeholder"
      v-bind="$attrs"
      :readonly="props.readonly"
    />
  </div>
</template>

<style lang="scss" scoped>
input {
  border: none;
  border-radius: 5px;
  min-height: 40px;
  background-color: var(--background-300);
  padding: var(--spacing-sm) var(--spacing-lg);
  color: var(--color-text-primary);

  &:focus {
    outline: none;
    border: 1px solid var(--background-500);
  }
}
</style>
