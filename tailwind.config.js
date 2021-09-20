module.exports = {
    mode: "jit",
    purge: [
        "./index.html",
        "./src/*.vue",
        "./src/components/*.vue",
        "./src/views/*.vue",
    ],
    darkMode: "class",
    theme: {
        extend: { width: { "1/10": "10%" } },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
