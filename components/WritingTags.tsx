import NavLink from "./NavLink";
import { Fragment } from "react";
import { slugify } from "@hkamran/utility-strings";

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
                    <NavLink
                        href={`/${basePath}/${slugify(tag)}`}
                        className="text-pink-400 transition-colors duration-300 hover:text-pink-400"
                    >
                        {tag}
                    </NavLink>{" "}
                    <span>{index !== tags.length - 1 ? "·" : ""}</span>{" "}
                </Fragment>
            ))}
        </div>
    );
};

export default WritingTags;
