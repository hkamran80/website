import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import raw from "vite-raw-plugin";
// import plainText from "vite-plugin-plain-text";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => {
                        return /^hk-/.test(tag);
                    },
                },
            },
        }),
        // raw({
        //     fileRegex: /\.md$/,
        // }),
        // plainText(/data\/posts\/(.*)\.md$/),
    ],
});
