<script lang="ts" setup>
import { useSocket } from '@/hooks/useSocket';
import { useStore } from '@/hooks/useStore';
import { authService } from '@/services/api/auth';
import { userService } from '@/services/api/user';
import { LoginUserDto, RegisterUserDto, User } from 'shared';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showFormConnection = ref(true);
const router = useRouter();
const store = useStore();
const socket = useSocket();

const toggleForm = () => {
  showFormConnection.value = !showFormConnection.value;
};

const login = async (credentials: LoginUserDto) => {
  try {
    const user: User = await authService.login(credentials);

    store.user = user;

    const currentSocket = socket.connect();

    await userService.updateSocketId(currentSocket.id);

    router.replace({ name: 'ChatPage' });
  } catch (e) {
    console.error(e);
  }
};

const register = async (credentials: RegisterUserDto) => {
  try {
    await authService.register(credentials);

    router.replace({ name: 'ChatPage' });
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="auth-page flex justify-center items-center h-screen">
    <fade-transition mode="out-in">
      <Login
        v-if="showFormConnection"
        key="login"
        @submit="login"
        @toggle="toggleForm"
      />
      <Register v-else key="register" @submit="register" @toggle="toggleForm" />
    </fade-transition>
  </div>
</template>

<style lang="scss" scoped>
.auth-page {
  background-color: var(--background-700);

  > div {
    margin: 0 auto;
    max-width: 440px;
    background-color: var(--background-500);
  }
}
</style>

<route lang="json">
{
  "name": "AuthPage",
  "path": "/",
  "meta": {}
}
</route>
