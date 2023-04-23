export type Writing = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    published: string;
    filename: string;
    branchName?: string;
};

export type WritingTags = {
    [tagName: string]: string[];
};
