import { NextApiRequest, NextApiResponse } from "next";
import { buildFeed } from "../../../lib/feed";

const jsonFeed = async (_req: NextApiRequest, res: NextApiResponse) => {
    const feed = await buildFeed();

    res.statusCode = 200;
    res.setHeader("content-type", "application/feed+json");
    res.end(feed.json1());
};

export default jsonFeed;
