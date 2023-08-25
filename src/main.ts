import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import MyLib from '@lib/index'
import './style.css'
import { createPinia } from 'pinia'

createApp(App).use(router).use(Antd).use(MyLib).use(createPinia()).mount('#app')
