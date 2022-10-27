import jwt_decode from 'jwt-decode';
import { computed, ComputedRef, ref } from 'vue';

type DecodedJWT = {
  id: string;
  exp: number;
  iat: number;
};

const jwt = ref<string>('');

export const useJwt = () => {
  const decodedJwt: ComputedRef<DecodedJWT> = computed(() => {
    return jwt_decode(jwt.value);
  });

  return {
    jwt,
    decodedJwt
  };
};
