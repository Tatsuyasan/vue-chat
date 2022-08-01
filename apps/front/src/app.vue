<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '@/hooks/useStore';

const router = useRouter();
const store = useStore();

if (!store.username) {
  router.replace({ name: 'LoginPage' });
}
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}

ul {
  list-style: none;
}

#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}

body {
  min-height: 100vh;
}
</style>
