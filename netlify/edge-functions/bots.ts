import type { Config } from "@netlify/edge-functions";

export const config: Config = {
    path: "/*",
};

const robotsTxt = await fetch(
    "https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt",
);
const txt = await robotsTxt.text();

const bots = txt
    .split("\n")
    .filter(
        (line) =>
            line.startsWith("User-agent:") && line !== "User-agent: Applebot",
    )
    .map((line) =>
        line.split(": ")[1].trim().replaceAll(" ", "\\ ").toLowerCase(),
    );

export default async (request: Request) => {
    const userAgent =
        request.headers.get("user-agent")?.toLowerCase() ?? undefined;
    if (!userAgent) return;

    // Check against our list of known "AI" bots
    const isBot = bots.some((bot) => userAgent.includes(bot));

    // If the requester is an AI bot, redirect to a 10 GB file 😈
    if (isBot)
        return Response.redirect("https://ash-speed.hetzner.com/10GB.bin");

    // Otherwise, continue with the request as normal
    return;
};
