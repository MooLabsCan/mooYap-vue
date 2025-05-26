import { createApp } from 'vue'
import App from './App.vue'

// Import Tailwind CSS
import './assets/main.css'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faGlobe } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css' // Add this line

// Add icons to the library
library.add(faUser, faGlobe)

const app = createApp(App)

// Register Font Awesome component globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Mount the app
app.mount('#app')