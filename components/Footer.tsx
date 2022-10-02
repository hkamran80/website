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
                        className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    >
                        {name}
                    </TextLink>
                ))}
            </nav>

            <div className="flex flex-row justify-center space-x-5">
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
                            className="h-4 w-4 fill-gray-400 transition-colors duration-200 ease-in-out hover:fill-gray-300"
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
                        className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    >
                        License
                    </TextLink>

                    <TextLink
                        href="/legal/privacy"
                        className="transition-colors duration-200 ease-in-out hover:text-gray-300"
                    >
                        Privacy Policy
                    </TextLink>
                </p>
            </div>
        </>
    );
};

export default Footer;
