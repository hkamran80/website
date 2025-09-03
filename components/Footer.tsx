import { links } from "@/data/navigation";

import NavLink from "./navigation/NavLink";
import SocialLinks from "./navigation/SocialLinks";

const Footer = () => (
    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-6">
        <div className="space-y-4 md:text-left">
            <div>
                <p>
                    Copyright &copy; {new Date().getFullYear()} H. Kamran. All
                    rights reserved.
                </p>
                <p>
                    This site is designed and made exclusively by humans only.
                    No &quot;AI&quot; was used in the making of any of the
                    content on this site.
                </p>
            </div>
            <div className="flex flex-row justify-center space-x-5 md:justify-start">
                <SocialLinks
                    classNames="h-4 w-4 fill-gray-500 transition-colors duration-200 ease-in-out hover:fill-gray-300"
                    location="footer"
                />
            </div>
        </div>
        <div className="space-y-4 md:text-right">
            <p className="space-x-3">
                {links.map(({ href, name }, index) => (
                    <NavLink
                        key={index}
                        href={href}
                        className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                        target={!href.startsWith("/") ? "_blank" : ""}
                        data-umami-event-location="footer"
                    >
                        {name}
                    </NavLink>
                ))}
            </p>
            <p className="space-x-3">
                <NavLink
                    href="/uses"
                    className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    data-umami-event-location="footer"
                >
                    My Setup
                </NavLink>

                <NavLink
                    href="/support"
                    className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    data-umami-event-location="footer"
                >
                    Support
                </NavLink>

                <NavLink
                    href="/ai-policy"
                    className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    data-umami-event-location="footer"
                >
                    &quot;AI&quot; Policy
                </NavLink>

                <NavLink
                    href="/license"
                    className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    data-umami-event-location="footer"
                >
                    License
                </NavLink>

                <NavLink
                    href="/privacy"
                    className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    data-umami-event-location="footer"
                >
                    Privacy Policy
                </NavLink>
            </p>
        </div>
    </div>
);

export default Footer;
