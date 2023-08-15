import { createApp } from "vue";
import App from "./App.vue";
import router from '@/router/mod'

import 'virtual:svg-icons-register'

import './style/mod.scss'
import 'ant-design-vue/dist/reset.css';


import { register_components } from './components/mod'
createApp(App).use(router).use(register_components).mount("#app");
