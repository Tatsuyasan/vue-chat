import { CONTEXT_KEYS } from '@/utils/constants';
import { useSafeInject } from './useSafeInject';

export const useApp = () => useSafeInject(CONTEXT_KEYS.APP);
