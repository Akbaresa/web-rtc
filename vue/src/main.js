import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast , { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp(App)

app.use(Toast,{
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true
});
app.use(router)
app.mount('#app')
