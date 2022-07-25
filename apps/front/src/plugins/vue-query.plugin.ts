import { VueQueryPlugin } from 'vue-query';

export default {
  install: (context: any) => {
    context.app.use(VueQueryPlugin);
  }
};
