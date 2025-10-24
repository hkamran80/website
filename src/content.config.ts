import { defineCollection, z } from "astro:content";

const convertToDate = (dateString: string): Date =>
    new Date(
        dateString + (!dateString.includes("T") ? "T07:00:00.000-08:00" : ""),
    );

const posts = defineCollection({
    loader: async () => {
        const response = await fetch(
            "https://raw.githubusercontent.com/hkamran80/articles/main/markdown/contents.json",
        );
        const data = await response.json();

        return [
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
    },
    schema: z.object({
        id: z.string(),
        type: z.enum(["article", "note"]),
        title: z.string(),
        description: z.string(),
        tags: z.string().array(),
        toc: z.boolean().optional(),
        published: z.date().or(z.literal("")),
        updated: z.optional(z.date().or(z.literal(""))),
        filename: z.string(),
        branchName: z.string().optional(),
    }),
});

const showcase = defineCollection({
    loader: async () => {
        const response = await fetch("https://assets.hkamran.com/showcase");
        const data = await response.json();

        return data.map((item) => ({ ...item, id: item.name }));
    },
    schema: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        repository: z.string().optional(),
        site: z.string().optional(),
        featured: z.boolean().optional(),
    }),
});

export const collections = { posts, showcase };
