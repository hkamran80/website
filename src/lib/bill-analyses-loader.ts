import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro:content";

const loader = (): Loader => {
    return {
        name: "bill-analyses-loader",
        schema: z.object({
            id: z.string(),
            bill: z.object({
                congress: z.string(),
                chamber: z.enum(["senate", "house"]),
                type: z.enum([
                    "bill",
                    "resolution",
                    "joint-resolution",
                    "concurrent-resolution",
                ]),
                number: z.string(),
                title: z.string(),
                sponsors: z.string().array(),
                cosponsors: z.object({
                    listed: z.string().array(),
                    other: z.number(),
                }),
            }),
            summary: z.string(),
            background: z.string(),
            organizations: z.object({
                support: z.string().array(),
                oppose: z.string().array(),
            }),
            recommendation: z.object({
                action: z.enum(["support", "oppose"]),
                reason: z.string(),
            }),
            published: z.date(),
        }),
        load: async ({ store, parseData }: LoaderContext): Promise<void> => {
            const response = await fetch(
                "https://assets.hkamran.com/bill-analyses",
            );
            const data = (await response.json()) as any[];

            for (const analysis of data) {
                const data = await parseData({
                    id: analysis.id,
                    data: {
                        ...analysis,
                        published: new Date(analysis.published),
                    },
                });

                store.set({ id: analysis.id, data });
            }
        },
    };
};

export default loader;
