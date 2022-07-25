import { Ref } from 'vue';

export type AppContext = {
  user: Ref<string | undefined>;
  messages: Ref<string[]>;
};
