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
  <div class="flex justify-center items-center h-screen">
    <div class="p-10 flex flex-col bg-gray-400">
      <section-provider>
        <section-heading class="mb-4">Login</section-heading>

        <form @submit.prevent="goToChatPage()">
          <label class="mb-4" for="username">Pseudo</label>
          <input-text
            v-model="username"
            id="username"
            class="mb-4"
            name="name"
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
              <span class="color-green-200">valider</span>
            </button>
          </div>
        </form>
      </section-provider>
    </div>
  </div>
</template>

<style lang="scss"></style>

<route lang="json">
{
  "name": "LoginPage",
  "path": "/",
  "meta": {}
}
</route>
