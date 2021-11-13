import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        EnvironmentPlugin(["API_URL", "UPLOAD_API_URL", "API_VERSION"]),
    ],
});