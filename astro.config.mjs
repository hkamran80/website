// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
    site: "https://hkamran.com",

    image: {
        domains: ["hkamran.com"],
    },

    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [svelte()],

    experimental: {
        fonts: [
            {
                provider: fontProviders.google(),
                name: "Nunito Sans",
                cssVariable: "--font-nunito-sans",
                weights: ["400 700"],
                subsets: ["latin", "latin-ext"],
            },
        ],
    },
});
