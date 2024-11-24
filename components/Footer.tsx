import { classNames } from "@hkamran/utility-web";

import { links } from "@/data/navigation";

import NavLink from "./navigation/NavLink";
import SocialLinks from "./navigation/SocialLinks";

const Footer = () => (
    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-6">
        <div className="space-y-4 md:text-left">
            <p>
                Copyright &copy; {new Date().getFullYear()} H. Kamran. All
                rights reserved.
            </p>
            <div className="flex flex-row justify-center space-x-5 md:justify-start">
                <SocialLinks classNames="h-4 w-4 fill-gray-500 transition-colors duration-200 ease-in-out hover:fill-gray-300" location="footer" />
            </div>
        </div>
        <div className="col-span-2 space-y-4 md:text-right">
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
                    href="/sponsor"
                    className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    data-umami-event-location="footer"
                >
                    Sponsor
                </NavLink>

                <NavLink
                    href="/legal/license"
                    className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    data-umami-event-location="footer"
                >
                    License
                </NavLink>

                <NavLink
                    href="/legal/privacy"
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
