import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/views/Home.vue'
import Shift from './components/views/Shift.vue'
import About from './components/views/About.vue'
import Healthz from './components/views/status/Healthz.vue'
import Error404 from './components/views/status/404.vue'


const routes = [
    { path: '/', name: 'Home', component: Home}, 
    { path: '/shift', name: 'Shift', component: Shift},
    { path: '/about', name: 'About', component: About},
    { path: '/status/healthz', name: 'Healthz', component: Healthz},
    { path: '/404', name: '404', component: Error404}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router