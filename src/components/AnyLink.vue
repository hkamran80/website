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
        v-if="!href?.startsWith('/')"
        :href="props.href || undefined"
        :target="target"
        :rel="rel"
        :aria-label="ariaLabel"
    >
        <slot />
    </a>

    <router-link
        v-else
        :to="props.href || undefined"
        :target="target"
        :aria-label="ariaLabel"
    >
        <slot />
    </router-link>
</template>
