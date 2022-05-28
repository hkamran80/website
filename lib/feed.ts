import { Feed, Item } from "feed";
import { loadWritings } from "./writings";
import type { Article } from "../types/writings";

export const buildFeed = async () => {
    const { articles, notes } = await loadWritings();

    const writings = [...articles, ...notes].sort(
        (
            { published: publishedA }: { published: string },
            { published: publishedB }: { published: string },
        ): number =>
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
        let entry: Item = {
            title: writing.title,
            id: writing.id,
            link: `https://hkamran.com/${
                "heroImage" in writing ? "article" : "note"
            }/${writing.id}`,
            description: writing.description,
            content: writing.description,
            date: new Date(writing.published + "T13:00:00Z"),
        };

        if ("heroImage" in writing) {
            entry.image = (writing as Article).heroImage;
        }

        feed.addItem(entry);
    });

    return feed;
};
