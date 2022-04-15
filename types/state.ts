import type { Creation } from "./creations";
import type { Article, Writing } from "./writings";

export type SiteState = {
    articles: Article[];
    notes: Writing[];
    articleTags: WritingTags;
    noteTags: WritingTags;
    showcase: Creation[];
};

export type WritingTags = {
    [tagName: string]: string[];
};
