<script setup lang="ts">
const props = defineProps<{
    valueId: string;
    title: string;
    input: string;
    hint?: string;
    disableInput?: boolean;
}>();
const emit = defineEmits<{
    (e: "update:input", value: string): void;
}>();

const updateInput = (e: Event) =>
    emit("update:input", (e.target as HTMLInputElement).value);
</script>

<template>
    <div class="flex items-center justify-center">
        <div class="w-full mx-auto">
            <div>
                <label
                    :for="props.valueId"
                    class="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-white
                    "
                    v-text="title"
                />
                <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                        type="text"
                        :name="props.valueId"
                        :id="props.valueId"
                        class="
                            focus:ring-pink-500 focus:border-pink-500
                            bg-white
                            dark:bg-gray-700
                            text-black
                            dark:text-white
                            block
                            w-full
                            pl-3
                            py-2
                            pr-12
                            sm:text-sm
                            border-gray-300
                            dark:border-gray-700
                            rounded-md
                        "
                        placeholder="0.00"
                        :value="input"
                        @input="updateInput"
                        :disabled="props.disableInput"
                        :aria-describedby="`${props.valueId}Value`"
                    />
                    <div
                        class="
                            absolute
                            inset-y-0
                            right-0
                            pr-3
                            flex
                            items-center
                            pointer-events-none
                        "
                    >
                        <span
                            class="text-gray-500 dark:text-gray-400 sm:text-sm"
                            :id="`${props.valueId}Value`"
                        >
                            %
                        </span>
                    </div>
                </div>
                <p
                    class="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    v-if="props.hint"
                    v-text="props.hint"
                />
            </div>
        </div>
    </div>
</template>
