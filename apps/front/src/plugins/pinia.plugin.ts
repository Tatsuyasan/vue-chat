import { createPinia } from 'pinia';

export default {
  install: (context: any) => {
    const pinia = createPinia();
    context.app.use(pinia);
  }
};
