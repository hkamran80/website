import TextLink from "./TextLink";
import { classNames } from "@hkamran/utility-web";
import { links } from "../data/navigation";
import { useRouter } from "next/router";

export default function NavigationBar() {
    const router = useRouter();

    return (
        <nav className="flex-none pt-14 py-6 md:pt-12 px-12 md:px-0 flex flex-col md:flex-row items-start md:items-center text-sm">
            <TextLink href="/" className="flex-1 text-base md:text-sm">
                H. Kamran
            </TextLink>

            <div className="space-x-4 md:space-x-6">
                {links.map(({ href, name, aliases }, index) => (
                    <TextLink key={index} href={href}>
                        <span
                            className={classNames(
                                "uppercase text-xs tracking-wide hover:text-pink-400 hover:cursor-pointer transition-colors duration-300",
                                router.asPath.startsWith(href) ||
                                    aliases
                                        .map(
                                            (alias) =>
                                                router.asPath.indexOf(alias) !==
                                                -1,
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
