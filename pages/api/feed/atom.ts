import { NextApiRequest, NextApiResponse } from "next";
import { buildFeed } from "../../../lib/feed";

const atomFeed = async (_req: NextApiRequest, res: NextApiResponse) => {
    const feed = await buildFeed();

    res.statusCode = 200;
    res.setHeader("content-type", "application/atom+xml");
    res.end(feed.atom1());
};

export default atomFeed;
