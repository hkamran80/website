<script setup lang="ts">
import NavigationButton from "./NavigationButton.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import NavigationButtons from "./NavigationButtons.vue";

const emit = defineEmits<{
    (e: "updateTheme"): void;
}>();
</script>

<template>
    <nav>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex">
                    <div class="flex-shrink-0 flex items-center">
                        <img
                            class="block lg:hidden h-8 w-auto rounded-full"
                            src="/img/profile.png"
                            alt="Profile picture"
                        />
                        <img
                            class="h-8 w-auto rounded-full"
                            src="/img/profile.png"
                            alt="Profile picture"
                        />
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <navigation-buttons />
                    </div>
                </div>
                <div class="hidden sm:ml-6 sm:flex sm:items-center">
                    <div class="ml-3 relative">
                        <div>
                            <button
                                class="
                                    bg-white
                                    rounded-full
                                    flex
                                    text-sm
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-offset-2
                                    focus:ring-indigo-500
                                "
                            >
                                <span class="sr-only"> Switch theme </span>
                                <theme-switcher @click="$emit('updateTheme')" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
