import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import store from "./store";
import InstantSearch from "vue-instantsearch/vue3/es";

const app = createApp(App);
app.config.productionTip = false;
app.use(router).use(Antd).use(store).use(InstantSearch).mount("#app");
