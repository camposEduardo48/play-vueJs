/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins"

// Components
import App from "./App.vue"


//@ts-ignore
// Composables
import { createApp } from "vue"

// Router
import router from "./router/index.ts"

const app = createApp(App);
registerPlugins(app);
app.use(router)
app.mount("#app");
