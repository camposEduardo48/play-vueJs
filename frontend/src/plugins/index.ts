/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
// Plugins
import vuetify from "./vuetify";
// Como não esta ocorrendo problema ao compilar, inserir um comentário para ser ignorado pelo Typescript.
//@ts-ignore
// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
	app.use(vuetify);
}
