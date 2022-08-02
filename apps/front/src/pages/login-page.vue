<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/hooks/useStore';
import { useSocket } from '@/hooks/useSocket';

const store = useStore();
const router = useRouter();

const { connect } = useSocket();
const { login } = store;
const username = ref('');

const goToChatPage = () => {
  login(username.value);
  connect();
  router.replace({ name: 'ChatPage' });
};
</script>

<template>
  <div class="login-page flex justify-center items-center h-screen">
    <div class="p-10 flex flex-col bg-gray-400">
      <section-provider>
        <section-heading class="mb-10">Connectez vous ...</section-heading>

        <form @submit.prevent="goToChatPage()">
          <input-text
            v-model="username"
            class="mb-4"
            name="name"
            placeholder="Pseudo"
            required
            type="text"
            @keypress.enter="goToChatPage()"
          />
          <div class="flex justify-center">
            <button
              class="bg-green-600 cursor-pointer hover:bg-green-700 p-y-2 p-x-4 no-underline"
              :disabled="store.user"
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
