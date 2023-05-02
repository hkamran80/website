import { slugify } from "@hkamran/utility-strings"
import { socialIcons } from "data/navigation"

type Props = {
    /**
     * CSS class names to apply to the SVG element
     */
    classNames?: string
}

const SocialLinks = ({ classNames }: Props) =>
    <>
        {socialIcons.map(({ url, icon, rels }, index) => (
            <a
                key={index}
                href={url}
                aria-label={icon.title}
                target="_blank"
                rel={`noopener noreferrer me${rels ? ` ${rels.join(" ")}` : null}`}
                className={`umami--click--${slugify(
                    icon.title,
                )}-link-social`}
            >
                <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames}
                >
                    <title>{icon.title}</title>
                    <path d={icon.path} />
                </svg>
            </a>
        ))}
    </>;

export default SocialLinks