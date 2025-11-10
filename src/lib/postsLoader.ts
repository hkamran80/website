import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro:content";

const convertToDate = (dateString: string): Date =>
    new Date(
        dateString + (!dateString.includes("T") ? "T07:00:00.000-08:00" : ""),
    );

export const postsLoader = (): Loader => {
    return {
        name: "posts-loader",
        load: async ({ store, parseData }: LoaderContext): Promise<void> => {
            const response = await fetch(
                "https://raw.githubusercontent.com/hkamran80/articles/main/markdown/contents.json",
            );
            const data = await response.json();

            const posts = [
                ...data.articles.map((article) => ({
                    ...article,
                    type: "article",
                })),
                ...data.notes.map((note) => ({ ...note, type: "note" })),
            ].map((post) => {
                return {
                    ...post,
                    ...(post.published
                        ? {
                              published: convertToDate(post.published),
                          }
                        : {}),
                    ...(post.updated
                        ? {
                              updated: convertToDate(post.updated),
                          }
                        : {}),
                };
            });

            for (const post of posts) {
                const data = await parseData({
                    id: post.id,
                    data: post,
                });

                const postContentUrl = `https://raw.githubusercontent.com/hkamran80/articles/${!post.published && post.branchName ? post.branchName : "main"}/markdown/${post.type}s/${post.id}.md`;
                const postContentResponse = await fetch(postContentUrl);

                let body: string | undefined = undefined;
                if (postContentResponse.ok)
                    body = await postContentResponse.text();

                store.set({ id: post.id, data, body });
            }
        },
        schema: z.object({
            id: z.string(),
            type: z.enum(["article", "note"]),
            title: z.string(),
            description: z.string(),
            tags: z.string().array(),
            toc: z.boolean().optional(),
            imgAlt: z.string().optional(),
            published: z.date().or(z.literal("")),
            updated: z.optional(z.date().or(z.literal(""))),
            filename: z.string(),
            branchName: z.string().optional(),
        }),
    };
};
