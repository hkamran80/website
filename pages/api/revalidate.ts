import type { NextApiRequest, NextApiResponse } from "next";

const revalidationHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "POST requests only" });
    }

    if (req.headers["X-API-Token"] !== process.env.REVALIDATION_TOKEN) {
        return res.status(401).json({ error: "Invalid token" });
    }

    if (!req.query.path) {
        return res
            .status(406)
            .json({ error: 'Missing required "path" parameter' });
    }

    const finalOutput: {
        [path: string]: { revalidated: boolean } | { error: string };
    } = {};
    let success = true;

    (req.query.path as string).split(",").forEach(async (path) => {
        try {
            await res.revalidate(path);
            finalOutput[path] = { revalidated: true };
        } catch (error) {
            finalOutput[path] = { error: "Error revalidating" };
            success = false;
        }
    });

    if (success) {
        return res.json(finalOutput);
    } else {
        return res.status(500).json(finalOutput);
    }
};

export default revalidationHandler;
