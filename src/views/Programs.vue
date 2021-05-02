<template>
    <center-layout>
        <cds-header title="Programs" subtitle="Some quick little programs" />

        <article>
            <p>
                <v-card id="final_grade_calculator" class="mx-auto" outlined>
                    <v-card-title>
                        Final Grade Calculator
                        <v-spacer />
                        <v-btn
                            icon
                            title="Toggle Final Grade Calculator Visibility"
                            aria-label="Toggle Final Grade Calculator Visibility"
                            class="umami--click--programs-fgc-toggle"
                            @click="
                                final_grade_calculator.hidden = !final_grade_calculator.hidden
                            "
                        >
                            <v-icon
                                v-if="final_grade_calculator.hidden"
                                v-text="mdiChevronDown"
                            />
                            <v-icon v-else v-text="mdiChevronUp" />
                        </v-btn>
                    </v-card-title>
                    <v-card-text v-if="!final_grade_calculator.hidden">
                        <v-text-field
                            v-model="final_grade_calculator.current"
                            label="Current Grade"
                            type="number"
                            append-icon="mdiPercentOutline"
                            outlined
                        />
                        <v-text-field
                            v-model="final_grade_calculator.wanted"
                            label="Grade Wanted"
                            type="number"
                            append-icon="mdiPercentOutline"
                            outlined
                        />
                        <v-text-field
                            v-model="final_grade_calculator.final_weight"
                            label="How Much is Your Final Worth?"
                            type="number"
                            append-icon="mdiPercentOutline"
                            outlined
                        />
                        <v-btn
                            text
                            block
                            class="pb-2"
                            @click="calculate_final_grade_needed"
                        >
                            Calculate
                        </v-btn>

                        <v-divider v-if="final_grade_calculator.needed" />

                        <v-text-field
                            v-model="final_grade_calculator.needed"
                            v-if="final_grade_calculator.needed"
                            label="Grade Needed"
                            :hint="final_grade_calculator.needed_message"
                            :persistent-hint="
                                final_grade_calculator.needed_message !== ''
                            "
                            append-icon="mdiPercentOutline"
                            outlined
                            readonly
                        />
                    </v-card-text>
                </v-card>
            </p>
            <p>
                <v-card
                    id="overall_grade_after_final_calculator"
                    class="mx-auto"
                    outlined
                >
                    <v-card-title>
                        Overall Grade After Final Calculator
                        <v-spacer />
                        <v-btn
                            icon
                            title="Toggle Overall Grade After Final Calculator Visibility"
                            aria-label="Toggle Overall Grade After Final Calculator Visibility"
                            class="umami--click--programs-ogafc-toggle"
                            @click="
                                overall_grade_after_final.hidden = !overall_grade_after_final.hidden
                            "
                        >
                            <v-icon
                                v-if="overall_grade_after_final.hidden"
                                v-text="mdiChevronDown"
                            />
                            <v-icon v-else v-text="mdiChevronUp" />
                        </v-btn>
                    </v-card-title>
                    <v-card-text v-if="!overall_grade_after_final.hidden">
                        <v-text-field
                            v-model="overall_grade_after_final.before"
                            label="Grade Before Final"
                            type="number"
                            append-icon="mdiPercentOutline"
                            outlined
                        />
                        <v-text-field
                            v-model="overall_grade_after_final.final_score"
                            label="Score on Your Final"
                            type="number"
                            append-icon="mdiPercentOutline"
                            outlined
                        />
                        <v-text-field
                            v-model="overall_grade_after_final.final_weight"
                            label="How Much is Your Final Worth?"
                            type="number"
                            append-icon="mdiPercentOutline"
                            outlined
                        />
                        <v-btn
                            text
                            block
                            class="pb-2"
                            @click="calculate_overall_grade_after_final"
                        >
                            Calculate
                        </v-btn>

                        <v-divider v-if="overall_grade_after_final.grade" />

                        <v-text-field
                            v-model="overall_grade_after_final.grade"
                            v-if="overall_grade_after_final.grade"
                            label="Final Grade"
                            append-icon="mdiPercentOutline"
                            outlined
                            readonly
                        />
                    </v-card-text>
                </v-card>
            </p>
        </article>
    </center-layout>
</template>

<script>
import CenterLayout from "../components/CenterLayout.vue";
import CdsHeader from "../components/cds/CdsHeader.vue";

import { mdiChevronDown, mdiChevronUp, mdiPercentOutline } from "@mdi/js";

export default {
    name: "Programs",
    components: {
        CenterLayout,
        CdsHeader
    },
    data: function() {
        return {
            mdiChevronDown: mdiChevronDown,
            mdiChevronUp: mdiChevronUp,
            mdiPercentOutline: mdiPercentOutline,
            final_grade_calculator: {
                hidden: true,
                current: null,
                wanted: null,
                final_weight: null,
                needed: null,
                needed_message: ""
            },
            overall_grade_after_final: {
                hidden: true,
                before: null,
                final_score: null,
                final_weight: null,
                grade: null
            }
        };
    },
    methods: {
        calculate_final_grade_needed: function() {
            if (
                this.final_grade_calculator.current &&
                this.final_grade_calculator.wanted &&
                this.final_grade_calculator.final_weight
            ) {
                let needed =
                    (this.final_grade_calculator.wanted * 100 -
                        this.final_grade_calculator.current *
                            (100 - this.final_grade_calculator.final_weight)) /
                    this.final_grade_calculator.final_weight;
                this.final_grade_calculator.needed = needed.toFixed(2);
                this.final_grade_calculator.needed_message =
                    needed > 100
                        ? 'Impossible. But as Nelson Mandela said, "It always seems impossible until its done."'
                        : needed < 0
                        ? "Uhhh...yeah, go ahead and flunk the final, you should get the grade you want."
                        : "";
            }
        },
        calculate_overall_grade_after_final: function() {
            if (
                this.overall_grade_after_final.before &&
                this.overall_grade_after_final.final_score &&
                this.overall_grade_after_final.final_weight
            ) {
                let before_decimal =
                        this.overall_grade_after_final.before / 100,
                    score_decimal =
                        this.overall_grade_after_final.final_score / 100,
                    weight_decimal =
                        this.overall_grade_after_final.final_weight / 100;

                let grade =
                    ((1 - weight_decimal) * before_decimal +
                        weight_decimal * score_decimal) *
                    100;
                this.overall_grade_after_final.grade = grade.toFixed(2);
            }
        }
    }
};
</script>
