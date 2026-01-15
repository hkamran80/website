import { defineCollection, z } from "astro:content";
import postsLoader from "./lib/postsLoader";
import unsplashLoader from "./lib/unsplashLoader";

const posts = defineCollection({
    loader: postsLoader({
        apiKey: import.meta.env.GITHUB_API_KEY,
    }),
});

const showcase = defineCollection({
    loader: async () => {
        const response = await fetch("https://assets.hkamran.com/projects");
        const data = await response.json();

        return data.map((item) => ({ ...item, id: item.name }));
    },
    schema: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        featured: z.boolean().optional(),
        repository: z.string().optional(),
        url: z.string().optional(),
        group: z.enum(["apps", "tools", "directories", "bots"]),
        owner: z
            .object({
                name: z.string(),
                url: z.string().optional(),
            })
            .optional(),
        role: z.string().optional(),
    }),
});

const photos = defineCollection({
    loader: unsplashLoader({
        apiKey: import.meta.env.UNSPLASH_API_KEY,
    }),
});

const nebulaChangelog = defineCollection({
    loader: async () => {
        const response = await fetch(
            "https://assets.hkamran.com/changelog/nebula-new-tab",
        );
        const data = await response.json();

        return Object.entries(data).map(([version, information]) => ({
            id: version,
            version,
            ...information,
        }));
    },
    schema: z.object({
        id: z.string(),
        version: z.string(),
        releaseDate: z.string().date(),
        changelog: z.string().array(),
    }),
});

const utilities = defineCollection({
    loader: () => [
        {
            id: "final-grade-calculator",
            name: "Final Grade Calculator",
            description:
                "Calculate the grade you need to get on a final to get a particular grade",
        },
        {
            id: "overall-grade-after-final-calculator",
            name: "Overall Grade After Final Calculator",
            description: "Calculate the grade you'll get after taking a final",
        },
        {
            id: "testflight-cleaner",
            name: "TestFlight Cleaner",
            description:
                "Clean your TestFlight tester CSVs and avoid dealing with those pesky errors!",
        },
        {
            id: "text-reverser",
            name: "Text Reverser",
            description: "Does what it says on the tin",
        },
        {
            id: "duck-compose",
            name: "Duck Address Composer",
            description:
                "Easily generate the email to send from a Duck Address",
        },
    ],
    schema: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
    }),
});

export const collections = {
    posts,
    showcase,
    photos,
    nebulaChangelog,
    utilities,
};
