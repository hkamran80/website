<template>
    <div>
        <v-card
            class="mx-auto creation"
            outlined
            :height="`${uniformHeight}${pixels ? 'px' : ''}`"
        >
            <v-card-title>
                <v-row no-gutters>
                    <v-col class="text-wrap--break" v-text="creation.name" />
                    <v-col cols="4" class="text-right">
                        <v-btn
                            icon
                            title="Contributor list"
                            aria-label="Contributor list"
                            v-if="
                                Object.keys(creation.contributors).length !== 0
                            "
                            @click="creation.dialogs.contributors = true"
                        >
                            <v-icon
                                color="primary"
                                v-text="mdiAccountMultipleOutline"
                            />
                        </v-btn>
                        <v-btn
                            icon
                            title="Cancelled"
                            aria-label="Cancelled"
                            v-if="creation.cancelled"
                        >
                            <v-icon
                                color="primary"
                                v-text="mdiPuzzleRemoveOutline"
                            />
                        </v-btn>
                        <v-btn
                            icon
                            title="GitHub repository"
                            aria-label="GitHub repository"
                            v-if="creation.repository"
                            :href="creation.repository"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <v-icon color="primary" v-text="mdiGithub" />
                        </v-btn>
                        <v-btn
                            icon
                            title="Website"
                            aria-label="Website"
                            v-if="creation.site"
                            :href="creation.site"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <v-icon color="primary" v-text="mdiWeb" />
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-subtitle v-text="creation.status" />
            <v-card-text v-text="creation.description" />
        </v-card>

        <v-dialog
            v-model="creation.dialogs.contributors"
            v-if="Object.keys(creation.contributors).length !== 0"
            width="500"
        >
            <v-card>
                <v-card-title> {{ creation.name }}: Contributors </v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item
                            v-for="(collaborator,
                            name) in creation.contributors"
                            :key="name"
                            :three-line="collaborator.role.length > 56"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="name" />
                                <v-list-item-subtitle
                                    v-text="collaborator.role"
                                />
                            </v-list-item-content>

                            <v-list-item-icon
                                @click="
                                    open_link(collaborator.link.url, creation)
                                "
                                :title="collaborator.link.title"
                            >
                                <v-btn icon>
                                    <v-icon
                                        color="primary"
                                        title="Collaborator link"
                                        aria-label="Collaborator link"
                                        v-text="icons[collaborator.link.icon]"
                                        v-if="
                                            collaborator.link.icon !== 'medium'
                                        "
                                    />
                                    <medium-icon
                                        size="1.5x"
                                        class="simple-icon"
                                        v-else
                                    />
                                </v-btn>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { MediumIcon } from "vue-simple-icons";
import {
    mdiAccountMultipleOutline,
    mdiPuzzleRemoveOutline,
    mdiGithub,
    mdiWeb
} from "@mdi/js";

export default {
    name: "Creation",
    props: {
        creation: Object,
        uniformHeight: {
            type: Number,
            required: false,
            default: 300
        },
        pixels: {
            type: Boolean,
            required: false,
            default: true
        },
        bottomMargin: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    components: {
        MediumIcon
    },
    data: function() {
        return {
            mdiAccountMultipleOutline: mdiAccountMultipleOutline,
            mdiPuzzleRemoveOutline: mdiPuzzleRemoveOutline,
            mdiGithub: mdiGithub,
            mdiWeb: mdiWeb,
            icons: {
                mdiWeb: mdiWeb
            }
        };
    },
    created() {
        if (this.bottomMargin) {
            document.documentElement.style.setProperty(
                "--bottom-margin",
                "15px"
            );
        }
    }
};
</script>

<style>
:root {
    --bottom-margin: 0px;
}

div.creation {
    margin-bottom: var(--bottom-margin);
}
</style>
