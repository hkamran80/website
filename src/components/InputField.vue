<script setup lang="ts">
const props = defineProps<{
    type: "text" | "number";
    placeholder: string;
    svg?: string;
    step?: string | number;
    modelValue: string | number | null;
    readonly?: boolean;
}>();

const emit =
    defineEmits<{ (e: "update:modelValue", value: string | number): void }>();
</script>

<template>
    <div class="relative flex w-full flex-wrap items-center mb-3">
        <input
            :type="props.type"
            :placeholder="props.placeholder"
            class="
                px-3
                py-3
                relative
                bg-white
                dark:bg-gray-900
                rounded
                text-sm
                border-0
                shadow
                outline-none
                focus:outline-none focus:ring focus:ring-pink-700
                w-full
                pr-10
                appearance-none
            "
            :step="props.step"
            :value="props.modelValue"
            :readonly="props.readonly"
            :aria-readonly="props.readonly"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <span
            class="
                z-10
                h-full
                leading-snug
                font-normal
                absolute
                text-center
                bg-transparent
                rounded
                text-base
                items-center
                justify-center
                w-8
                right-0
                pr-3
                py-3
            "
            v-html="props.svg"
            v-if="props.svg"
        />
    </div>
</template>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
