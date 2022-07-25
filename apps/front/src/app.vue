<script setup lang="ts">
// import { useRouter } from 'vue-router';
import { useAppProvider } from '@/hooks/useAppProvider';
import { io } from 'socket.io-client';

// const router = useRouter();
const { user } = useAppProvider();

// if (!user.value) {
//   router.replace({ name: 'HomePage' });
// }
</script>

<template>
  <layout-header />
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
  box-sizing: inherit;
}

#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>
