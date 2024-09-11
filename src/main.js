import { createApp } from "vue";
import App from "./App.vue";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
// import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App);

app.use(bootstrap);
app.mount("#app");
