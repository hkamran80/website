import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro:content";

const convertToDate = (dateString: string): Date =>
    new Date(
        dateString + (!dateString.includes("T") ? "T07:00:00.000-08:00" : ""),
    );

const loader = (): Loader => {
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
            const response = await fetch(
                "https://raw.githubusercontent.com/hkamran80/articles/reorganize/index.json",
            );
            // TODO: Add actual type
            const data = (await response.json()) as any[];

            const posts = data.map((post) => {
                let converted: { [key: string]: string | Date | object } = {};

                if (post.status !== "draft") {
                    converted.published = convertToDate(post.published);

                    if (post.type === "article")
                        converted.img = {
                            src: `https://assets.hkamran.com/graphics/article/${post.id}`,
                            alt: post.imgAlt,
                        };
                }

                if (post.status === "updated")
                    converted.updated = convertToDate(post.updated);

                return {
                    ...post,
                    ...converted,
                };
            });

            for (const post of posts) {
                const data = await parseData({
                    id: post.id,
                    data: post,
                });

                let branchName = "reorganize";
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
