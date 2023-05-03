import NavLink from "./NavLink";
import { links, socialIcons } from "../data/navigation";
import { slugify } from "@hkamran/utility-strings";
import { classNames } from "@hkamran/utility-web";
import SocialLinks from "./SocialLinks";

const Footer = () => {
    return (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-6">
            <div className="space-y-4 md:text-left">
                <p>
                    Copyright &copy; {new Date().getFullYear()} H. Kamran. All
                    rights reserved.
                </p>
                <div className="flex flex-row justify-center space-x-5 md:justify-start">
                    <SocialLinks classNames="h-4 w-4 fill-gray-500 transition-colors duration-200 ease-in-out hover:fill-gray-300" />
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
                        href="/uses"
                        className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    >
                        My Setup
                    </NavLink>

                    <NavLink
                        href="/sponsor"
                        className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    >
                        Sponsor
                    </NavLink>

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
