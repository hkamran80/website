const defaultTheme = require("tailwindcss/defaultTheme");

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
        fontFamily: {
            sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
            serif: [...defaultTheme.fontFamily.serif],
            mono: [...defaultTheme.fontFamily.mono],
        },
        extend: { width: { "1/10": "10%" } },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
