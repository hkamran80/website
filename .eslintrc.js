module.exports = {
    extends: [
        "next/core-web-vitals",
        // "prettier",
        "@hkamran/eslint-config",
        // "plugin:import/recommended",
        // "plugin:import/typescript",
    ],
    // plugins: ["import"],
    rules: {
        "react-hooks/exhaustive-deps": "off",
        //     "import/first": "error",
        //     "import/newline-after-import": "error",
        //     "import/no-duplicates": "error",
        //     "import/no-unassigned-import": ["error", { allow: ["@/styles/*.css"] }],
        //     "import/no-unresolved": ["error", { ignore: ["@/styles/(.*).css"] }],
        //     "import/extensions": ["error", "never", { css: "always" }],
        //     "import/no-dynamic-require": "error","import/no-cycle":'error',
        //     "import/order": [
        //         "error",
        //         {
        //             groups: [
        //                 "builtin",
        //                 "external",
        //                 "internal",
        //                 ["parent", "sibling"],
        //                 "type",
        //             ],
        //         },
        //     ],
    },
};
