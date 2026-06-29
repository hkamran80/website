import process from "node:process";
import { readFile } from "node:fs/promises";
import { ATapult } from "atapult";
import { getPosts } from "./src/lib/posts.ts";
import { slugify } from "@hkamran/utility-strings";

(async () => {
    const identifier = "hkamran.com";
    const password = process.env.ATPROTO_PASSWORD;

    const publication = {
        url: new URL("https://hkamran.com/posts"),
        publishedAt: new Date("2026-06-29"),
        rkey: "3mpg4ikmgos2o",
        name: "H. Kamran",
        description:
            "I'm a California-based developer who takes photos, is interested in public transit and data privacy and security, and follows government across the U.S., the EU, and the UK.",
        icon: {
            blob: await readFile("public/profile.png"),
            mimeType: "image/png",
        },
        basicTheme: {
            // NOTE: Bluesky enforces AA-level color contrast for buttons — if you don't meet the minimum, it fails silently
            background: { b: 0, g: 0, r: 0 },
            foreground: { b: 255, g: 255, r: 255 },
            accent: { b: 77, g: 21, r: 190 }, // Button background
            accentForeground: { b: 255, g: 255, r: 255 }, // Button text color
        },
        preferences: {
            showInDiscover: true,
        },
    };

    const posts = await getPosts(process.env.GITHUB_API_KEY);
    const documents = posts
        .filter((post) => post.status !== "draft")
        .map((post) => ({
            title: post.title,
            publishedAt: post.published,
            path: `/${post.id}`,
            description: post.description,
            tags: post.tags.map((tag) => slugify(tag)),
        }));

    await ATapult(
        {
            credentials: {
                identifier,
                password,
            },
            url: new URL("https://pds.13willow.com"),
            baseDir: "./public",
        },
        publication,
        documents,
    );
})();
