import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Styles
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import router from './router';
import App from './app.vue';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#ff4500',
          accent: '#1a11e8',
        },
      },
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#fetcher-app');

// @ts-ignore
if (import.meta.env.DEV) {
  window.FETCHER_APP = app;
}
