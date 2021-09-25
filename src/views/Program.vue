<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import programs from "../data/programs.json";
import MainLayout from "../components/MainLayout.vue";
import ProgramPercentageInput from "../components/ProgramPercentageInput.vue";

const {
    params: { id: programId },
} = useRoute();
const program = programs.filter((program) => program.id === programId)[0];

const finalGradeCalculator = ref({
    current: "0.0",
    wanted: "0.0",
    worth: "0.0",
    needed: "",
});
const overallGradeAfterFinalCalculator = ref({
    prefinal: "0.0",
    score: "0.0",
    worth: "0.0",
    final: "",
});

const quotes = {
    impossible:
        "\"Nothing is impossible, the word itself says 'I'm possible'!\" - Audrey Hepburn",
};
</script>

<template>
    <main-layout
        :title="program.name"
        v-if="program.id === 'final-grade-calculator'"
    >
        <program-percentage-input
            v-model:input="finalGradeCalculator.current"
            value-id="currentGrade"
            title="Current Grade"
        />
        <program-percentage-input
            v-model:input="finalGradeCalculator.wanted"
            value-id="gradeWanted"
            title="Grade Wanted"
        />
        <program-percentage-input
            v-model:input="finalGradeCalculator.worth"
            value-id="finalWorth"
            title="How Much is Your Final Worth?"
        />
        <program-percentage-input
            v-model:input="finalGradeCalculator.needed"
            class="md:col-span-3 sm:col-span-1 pt-4 border-t-2"
            value-id="gradeNeeded"
            title="Grade Needed"
            :hint="''"
            disable-input
        />
    </main-layout>
    <main-layout
        :title="program.name"
        v-else-if="program.id === 'overall-grade-after-final-calculator'"
    >
        <program-percentage-input
            v-model:input="overallGradeAfterFinalCalculator.prefinal"
            value-id="preFinalGrade"
            title="Grade Before Final"
        />
        <program-percentage-input
            v-model:input="overallGradeAfterFinalCalculator.score"
            value-id="finalScore"
            title="Score on Your Final"
        />
        <program-percentage-input
            v-model:input="overallGradeAfterFinalCalculator.worth"
            value-id="finalWorth"
            title="How Much is Your Final Worth?"
        />
        <program-percentage-input
            v-model:input="overallGradeAfterFinalCalculator.final"
            class="md:col-span-3 sm:col-span-1 pt-4 border-t-2"
            value-id="finalGrade"
            title="Final Grade"
            disable-input
        />
    </main-layout>
</template>
