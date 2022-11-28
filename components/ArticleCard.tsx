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
            <div className="grid grid-cols-1 items-center gap-8 hover:cursor-pointer sm:grid-cols-3">
                <Image
                    src={article.heroImage}
                    className="h-1/4 rounded-lg object-cover object-center"
                    alt={`Featured image for ${article.title}`}
                    width={1000}
                    height={500}
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

                    <p className="text-base font-semibold text-pink-500 transition-colors duration-300 hover:cursor-pointer hover:text-pink-600">
                        Read full article
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
