import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro:content";
import { chamberAbbreviation, getNumberWithOrdinal } from "./bill-analysis";

const loader = (): Loader => {
    return {
        name: "bill-analyses-loader",
        schema: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
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
        load: async ({
            store,
            parseData,
            renderMarkdown,
        }: LoaderContext): Promise<void> => {
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

                        title: `${chamberAbbreviation[analysis.bill.chamber as "senate" | "house"]}. ${analysis.bill.number}: ${analysis.bill.title}`,
                        description: `${getNumberWithOrdinal(
                            Number(analysis.bill.congress),
                        )} Congress, sponsored by ${analysis.bill.sponsors.join(", ")}`,
                    },
                });

                const body = `**Sponsor:** ${analysis.bill.sponsors.join(", ")}  
**Cosponsors:** ${analysis.bill.cosponsors.listed.join(", ")}${analysis.bill.cosponsors.other > 0 ? ` and [${analysis.bill.cosponsors.other} other${analysis.bill.cosponsors.other !== 1 && "s"}](https://www.congress.gov/bill/${getNumberWithOrdinal(Number(analysis.bill.congress))}-congress/${analysis.bill.chamber}-bill/${analysis.bill.number}/cosponsors)` : ""}

**Summary:** ${analysis.summary}

**Background:** ${analysis.background}

${analysis.organizations.support.length > 0 ? `**Organizations in Support:** ${analysis.organizations.support.join(", ")}` : ""}

${analysis.organizations.oppose.length > 0 ? `**Organizations in Opposition:** ${analysis.organizations.oppose.join(", ")}` : ""}

**Recommendation:** ${analysis.recommendation.action[0].toUpperCase() + analysis.recommendation.action.slice(1)}. ${analysis.recommendation.reason}`;

                const rendered = await renderMarkdown(body);

                store.set({ id: analysis.id, data, body, rendered });
            }
        },
    };
};

export default loader;
