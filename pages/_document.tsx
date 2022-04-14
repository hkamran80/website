import Document, { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import { socialIcons } from "../data/navigation";

const links = [
    { href: "/showcase", name: "Showcase", aliases: [] },
    { href: "/articles", name: "Articles", aliases: ["/article"] },
    { href: "/notes", name: "Notes", aliases: ["/note"] },
    { href: "/programs", name: "Programs", aliases: ["/program"] },
];

class WebsiteDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap"
                        rel="stylesheet"
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
