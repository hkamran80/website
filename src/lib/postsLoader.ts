import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro/zod";
import { getPosts } from "./posts";

const loader = (options: { apiKey: string }): Loader => {
    return {
        name: "posts-loader",
        schema: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            tags: z.string().array(),
            type: z.enum(["article", "note"]),
            status: z.enum(["draft", "published", "updated"]),
            // Only present if `type` is `article`
            toc: z.boolean().optional(),
            oldNotice: z.boolean().optional(),
            // Only present if `type` is `article`
            img: z
                .object({
                    src: z.string(),
                    alt: z.string(),
                })
                .optional(),
            // Only present if `status` is not `draft`
            published: z.date().optional(),
            // Only present if `status` is `updated`
            updated: z.date().optional(),
            filename: z.string().optional(),
            branch: z.string().optional(),
        }),
        load: async ({
            store,
            parseData,
            renderMarkdown,
        }: LoaderContext): Promise<void> => {
            const posts = await getPosts(options.apiKey);

            for await (const post of posts) {
                const data = await parseData({
                    id: post.id,
                    data: post,
                });

                if ("content" in post && post.content) {
                    const rendered = await renderMarkdown(post.content);
                    store.set({
                        id: post.id,
                        data,
                        body: post.content,
                        rendered,
                    });
                } else console.error(`No content for ${post.id}. Skipping.`);
            }
        },
    };
};

export default loader;
