import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/views/Home.vue'
import Shift from './components/views/Shift.vue'
import About from './components/views/About.vue'

const routes = [
    { path: '/', name: 'Home', component: Home}, 
    { path: '/shift', name: 'Shift', component: Shift},
    { path: '/about', name: 'About', component: About}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router