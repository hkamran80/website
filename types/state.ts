import type { Creation } from "./creations";

export type SiteState = {
    showcase: Creation[];
};

export type WritingTags = {
    [tagName: string]: string[];
};
