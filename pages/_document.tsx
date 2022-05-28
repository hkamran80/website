import Document, { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import { links, socialIcons } from "../data/navigation";

const description =
    "I'm a developer, experienced in Python, JavaScript, TypeScript, Vue.js, Java, Kotlin, Swift, and SwiftUI. I also enjoy taking photos and writing articles on topics that interest me or seem useful.";

const styles = `/* latin-ext */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc9yAs5jU1ECVZl_86Y.woff2) format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc9yAs5tU1ECVZl_.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc8WAc5jU1ECVZl_86Y.woff2) format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc8WAc5tU1ECVZl_.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe0qMImSLYBIv1o4X1M8ccezI9tAcVwob5A.woff2) format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe0qMImSLYBIv1o4X1M8cce9I9tAcVwo.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc9iB85jU1ECVZl_86Y.woff2) format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc9iB85tU1ECVZl_.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc8GBs5jU1ECVZl_86Y.woff2) format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc8GBs5tU1ECVZl_.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc8-BM5jU1ECVZl_86Y.woff2) format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v11/pe03MImSLYBIv1o4X1M8cc8-BM5tU1ECVZl_.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`;

class WebsiteDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
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
                    <meta property="og:site_name" content="H. Kamran" />
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
                    <style>{styles}</style>

                    <Main />

                    <footer
                        className="mt-4 max-w-5xl mx-auto text-gray-400 pb-16 text-center items-center justify-center space-y-4"
                        role="contentinfo"
                    >
                        <nav
                            aria-label="Footer"
                            role="navigation"
                            className="space-x-5"
                        >
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
