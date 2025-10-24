// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import appPkg from '../package.json';
import { version as vueVersion } from 'vue';  
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')



// ===== Debug block (Dev-only & switchable) =====
const DEBUG = import.meta.env.DEV && import.meta.env.VITE_DEBUG === 'true';

if (DEBUG) {

  const ENV_SNAPSHOT = {
    DEV: import.meta.env.DEV,
    MODE: import.meta.env.MODE,
    VITE_DEBUG: import.meta.env.VITE_DEBUG
  };
  window.__ENV__ = ENV_SNAPSHOT;
  console.log('[ENV]', ENV_SNAPSHOT);


  console.log('%c[DEBUG] JS Debug Session Started', 'font-weight:bold');
  window.addEventListener('error', (e) => {
    console.error('[GlobalError]', e.message, '\n', e.error?.stack || '(no stack)');
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error('[UnhandledRejection]', e.reason?.stack || e.reason);
  });
  if (app?.config) {
    const prev = app.config.errorHandler;
    app.config.errorHandler = (err, instance, info) => {
      console.error('[VueError]', info, '\n', err?.stack || err);
      if (typeof prev === 'function') prev(err, instance, info);
    };
  }
  queueMicrotask(() => console.log('[DEBUG] App mounted'));
}

// 1
if (DEBUG) {
  setTimeout(() => {
    try {
      const o = null;
      console.log(o?.foo);          // safe access (returns undefined)
    } catch (e) {
      console.error('[TestError]', e);
      // no `throw e`
    }
  }, 0);
}

//2
if (DEBUG) {
  import('vue').then(v => {
  console.table({
    vue: vueVersion,
    primevue: appPkg.dependencies?.primevue,
    '@primevue/themes': appPkg.dependencies?.['@primevue/themes'],
    primeicons: appPkg.dependencies?.primeicons,
    vite: appPkg.devDependencies?.vite ?? appPkg.dependencies?.vite
  });
  });
}

// ===== End Debug block =====

