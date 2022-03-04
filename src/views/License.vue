<script setup lang="ts">
import { useTitle } from "@vueuse/core";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";

useTitle("License | H. Kamran");
</script>

<template>
    <navigation-bar />

    <main-layout centered>
        <page-header
            header="License"
            subheader="Last Updated: January 31, 2022"
        />

        <div class="mt-7 max-w-5xl mx-auto prose prose-pink dark:prose-light">
            <ul>
                <li>
                    You may copy and distribute the content on this site, so
                    long as you credit me and I give you permission in writing
                </li>
                <li>
                    You may use the content on this site for both commercial and
                    noncommerical purposes, provided you credit me and I give
                    you permission in writing
                </li>
                <li>
                    You <strong>may not</strong> redistribute or sell the
                    content on this site, without permission in writing from me
                </li>
                <li>
                    You <strong>may not</strong> use any of the content on this
                    site to create misleading associations with products and
                    services, without permission in writing from me
                </li>
            </ul>
        </div>
    </main-layout>
</template>
