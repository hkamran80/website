import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import Layout from "@/components/Layout";
import { WebPageJsonLd } from "next-seo";
import type { NextPage } from "next";
import { getBaseUrl } from "@/lib/urls";
import NavLink from "@/components/NavLink";

const Uses: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Uses | H. Kamran</title>
            </Head>

            <WebPageJsonLd id={`${getBaseUrl()}/uses`} />

            <div className="mx-auto max-w-2xl">
                <Breadcrumbs basePath="/" baseLabel="Uses" />

                <div className="space-y-2">
                    <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                        Uses
                    </h1>
                    <h2 className="text-center text-xl font-light leading-snug text-gray-300 sm:text-left sm:text-2xl">
                        A list of things I use
                    </h2>
                </div>

                <div className="prose prose-invert mt-6 max-w-none prose-a:text-pink-700">
                    <h2>Hardware</h2>

                    <ul>
                        <li>
                            <p>
                                <strong>2018 MacBook Pro, 15-inch</strong>{" "}
                                (Intel Core i7, 16 GB RAM, 500 GB SSD)
                            </p>
                            <p>
                                I used to use a 2014 MacBook Pro, then I
                                upgraded to this machine. It&apos;s much faster,
                                and perfect for my use cases.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Corsair K55 keyboard</strong>
                            </p>
                            <p>
                                A nice keyboard that supports macros. I
                                don&apos;t recommend iCUE for macOS — I&apos;ve
                                had many problems with it.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Logitech G602 mouse</strong>
                            </p>
                            <p>
                                This mouse has a lot of buttons, which I take
                                full advantage of.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <NavLink href="https://www.yubico.com/products/yubikey-5-overview/">
                                        YubiKey 5
                                    </NavLink>
                                </strong>
                            </p>
                            <p>
                                I have two-factor authentication enabled on all
                                the services I use. I also help maintain a
                                directory of websites and services that support
                                two-factor authentication at{" "}
                                <NavLink href="https://2fa.directory">
                                    2fa.directory
                                </NavLink>
                                .
                            </p>
                        </li>
                    </ul>

                    <h2>Software</h2>
                    <p>
                        This is by no means a comprehensive list. It&apos;s just
                        the software I use on a constant basis.
                    </p>

                    <ul>
                        <li>
                            <p>
                                <strong>
                                    <NavLink href="https://brew.sh">
                                        Homebrew + Homebrew Cask
                                    </NavLink>
                                </strong>
                            </p>
                            <p>
                                I use Homebrew to install all my apps. I also
                                maintain a{" "}
                                <NavLink href="https://github.com/hkamran80/homebrew-things">
                                    Homebrew tap
                                </NavLink>{" "}
                                that has some software not otherwise available.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Firefox</strong>
                            </p>
                            <p>
                                I don&apos;t like Chrome or Edge, so I use
                                Firefox. I have it loaded with extensions like{" "}
                                <NavLink href="https://ublockorigin.com">
                                    uBlock Origin
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://darkreader.org">
                                    Dark Reader
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://tosdr.org">
                                    TOS;DR
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://addons.mozilla.org/firefox/addon/window-titler">
                                    Window Titler
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://addons.mozilla.org/firefox/addon/tab-counter-plus">
                                    Tab Counter Plus
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://github.com/refined-github/refined-github">
                                    Refined GitHub
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://github.com/sindresorhus/hide-files-on-github">
                                    Hide Files on GitHub
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://www.tampermonkey.net">
                                    Tampermonkey
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://github.com/iamadamdev/bypass-paywalls-chrome">
                                    Bypass Paywalls
                                </NavLink>{" "}
                                and{" "}
                                <NavLink href="https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean">
                                    Bypass Paywalls Clean
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://addons.mozilla.org/firefox/addon/multi-account-containers">
                                    Firefox Multi-Account Containers
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://sponsor.ajay.app">
                                    SponsorBlock
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://www.returnyoutubedislike.com">
                                    Return YouTube Dislike
                                </NavLink>
                                ,{" "}
                                <NavLink href="https://addons.mozilla.org/firefox/addon/videospeed">
                                    Video Speed Controller
                                </NavLink>
                                , and my very own new tab extension{" "}
                                <NavLink href="/showcase/nebula-new-tab">
                                    Nebula New Tab
                                </NavLink>
                                . I cannot recommend{" "}
                                <NavLink href="https://addons.mozilla.org/firefox/addon/tab-mover">
                                    Tab Mover
                                </NavLink>{" "}
                                highly enough.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Visual Studio Code</strong>
                            </p>
                            <p>
                                I love VS Code. All my text-editing and
                                programming work is done in here.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <NavLink href="https://hyper.is">
                                        Hyper
                                    </NavLink>
                                </strong>
                            </p>
                            <p>
                                I use Vercel&apos;s Hyper terminal with{" "}
                                <code>zsh</code>.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>BetterTouchTool</strong>
                            </p>
                            <p>
                                As my MacBook Pro has a Touch Bar, I use
                                BetterTouchTool to show me three essentials: day
                                and time, battery level and state, and my
                                currently playing media.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Apple Juice</strong>
                            </p>
                            <p>
                                Apple Juice is a great open-source battery app
                                for macOS. I use{" "}
                                <NavLink href="https://github.com/FliiFe/apple-juice">
                                    Théophile Cailliau&apos;s fork
                                </NavLink>{" "}
                                which has more notifications.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Spotify</strong>
                            </p>
                            <p>
                                I love listening to music, especially{" "}
                                <NavLink href="https://taylorswift.com">
                                    Taylor Swift
                                </NavLink>
                                !
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <NavLink href="https://mimestream.com">
                                        Mimestream
                                    </NavLink>
                                </strong>
                            </p>
                            <p>Mimestream is an amazing Gmail client.</p>
                        </li>
                        <li>
                            <p>
                                <strong>Todoist</strong>
                            </p>
                            <p>
                                Todoist is a great app that helps me keep track
                                of what I need to do.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Raycast</strong>
                            </p>
                            <p>Raycast is a better Spotlight and Alfred.</p>
                        </li>
                    </ul>

                    <h2>Services</h2>
                    <p>
                        This is by no means a comprehensive list. It&apos;s just
                        the services I use on a constant basis.
                    </p>

                    <ul>
                        <li>
                            <p>
                                <strong>
                                    Figma
                                </strong>
                            </p>
                            <p>
                                Figma is an amazing design tool, and I use it for much more than it&apos;s intended.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    Vercel
                                </strong>
                            </p>
                            <p>
                               I host a few of my websites, particularly the Next.js ones, on Vercel. This website is hosted on Vercel!
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    Netlify
                                </strong>
                            </p>
                            <p>
                               Most of my non-Next.js sites are on Netlify. I love the platform!
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default Uses;
