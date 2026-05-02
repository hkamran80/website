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

            for (const post of posts) {
                const data = await parseData({
                    id: post.id,
                    data: post,
                });

                let branchName = "main";
                if (post.status === "draft") {
                    if ("branch" in post) branchName = post.branch;
                    else branchName = post.type + "/" + post.id;
                }

                const postContentUrl = `https://raw.githubusercontent.com/hkamran80/articles/${branchName}/posts/${post.filename ?? post.id}.md`;
                const postContentResponse = await fetch(postContentUrl);

                let body: string | undefined = undefined,
                    rendered:
                        | Awaited<ReturnType<typeof renderMarkdown>>
                        | undefined = undefined;
                if (postContentResponse.ok) {
                    body = await postContentResponse.text();
                    // TODO: Figure out how to pass arguments
                    rendered = await renderMarkdown(body);
                } else
                    console.error(
                        `Failed to load content for ${post.id} (HTTP ${postContentResponse.status}): `,
                        postContentUrl,
                    );

                store.set({ id: post.id, data, body, rendered });
            }
        },
    };
};

export default loader;
