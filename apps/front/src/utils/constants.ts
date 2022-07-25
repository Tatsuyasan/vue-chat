import { AppContext } from '@/types/app-context';
import { InjectionKey } from 'vue';

export const CONTEXT_KEYS = {
  APP: Symbol('app') as InjectionKey<AppContext>,
  SECTION: Symbol('sectionContext')
} as const;

export const DEFAULT_ROOMS: string[] = ['general', 'room1', 'room2', 'room3'];
