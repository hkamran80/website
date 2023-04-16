import NavLink from "./NavLink";
import { links, socialIcons } from "../data/navigation";
import { slugify } from "@hkamran/utility-strings";
import { classNames } from "@hkamran/utility-web";

const Footer = () => {
    return (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-6">
            <div className="space-y-4 md:text-left">
                <p>
                    Copyright &copy; {new Date().getFullYear()} H. Kamran. All
                    rights reserved.
                </p>
                <div className="flex flex-row justify-center space-x-5 md:justify-start">
                    {socialIcons.map(({ url, icon }, index) => (
                        <a
                            key={index}
                            href={url}
                            aria-label={icon.title}
                            target="_blank"
                            rel="noopener noreferrer me"
                            className={`umami--click--${slugify(
                                icon.title,
                            )}-link-social`}
                        >
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 fill-gray-500 transition-colors duration-200 ease-in-out hover:fill-gray-300"
                            >
                                <title>{icon.title}</title>
                                <path d={icon.path} />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
            <div className="col-span-2 space-y-4 md:text-right">
                <p className="space-x-3">
                    {links.map(({ href, name }, index) => (
                        <NavLink
                            key={index}
                            href={href}
                            className={classNames(
                                "transition-colors duration-200 ease-in-out hover:text-gray-300",
                                href.includes("unsplash")
                                    ? "umami--click--unsplash-navbar"
                                    : "",
                            )}
                            target={!href.startsWith("/") ? "_blank" : ""}
                        >
                            {name}
                        </NavLink>
                    ))}
                </p>
                <p className="space-x-3">
                    <NavLink
                        href="/legal/license"
                        className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    >
                        License
                    </NavLink>

                    <NavLink
                        href="/legal/privacy"
                        className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    >
                        Privacy Policy
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Footer;
