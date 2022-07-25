<script lang="ts" setup>
import { inject, computed } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';

const sectionLevel = inject(CONTEXT_KEYS.SECTION, 1);
const is = computed(() => `h${sectionLevel}`);
</script>

<template>
  <component :is="is">
    <slot />
  </component>
</template>
