import { createStore, Store } from "vuex";
import { Post, Tag } from "../models/blog";
import { Program } from "../models/programs";

const store = createStore({
    // @ts-ignore
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
                    componentFilename:
                        "OverallGradeAfterFinalCalculatorProgram",
                },
            ] as Program[],
        };
    },
    mutations: {
        SAVE_CREATIONS(state, creations) {
            // @ts-ignore
            state.creations = creations;
        },
        SAVE_POSTS(state, posts) {
            // @ts-ignore
            state.posts = posts;
        },
        SAVE_TAGS(state, tags) {
            // @ts-ignore
            state.tags = tags;
        },
    },
});

export default store;
