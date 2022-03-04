<script setup lang="ts">
import { ref, watch } from "vue";
import _feather from "feather-icons";

import InputField from "./InputField.vue";

const gradeBeforeFinal = ref<number | null>(null);
const finalScore = ref<number | null>(null);
const finalWeight = ref<number | null>(null);
const gradeAfterFinal = ref<string | null>(null);

watch(
    [gradeBeforeFinal, finalScore, finalWeight],
    ([newGradeBeforeFinal, newFinalScore, newFinalWeight]) => {
        if (newGradeBeforeFinal && newFinalScore && newFinalWeight) {
            let finalWeightDecimal = newFinalWeight / 100;

            gradeAfterFinal.value = (
                ((1 - finalWeightDecimal) * (newGradeBeforeFinal / 100) +
                    finalWeightDecimal * (newFinalScore / 100)) *
                100
            ).toFixed(2);
        }
    },
);

const feather = _feather;
</script>

<template>
    <div
        class="mt-7 grid sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-2 items-center"
    >
        <input-field
            class="col-span-2 sm:col-span-1"
            type="number"
            placeholder="Grade Before Final"
            :svg="feather.icons.percent.toSvg()"
            step="any"
            v-model="gradeBeforeFinal"
        />
        <input-field
            class="col-span-2 sm:col-span-1"
            type="number"
            placeholder="Final Score"
            :svg="feather.icons.percent.toSvg()"
            step="any"
            v-model="finalScore"
        />
        <input-field
            class="col-span-2"
            type="number"
            placeholder="Final Weight"
            :svg="feather.icons.percent.toSvg()"
            step="any"
            v-model="finalWeight"
        />

        <div class="col-span-2">
            <hr class="mb-4" />

            <input-field
                type="number"
                placeholder="Grade After Final"
                :svg="feather.icons.percent.toSvg()"
                step="any"
                v-model="gradeAfterFinal"
                readonly
            />
        </div>
    </div>
</template>
