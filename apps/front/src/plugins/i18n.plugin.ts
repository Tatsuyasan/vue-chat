import { createI18n } from 'vue-i18n';

export default {
  install: (context: any) => {
    const i18n = createI18n({});
    context.app.use(i18n);
  }
};
