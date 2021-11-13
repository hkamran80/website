<script setup lang="ts">
const props = defineProps<{
    href: string | null;
    rel: string;
    ariaLabel: string;
    target: "_self" | "_blank" | "_parent" | "_top";
}>();
</script>

<template>
    <a
        :href="props.href || undefined"
        :target="target"
        :rel="rel"
        :aria-label="ariaLabel"
        v-if="!href?.startsWith('/')"
    >
        <slot />
    </a>

    <router-link
        :to="props.href || undefined"
        :target="target"
        :aria-label="ariaLabel"
        v-else
    >
        <slot />
    </router-link>
</template>
