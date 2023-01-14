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

    try {
        await res.revalidate(req.query.path as string);
        return res.json({ revalidated: true });
    } catch (error) {
        return res.status(500).json({ message: "Error revalidating", error });
    }
};

export default revalidationHandler;
