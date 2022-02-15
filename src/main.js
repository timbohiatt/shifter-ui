import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './routes.js'

import axios from 'axios'
import VueAxios from 'vue-axios'




var app = createApp(App)
app.use(router)
app.use(VueAxios, axios)


import VueUploadComponent from 'vue-upload-component'
app.component('file-upload', VueUploadComponent)

// Bootstrap Icons
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
app.component('BootstrapIcon', BootstrapIcon);


app.mount('#app')