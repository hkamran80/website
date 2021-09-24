<script setup lang="ts">
import NavigationBar from "../components/NavigationBar.vue";
import PageHeader from "../components/PageHeader.vue";

import { initialize } from "../composables/theming";
import ProgramCard from "../components/ProgramCard.vue";
const { switchTheme, background, headerTextColor } = initialize();
</script>

<template>
    <div :class="[background]">
        <navigation-bar @update-theme="switchTheme" />

        <div class="pt-12 px-8 max-w-7xl mx-auto">
            <page-header
                title="Programs"
                :header-text-color="headerTextColor"
                class="mb-4"
            />

            <div
                class="
                    mt-12
                    max-w-lg
                    mx-auto
                    grid
                    gap-5
                    lg:grid-cols-2 lg:max-w-none
                "
            >
                <program-card
                    name="Final Grade Calculator"
                    description="Calculate the grade you need to get on a final to get a particular grade"
                />
                <program-card
                    name="Overall Grade After Final Calculator"
                    description="Calculate the grade you'll get after taking a final"
                />
            </div>
        </div>
    </div>
</template>
