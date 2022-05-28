import type { Creation } from "./creations";
import type { Article, Writing } from "./writings";

export type WritingState = {
    articles: Article[];
    notes: Writing[];
    articleTags: WritingTags;
    noteTags: WritingTags;
};

export type SiteState = WritingState & {
    showcase: Creation[];
};

export type WritingTags = {
    [tagName: string]: string[];
};
