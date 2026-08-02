import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import postsLoader from "./lib/postsLoader";
import unsplashLoader from "./lib/unsplashLoader";
import billAnalysesLoader from "./lib/bill-analyses-loader";
import { file } from "astro/loaders";
import { parseOpml } from "feedsmith";
import userscriptsLoader from "./lib/userscripts-loader";
import { defineAtProtoCollection } from "@fujocoded/astro-atproto-loader";

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
        releaseDate: z.iso.date(),
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
        {
            id: "mailchimp-rss",
            name: "Mailchimp RSS",
            description: "Quickly get the feed URL for a Mailchimp newsletter",
        },
    ],
    schema: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
    }),
});

const billAnalyses = defineCollection({
    loader: billAnalysesLoader(),
});

const blogroll = defineCollection({
    loader: file("public/blogroll.opml", {
        parser: (contents) => {
            const opml = parseOpml(contents, {
                extraOutlineAttributes: ["data:atmosphere"],
            });

            if (!opml.body || !opml.body.outlines) return [];

            return opml.body.outlines.map((category) => ({
                id: category.text!.includes(":")
                    ? category.text!.split(": ")[1]
                    : category.text,
                entries: category.outlines!.map((entry) => ({
                    name: entry.text,
                    url: entry.htmlUrl,
                    feedUrl: entry.xmlUrl,
                    atmosphere:
                        "data:atmosphere" in entry
                            ? entry["data:atmosphere"] === "true"
                            : undefined,
                })),
            }));
        },
    }),
    schema: z.object({
        id: z.string(),
        entries: z
            .object({
                name: z.string(),
                url: z.url(),
                feedUrl: z.url(),
                atmosphere: z.boolean().optional(),
            })
            .array(),
    }),
});

const userscripts = defineCollection({
    loader: userscriptsLoader(),
});

const books = defineAtProtoCollection({
    source: {
        repo: "hkamran.com",
        collection: "buzz.bookhive.book",
    },
    transform: async ({ value, uri, fetchRecord }) => {
        const bookRecord = await fetchRecord({
            atUri: value.hiveBookUri,
        });

        let series;
        if (bookRecord && bookRecord.value && bookRecord.value.series) {
            const seriesObj = JSON.parse(bookRecord.value.series);
            series = { ...seriesObj, position: Number(seriesObj.position) };
        }

        return {
            id: uri,
            data: {
                title: value.title,
                authors: value.authors,
                status: (value.status as string).slice(19),
                cover: String(value.cover?.ref) ?? undefined,
                startedAt: value.startedAt
                    ? new Date(value.startedAt as string)
                    : undefined,
                finishedAt: value.finishedAt
                    ? new Date(value.finishedAt as string)
                    : undefined,
                hiveId: value.hiveId,
                hiveBookUri: value.hiveBookUri,
                series,
            },
        };
    },
    outputSchema: z.object({
        title: z.string(),
        authors: z.string(),
        status: z.enum(["finished", "reading", "wantToRead", "abandoned"]),
        cover: z.string(),
        startedAt: z.date().optional(),
        finishedAt: z.date().optional(),

        hiveId: z.string(),
        hiveBookUri: z.string(),

        series: z
            .object({
                title: z.string(),
                position: z.number(),
            })
            .optional(),
    }),
});

export const collections = {
    posts,
    showcase,
    photos,
    nebulaChangelog,
    utilities,
    billAnalyses,
    blogroll,
    userscripts,

    // AT Protocol
    books,
};
