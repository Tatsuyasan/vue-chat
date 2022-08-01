// import { Ref } from 'vue';

import Message from '@/models/Message';
import User from '@/models/User';

// export type AppContext = {
//   user: Ref<string | undefined>;
//   messages: Ref<string[]>;
// };

export type PrivateRoomOptions = {
  id: string;
  name: string;
  users: User[];
  messages: Message[];
};

export type SupervisorMessage = {
  content: string;
};
