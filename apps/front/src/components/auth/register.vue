<script lang="ts" setup>
import { RegisterUserDto } from 'shared';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'submit', payload: RegisterUserDto): void;
  (e: 'toggle'): void;
}>();

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const submit = () => {
  emit('submit', {
    email: email.value,
    password: password.value,
    username: username.value,
    confirmPassword: confirmPassword.value
  });
};
</script>

<template>
  <div class="p-10 bg-gray-400">
    <section-heading class="mb-10">Inscrivez vous ...</section-heading>

    <form @submit.prevent="submit">
      <input-text
        v-model="username"
        class="mb-4 w-full"
        name="name"
        placeholder="username"
        required
        type="text"
      />
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
      <input-text
        v-model="confirmPassword"
        class="mb-4 w-full"
        name="name"
        placeholder="confirmation de mot de passe"
        required
        type="password"
      />
      <p class="mb-4">
        Vous avez déjà un compte ?
        <plain-button type="button" @click="emit('toggle')">
          Connectez vous !
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
