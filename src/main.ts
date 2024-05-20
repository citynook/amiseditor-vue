import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import 'amis/sdk/sdk.js';
//import 'amis/lib/themes/default.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
