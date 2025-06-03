import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		SvelteKitPWA({
			registerType: "autoUpdate",
			devOptions: { enabled: true },
			includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "maskable-icon-512x512.png"],
			manifest: {
				name: "Kopymatic",
				short_name: "kopymatic",
				description: "A silly little place for my silly little thoughts",
				theme_color: "#000000",
				share_target: {
					action: "/shortcut/create",
					method: "GET",
					params: {
						url: "link",
						text: "text",
						title: "title"
					},
					enctype: "application/x-www-form-urlencoded"
				},
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png"
					},
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png"
					}
				]
			}
		})
	]
});
