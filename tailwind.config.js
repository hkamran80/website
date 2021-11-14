const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary-light": "#F7F8FC",
                "secondary-light": "#FFFFFF",
                "ternary-light": "#f6f7f8",

                "primary-dark": "#0D2438",
                "secondary-dark": "#102D44",
                "ternary-dark": "#1E3851",
            },
            fontFamily: {
                sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
                serif: [...defaultTheme.fontFamily.serif],
                mono: [...defaultTheme.fontFamily.mono],
            },
            typography: (theme) => ({
                light: {
                    css: [
                        {
                            color: theme("colors.gray.400"),
                            '[class~="lead"]': {
                                color: theme("colors.gray.300"),
                            },
                            a: {
                                color: theme("colors.pink.400"),
                            },
                            strong: {
                                color: theme("colors.white"),
                            },
                            "ol > li::before": {
                                color: theme("colors.gray.400"),
                            },
                            "ul > li::before": {
                                backgroundColor: theme("colors.gray.600"),
                            },
                            hr: {
                                borderColor: theme("colors.gray.200"),
                            },
                            blockquote: {
                                color: theme("colors.gray.200"),
                                borderLeftColor: theme("colors.gray.600"),
                            },
                            h1: {
                                color: theme("colors.white"),
                            },
                            h2: {
                                color: theme("colors.white"),
                            },
                            h3: {
                                color: theme("colors.white"),
                            },
                            h4: {
                                color: theme("colors.white"),
                            },
                            "figure figcaption": {
                                color: theme("colors.gray.400"),
                            },
                            code: {
                                color: theme("colors.white"),
                            },
                            "a code": {
                                color: theme("colors.white"),
                            },
                            pre: {
                                color: theme("colors.gray.200"),
                                backgroundColor: theme("colors.gray.800"),
                            },
                            thead: {
                                color: theme("colors.white"),
                                borderBottomColor: theme("colors.gray.400"),
                            },
                            "tbody tr": {
                                borderBottomColor: theme("colors.gray.600"),
                            },
                        },
                    ],
                },
            }),
        },
    },
    // variants: {
        // extend: {
        //     typography: ["dark"],
        // },
    // },
    plugins: [require("@tailwindcss/typography")],
};
