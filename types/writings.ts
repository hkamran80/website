export type Writing = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    published: string;
    filename: string;
};

export type Article = Writing & {
    heroImage: string;
};

export type WritingTags = {
    [tagName: string]: string[];
};
