import App from '@/app.vue';
import routes from '~pages';
import vitedge from 'vitedge';
import 'uno.css';

// import { axiosContext } from './services/http.service';
// import { CONTEXT_KEYS } from './utils/constants';

export default vitedge(App, { routes }, (context) => {
  // context.app.provide(CONTEXT_KEYS.AXIOS, axiosContext);
  const pluginModules = import.meta.globEager('./**/*.plugin.ts');
  Object.values(pluginModules).forEach((module) => {
    module.default.install(context);
  });
});
