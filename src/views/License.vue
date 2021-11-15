<script setup lang="ts">
import { useTitle } from "@vueuse/core";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";

useTitle("License | H. Kamran");
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header
            header="License"
            subheader="Last Updated: November 15, 2021"
        />

        <div class="mt-7 max-w-5xl mx-auto prose prose-pink dark:prose-light">
            <h3 class="text-xl font-bold">Allowed</h3>
            <ul>
                <li>
                    The materials on this on this website may be freely copied
                    and distributed, with permission from the original author,
                    except in the cases mentioned in "Not Allowed"
                </li>
                <li>
                    Materials on this site may be used for commerical and
                    noncommerical purposes
                </li>
            </ul>

            <h3 class="text-xl font-bold">Required</h3>
            <ul>
                <li>Attribution is required</li>
            </ul>

            <h3 class="text-xl font-bold">Not Allowed</h3>
            <ul>
                <li>
                    You may not redistribute or sell materials from this site
                    without permission from H. Kamran
                </li>
                <li>
                    You may not use content on this site to create misleading
                    associations with products or services, without permission
                    from H. Kamran
                </li>
            </ul>
        </div>
    </main-layout>
</template>
