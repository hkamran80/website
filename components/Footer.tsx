import TextLink from "./TextLink";
import { links, socialIcons } from "../data/navigation";

const Footer = () => {
    return (
        <>
            <nav aria-label="Footer" role="navigation" className="space-x-3">
                {links.map(({ href, name }, index) => (
                    <TextLink
                        key={index}
                        href={href}
                        className="hover:text-gray-300 transition-colors duration-200 ease-in-out"
                    >
                        {name}
                    </TextLink>
                ))}
            </nav>

            <div className="flex flex-row space-x-5 justify-center">
                {socialIcons.map(({ url, icon }, index) => (
                    <a
                        key={index}
                        href={url}
                        aria-label={icon.title}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-gray-400 hover:fill-gray-300 transition-colors duration-200 ease-in-out w-4 h-4"
                        >
                            <title>{icon.title}</title>
                            <path d={icon.path} />
                        </svg>
                    </a>
                ))}
            </div>

            <div className="space-y-2">
                <p>
                    Copyright &copy; {new Date().getFullYear()} H. Kamran. All
                    rights reserved.
                </p>

                <p className="space-x-3">
                    <TextLink
                        href="/legal/license"
                        className="hover:text-gray-300 transition-colors duration-200 ease-in-out"
                    >
                        License
                    </TextLink>

                    <TextLink
                        href="/legal/privacy"
                        className="hover:text-gray-300 transition-colors duration-200 ease-in-out"
                    >
                        Privacy Policy
                    </TextLink>
                </p>
            </div>
        </>
    );
};

export default Footer;
