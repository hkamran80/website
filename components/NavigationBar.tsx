import favicon from "../public/favicon.png";
import Image from "next/image";
import TextLink from "./TextLink";
import { classNames } from "@hkamran/utility-web";
import { links } from "../data/navigation";
import { useRouter } from "next/router";

export default function NavigationBar() {
    const router = useRouter();

    return (
        <nav className="flex flex-none flex-col items-start py-6 px-12 pt-14 text-sm md:flex-row md:items-center md:space-x-8 md:px-0 md:pt-12">
            <div className="flex-1 space-x-4 text-right md:space-x-6">
                {links
                    .slice(0, links.length / 2)
                    .map(({ href, name, aliases }, index) => (
                        <TextLink key={index} href={href}>
                            <span
                                className={classNames(
                                    "text-xs uppercase tracking-wide transition-colors duration-300 hover:cursor-pointer hover:text-pink-400",
                                    router.asPath.startsWith(href) ||
                                        aliases
                                            .map(
                                                (alias) =>
                                                    router.asPath.indexOf(
                                                        alias,
                                                    ) !== -1,
                                            )
                                            .filter((alias) => alias).length > 0
                                        ? "text-pink-400 underline underline-offset-4"
                                        : "",
                                )}
                            >
                                {name}
                            </span>
                        </TextLink>
                    ))}
            </div>

            <TextLink href="/" className="items-center text-base md:text-sm">
                <Image
                    src={favicon}
                    width={45}
                    height={45}
                    alt="HK website favicon"
                />
            </TextLink>

            <div className="flex-1 space-x-4 md:space-x-6">
                {links
                    .slice(links.length / 2, links.length)
                    .map(({ href, name, aliases }, index) => (
                        <TextLink key={index} href={href}>
                            <span
                                className={classNames(
                                    "text-xs uppercase tracking-wide transition-colors duration-300 hover:cursor-pointer hover:text-pink-400",
                                    router.asPath.startsWith(href) ||
                                        aliases
                                            .map(
                                                (alias) =>
                                                    router.asPath.indexOf(
                                                        alias,
                                                    ) !== -1,
                                            )
                                            .filter((alias) => alias).length > 0
                                        ? "text-pink-400 underline underline-offset-4"
                                        : "",
                                )}
                            >
                                {name}
                            </span>
                        </TextLink>
                    ))}
            </div>
        </nav>
    );
}
