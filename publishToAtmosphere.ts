import { Agent, CredentialSession } from "@atproto/api";
import fs from "node:fs/promises";
import {
    createOrUpdateStandardSite,
    type Publication,
} from "@mastrojs/atproto";
import { getPosts } from "./src/lib/posts.ts";

const identifier = "hkamran.com";
const password = process.env.ATPROTO_PASSWORD as string;
const pubUrl = new URL("https://hkamran.com/posts/");

const publication: Publication = {
    url: pubUrl,
    name: "H. Kamran",
    description:
        "I'm a California-based developer who takes photos, is interested in public transit and data privacy and security, and follows government across the U.S., the EU, and the UK.",
    icon: {
        blob: await fs.readFile("public/profile.png"),
        mimeType: "image/png",
    },
};

const posts = await getPosts(process.env.GITHUB_API_KEY as string);
const docs = posts
    .filter((post) => post.status !== "draft")
    .map((p) => ({
        title: p.title,
        url: new URL(p.id, pubUrl),
        publishedAt: p.published,
        description: p.description,
    }));

const session = new CredentialSession(new URL("https://pds.13willow.com"));
await session.login({ identifier, password });
await createOrUpdateStandardSite(session, publication, docs, {
    baseFolder: "public",
});
