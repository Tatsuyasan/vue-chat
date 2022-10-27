import { CONTEXT_KEYS } from '@/utils/constants';
import { useSafeInject } from './useSafeInject';

export const useAxios = () => {
  return useSafeInject(CONTEXT_KEYS.AXIOS);
};
