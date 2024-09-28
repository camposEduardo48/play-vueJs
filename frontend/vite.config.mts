// Plugins
//@ts-ignore
import Components from 'unplugin-vue-components/vite';
//@ts-ignore
import Vue from '@vitejs/plugin-vue';
//@ts-ignore
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
//@ts-ignore
import ViteFonts from 'unplugin-fonts/vite';

// Utilities
//@ts-ignore
import { defineConfig } from 'vite';
//@ts-ignore
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		Vue({
			template: { transformAssetUrls },
		}),
		// https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
		Vuetify(),
		Components(),
		ViteFonts({
			google: {
				families: [
					{
						name: 'Roboto',
						styles: 'wght@100;300;400;500;700;900',
					},
				],
			},
		}),
	],
	define: { 'process.env': {} },
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
	},
	server: {
		port: 3000,
	},
});
