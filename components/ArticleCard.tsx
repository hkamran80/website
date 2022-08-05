import Image from "next/image";
import { classNames } from "@hkamran/utility-web";
import type { Article } from "../types/writings";

const ArticleCard = ({
    article,
    topPadding = true,
}: {
    article: Article;
    topPadding?: boolean;
}) => {
    return (
        <div className={classNames(topPadding ? "mt-1 pt-5" : "")}>
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 items-center hover:cursor-pointer">
                <Image
                    src={article.heroImage}
                    className="rounded-lg object-cover object-center h-1/4"
                    alt={`Featured image for ${article.title}`}
                    width="100%"
                    height="100%"
                    unoptimized={true}
                />

                <div className="col-span-2 space-y-2">
                    <p className="text-sm text-gray-400">
                        {article.published !== "" ? (
                            <time dateTime={article.published}>
                                {new Date(
                                    `${article.published}T12:00:00-07:00`,
                                ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        ) : (
                            "Unpublished"
                        )}
                    </p>

                    <p className="text-xl font-semibold text-gray-200">
                        {article.title}
                    </p>

                    <p className="text-base text-gray-400">
                        {article.description}
                    </p>

                    <p className="text-base font-semibold text-pink-500 hover:text-pink-600 hover:cursor-pointer transition-colors duration-300">
                        Read full article
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
