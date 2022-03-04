<script setup lang="ts">
import { ref, watch } from "vue";
import _feather from "feather-icons";

import InputField from "../components/InputField.vue";

const currentGrade = ref<number | null>(null);
const gradeWanted = ref<number | null>(null);
const finalWeight = ref<number | null>(null);
const scoreNeeded = ref<string | null>(null);
const scoreNeededMessage = ref<string | null>(null);

watch(
    [currentGrade, gradeWanted, finalWeight],
    ([newCurrentGrade, newGradeWanted, newFinalWeight]) => {
        if (newCurrentGrade && newGradeWanted && newFinalWeight) {
            let score =
                (newGradeWanted * 100 -
                    newCurrentGrade * (100 - newFinalWeight)) /
                newFinalWeight;

            scoreNeeded.value = score.toFixed(2);
            scoreNeededMessage.value =
                score > 100
                    ? 'Impossible. But as Tommy Lasorda said, "The difference between the impossible and the possible lies in a man\'s determination."'
                    : score < 0
                    ? "Uhhh...yeah, go ahead and flunk the final, you should get the grade you want."
                    : "Achievable. I have faith in you.";
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
            v-model="currentGrade"
            class="col-span-2 sm:col-span-1"
            type="number"
            placeholder="Current Grade"
            :svg="feather.icons.percent.toSvg()"
            step="any"
        />
        <input-field
            v-model="gradeWanted"
            class="col-span-2 sm:col-span-1"
            type="number"
            placeholder="Grade Wanted"
            :svg="feather.icons.percent.toSvg()"
            step="any"
        />
        <input-field
            v-model="finalWeight"
            class="col-span-2"
            type="number"
            placeholder="Final Weight"
            :svg="feather.icons.percent.toSvg()"
            step="any"
        />

        <div class="col-span-2">
            <hr class="mb-4" />

            <input-field
                v-model="scoreNeeded"
                type="number"
                placeholder="Score Needed"
                :svg="feather.icons.percent.toSvg()"
                step="any"
                readonly
            />
            <span v-text="scoreNeededMessage" />
        </div>
    </div>
</template>
