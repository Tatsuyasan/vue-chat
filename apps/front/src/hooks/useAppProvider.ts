import { CONTEXT_KEYS } from '@/utils/constants';
import { ref, provide } from 'vue';

export const useAppProvider = () => {
  const context = {
    user: ref(),
    messages: ref([])
  };

  provide(CONTEXT_KEYS.APP, context);

  return context;
};
