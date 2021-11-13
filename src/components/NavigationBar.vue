<script setup lang="ts">
import ThemeSwitcher from "./ThemeSwitcher.vue";
import { ref } from "@vue/reactivity";

const isOpen = ref(false);
</script>

<template>
    <nav class="max-w-7xl mx-auto">
        <!-- Header start -->
        <div
            class="
                block
                sm:flex sm:justify-between sm:items-center
                mb-6
                pt-3
            "
        >
            <!-- Header menu links and small screen hamburger menu start -->
            <div class="flex justify-between items-center px-6 pt-2 sm:px-0">
                <!-- Header logos start -->
                <div>
                    <router-link
                        to="/"
                        class="
                            block
                            text-left text-lg
                            font-bold
                            text-primary-dark
                            dark:text-ternary-light
                            hover:text-pink-800
                            dark:hover:text-pink-400
                            sm:mx-4
                            mb-2
                            sm:py-2
                        "
                    >
                        H. Kamran
                    </router-link>
                </div>
                <!-- Header logos end -->

                <div class="flex items-center space-x-4">
                    <!-- Theme switcher small screen start -->
                    <theme-switcher
                        class="
                            sm:hidden
                            bg-gray-200
                            dark:bg-gray-800
                            text-black
                            dark:text-white
                            hover:shadow-sm
                            p-2
                            rounded-lg
                        "
                    />
                    <!-- Theme switcher small screen end -->

                    <!-- Small screen hamburger menu start -->
                    <div class="sm:hidden">
                        <button
                            @click="isOpen = !isOpen"
                            type="button"
                            class="focus:outline-none"
                            aria-label="Hamburger Menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                class="
                                    h-7
                                    w-7
                                    fill-current
                                    text-secondary-dark
                                    dark:text-ternary-light
                                "
                            >
                                <path
                                    v-if="isOpen"
                                    fill-rule="evenodd"
                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                    clip-rule="evenodd"
                                ></path>
                                <path
                                    v-if="!isOpen"
                                    fill-rule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <!-- Small screen hamburger menu end -->
                </div>
            </div>
            <!-- Header menu links and small screen hamburger menu end -->

            <!-- Header links start -->
            <div
                :class="isOpen ? 'block' : 'hidden'"
                class="
                    m-0
                    sm:ml-4
                    mt-5
                    sm:mt-3 sm:flex
                    p-5
                    sm:p-0
                    justify-center
                    items-center
                    shadow-lg
                    sm:shadow-none
                "
            >
                <router-link to="/creations" class="link" aria-label="Projects">
                    Creations
                </router-link>
                <router-link to="/blog" class="link" aria-label="Blog">
                    Blog
                </router-link>
                <router-link to="/programs" class="link" aria-label="Programs">
                    Programs
                </router-link>
            </div>
            <!-- Header links end -->

            <!-- Header right section buttons start -->
            <div
                class="
                    hidden
                    sm:flex
                    justify-between
                    items-center
                    flex-col
                    md:flex-row
                "
            >
                <!-- Theme switcher larger screen start -->
                <theme-switcher
                    class="
                        ml-8
                        bg-gray-200
                        dark:bg-gray-800
                        text-black
                        dark:text-white
                        p-2
                        shadow-sm
                        rounded-xl
                        cursor-pointer
                    "
                />
                <!-- Theme switcher larger screen end -->
            </div>
            <!-- Header right section buttons stendart -->
        </div>
        <!-- Header end -->
    </nav>
</template>

<style scoped lang="postcss">
nav a.router-link-exact-active {
    @apply text-pink-700;
    @apply hover:text-pink-800;
    @apply dark:text-pink-400;
    @apply dark:hover:text-pink-500;
}

nav .link {
    @apply block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-pink-800 dark:hover:text-pink-400 sm:mx-4 mb-2 sm:py-2;
}
</style>
