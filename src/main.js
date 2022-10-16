import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import store from './store'

const app = createApp(App);
app.config.productionTip = false;
app.use(router).use(Antd).use(store).mount('#app')