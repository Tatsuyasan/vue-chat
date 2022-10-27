// import { AppContext } from '@/types/app-context';
// import { InjectionKey } from 'vue';

import { AxiosContext } from '@/types/app';
import { InjectionKey } from 'vue';

export const CONTEXT_KEYS = {
  // APP: Symbol('app') as InjectionKey<AppContext>,
  SECTION: Symbol('sectionContext'),
  AXIOS: Symbol('axiosContext') as InjectionKey<AxiosContext>
} as const;
