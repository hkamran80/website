import Image from "next/image";
import type { Article } from "../types/writings";

const BlogCard = ({ article }: { article: Article }) => {
    return (
        <div className="mt-1 pt-5">
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 items-center hover:cursor-pointer">
                <Image
                    src={article.heroImage}
                    className="rounded-lg object-cover object-center h-1/4"
                    alt={`Featured image for ${article.title}`}
                    width="100%"
                    height="100%"
                    unoptimized={true}
                />

                <div className="col-span-2">
                    <p className="text-sm text-gray-400">
                        <time dateTime={article.published}>
                            {new Date(
                                `${article.published}T12:00:00-07:00`,
                            ).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </p>

                    <span className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-200">
                            {article.title}
                        </p>
                        <p className="mt-2 text-base text-gray-400">
                            {article.description}
                        </p>
                    </span>

                    <div className="mt-3 hover:cursor-pointer">
                        <span className="text-base font-semibold text-pink-500 hover:text-pink-600">
                            Read full article
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
