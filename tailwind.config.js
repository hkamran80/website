/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
                serif: [...defaultTheme.fontFamily.serif],
                mono: [...defaultTheme.fontFamily.mono],
            },
            colors: {
                "hk-grey": "#151515",
                "hk-grey-hover": "#1e1e1e",
                "hk-grey-light": "#313131",
            },
            typography: {
                DEFAULT: {
                    css: {
                        "code::before": {
                            content: "",
                        },
                        "code::after": {
                            content: "",
                        },
                        "blockquote p:first-of-type::before": {
                            content: "",
                        },
                        "blockquote p:last-of-type::after": {
                            content: "",
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
};
