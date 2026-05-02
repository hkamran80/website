import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro/zod";

const loader = (options: { apiKey: string; perPage?: number }): Loader => ({
    name: "unsplash-loader",
    schema: z.object({
        created_at: z.date(),
        width: z.number(),
        height: z.number(),
        blur_hash: z.string(),
        description: z.string().nullable(),
        urls: z.object({
            full: z.url(),
            regular: z.url(),
            small: z.url(),
            thumb: z.url(),
        }),
        links: z.object({ html: z.url() }),
    }),
    load: async ({ parseData, store }: LoaderContext): Promise<void> => {
        const response = await fetch(
            `https://api.unsplash.com/users/hkamran/photos?per_page=${options.perPage || 50}`,
            {
                headers: {
                    "Accept-Version": "v1",
                    Authorization: `Client-ID ${options.apiKey}`,
                },
            },
        );
        const json = await response.json();

        for (const { id, ...photo } of json) {
            const data = await parseData({
                id,
                data: { ...photo, created_at: new Date(photo.created_at) },
            });
            store.set({ id, data });
        }
    },
});

export default loader;
