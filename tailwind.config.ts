import type { Config } from "tailwindcss";

export default {
    theme: {
        extend: {
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
} satisfies Config;
