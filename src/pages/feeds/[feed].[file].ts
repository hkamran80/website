import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { sortByDate } from "../../lib/sort.ts";
import {
    setupFeed,
    generatePostsFeed,
    generateBillAnalysesFeed,
} from "../../lib/feed.ts";
import { feeds as feedMetadata, type FeedTypes } from "../../feeds.ts";
import type { Feed } from "feed";

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

const feedTypes = Object.keys(feedMetadata);

export const getStaticPaths = () =>
    Object.keys(feeds).flatMap((feed) =>
        feedTypes.map((feedType) => ({
            params: { feed: feedType, file: feed },
        })),
    );

export const GET: APIRoute<
    Record<string, any>,
    { file: string; feed: FeedTypes }
> = async ({ site: siteUrl, params }) => {
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

    const site = siteUrl.toString();
    const feed = setupFeed(site, params.feed as FeedTypes);
    let generated: Feed | undefined = undefined;

    if (params.feed === "all" || params.feed === "posts") {
        const posts = (
            await getCollection("posts", ({ data }) => data.status !== "draft")
        ).sort((a, b) => sortByDate(a.data.published!, b.data.published!));
        generated = await generatePostsFeed(feed, posts);
    }

    if (params.feed === "all" || params.feed === "bill-analyses") {
        const billAnalyses = (await getCollection("billAnalyses")).sort(
            (a, b) => sortByDate(a.data.published!, b.data.published!),
        );
        generated = await generateBillAnalysesFeed(feed, billAnalyses);
    }

    if (generated)
        return new Response(generated[feedConfiguration.generator](), {
            headers: {
                "Content-Type": feedConfiguration.contentType,
            },
        });
    else return new Response(undefined, { status: 500 });
};
