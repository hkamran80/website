import { NextSeo, ArticleJsonLd } from "next-seo";
import Breadcrumbs from "../navigation/Breadcrumbs";
import WritingTags from "./WritingTags";
import { getBaseUrl } from "@/lib/urls";

type Props = {
    id: string;
    title: string;
    description: string;
    publishDate: string;
    image?: string;
    tags: string[];
    type: "article" | "note";
};

const map = {
    basePath: { article: "/articles", note: "/notes" },
    baseLabel: { article: "Articles", note: "Notes" },
};

const WritingHeader = ({
    id,
    title,
    description,
    publishDate,
    image,
    tags,
    type,
}: Props) => {
    const url = `${getBaseUrl()}/${type}/${id}`;

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    title: title,
                    description: description,
                    url,
                    type: "article",
                    article: {
                        publishedTime: `${publishDate}T07:00:00.000-08:00`,
                        tags: tags,
                    },
                    images:
                        type === "article"
                            ? [
                                  {
                                      url: image!,
                                      width: 1000,
                                      height: 500,
                                      alt: `Featured image for ${title}`,
                                  },
                              ]
                            : [],
                }}
                twitter={{
                    cardType:
                        type === "article" ? "summary_large_image" : "summary",
                }}
            />

            <ArticleJsonLd
                url={`${getBaseUrl()}/${type}/${id}`}
                title={title}
                description={description}
                images={type === "article" ? [image!] : []}
                datePublished={`${publishDate}T07:00:00.000-08:00`}
                authorName={[{ name: "H. Kamran", url: "https://hkamran.com" }]}
                publisherName="H. Kamran"
                publisherLogo="https://hkamran.com/profile.png"
                isAccessibleForFree={true}
            />

            <Breadcrumbs
                baseLabel={map.baseLabel[type]}
                basePath={map.basePath[type]}
                currentLabel={title}
            />

            <div className="space-y-2">
                <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                    {title}
                </h1>
                <h2 className="text-center text-xl font-light leading-snug text-gray-300 sm:text-left sm:text-2xl">
                    {description}
                </h2>
                <h3 className="text-center font-light leading-snug text-gray-400 sm:text-left sm:text-xl">
                    {publishDate !== "" ? (
                        <time dateTime={publishDate}>
                            {new Date(
                                `${publishDate}T12:00:00-07:00`,
                            ).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    ) : (
                        "Unpublished"
                    )}

                    <span className="ml-1 mr-2">•</span>

                    <WritingTags basePath="tag" tags={tags} />
                </h3>
            </div>
        </>
    );
};

export default WritingHeader;
