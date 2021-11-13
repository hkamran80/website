import { createStore, Store } from "vuex";
import { Program } from "../models/programs";

const store = createStore({
    state() {
        return {
            creations: null,
            posts: null,
            tags: null,
            programs: [
                {
                    id: "final-grade-calculator",
                    name: "Final Grade Calculator",
                    description:
                        "Calculate the grade you need to get on a final to get a particular grade",
                    componentFilename: "FinalGradeCalculatorProgram",
                },
                {
                    id: "overall-grade-after-final-calculator",
                    name: "Overall Grade After Final Calculator",
                    description:
                        "Calculate the grade you'll get after taking a final",
                    componentFilename: "OverallGradeAfterFinalCalculatorProgram",
                },
            ] as Program[],
        };
    },
    mutations: {
        SAVE_CREATIONS(state: Store<VuexState>, creations) {
            state.creations = creations;
        },
        SAVE_POSTS(state: Store<VuexState>, posts) {
            state.posts = posts;
        },
        SAVE_TAGS(state: Store<VuexState>, tags) {
            state.tags = tags;
        },
    },
});

interface VuexState {
    creations: null | object;
}

export default store;
