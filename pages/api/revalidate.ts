import type { NextApiRequest, NextApiResponse } from "next";

type RevalidationOutput = { revalidated: boolean } | { error: string };

const revalidationHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "POST requests only" });
    }

    if (
        !Object.keys(req.headers)
            .map((header) => header.toLowerCase())
            .includes("x-api-key")
    ) {
        return res
            .status(401)
            .json({ error: 'Missing required "x-api-key" header' });
    }

    if (req.headers["x-api-key"] !== process.env.REVALIDATION_TOKEN) {
        return res.status(401).json({ error: "Invalid token" });
    }

    if (!req.query.path) {
        return res
            .status(406)
            .json({ error: 'Missing required "path" parameter' });
    }

    const finalOutput: {
        [path: string]: RevalidationOutput;
    } = {};
    let success = true;

    const revalidatePath = async (
        path: string
    ): Promise<RevalidationOutput> => {
        try {
            await res.revalidate(path);
            return { revalidated: true };
        } catch (error) {
            return { error: "Error revalidating" };
        }
    };

    const paths = (req.query.path as string).split(",");
    if (paths.length > 1) {
        const outputs = await Promise.all(
            paths.map((path) => revalidatePath(path))
        );

        outputs.forEach((output, index) => {
            if (output.hasOwnProperty("error")) {
                success = false;
            }

            finalOutput[paths[index]] = output;
        });
    } else if (paths.length === 1) {
        const output = await revalidatePath(req.query.path as string);
        if (output.hasOwnProperty("error")) {
            success = false;
        }

        finalOutput[req.query.path as string] = output;
    }

    if (success) {
        return res.json(finalOutput);
    } else {
        return res.status(500).json(finalOutput);
    }
};

export default revalidationHandler;
