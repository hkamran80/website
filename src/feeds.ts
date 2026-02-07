export type Feed = { name: string; description: string };
export type FeedTypes = "all" | "posts" | "bill-analyses";

// TODO: Create photos feed
// TODO: Create now feed
export const feeds: Record<FeedTypes, Feed> = {
    all: { name: "All", description: "All posts and bill analyses" },
    posts: { name: "Posts", description: "All posts" },
    "bill-analyses": {
        name: "Bill Analyses",
        description: "All bill analyses",
    },
};
