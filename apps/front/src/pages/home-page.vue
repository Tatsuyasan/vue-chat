<script lang="ts" setup>
import { useApp } from '@/hooks/useApp';
import { useRouter } from 'vue-router';

const { user } = useApp();
const router = useRouter();

const goToChatPage = () => router.replace({ name: 'ChatPage' });
</script>

<template>
  <section-provider>
    <section-heading>
      ici c'est la home page avec le formulaire de connexion
    </section-heading>

    <label for="name">Name</label>
    <input-text
      v-model="user"
      id="name"
      name="name"
      required
      type="text"
      @keypress.enter="goToChatPage()"
    />
    <router-link :disabled="user" :to="{ name: 'ChatPage' }">
      valider
    </router-link>
  </section-provider>
</template>

<style lang="scss"></style>

<route lang="json">
{
  "name": "HomePage",
  "path": "/",
  "meta": {}
}
</route>
