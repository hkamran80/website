<script setup lang="ts"></script>

<template>
    <div
        class="
            max-w-7xl
            mx-auto
            flex flex-col
            sm:flex-row
            items-center
            px-3
            sm:mt-16
        "
    >
        <div class="block text-black dark:text-white pb-16 w-full px-6 sm:px-2">
            <slot />
        </div>
    </div>
</template>
