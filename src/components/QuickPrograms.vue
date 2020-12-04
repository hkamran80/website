<template>
    <div>
        <v-card id="final_grade_calculator" class="mx-auto" outlined>
            <v-card-title>
                Final Grade Calculator
                <v-spacer />
                <v-btn
                    icon
                    @click="
                        final_grade_calculator.hidden = !final_grade_calculator.hidden
                    "
                >
                    <v-icon v-if="final_grade_calculator.hidden">
                        mdi-chevron-down
                    </v-icon>
                    <v-icon v-else>
                        mdi-chevron-up
                    </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text v-if="!final_grade_calculator.hidden">
                <v-text-field
                    v-model="final_grade_calculator.current"
                    label="Current Grade"
                    type="number"
                    append-icon="mdi-percent-outline"
                    outlined
                />
                <v-text-field
                    v-model="final_grade_calculator.wanted"
                    label="Grade Wanted"
                    type="number"
                    append-icon="mdi-percent-outline"
                    outlined
                />
                <v-text-field
                    v-model="final_grade_calculator.final_percentage"
                    label="How Much is Your Final Worth?"
                    type="number"
                    append-icon="mdi-percent-outline"
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
                    append-icon="mdi-percent-outline"
                    outlined
                    readonly
                />
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "QuickPrograms",
    data: function() {
        return {
            final_grade_calculator: {
                hidden: false,
                current: null,
                wanted: null,
                final_percentage: null,
                needed: null,
                needed_message: ""
            }
        };
    },
    methods: {
        calculate_final_grade_needed: function() {
            if (
                this.final_grade_calculator.current &&
                this.final_grade_calculator.wanted &&
                this.final_grade_calculator.final_percentage
            ) {
                let needed = (
                    (this.final_grade_calculator.wanted * 100 -
                        this.final_grade_calculator.current *
                            (100 -
                                this.final_grade_calculator.final_percentage)) /
                    this.final_grade_calculator.final_percentage
                ).toFixed(2);
                this.final_grade_calculator.needed = needed;
                this.final_grade_calculator.needed_message =
                    Number(needed) > 100
                        ? 'Impossible. But as Nelson Mandela said, "It always seems impossible until its done."'
                        : Number(needed) < 0
                        ? "Uhhh...yeah, go ahead and flunk the final, you should get the grade you want."
                        : "";
            }
        }
    }
};
</script>

<style scoped></style>
