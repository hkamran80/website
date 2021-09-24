<script setup lang="ts">
import ThemeSwitcher from "./ThemeSwitcher.vue";
import NavigationButtons from "./NavigationButtons.vue";

const emit = defineEmits<{
    (e: "updateTheme"): void;
}>();
</script>

<template>
    <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-4">
                    <router-link to="/" class="flex-shrink-0">
                        <img
                            class="h-8 w-auto rounded-full"
                            src="/img/profile.png"
                            alt="Profile picture"
                        />
                    </router-link>
                    <div class="sm:ml-12">
                        <div class="flex space-x-4">
                            <navigation-buttons />
                        </div>
                    </div>
                </div>
                <div class="hidden sm:ml-6 sm:block">
                    <div class="flex items-center">
                        <div class="ml-3 relative">
                            <div>
                                <button
                                    class="
                                        bg-gray-800
                                        flex
                                        text-sm
                                        rounded-full
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-offset-2
                                        focus:ring-offset-gray-800
                                        focus:ring-white
                                    "
                                >
                                    <span class="sr-only"> Switch theme </span>
                                    <theme-switcher
                                        @click="$emit('updateTheme')"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
