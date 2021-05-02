const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
    transpileDependencies: ["vuetify"],
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "H. Kamran";
            return args;
        });

        config.plugins.delete("prefetch");
    },
    configureWebpack: {
        output: {
            crossOriginLoading: "anonymous"
        },
        plugins: [
            new PreloadWebpackPlugin({
                rel: "preload",
                include: "allChunks"
            })
        ]
    },
    pwa: {
        name: "H. Kamran",
        themeColor: "#6D1E3B",
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js",
            exclude: [/\.map$/, /^manifest.*\.js?$/, /_redirects/]
        },
        manifestOptions: {
            display_override: ["minimal-ui"],
            display: "standalone",
            background_color: "#6D1E3B",
            url: "https://hkamran.com",
            manifestUrl: "/manifest.json",
            lang: "en",
            orientation: "any",
            description: "Hello world! I'm H. Kamran and I'm a developer.",
            scope: "https://hkamran.com",
            categories: ["entertainment", "utilities"],
            prefer_related_applications: false,
            related_applications: []
        }
    }
};
