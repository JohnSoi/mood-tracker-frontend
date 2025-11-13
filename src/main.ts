import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import "@/assets/style/main.css";
import { ru } from "primelocale/js/ru.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
    ripple: true,
    locale: ru,
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: ".app-dark",
        },
    },
});

app.mount("#app");
