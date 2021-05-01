<template>
    <center-layout>
        <cds-header title="Creations" :subtitle="subtitle" />

        <h3 class="mb-5">Featured ({{ featured.length }})</h3>
        <creation
            v-for="creation in featured"
            :key="creation.name"
            :creation="creation"
            uniformHeight="40%"
            :pixels="false"
        />

        <v-divider class="my-5" />

        <h3 class="mb-5">In Progress ({{ inProgress.length }})</h3>
        <creation
            v-for="creation in inProgress"
            :key="creation.name"
            :creation="creation"
            uniformHeight="40%"
            :pixels="false"
        />

        <v-divider class="my-5" />

        <h3 class="mb-5">Completed ({{ completed.length }})</h3>
        <creation
            v-for="creation in completed"
            :key="creation.name"
            :creation="creation"
            uniformHeight="40%"
            :pixels="false"
        />

        <v-divider class="my-5" />

        <h3 class="mb-5">Cancelled ({{ cancelled.length }})</h3>
        <creation
            v-for="creation in cancelled"
            :key="creation.name"
            :creation="creation"
            uniformHeight="40%"
            :pixels="false"
        />
    </center-layout>
</template>

<script>
import creations_file from "@/creations.json";
import Creation from "@/components/Creation.vue";
import CenterLayout from "@/components/CenterLayout.vue";
import CdsHeader from "../components/cds/CdsHeader.vue";

export default {
    name: "Creations",
    components: { Creation, CenterLayout, CdsHeader },
    data: function() {
        return {
            featured: null,
            inProgress: null,
            cancelled: null,
            completed: null
        };
    },
    computed: {
        subtitle: function() {
            return `${creations_file.length} creations`;
        }
    },
    mounted() {
        this.featured = creations_file
            .filter(creation => creation.featured)
            .sort(this.alphabeticalSort);

        this.inProgress = creations_file
            .filter(
                creation =>
                    !creation.featured &&
                    !creation.cancelled &&
                    creation.status === "In Progress"
            )
            .sort(this.alphabeticalSort);

        this.cancelled = creations_file
            .filter(creation => creation.cancelled && !creation.featured)
            .sort(this.alphabeticalSort);

        this.completed = creations_file
            .filter(
                creation =>
                    !creation.featured &&
                    !creation.cancelled &&
                    creation.status !== "In Progress"
            )
            .sort(this.alphabeticalSort);
    },
    methods: {
        alphabeticalSort: function(a, b) {
            let creationA = a.name.toLowerCase(),
                creationB = b.name.toLowerCase();

            return creationA < creationB ? -1 : creationA > creationB ? 1 : 0;
        }
    }
};
</script>

<style scoped></style>
