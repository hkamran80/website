export interface Tag {
    title: string;
    slug: string;
    slugs: string[];
}

export interface CosmicNoteTagMetadata {
    notes: BasePost[];
}

interface CosmicTagMetadata {
    posts: Post[];
}
export interface BaseCosmicTag {
    slug: string;
    title: string;
}

export interface CosmicNoteTag extends BaseCosmicTag {
    metadata: CosmicNoteTagMetadata;
}

export interface CosmicTag extends BaseCosmicTag {
    metadata: CosmicTagMetadata;
}

interface Hero {
    imgix_url: string;
    url: string;
}

interface BaseMetadata {
    description: string;
    published: string;
}

interface PostMetadata extends BaseMetadata {
    hero: Hero;
}

export interface BasePost {
    slug: string;
    title: string;
    content: string;
    metadata: BaseMetadata;
}
export interface Post extends BasePost {
    thumbnail: string;
    metadata: PostMetadata;
}
