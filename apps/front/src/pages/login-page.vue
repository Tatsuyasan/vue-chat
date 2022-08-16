<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/hooks/useStore';

const store = useStore();
const router = useRouter();

const { login } = store;
const email = ref('');
const password = ref('');

const submitLogin = async () => {
  try {
    const user = {
      email: email.value,
      password: password.value
    };
    await login(user);

    router.replace({ name: 'ChatPage' });
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="login-page flex justify-center items-center h-screen">
    <div class="p-10 flex flex-col bg-gray-400">
      <section-provider>
        <section-heading class="mb-10">Connectez vous ...</section-heading>

        <form @submit.prevent="submitLogin()">
          <input-text
            v-model="email"
            class="mb-4"
            name="name"
            placeholder="email"
            required
            type="text"
            @keypress.enter="submitLogin()"
          />
          <input-text
            v-model="password"
            class="mb-4"
            name="name"
            placeholder="Mot de passe"
            required
            type="password"
            @keypress.enter="submitLogin()"
          />
          <div class="flex justify-center">
            <button
              class="bg-green-600 cursor-pointer hover:bg-green-700 p-y-2 p-x-4 no-underline"
              :disabled="!email || !password"
              :to="{ name: 'ChatPage' }"
              type="submit"
            >
              <span>valider</span>
            </button>
          </div>
        </form>
      </section-provider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  background-color: var(--background-700);

  > div {
    background-color: var(--background-500);
  }

  button {
    background-color: var(--background-300);
    color: var(--color-text-primary);

    &:hover {
      background-color: var(--background-400);
    }
  }
}
</style>

<route lang="json">
{
  "name": "LoginPage",
  "path": "/",
  "meta": {}
}
</route>
