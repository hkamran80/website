import Document, { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import { links, socialIcons } from "../data/navigation";

const description =
    "I'm a developer, experienced in Python, JavaScript, TypeScript, Vue.js, Java, Kotlin, Swift, and SwiftUI. I also enjoy taking photos and writing articles on topics that interest me or seem useful.";

class WebsiteDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap"
                        rel="stylesheet"
                    />

                    <link rel="icon" type="image/png" href="/favicon.png" />
                    <meta name="robots" content="index, follow" />
                    <meta name="author" content="H. Kamran" />
                    <meta name="copyright" content="H. Kamran" />

                    <meta
                        name="keywords"
                        content="hkamran developer python javascript vue vue.js typescript java kotlin swift swiftui photography articles blog"
                        key="keywords"
                    />
                    <meta
                        name="description"
                        content={description}
                        key="description"
                    />

                    {/* Open Graph */}
                    <meta property="og:type" content="website" key="og:type" />
                    <meta
                        property="og:title"
                        content="H. Kamran"
                        key="og:title"
                    />
                    <meta
                        property="og:description"
                        content={description}
                        key="og:description"
                    />
                    <meta
                        property="og:image"
                        content="https://next.hkamran.com/profile.png"
                        key="og:image"
                    />
                    <meta
                        property="og:image:alt"
                        content="H. Kamran's profile picture"
                        key="og:image:alt"
                    />

                    {/* Twitter */}
                    <meta
                        name="twitter:card"
                        content="summary"
                        key="twitter:card"
                    />
                    <meta
                        name="twitter:site"
                        content="@hkamran80"
                        key="twitter:site"
                    />
                    <meta
                        name="twitter:creator"
                        content="@hkamran80"
                        key="twitter:creator"
                    />
                    <meta
                        name="twitter:title"
                        content="H. Kamran"
                        key="twitter:title"
                    />
                    <meta
                        name="twitter:description"
                        content={description}
                        key="twitter:description"
                    />
                    <meta
                        name="twitter:image"
                        content="https://next.hkamran.com/profile.png"
                        key="twitter:image"
                    />
                    <meta
                        name="twitter:image:alt"
                        content="H. Kamran's profile picture"
                        key="twitter:image:alt"
                    />
                </Head>
                <body>
                    <Main />

                    <footer className="mt-4 max-w-5xl mx-auto text-gray-400 pb-16 text-center items-center justify-center space-y-4">
                        <nav aria-label="Footer" className="space-x-5">
                            {links.map(({ href, name }, index) => (
                                <Link key={index} href={href} passHref>
                                    <a className="hover:text-gray-300 transition-colors duration-200 ease-in-out">
                                        {name}
                                    </a>
                                </Link>
                            ))}
                        </nav>

                        <div className="flex flex-row space-x-5 justify-center">
                            {socialIcons.map(({ url, icon }, index) => (
                                <a
                                    key={index}
                                    href={url}
                                    aria-label={icon.title}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        role="img"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="fill-gray-400 hover:fill-gray-300 transition-colors duration-200 ease-in-out w-5 h-5"
                                    >
                                        <title>{icon.title}</title>
                                        <path d={icon.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm">
                                Copyright &copy; {new Date().getFullYear()} H.
                                Kamran. All rights reserved.
                            </p>

                            <p className="text-sm space-x-5">
                                <Link href="/legal/license" passHref>
                                    <a className="hover:text-gray-300 transition-colors duration-200 ease-in-out">
                                        License
                                    </a>
                                </Link>

                                <Link href="/legal/privacy" passHref>
                                    <a className="hover:text-gray-300 transition-colors duration-200 ease-in-out">
                                        Privacy Policy
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </footer>

                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebsiteDocument;
