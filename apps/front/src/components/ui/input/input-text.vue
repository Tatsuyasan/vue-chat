<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  readonly: { type: Boolean, default: false }
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
  <div class="">
    <input
      v-model="model"
      class="border-gray-300 focus:border-gray-600 border-solid"
      v-bind="$attrs"
      :readonly="props.readonly"
    />
  </div>
</template>

<style lang="scss" scoped>
input {
  &:focus {
    outline: none;
  }
}
</style>
