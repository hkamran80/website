import { defineCollection, z } from "astro:content";
import { postsLoader } from "./lib/postsLoader";

const posts = defineCollection({ loader: postsLoader() });

const showcase = defineCollection({
    loader: async () => {
        const response = await fetch("https://assets.hkamran.com/projects");
        const data = await response.json();

        return data.map((item) => ({ ...item, id: item.name }));
    },
    schema: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        featured: z.boolean().optional(),
        repository: z.string().optional(),
        url: z.string().optional(),
        group: z.enum(["apps", "tools", "directories", "bots"]),
        owner: z
            .object({
                name: z.string(),
                url: z.string().optional(),
            })
            .optional(),
        role: z.string().optional(),
    }),
});

export const collections = { posts, showcase };
