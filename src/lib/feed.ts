import { type Author, Feed, type Item } from "feed";
import type { CollectionEntry } from "astro:content";
import { renderMarkdown } from "./markdown";
import { feeds, type FeedTypes } from "../feeds";
import { chamberAbbreviation, getNumberWithOrdinal } from "./bill-analysis";

const feedImageLengths: Record<string, number> = {};

export const setupFeed = (site: string, feed: FeedTypes): Feed => {
    const author: Author = {
        name: "H. Kamran",
        email: "hkamran@hkamran.com",
        link: site.slice(0, -1),
    };

    const webFeed = new Feed({
        title: `${feeds[feed].name} | H. Kamran`,
        description: `${feeds[feed].description}. I'm a California-based developer who takes photos, is interested in public transit and data privacy and security, and follows government across the U.S., the EU, and the UK.`,
        id: site.slice(0, -1),
        link: site.slice(0, -1),
        language: "en-US",
        image: `${site}icon.png`,
        favicon: `${site}favicon.png`,
        copyright: `© ${new Date().getFullYear()} H. Kamran. All rights reserved.`,
        feedLinks: {
            rss: `${site}feeds/${feed}.rss`,
            atom: `${site}feeds/${feed}.atom`,
            json: `${site}feeds/${feed}.json`,
        },
        author,
    });
    webFeed.addExtension({
        name: "source:blogroll",
        objects: `${site}blogroll.opml`,
    });

    return webFeed;
};

export const generatePostsFeed = async (
    feed: Feed,
    posts: CollectionEntry<"posts">[],
) => {
    feed.options.updated =
        posts[0].data.status === "updated" ||
        posts[0].data.status === "published"
            ? posts[0].data.updated || posts[0].data.published
            : undefined;

    for (const post of posts) {
        let entry: Item = {
            id: post.id,
            title: post.data.title,
            link: `${feed.options.link!}/posts/${post.id}`,
            description: post.data.description,
            date: post.data.published as Date,
            author: [feed.options.author!],
            content: post.body
                ? await renderMarkdown(
                      post.body +
                          "\n\n---\n\nThanks for reading! Follow me on [Mastodon](https://hkamran.com/mastodon) and [Bluesky](https://hkamran.com/bluesky). Subscribe to my [feeds](https://hkamran.com/feeds).",
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

export const generateBillAnalysesFeed = async (
    feed: Feed,
    analyses: CollectionEntry<"billAnalyses">[],
) => {
    feed.options.updated = analyses[0].data.published;

    for (const analysis of analyses) {
        let entry: Item = {
            id: analysis.id,
            title: analysis.data.title,
            link: `${feed.options.link!}/bill-analysis/${analysis.id}`,
            description: analysis.data.description,
            date: analysis.data.published,
            author: [feed.options.author!],
            content: `<p><strong>Sponsor${
                analysis.data.bill.sponsors.length !== 1 ? "s" : ""
            }:</strong> ${analysis.data.bill.sponsors.join(", ")}
<br />
                    <strong>Cosponsor${
                        analysis.data.bill.cosponsors.listed.length !== 1 ||
                        analysis.data.bill.cosponsors.other !== 1
                            ? "s"
                            : ""
                    }:</strong> ${analysis.data.bill.cosponsors.listed.join(", ")}${
                        analysis.data.bill.cosponsors.other > 0
                            ? `and <a href="https://www.congress.gov/bill/${getNumberWithOrdinal(Number(analysis.data.bill.congress))}-congress/${analysis.data.bill.chamber}-bill/${analysis.data.bill.number}/cosponsors" rel="noopener noreferrer">${analysis.data.bill.cosponsors.other} other${analysis.data.bill.cosponsors.other !== 1 ? "s" : ""}</a>`
                            : ""
                    }
                </p>

                <p><strong>Summary:</strong> ${analysis.data.summary}</p>

                <p><strong>Background:</strong> ${analysis.data.background}</p>

                ${
                    analysis.data.organizations.support.length > 0 &&
                    `<p>
                    <strong>Organizations in Support:</strong>
                    ${analysis.data.organizations.support.join(", ")}
                </p>`
                }

                ${
                    analysis.data.organizations.support.length > 0 &&
                    `<p>
                    <strong>Organizations in Opposition:</strong>
                    ${analysis.data.organizations.oppose.join(", ")}
                </p>`
                }

                <p>
                    <strong>Recommendation:</strong>
                    ${
                        analysis.data.recommendation.action[0].toUpperCase() +
                        analysis.data.recommendation.action.slice(1)
                    }. ${analysis.data.recommendation.reason}
                </p>

<hr />

<p>
Thanks for reading! Follow me on <a href="https://hkamran.com/mastodon">Mastodon</a> and <a href="https://hkamran.com/bluesky">Bluesky</a>. Subscribe to my <a href="https://hkamran.com/feeds">feeds</a>.
</p>`,
        };

        feed.addItem(entry);
    }

    return feed;
};
