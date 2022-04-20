import type { Page } from "../types/pages";

export const programs: Page[] = [
    {
        id: "final-grade-calculator",
        name: "Final Grade Calculator",
        description:
            "Calculate the grade you need to get on a final to get a particular grade",
        centerContent: true,
        componentFilename: "FinalGradeCalculatorProgram",
    },
    {
        id: "overall-grade-after-final-calculator",
        name: "Overall Grade After Final Calculator",
        description: "Calculate the grade you'll get after taking a final",
        centerContent: true,
        componentFilename: "OverallGradeAfterFinalCalculatorProgram",
    },
    {
        id: "text-reverser",
        name: "Text Reverser",
        description: "Reverse some text, because why not?",
        centerContent: true,
        componentFilename: "TextReverseProgram",
    },
    {
        id: "web-utilities",
        name: "Web Utilites",
        description: "Some helpful web utilities",
        centerContent: true,
        componentFilename: "WebUtilitiesProgram",
    },
];

export const showcasePages: Page[] = [
    {
        id: "acoustats",
        name: "Acoustats",
        description: "Acoustats is like Spotify Wrapped®, but year-round.",
        centerContent: true,
        componentFilename: "AcoustatsPage",
    },
    {
        id: "nebula-new-tab",
        name: "Nebula New Tab",
        description: "A clean and simple new tab page",
        centerContent: false,
        componentFilename: "NebulaNewTabPage",
    },
];
