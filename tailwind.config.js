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
            },
            animation: { "bounce-side": "bounce-side 1s infinite" },
            keyframes: {
                "bounce-side": {
                    "0%, 100%": {
                        transform: "translateX(-25%)",
                        "animation-timing-function":
                            "cubic-bezier(0.8, 0, 1, 1)",
                    },
                    "50%": {
                        transform: "translateX(0%)",
                        "animation-timing-function":
                            "cubic-bezier(0, 0, 0.2, 1)",
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
