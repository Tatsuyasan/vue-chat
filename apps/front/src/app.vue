<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useStore } from '@/hooks/useStore';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { authService } from './services/api/auth';
import { useJwt } from './hooks/useJwt';
import { userService } from './services/api/user';

const router = useRouter();
const store = useStore();
const { jwt, decodedJwt } = useJwt();

if (!store.currentUser) {
  router.replace({ name: 'AuthPage' });
}

onMounted(async () => {
  if (jwt.value) return;
  try {
    await authService.refreshToken();
    const { user } = await userService.getCurrentUser();
    store.setUser(user);
  } catch (e) {
    throw new Error('Custom error : Token has expired');
  }
});

let refreshTimeout: any = undefined;
const startRefreshTimeout = () => {
  if (import.meta.env.SSR) return;
  clearTimeout(refreshTimeout as number);

  const expirationTimeout = decodedJwt.value.exp * 1000 - new Date().getTime();
  refreshTimeout = setTimeout(async () => {
    await authService.refreshToken();
  }, expirationTimeout - 30_000); // refresh token 30 secondes before it expores
};

watch(jwt, () => {
  startRefreshTimeout();
});
</script>

<template>
  <main>
    <section-provider>
      <router-view />
    </section-provider>
  </main>
</template>

<style lang="scss">
html {
  font-family: var(--font-family);
}

:root {
  --color-text-primary: #f8faf9;
  --color-text-secondary: #7b7e83;

  --background-300: #40454b;
  --background-400: #363940;
  --background-500: #303136;
  --background-600: #2a2b2f;
  --background-700: #212226;

  --font-size-base: 1em;

  --font-size-ratio: 1.2;
  --font-size-xs: calc(var(--font-size-sm) / (var(--font-size-ratio)));
  --font-size-sm: calc(var(--font-size-md) / (var(--font-size-ratio)));
  --font-size-md: var(--font-size-base);
  --font-size-lg: calc(var(--font-size-md) * (var(--font-size-ratio)));
  --font-size-xl: calc(var(--font-size-lg) * (var(--font-size-ratio)));
  --font-size-xxl: calc(var(--font-size-xl) * (var(--font-size-ratio)));
  --font-size-3xl: calc(var(--font-size-xxl) * (var(--font-size-ratio)));

  --font-weight-light: 300;
  --font-weight-medium: 400;
  --font-weight-semibold: 500;
  --font-weight-bold: 700;
  --font-weight-extrabold: 900;

  --spacing-unit: 1em;
  --spacing-none: 0;
  --spacing-xxs: calc(0.25 * var(--spacing-unit));
  --spacing-xs: calc(0.5 * var(--spacing-unit));
  --spacing-sm: calc(0.75 * var(--spacing-unit));
  --spacing-md: calc(1 * var(--spacing-unit));
  --spacing-lg: calc(1.75 * var(--spacing-unit));
  --spacing-xl: calc(2.5 * var(--spacing-unit));
  --spacing-xxl: calc(5 * var(--spacing-unit));
  --spacing-3xl: calc(7.5 * var(--spacing-unit));

  --font-family: 'Noto, Helvetica, Arial, sans-serif';
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: var(--color-secondary);
}

* {
  /* Firefox */
  // scrollbar-color: var(--background-500);
  // scrollbar-width: 10px;
  /* Chrome */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: var(--background-400);
    overflow-x: hidden;
    border-radius: 15px;
    border: 3px solid rgba(0, 0, 0, 0);
  }
  scroll-margin: 20px;

  ::-webkit-scrollbar-thumb {
    background-color: var(--background-700);
    background-clip: padding-box;
    border: 3px solid rgba(0, 0, 0, 0);
    border-radius: 15px;
  }
}

ul {
  list-style: none;
}

#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  color: var(--color-text-primary);
}

body {
  min-height: 100vh;
  color: var(--color-secondary);
}
</style>
