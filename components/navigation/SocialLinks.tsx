import { slugify } from "@hkamran/utility-strings";

import { socialIcons } from "@/data/navigation";

import { EVENT_NAMES } from "@/data/constants";
import NavLink from "./NavLink";

type Props = {
    /**
     * CSS class names to apply to the SVG element
     */
    classNames?: string;

    /**
     * The location of the element
     */
    location?: string;
};

const SocialLinks = ({ classNames, location }: Props) => (
    <>
        {socialIcons.map(({ url, icon }, index) => (
            <NavLink
                key={index}
                href={url}
                aria-label={icon.title}
                rel="noopener noreferrer me"
                data-umami-event={EVENT_NAMES.SOCIAL}
                data-umami-event-platform={icon.title}
                data-umami-event-location={location ?? "social-links"}
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
            </NavLink>
        ))}
    </>
);

export default SocialLinks;
