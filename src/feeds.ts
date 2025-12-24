export type Feed = { name: string; description: string };
export type FeedTypes = "all" | "articles" | "notes";

export const feeds: Record<FeedTypes, Feed> = {
    all: { name: "All posts", description: "All my articles and notes" },
    articles: { name: "Articles", description: "All my articles" },
    notes: { name: "Notes", description: "All my notes" },
};
