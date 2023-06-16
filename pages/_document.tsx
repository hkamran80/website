import Document, { Html, Head, Main, NextScript } from "next/document";

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

                    {/* RSS Feeds */}
                    <link
                        key="rss-feed"
                        rel="alternative"
                        type="application/rss+xml"
                        title="RSS feed for H. Kamran's articles and notes"
                        href="/feed"
                    />
                    <link
                        key="atom-feed"
                        rel="alternative"
                        type="application/atom+xml"
                        title="Atom feed for H. Kamran's articles and notes"
                        href="/feed/atom"
                    />
                    <link
                        key="json-feed"
                        rel="alternative"
                        type="application/feed+json"
                        title="JSON feed for H. Kamran's articles and notes"
                        href="/feed/json"
                    />

                    {/* IndieAuth */}
                    <link
                        rel="webmention"
                        href="https://webmention.io/hkamran.com/webmention"
                    />
                    <link
                        rel="pingback"
                        href="https://webmention.io/hkamran.com/xmlrpc"
                    />
                    <link href="https://github.com/hkamran80" rel="me authn" />

                    {/* Dark Reader */}
                    <meta name="darkreader-lock" />
                </Head>
                <body>
                    <style>{styles}</style>

                    <Main />

                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebsiteDocument;
