export interface Tag {
    title: string;
    slug: string;
    postSlugs: string[];
}

interface CosmicTagMetadata {
    posts: Post[];
}
export interface CosmicTag {
    slug: string;
    title: string;
    metadata: CosmicTagMetadata;
}

interface Hero {
    imgix_url: string;
    url: string;
}

interface PostMetadata {
    description: string;
    published: string;
    hero: Hero;
}
export interface Post {
    slug: string;
    title: string;
    thumbnail: string;
    content: string;
    metadata: PostMetadata;
}
