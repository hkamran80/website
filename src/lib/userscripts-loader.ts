import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro/zod";

const loader = (): Loader => {
    return {
        name: "userscripts-loader",
        schema: z.object({
            name: z.string(),
            description: z.string(),
            version: z.string(),
            url: z.string(),
            matches: z.string().array(),
        }),
        load: async ({ store, parseData }: LoaderContext): Promise<void> => {
            const response = await fetch(
                "https://api.github.com/repos/hkamran80/userscripts/contents",
            );
            const contents = (await response.json()) as any[];

            for (const file of contents) {
                if (!file.name.includes(".user.js")) continue;

                const fileResponse = await fetch(
                    `https://raw.githubusercontent.com/hkamran80/userscripts/main/${file.name}`,
                );
                const fileText = await fileResponse.text();

                const lines = fileText.split("==/UserScript==")[0].split("\n");

                const id = file.name.replace(".user.js", "");
                const name =
                    lines
                        .find((line) => line.startsWith("// @name"))
                        ?.slice("// @name".length)
                        .trim() ?? undefined;
                const description =
                    lines
                        .find((line) => line.startsWith("// @description"))
                        ?.slice("// @description".length)
                        .trim() ?? undefined;
                const version =
                    lines
                        .find((line) => line.startsWith("// @version"))
                        ?.slice("// @version".length)
                        .trim() ?? undefined;
                const url =
                    (
                        lines.find((line) =>
                            line.startsWith("// @downloadUrl"),
                        ) ||
                        lines.find((line) => line.startsWith("// @downloadURL"))
                    )
                        ?.slice("// @downloadUrl".length)
                        .trim() ?? undefined;
                const matches = lines
                    .filter((line) => line.startsWith("// @match"))
                    .map((line) => line.slice("// @match".length).trim());

                const data = await parseData({
                    id,
                    data: {
                        name,
                        description,
                        version,
                        url,
                        matches,
                    },
                });

                store.set({ id, data });
            }
        },
    };
};

export default loader;
