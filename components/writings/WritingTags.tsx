import { slugify } from "@hkamran/utility-strings";
import { Fragment } from "react";

import NavLink from "../navigation/NavLink";

const WritingTags = ({
    basePath,
    tags,
}: {
    basePath: string;
    tags: string[];
}) => (
    <div className="contents">
        {tags.map((tag, index) => (
            <Fragment key={index}>
                <NavLink
                    href={`/${basePath}/${slugify(tag)}`}
                    className="text-pink-700 transition-colors duration-300 hover:text-pink-600"
                >
                    {tag}
                </NavLink>{" "}
                <span>{index !== tags.length - 1 ? "·" : ""}</span>{" "}
            </Fragment>
        ))}
    </div>
);

export default WritingTags;
