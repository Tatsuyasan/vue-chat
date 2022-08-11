import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages';
import vitedgePlugin from 'vitedge/plugin.js';
import Unocss from 'unocss/vite';
import presetWind from '@unocss/preset-wind';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitedgePlugin(),
    vue(),
    Unocss({
      presets: [presetWind()]
    }),
    Components({
      dts: 'src/types/components.d.ts'
    }),
    Pages(),
    eslint()
  ],
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
      shared: `${__dirname}/../../node_modules/shared/dist/esm/index.js`
    }
  }
});
