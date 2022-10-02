import TextLink from './TextLink';
import { Fragment } from 'react';
import { slugify } from '@hkamran/utility-strings';

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
                    <TextLink
                        href={`/${basePath}/${slugify(tag)}`}
                        className="text-pink-400 transition-colors duration-300 hover:text-pink-400"
                    >
                        {tag}
                    </TextLink>{" "}
                    <span>{index !== tags.length - 1 ? "·" : ""}</span>{" "}
                </Fragment>
            ))}
        </div>
    );
};

export default WritingTags;
