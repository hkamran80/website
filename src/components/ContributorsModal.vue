<script setup lang="ts">
import { Contributors } from "../interfaces/Contributor";

const props = defineProps<{
    creation: string;
    contributors: Contributors;
}>();
const emit = defineEmits<{
    (e: "close"): void;
}>();
</script>

<template>
    <div class="bg-gray-700">
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div
                class="
                    flex
                    items-end
                    justify-center
                    min-h-screen
                    py-6
                    px-4
                    pb-20
                    text-center
                    sm:block sm:p-0
                "
            >
                <transition
                    enter-active-class="ease-out duration-300"
                    enter-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        class="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                    >
                        <div class="absolute inset-0 bg-gray-500 opacity-75" />
                    </div>
                </transition>

                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                />

                <transition
                    enter-active-class="ease-out duration-300"
                    enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        class="
                            inline-block
                            align-bottom
                            bg-white
                            dark:bg-gray-700
                            rounded-lg
                            px-4
                            pt-5
                            pb-4
                            text-left
                            overflow-hidden
                            shadow-xl
                            transform
                            transition-all
                            sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6
                        "
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div>
                            <div class="md:mt-0 sm:mt-5">
                                <h3
                                    class="
                                        text-lg
                                        leading-6
                                        font-medium
                                        text-gray-900
                                        dark:text-white
                                    "
                                    id="modal-headline"
                                >
                                    Contributors for {{ creation }}
                                </h3>
                                <div class="mt-4">
                                    <div
                                        v-for="(details, name) in contributors"
                                        :key="name"
                                        class="
                                            bg-pink-500
                                            dark:bg-pink-700
                                            pl-4
                                            py-3
                                            font-medium
                                            text-md
                                            leading-6
                                            shadow-xl
                                            rounded-md
                                            text-white
                                            mb-2
                                        "
                                    >
                                        <span v-text="name" />
                                        <p
                                            class="text-sm"
                                            v-text="details.role"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6">
                            <button
                                @click="$emit('close')"
                                type="button"
                                class="
                                    inline-flex
                                    justify-center
                                    w-full
                                    rounded-md
                                    border border-transparent
                                    shadow-sm
                                    px-4
                                    py-2
                                    bg-pink-700
                                    dark:bg-pink-500
                                    text-base
                                    font-medium
                                    text-white
                                    focus:outline-none
                                    ring-pink-700
                                    dark:ring-pink-500
                                    focus:ring focus:ring-offset-2
                                    hover:bg-pink-600
                                    dark:hover:bg-pink-600
                                    sm:text-sm
                                "
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
