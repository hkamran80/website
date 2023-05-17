import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Head from "next/head";
import Layout from "@/components/Layout";
import NavLink from "@/components/navigation/NavLink";
import { getBaseUrl } from "@/lib/urls";
import { WebPageJsonLd } from "next-seo";
import type { NextPage } from "next";

const commands = [
    {
        command: "/add-reaction",
        description: "Add an emoji to a specified user's messages",
    },
    {
        command: "/remove-reaction",
        description: "Remove a user's emoji, if one was previously set",
    },
];

const Reactor: NextPage = () => {
    return (
        <>
            <Head>
                <title>Reactor | H. Kamran</title>
            </Head>

            <WebPageJsonLd id={`${getBaseUrl()}/showcase/reactor`} />

            <Layout>
                <div className="mx-auto max-w-2xl">
                    <Breadcrumbs
                        basePath="/showcase"
                        baseLabel="Showcase"
                        currentLabel="Reactor"
                    />

                    <div className="space-y-2">
                        <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                            Reactor
                        </h1>
                        <h2 className="text-center text-xl font-light leading-snug text-gray-300 sm:text-left sm:text-2xl">
                            Automatically add reactions to specific users&apos;
                            messages
                        </h2>
                    </div>

                    <div className="mt-6">
                        <div className="pt-2">
                            <NavLink
                                href="https://go.hkamran.com/add-reactor"
                                className="align-center flex w-full justify-center rounded-full bg-hk-grey p-4 text-center font-medium text-white transition-colors duration-200 ease-in-out hover:text-pink-700"
                            >
                                Add Reactor to your Discord server
                            </NavLink>

                            <div className="prose prose-invert mt-8 max-w-none prose-a:text-pink-700">
                                <h2>What Does Reactor Do?</h2>
                                <p>
                                    Like the description says, Reactor adds
                                    reactions to specific users&apos; messages.
                                    But what does that mean exactly? Well, it
                                    means that if a user that Reactor is
                                    watching sends a message, Reactor will apply
                                    a certain emoji to that message.
                                </p>
                                <p>
                                    When you first add Reactor to a server, it
                                    will do nothing, until you run the{" "}
                                    <code>/add-reaction</code> slash command,
                                    which prompts you to select a user and an
                                    emoji. Each emoji and user is per-server,
                                    meaning that if you apply an emoji to a user
                                    in one server, it will not be present in any
                                    server, unless you manually set it so.
                                </p>
                                <p>
                                    If you ever want to remove the Reactor
                                    configuration for a user, run the{" "}
                                    <code>/remove-reaction</code> command with
                                    the user as a parameter.
                                </p>

                                <h2>Reactor Commands</h2>

                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ fontWeight: 900 }}>
                                                Command
                                            </th>
                                            <th style={{ fontWeight: 900 }}>
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commands.map(
                                            (
                                                { command, description },
                                                index,
                                            ) => (
                                                <tr key={index}>
                                                    <td>
                                                        <code>{command}</code>
                                                    </td>
                                                    <td>{description}</td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>

                                <p className="text-xs">
                                    Discord is a registered trademark of Discord
                                    Inc.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Reactor;
