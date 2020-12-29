<template>
    <div>
        <v-row align="center" justify="center" class="pb-5">
            <v-col v-for="fc in featured" :key="fc.name" md="4" cols="12">
                <creation :creation="fc" />
            </v-col>
        </v-row>
        <v-divider />
        <v-row align="center" justify="center" class="pt-5">
            <v-col
                v-for="creation in creations"
                :key="creation.name"
                md="4"
                cols="12"
            >
                <creation :creation="creation" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import creations_file from "@/creations.json";
import Creation from "../components/Creation.vue";
export default {
    name: "Creations",
    components: { Creation },
    data: function() {
        return {
            featured: null,
            creations: null
        };
    },
    mounted() {
        this.featured = creations_file.filter(creation => creation.featured);
        this.creations = creations_file.filter(creation => !creation.featured);
    }
};
</script>

<style scoped></style>
