import { User } from 'shared';
// import { useCookies } from '@vueuse/integrations/useCookies';
import { LoginUserDto, RegisterUserDto } from 'shared';
import { http } from '../http.service';
import { useJwt } from '@/hooks/useJwt';

// const accessCookies = useCookies();
const { jwt } = useJwt();

export const authService = {
  login: async (credentials: LoginUserDto): Promise<User> => {
    const { data } = await http.post('/auth/login', credentials);
    jwt.value = data.accessToken;
    return data;
  },

  logout: () => {
    jwt.value = '';
  },

  register: async (registerData: RegisterUserDto) => {
    const { data } = await http.post('/auth/register', registerData);
    jwt.value = data.accessToken;
    return data.accessToken;
  },

  refreshToken: async (): Promise<void> => {
    const { data } = await http.get('/auth/refresh_token');
    jwt.value = data.accessToken;
  }
};
