<script setup lang="ts">
import { ref } from "vue";
import creations from "../data/creations.json";
import { Contributors } from "../interfaces/Contributor";

import NavigationBar from "../components/NavigationBar.vue";
import CreationCard from "../components/CreationCard.vue";
import PageHeader from "../components/PageHeader.vue";
import SectionHeader from "../components/SectionHeader.vue";
import ContributorsModal from "../components/ContributorsModal.vue";
import { initialize } from "../composables/theming";

const { switchTheme, background, headerTextColor } = initialize();

const creationAlphabeticalSort = (a: any, b: any): number => {
    let creationA = a.name.toLowerCase(),
        creationB = b.name.toLowerCase();
    return creationA < creationB ? -1 : creationA > creationB ? 1 : 0;
};

const categories = {
    Featured: (creations: Array<any>) =>
        creations
            .filter((creation) => creation.featured)
            .sort(creationAlphabeticalSort),
    Completed: (creations: Array<any>) =>
        creations
            .filter(
                (creation) =>
                    !creation.featured &&
                    !creation.cancelled &&
                    creation.status !== "In Progress"
            )
            .sort(creationAlphabeticalSort),
    "In Progress": (creations: Array<any>) =>
        creations
            .filter(
                (creation) =>
                    !creation.featured &&
                    !creation.cancelled &&
                    creation.status === "In Progress"
            )
            .sort(creationAlphabeticalSort),
};

const openContributorsModal = (
    creation: string,
    contributors: Contributors
) => {
    contributorsModalDetails.value.creation = creation;
    contributorsModalDetails.value.contributors = contributors;

    contributorsModal.value = true;
};
const contributorsModalDetails = ref({
    creation: "",
    contributors: {} as Contributors,
});
const contributorsModal = ref(false);
</script>

<template>
    <contributors-modal
        :creation="contributorsModalDetails.creation"
        :contributors="contributorsModalDetails.contributors"
        v-if="contributorsModal"
        @close="contributorsModal = false"
    />

    <div :class="[background]">
        <navigation-bar @update-theme="switchTheme" />

        <div class="pt-12 px-8 max-w-7xl mx-auto">
            <page-header
                title="Creations"
                :header-text-color="headerTextColor"
                class="mb-4"
            />

            <div
                v-for="(categoryFilter, key) in categories"
                :key="key"
                class="mb-8"
            >
                <section-header
                    :title="key"
                    :header-text-color="headerTextColor"
                />

                <div
                    class="
                        mt-6
                        grid grid-cols-3 grid-flow-row grid-auto-row-dense
                        gap-6
                        sm:mr-4
                    "
                >
                    <div
                        v-for="creation in categoryFilter(creations)"
                        :key="creation.name"
                    >
                        <creation-card
                            :name="creation.name"
                            :description="creation.description"
                            :state="creation.status"
                            :github="creation.repository"
                            :contributors="
                                Object.keys(creation.contributors).length > 0
                                    ? creation.contributors
                                    : null
                            "
                            @open-contributors="openContributorsModal"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
