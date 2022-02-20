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

// Mount the Vue Application
app.mount('#app')