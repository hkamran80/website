import { ref } from "@vue/runtime-dom";
import { darkCheck } from "./darkTheme";

export const colors = {
    light: {
        background: "bg-white",
        text: { headers: "text-gray-900" },
    },
    dark: {
        background: "bg-gray-800",
        text: { headers: "text-white" },
    },
};

export function initialize() {
    const switchTheme = (newState: boolean): void => {
        background.value = newState
            ? colors.dark.background
            : colors.light.background;
        headerTextColor.value = newState
            ? colors.dark.text.headers
            : colors.light.text.headers;
    };

    const background = ref(
        darkCheck() ? colors.dark.background : colors.light.background
    );
    const headerTextColor = ref(
        darkCheck() ? colors.dark.text.headers : colors.light.text.headers
    );

    return { switchTheme, background, headerTextColor };
}
