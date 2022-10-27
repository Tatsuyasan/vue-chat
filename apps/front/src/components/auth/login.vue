<script lang="ts" setup>
import { LoginUserDto } from 'shared';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'submit', payload: LoginUserDto): void;
  (e: 'toggle'): void;
}>();

const email = ref('');
const password = ref('');

const submit = () => {
  emit('submit', { email: email.value, password: password.value });
};
</script>

<template>
  <div class="p-10 bg-gray-400">
    <section-heading class="mb-10">Connectez vous ...</section-heading>

    <form @submit.prevent="submit">
      <input-text
        v-model="email"
        class="mb-4 w-full"
        name="name"
        placeholder="email"
        required
        type="text"
      />
      <input-text
        v-model="password"
        class="mb-4 w-full"
        name="name"
        placeholder="Mot de passe"
        required
        type="password"
      />
      <p class="mb-4">
        Vous n'avez pas encore de compte ?
        <plain-button type="button" @click="emit('toggle')">
          Créez-en un !
        </plain-button>
      </p>
      <div class="flex justify-center">
        <status-button
          :disabled="!email || !password"
          status="success"
          type="submit"
        >
          <span>valider</span>
        </status-button>
      </div>
    </form>
  </div>
</template>

<!-- class="submit bg-green-600 cursor-pointer hover:bg-green-700 p-y-2 p-x-4 no-underline" -->
<style lang="scss" scoped>
button.submit {
  background-color: var(--background-300);
  color: var(--color-text-primary);

  &:hover {
    background-color: var(--background-400);
  }
}
</style>
