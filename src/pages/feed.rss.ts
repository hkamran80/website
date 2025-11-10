import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { sortByDate } from "../lib/sort.ts";
import { generateFeed } from "../lib/feed.ts";

export const GET: APIRoute = async ({ site: siteUrl }) => {
    if (!siteUrl) return new Response(undefined, { status: 500 });

    const posts = (
        await getCollection("posts", ({ data }) => data.published !== "")
    ).sort((a, b) =>
        sortByDate(new Date(a.data.published), new Date(b.data.published)),
    );

    const site = siteUrl.toString();
    const feed = await generateFeed(site, posts);

    return new Response(feed.rss2(), {
        headers: {
            "Content-Type": "application/xml",
        },
    });
};
