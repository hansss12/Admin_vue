import { createApp } from 'vue'
import './style.css'
import './assets/style.css'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: "865795531816-9s3rn6nslv5j1gdu1jojkcbg37gp5j2j.apps.googleusercontent.com"
})

app.mount('#app')
