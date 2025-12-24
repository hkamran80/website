import { getCollection, type CollectionEntry } from "astro:content";
import type { APIRoute } from "astro";
import { sortByDate } from "../../lib/sort.ts";
import { generateFeed } from "../../lib/feed.ts";

const feeds: Record<
    "rss" | "atom" | "json",
    {
        generator: "rss2" | "atom1" | "json1";
        contentType: "application/xml" | "application/json";
    }
> = {
    rss: {
        generator: "rss2",
        contentType: "application/xml",
    },
    atom: { generator: "atom1", contentType: "application/xml" },
    json: { generator: "json1", contentType: "application/json" },
};

const feedTypes = ["all", "articles", "notes"];

export const getStaticPaths = () =>
    Object.keys(feeds).flatMap((feed) =>
        feedTypes.map((feedType) => ({
            params: { feed: feedType, file: feed },
        })),
    );

export const GET: APIRoute = async ({ site: siteUrl, params }) => {
    if (!siteUrl) return new Response(undefined, { status: 500 });

    if (
        !params.file ||
        !Object.keys(feeds).includes(params.file) ||
        !params.feed ||
        params.feed === undefined ||
        !feedTypes.includes(params.feed)
    )
        return new Response(undefined, { status: 500 });

    const feedConfiguration = feeds[params.file as keyof typeof feeds];

    const typeFilter = (post: CollectionEntry<"posts">["data"]) =>
        params.feed === "all" ? true : post.type === params.feed!.slice(0, -1);

    const posts = (
        await getCollection(
            "posts",
            ({ data }) => data.published !== "" && typeFilter(data),
        )
    ).sort((a, b) =>
        sortByDate(new Date(a.data.published), new Date(b.data.published)),
    );

    const site = siteUrl.toString();
    const feed = await generateFeed(site, posts);

    return new Response(feed[feedConfiguration.generator](), {
        headers: {
            "Content-Type": feedConfiguration.contentType,
        },
    });
};
