// import { AppContext } from '@/types/app-context';
// import { InjectionKey } from 'vue';

export const CONTEXT_KEYS = {
  // APP: Symbol('app') as InjectionKey<AppContext>,
  SECTION: Symbol('sectionContext')
} as const;

export const DEFAULT_ROOMS = {
  PUBLIC: 'public'
};

export const defaultRoom = {
  id: DEFAULT_ROOMS.PUBLIC,
  name: 'Général',
  users: [],
  isClosable: false,
  isPrivateRoom: false,
  hasUnreadMessage: false,
  messages: []
};
