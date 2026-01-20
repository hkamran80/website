import { type Author, Feed, type Item } from "feed";
import type { CollectionEntry } from "astro:content";
import { renderMarkdown } from "./markdown";

const feedImageLengths: Record<string, number> = {};

export const generateFeed = async (
    site: string,
    posts: CollectionEntry<"posts">[],
) => {
    const author: Author = {
        name: "H. Kamran",
        email: "hkamran@hkamran.com",
        link: site.slice(0, -1),
    };

    const feed = new Feed({
        title: "H. Kamran",
        description:
            "I'm a developer who takes photos and follows government actions across the U.S., the EU, and occasionally the UK in my free time.",
        id: site.slice(0, -1),
        link: site.slice(0, -1),
        language: "en-US",
        image: `${site}icon.png`,
        favicon: `${site}favicon.png`,
        copyright: `© ${new Date().getFullYear()} H. Kamran. All rights reserved.`,
        updated:
            posts[0].data.status === "updated" ||
            posts[0].data.status === "published"
                ? posts[0].data.updated || posts[0].data.published
                : undefined,
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
            date: post.data.published as Date,
            author: [author],
            content: post.body
                ? await renderMarkdown(
                      post.body +
                          "\n\n---\n\nThanks for reading! Follow me on [Mastodon](https://hkamran.com/mastodon) and [Bluesky](https://hkamran.com/bluesky). Subscribe to my [posts feed](https://hkamran.com/feed.atom).",
                  )
                : undefined,
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
