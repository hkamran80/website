import Link from "next/link";
import { slugify } from "../util/string";
import { Fragment } from "react";

const WritingTags = ({
    basePath,
    tags,
}: {
    basePath: string;
    tags: string[];
}) => {
    return (
        <div className="contents">
            {tags.map((tag, index) => (
                <Fragment key={index}>
                    <Link href={`/${basePath}/${slugify(tag)}`} passHref>
                        <a className="text-pink-400 hover:text-pink-700 transition-colors duration-300">
                            {tag}
                        </a>
                    </Link>{" "}
                    <span>{index !== tags.length - 1 ? "·" : ""}</span>{" "}
                </Fragment>
            ))}
        </div>
    );
};

export default WritingTags;
