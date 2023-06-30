import Image from "next/image";

import type { Writing } from "@/types/writings";

const ArticleCard = ({
    article,
    topPadding = true,
}: {
    article: Writing;
    topPadding?: boolean;
}) => (
    <div className={topPadding ? "mt-1 pt-5" : undefined}>
        <div className="grid grid-cols-1 items-center gap-y-4 hover:cursor-pointer sm:grid-cols-3 md:gap-8">
            <Image
                src={
                    article.published !== ""
                        ? `https://assets.hkamran.com/graphics/article/${article.id}`
                        : "https://assets.hkamran.com/graphics/article/unpublished"
                }
                className="w-full rounded-lg object-cover object-center"
                alt={`Featured image for ${article.title}`}
                width={1000}
                height={500}
            />

            <div className="col-span-2 space-y-2">
                <p className="text-sm text-gray-400">
                    {article.published !== "" ? (
                        <time
                            dateTime={article.published}
                            className="dt-published published"
                        >
                            {new Date(
                                `${article.published}T12:00:00-07:00`
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

                <p className="p-name entry-title text-xl font-semibold text-gray-200">
                    {article.title}
                </p>

                <p className="p-summary entry-summary text-base text-gray-400">
                    {article.description}
                </p>

                <p className="text-base font-semibold text-pink-700 transition-colors duration-300 hover:cursor-pointer hover:text-pink-600">
                    Read full article
                </p>
            </div>
        </div>
    </div>
);

export default ArticleCard;
