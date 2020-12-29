module.exports = {
    transpileDependencies: ["vuetify"],
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "H. Kamran";
            return args;
        });
    },
    pwa: {
        name: "H. Kamran",
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js",
            exclude: [/\.map$/, /_redirects/]
        }
    }
};
