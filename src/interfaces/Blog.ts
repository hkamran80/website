export interface Tag {
    name: string;
    posts: Array<string>;
}

export interface Tags {
    [tag: string]: Tag;
}