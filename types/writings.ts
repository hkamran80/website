export type Writing = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    toc?: boolean;
    published: string;
    updated?: string;
    filename: string;
    branchName?: string;
};

export type WritingTags = {
    [tagName: string]: string[];
};
