import { createApp } from 'vue'
import App from './App.vue'
import router from './routes.js'

// Global CSS
import './index.css'

// Plugins
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from '@kyvg/vue3-notification'

// Create Instance of Vue Application
var app = createApp(App)
// Add Vue Router 
app.use(router)
// Add Axios 
app.use(VueAxios, axios)
// Add Notifications System
app.use(Notifications)

// Bootstrap Icons
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
app.component('BootstrapIcon', BootstrapIcon);

// Setup Shifter Configuration: 
app.config.globalProperties.$shifterConfig = {
    // API Base URL Format "{domain.com}:{port}/api/vX"
    // Example:  "https://api.shifter.cloud:8080/api/v1"
    API_BASE_URL:import.meta.env.SHIFTER_UI__API_BASE_URL,
}

// Mount the Vue Application
app.mount('#app')