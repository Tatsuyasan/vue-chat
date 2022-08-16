import { LoginUserDto } from '@/types/app';

export const authService = {
  login: async (data: LoginUserDto) => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) return;

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  register: async () => {
    return;
  }
};
