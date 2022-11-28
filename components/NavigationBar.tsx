import favicon from "../public/favicon.png";
import Image from "next/image";
import NavLink from "./NavLink";
import { classNames } from "@hkamran/utility-web";
import { links } from "../data/navigation";
import { useRouter } from "next/router";

const NavigationBar = () => {
    const router = useRouter();

    return (
        <nav className="flex flex-none flex-col items-start py-6 px-12 pt-14 text-sm md:flex-row md:items-center md:px-0 md:pt-12">
            <NavLink href="/" className="flex-1 text-base md:text-sm">
                <Image
                    src="/profile.png"
                    width={55}
                    height={55}
                    alt="H. Kamran profile picture"
                    className="rounded-full border-[1px] border-pink-700"
                />
            </NavLink>

            <div className="space-x-4 md:space-x-8">
                {links.map(({ href, name, aliases }, index) => (
                    <NavLink
                        key={index}
                        href={href}
                        className={classNames(
                            "text-xs uppercase tracking-wide transition-colors duration-300 hover:cursor-pointer ",
                            router.asPath.startsWith(href) ||
                                aliases
                                    .map(
                                        (alias) =>
                                            router.asPath.indexOf(alias) !== -1,
                                    )
                                    .filter((alias) => alias).length > 0
                                ? "text-pink-700 underline underline-offset-4"
                                : "text-gray-500 hover:text-pink-700",
                        )}
                    >
                        {name}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default NavigationBar;
