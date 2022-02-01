import { createStore } from "vuex";
import { BRAND_LOGOS_PATH } from "../data/constants";
import { CreationPage } from "../models/creations";
import { Program } from "../models/programs";
import { Social } from "../models/socials";

const store = createStore({
    // @ts-ignore
    state() {
        return {
            posts: null,
            tags: null,
            notes: null,
            noteTags: null,
            creations: null,
            creationPages: [
                {
                    id: "music-analyzer",
                    name: "Music Analyzer",
                    description:
                        "Music Analyzer is like Spotify Wrapped®, but year-round.",
                    centerContent: true,
                    componentFilename: "MusicAnalyzerPage",
                },
                {
                    id: "nebula-new-tab",
                    name: "Nebula New Tab",
                    description: "A clean and simple new tab page",
                    centerContent: false,
                    componentFilename: "NebulaNewTabPage",
                },
            ] as CreationPage[],
            creationChangelogs: {},
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
            socials: [
                {
                    name: "GitHub",
                    url: "https://github.com/hkamran80",
                    svgPath: BRAND_LOGOS_PATH.github,
                },
                {
                    name: "Twitter",
                    url: "https://twitter.com/hkamran80",
                    svgPath: BRAND_LOGOS_PATH.twitter,
                },
                {
                    name: "Stack Overflow",
                    url: "https://stackoverflow.com/users/7313822/h-kamran",
                    svgPath: BRAND_LOGOS_PATH.stackOverflow,
                },
                {
                    name: "Medium",
                    url: "https://hkamran.medium.com",
                    svgPath: BRAND_LOGOS_PATH.medium,
                },
                {
                    name: "Unsplash",
                    url: "https://unsplash.com/@hkamran",
                    svgPath: BRAND_LOGOS_PATH.unsplash,
                },
            ] as Social[],
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
        SAVE_NOTES(state, notes) {
            // @ts-ignore
            state.notes = notes;
        },
        SAVE_NOTES_TAGS(state, tags) {
            // @ts-ignore
            state.noteTags = tags;
        },
        //@ts-ignore
        SAVE_CREATION_CHANGELOG(state, [creationName, changelog]) {
            //@ts-ignore
            state.creationChangelogs[creationName] = changelog;
        },
    },
});

export default store;
