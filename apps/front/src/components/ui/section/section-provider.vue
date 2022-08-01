<script setup>
import { provide, inject } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';

const sectionLevel = inject(CONTEXT_KEYS.SECTION, 0);
provide(CONTEXT_KEYS.SECTION, sectionLevel + 1);
</script>

<template>
  <slot />
</template>
