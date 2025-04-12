import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import MyLib from './lib/src/index'
import './lib/src/assets/main.css'
import 'ant-design-vue/dist/reset.css'
import './style.css'

createApp(App).use(router).use(Antd).use(MyLib).mount('#app')
