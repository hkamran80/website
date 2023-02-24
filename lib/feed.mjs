import path from "path";
import { Feed } from "feed";
import { writeFile } from "fs/promises";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const currentPath = fileURLToPath(import.meta.url);

/**
 * Generate a file path from a file extension
 * @param {string} fileExtension
 * @returns {string} Generated file path
 */
const generateFilePath = (fileExtension) =>
    path.join(currentPath, "..", `../public/feed.${fileExtension}`);

/**
 * Build a `Feed` object
 * @returns A `Feed` object contains articles and notes
 */
const buildFeed = async () => {
    const res = await fetch(
        "https://raw.githubusercontent.com/hkamran80/articles/main/markdown/contents.json",
    );
    const rawWritings = await res.json();
    const articles = rawWritings.articles;
    const notes = rawWritings.notes;

    const noteIds = Object.keys(notes);

    const writings = [...articles, ...notes]
        .filter(({ published }) => published !== "")
        .sort(
            ({ published: publishedA }, { published: publishedB }) =>
                new Date(publishedB + "T13:00:00Z").getTime() -
                new Date(publishedA + "T13:00:00Z").getTime(),
        );

    const feed = new Feed({
        title: "H. Kamran",
        description: "The feed of both my articles and my notes",
        id: "https://hkamran.com",
        link: "https://hkamran.com",
        language: "en",
        image: "https://hkamran.com/profile.png",
        favicon: "https://hkamran.com/favicon.png",
        copyright: `© ${new Date().getFullYear()} H. Kamran. All rights reserved.`,
        updated: new Date(
            writings.filter(({ published }) => published !== "")[0].published +
                "T13:00:00Z",
        ),
        feedLinks: {
            json: "https://hkamran.com/feed/json",
            atom: "https://hkamran.com/feed/atom",
        },
        author: {
            name: "H. Kamran",
            email: "hkamran@hkamran.com",
            link: "https://hkamran.com",
        },
    });

    writings.forEach((writing) => {
        const isArticle = !noteIds.includes(writing.id);
        let entry = {
            title: writing.title,
            id: writing.id,
            link: `https://hkamran.com/${isArticle ? "article" : "note"}/${
                writing.id
            }`,
            description: writing.description,
            content: writing.description,
            date: new Date(writing.published + "T13:00:00Z"),
        };

        if (isArticle) {
            entry.image = `https://assets.hkamran.com/graphics/article/${writing.id}`;
        }

        feed.addItem(entry);
    });

    return feed;
};

/**
 * Generate JSON, Atom, and RSS feeds from the feed in {@link buildFeed}
 */
const generateFeeds = async () => {
    const feed = await buildFeed();

    await writeFile(generateFilePath("json"), feed.json1());
    await writeFile(generateFilePath("atom"), feed.atom1());
    await writeFile(generateFilePath("rss"), feed.rss2());
};

generateFeeds().then(() => console.log("Generated feeds"));
