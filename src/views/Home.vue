<script setup lang="ts">
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
import MainButton from "../components/MainButton.vue";
import SvgButton from "../components/SvgButton.vue";
</script>

<template>
    <div
        id="background"
        class="
            flex
            justify-center
            bg-gray-500 bg-no-repeat bg-cover
            relative
            items-center
        "
        style="background-image: url('/src/assets/background.jpg')"
    >
        <div class="absolute bg-black opacity-70 inset-0 z-0" />

        <!-- Main Intro Card -->
        <div
            class="
                max-w-xl
                w-full
                space-y-8
                px-10
                py-6
                bg-gray-200
                dark:bg-black
                z-10
                rounded-2xl
            "
        >
            <div class="my-6">
                <div
                    class="
                        text-3xl
                        font-bold
                        text-black
                        dark:text-white
                        grid grid-cols-2
                        items-center
                    "
                >
                    <h1>H. Kamran</h1>
                    <div class="text-right">
                        <svg-button
                            path="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                        />
                        <svg-button
                            path="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
                        />
                        <svg-button
                            path="M17.36,20.2V14.82H19.15V22H3V14.82H4.8V20.2H17.36M6.77,14.32L7.14,12.56L15.93,14.41L15.56,16.17L6.77,14.32M7.93,10.11L8.69,8.5L16.83,12.28L16.07,13.9L7.93,10.11M10.19,6.12L11.34,4.74L18.24,10.5L17.09,11.87L10.19,6.12M14.64,1.87L20,9.08L18.56,10.15L13.2,2.94L14.64,1.87M6.59,18.41V16.61H15.57V18.41H6.59Z"
                        />
                        <svg-button
                            path="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
                        />
                    </div>
                </div>
                <div>
                    <p class="mt-4 text-sm text-gray-700 dark:text-gray-200">
                        Hello world! I'm a developer, experienced in Python,
                        JavaScript (and TypeScript), Vue.js, Java, Swift, and
                        SwiftUI.
                    </p>
                </div>
                <div class="mt-6 grid grid-cols-3 gap-4">
                    <router-link to="/creations">
                        <main-button content="Creations" />
                    </router-link>
                    <router-link to="/">
                        <main-button content="Blog" />
                    </router-link>
                    <router-link to="/">
                        <main-button content="Programs" />
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Theme Switch -->
        <theme-switcher />

        <!-- Photo Credit -->
        <div class="absolute bottom-5 right-5 text-gray-500 text-xs">
            <p>
                Background photo by
                <a
                    href="https://unsplash.com/@jbcreate_"
                    class="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Joseph Barrientos
                </a>
                on
                <a
                    href="https://unsplash.com/"
                    class="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Unsplash
                </a>
            </p>
        </div>
    </div>
</template>
