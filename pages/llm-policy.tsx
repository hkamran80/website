import Layout from "@/components/Layout";
import NavLink from "@/components/navigation/NavLink";
import DynamicHeader from "@/components/DynamicHeader";
import type { NextPage } from "next";

const AIPolicy: NextPage = () => (
    <Layout includeAntiAIMeasures={false}>
        <div className="mx-auto max-w-2xl">
            <DynamicHeader
                id="llm-policy"
                name="LLM Policy"
                description='This policy explains my use of large language models (LLMs), commonly (but incorrectly) known as "artificial intelligence" or "AI", in my work.'
                pageDescription="Last Updated: September 2, 2025"
            />

            <div className="prose prose-invert mt-6 max-w-none prose-a:text-pink-700">
                <p>
                    This policy explains my use of large language models (LLMs),
                    commonly (but incorrectly) known as &quot;artificial
                    intelligence&quot; or &quot;AI&quot;, in my work. In this
                    policy, &quot;LLM&quot; and &quot;LLMs&quot; refer to both
                    large language models and the broader field of
                    &quot;AI&quot;, such as generative &quot;AI&quot;.
                </p>

                <p>
                    This is a first draft subject to change at any time without
                    notice.
                </p>

                <h3>Overview</h3>

                <blockquote>
                    <p>
                        TL;DR — I do not currently use LLMs in my personal or
                        professional work.
                    </p>
                </blockquote>

                <p>
                    I will not knowingly use LLMs to produce any of my work,
                    including, but not limited to, code, design, and
                    communication. I intend to make all reasonable efforts to
                    avoid LLMs in my work.
                </p>

                <p>
                    Given how LLMs are being imposed on everyone and how its
                    deployment is accelerating with no regard to humanity or{" "}
                    <NavLink href="https://apnews.com/article/ai-data-center-climate-impact-environment-c6218681ffdbad5bf427b47347fddcb9">
                        the
                    </NavLink>{" "}
                    <NavLink href="https://www.pbs.org/newshour/show/the-growing-environmental-impact-of-ai-data-centers-energy-demands">
                        planet
                    </NavLink>
                    , it is impossible to stay unexposed. While I abstain from
                    LLM usage, my clients and colleagues may not do so. At
                    times, it may be necessary to integrate LLM output in my
                    work on the condition that I am not held accountable or
                    responsible for the combined work.
                </p>

                <h3>Moral and Ethical Issues</h3>

                <p>
                    LLMs are trained on copyrighted work. &quot;AI&quot;
                    companies have accumulated massive datasets without
                    respecting copyright licenses. Meta (Facebook){" "}
                    <NavLink href="https://arstechnica.com/tech-policy/2025/02/meta-torrented-over-81-7tb-of-pirated-books-to-train-ai-authors-say/">
                        trained its models on pirated books
                    </NavLink>
                    .{" "}
                    <NavLink href="https://www.theverge.com/2023/12/27/24016212/new-york-times-openai-microsoft-lawsuit-copyright-infringement">
                        The New York Times
                    </NavLink>{" "}
                    and a{" "}
                    <NavLink href="https://www.nytimes.com/2024/04/30/business/media/newspapers-sued-microsoft-openai.html">
                        few
                    </NavLink>{" "}
                    <NavLink href="https://mashable.com/article/the-intercept-raw-story-alternet-openai-lawsuit-copyright-infringement">
                        other
                    </NavLink>{" "}
                    newspapers are suing OpenAI and Microsoft for copyright
                    infringement. Disney and Universal are{" "}
                    <NavLink href="https://www.nytimes.com/2025/06/11/business/media/disney-universal-midjourney-ai.html">
                        suing Midjourney for the same thing
                    </NavLink>
                    . Some media organizations, like{" "}
                    <NavLink href="https://www.ap.org/media-center/ap-in-the-news/2023/chatgpt-maker-openai-signs-deal-with-ap-to-license-news-stories/">
                        the Associated Press
                    </NavLink>
                    ,{" "}
                    <NavLink href="https://aboutus.ft.com/press_release/openai">
                        the Financial Times
                    </NavLink>
                    ,{" "}
                    <NavLink href="https://www.voxmedia.com/2024/5/29/24166483/vox-media-openai-strategic-content-and-product-partnership">
                        Vox Media
                    </NavLink>
                    ,{" "}
                    <NavLink href="https://www.theatlantic.com/press-releases/archive/2024/05/atlantic-product-content-partnership-openai/678529/">
                        The Atlantic
                    </NavLink>
                    , and{" "}
                    <NavLink href="https://mashable.com/article/all-the-media-companies-that-have-licensing-deals-with-openai-so-far">
                        more
                    </NavLink>{" "}
                    have signed licensing agreements with OpenAI.
                </p>

                <p>
                    If all these &quot;AI&quot; companies think LLM training is
                    &quot;fair use&quot;, how come they are signing all of these
                    licensing agreements? Is there any value in copyright now if
                    any LLM model can be trained on anything?
                </p>

                <h3>Misuse and Harm</h3>

                <p>
                    LLM crawlers have no respect for the web&apos;s rules. They{" "}
                    <NavLink href="https://www.reuters.com/technology/artificial-intelligence/multiple-ai-companies-bypassing-web-standard-scrape-publisher-sites-licensing-2024-06-21/">
                        blatantly ignore
                    </NavLink>{" "}
                    the long-standing{" "}
                    <NavLink href="https://en.wikipedia.org/wiki/Robots.txt">
                        <code>robots.txt</code> standard
                    </NavLink>{" "}
                    (formally known as the Robots Exclusion Protocol,{" "}
                    <NavLink href="https://www.rfc-editor.org/rfc/rfc9309.html">
                        RFC 9309
                    </NavLink>
                    ). They use{" "}
                    <NavLink href="https://blog.cloudflare.com/residential-proxy-bot-detection-using-machine-learning/">
                        residential proxies
                    </NavLink>{" "}
                    to circumvent anti-crawling measures. They are responsible
                    for{" "}
                    <NavLink href="https://thelibre.news/foss-infrastructure-is-under-attack-by-ai-companies/">
                        attacking open-source infrastructure
                    </NavLink>{" "}
                    and{" "}
                    <NavLink href="https://news.itsfoss.com/curl-ai-slop/">
                        maintainers
                    </NavLink>
                    . New LLMs are{" "}
                    <NavLink href="https://github.com/ai-robots-txt/ai.robots.txt/blob/main/table-of-bot-metrics.md">
                        created every day
                    </NavLink>
                    . LLMs are a significant cause in the{" "}
                    <NavLink href="https://doi.org/10.1177/27523543251344971">
                        rise of misinformation
                    </NavLink>
                    . Elon Musk, who has been known to share{" "}
                    <NavLink href="https://www.salon.com/2025/01/21/it-was-a-nazi-salute-historian-dismisses-claim-that-musks-raised-arm-was-mere-awkward-gesture/">
                        fascist
                    </NavLink>{" "}
                    and far-right ideologies, owns the &quot;AI&quot; company
                    xAI and its Grok LLM, which{" "}
                    <NavLink href="https://www.forbes.com/sites/tylerroush/2025/07/09/elon-musk-claims-grok-manipulated-by-x-users-after-chatbot-praises-hitler/">
                        once called itself &quot;MechaHitler&quot;
                    </NavLink>
                    .
                </p>

                <p>
                    They also do considerable harm to the environment.
                    &quot;AI&quot; data centres are using tremendous amounts of{" "}
                    <NavLink href="https://www.theatlantic.com/technology/archive/2024/03/ai-water-climate-microsoft/677602/">
                        water
                    </NavLink>{" "}
                    (see also:{" "}
                    <NavLink href="https://arxiv.org/abs/2304.03271">
                        arXiv
                    </NavLink>
                    ) and{" "}
                    <NavLink href="https://news.mit.edu/2025/explained-generative-ai-environmental-impact-0117">
                        energy
                    </NavLink>
                    . They are major polluters of water, noise, and{" "}
                    <NavLink href="https://arstechnica.com/tech-policy/2025/04/elon-musks-xai-accused-of-lying-to-black-communities-about-harmful-pollution/">
                        air
                    </NavLink>
                    , ruining the lives of nearby residents.
                </p>

                <h3>Quality Issues</h3>

                <p>
                    The quality of LLM-generated code leaves much to be desired.
                    It does not meet the quality I expect and require.
                    LLM-generated code frequently hallucinates APIs and syntax,
                    and often generates invalid code.
                </p>

                <p>
                    There is no reason for me to use an LLM for communication. I
                    am confident in my own ability to communicate without
                    unnecessary noise that would be included if an LLM was used.
                </p>

                <p>
                    Using an LLM for design makes no sense because it is random,
                    which is not what good design is based on.
                </p>
            </div>
        </div>
    </Layout>
);

export default AIPolicy;
