import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createRouter, createWebHashHistory} from 'vue-router'
import ElementPlus from 'element-plus';
import { vLoading } from "element-plus/es/components/loading/src/directive"
import 'element-plus/dist/index.css'

import App from './App.vue'
import ManagersList from '@/components/ManagersList.vue'


const routes = [
    { path: '/', component: ManagersList },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(ElementPlus)

app.directive('loading', vLoading);

app.mount('#app')


