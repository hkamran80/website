import Link from "next/link";
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
                    <Link href={`/${basePath}/${tag.toLowerCase()}`} passHref>
                        <a className="text-pink-400 hover:underline">{tag}</a>
                    </Link>{" "}
                    <span>{index !== tags.length - 1 ? "·" : ""}</span>{" "}
                </Fragment>
            ))}
        </div>
    );
};

export default WritingTags;
