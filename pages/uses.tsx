import Layout from "@/components/Layout";
import NavLink from "@/components/navigation/NavLink";
import DynamicHeader from "@/components/DynamicHeader";
import type { NextPage } from "next";

const Uses: NextPage = () => (
    <Layout>
        <div className="mx-auto max-w-2xl">
            <DynamicHeader
                id="uses"
                name="My Setup"
                description="This is by no means a comprehensive list. It's just the essentials."
            />

            <div className="prose prose-invert mt-6 max-w-none prose-a:text-pink-700">
                <h2>Hardware</h2>

                <ul>
                    <li>
                        <p>
                            <strong>2018 MacBook Pro, 15-inch</strong> (Intel
                            Core i7, 16 GB RAM, 500 GB SSD)
                        </p>
                        <p>
                            I used to use a 2014 MacBook Pro, then I upgraded to
                            this machine. It&apos;s much faster, and perfect for
                            my use cases.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Corsair K55 keyboard</strong>
                        </p>
                        <p>
                            A nice keyboard that supports macros. I don&apos;t
                            recommend iCUE for macOS — I&apos;ve had many
                            problems with it.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Logitech G602 mouse</strong>
                        </p>
                        <p>
                            It has a lot of buttons and it&apos;s comfortable.
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
                            I have two-factor authentication enabled on all the
                            services I use. I also help maintain a directory of
                            websites and services that support two-factor
                            authentication at{" "}
                            <NavLink href="https://2fa.directory">
                                2fa.directory
                            </NavLink>
                            . Check out{" "}
                            <NavLink href="/article/securing-your-digital-life">
                                my article on securing your digital life
                            </NavLink>{" "}
                            if you want to know more.
                        </p>
                    </li>
                </ul>

                <h2>Software</h2>

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
                            I don&apos;t like Chrome or Edge, so I use Firefox.
                            I have it loaded with many extensions, including{" "}
                            <NavLink href="https://ublockorigin.com">
                                uBlock Origin
                            </NavLink>
                            ,{" "}
                            <NavLink href="https://darkreader.org">
                                Dark Reader
                            </NavLink>
                            , <NavLink href="https://tosdr.org">TOS;DR</NavLink>
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
                            ,{" "}
                            <NavLink href="https://addons.mozilla.org/firefox/addon/tab-mover">
                                Tab Mover
                            </NavLink>
                            , and my very own new tab extension{" "}
                            <NavLink href="/showcase/nebula-new-tab">
                                Nebula New Tab
                            </NavLink>
                            .
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Visual Studio Code</strong>
                        </p>
                        <p>
                            I love VS Code. All my text-editing and programming
                            work is done in here.
                        </p>
                        <p className="italic">Note to self: learn Vim/Neovim</p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                <NavLink href="https://hyper.is">Hyper</NavLink>
                            </strong>
                        </p>
                        <p>
                            I like it better than the built-in Terminal and
                            iTerm2.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Zsh</strong>
                        </p>
                        <p>
                            My Zsh configuration is available in{" "}
                            <NavLink href="https://github.com/hkamran80/dotfiles">
                                my dotfiles repository
                            </NavLink>
                            .
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>BetterTouchTool</strong>
                        </p>
                        <p>
                            As my MacBook Pro has a Touch Bar, I use
                            BetterTouchTool to show me three essentials: day and
                            time, battery level and state, and my currently
                            playing media.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Apple Juice</strong>
                        </p>
                        <p>
                            Apple Juice is a great open-source battery app for
                            macOS. I use{" "}
                            <NavLink href="https://github.com/FliiFe/apple-juice">
                                Théophile Cailliau&apos;s fork
                            </NavLink>{" "}
                            which has more notifications.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>BatteryBoi</strong>
                        </p>
                        <p>
                            In addition to Apple Juice, I also use BatteryBoi,
                            which I find a lot more pleasing to use with more
                            reactive notifications. The only downside (and
                            reason I still have Apple Juice) is because it
                            doesn&apos;t support as many notification options as
                            Apple Juice.
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
                                <NavLink
                                    href="https://raycast.com/?via=hkamran"
                                    noReferrer
                                >
                                    Raycast
                                </NavLink>
                            </strong>
                        </p>
                        <p>
                            Raycast is a better Spotlight and Alfred for macOS.
                        </p>
                        <p className="text-sm italic">
                            Full disclosure: this is an affiliate link. You
                            receive a 10% discount and I receive a 30%
                            commission on any sales of Raycast Pro through this
                            link.
                        </p>
                    </li>
                </ul>

                <h2>Services</h2>

                <ul>
                    <li>
                        <p>
                            <strong>Figma</strong>
                        </p>
                        <p>Figma is an amazing design tool.</p>
                    </li>
                    <li>
                        <p>
                            <strong>Vercel</strong>
                        </p>
                        <p>
                            I host a few of my websites, particularly the
                            Next.js ones, on Vercel. This website is hosted on
                            Vercel.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Netlify</strong>
                        </p>
                        <p>
                            Most of my non-Next.js sites are on Netlify.
                            It&apos;s a great platform.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </Layout>
);

export default Uses;
