import { type Author, Feed, type Item } from "feed";
import type { CollectionEntry } from "astro:content";

const feedImageLengths: Record<string, number> = {};

export const generateFeed = async (
    site: string,
    posts: CollectionEntry<"posts">,
) => {
    const author: Author = {
        name: "H. Kamran",
        email: "hkamran@hkamran.com",
        link: site,
    };

    const feed = new Feed({
        title: "H. Kamran",
        description: "The feed of both my articles and my notes",
        id: site,
        link: site,
        language: "en",
        image: `${site}profile.png`,
        favicon: `${site}favicon.png`,
        copyright: `© ${new Date().getFullYear()} H. Kamran. All rights reserved.`,
        updated: posts[0].data.updated || posts[0].data.published,
        feedLinks: {
            rss: `${site}feed.rss`,
            atom: `${site}feed.atom`,
            json: `${site}feed.json`,
        },
        author,
    });

    for (const post of posts) {
        let entry: Item = {
            id: post.id,
            title: post.data.title,
            link: `${site}${post.data.type}s/${post.id}`,
            description: post.data.description,
            // TODO: Use full-text
            content: post.data.description,
            date: post.data.published,
            author: [author],
        };

        if (post.data.type === "article") {
            let length = 0;

            if (post.id in feedImageLengths) length = feedImageLengths[post.id];
            else {
                const response = await fetch(
                    `https://assets.hkamran.com/graphics/article/${post.id}`,
                    { method: "HEAD" },
                );
                const contentLength = response.headers.get("content-length");
                if (contentLength) {
                    length = Number(contentLength);
                    feedImageLengths[post.id] = length;
                } else
                    console.error(
                        "Failed to load Content-Length",
                        response.headers,
                    );
            }

            entry.image = {
                url: `https://assets.hkamran.com/graphics/article/${post.id}`,
                type: "image/png",
                length,
            };
        }

        feed.addItem(entry);
    }

    return feed;
};
