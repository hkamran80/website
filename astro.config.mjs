// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://beta.hkamran.com",

    image: {
        domains: ["hkamran.com"],
    },

    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [
        svelte(),
        robotsTxt({
            host: true,
            policy: [{ userAgent: "*", disallow: "/_astro/" }],
        }),
        sitemap({ xslURL: "/sitemap.xslt" }),
    ],

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

