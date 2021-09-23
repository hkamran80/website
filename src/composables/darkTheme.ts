import { ref } from "vue";

export function darkCheck(): boolean {
    return document.body.classList.contains("dark");
}

export function initialize() {
    let darkMode = ref(darkCheck());

    const toggleTheme = () => {
        if (darkMode.value) {
            document.body.classList.remove("dark");
        } else {
            document.body.classList.add("dark");
        }

        darkMode.value = !darkMode.value;
    };

    return { darkMode, toggleTheme };
}
