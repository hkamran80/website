import * as oxc from "@prettier/plugin-oxc";
import * as astro from "prettier-plugin-astro";
import * as tailwindcss from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
export default {
    trailingComma: "all",
    tabWidth: 4,
    plugins: [oxc, astro, tailwindcss],
    overrides: [
        {
            files: "**/*.astro",
            options: {
                parser: "astro",
                plugins: [astro],
            },
        },
        {
            files: ["**/*.{ts,mts,cts,tsx}"],
            parser: "oxc-ts",
            plugins: [prettierPluginOxc],
        },
    ],
    tailwindAttributes: "./src/styles/global.css",
};
