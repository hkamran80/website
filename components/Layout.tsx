import Link from "next/link";
import { useRouter } from "next/router";
import { links } from "../data/navigation";
import { classNames } from "../util/classNames";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <div className="px-12 xl:px-0">
            <div className="max-w-5xl mx-auto pt-10 md:pt-4 select-none">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 pt-5">
                    <span className="flex-1 w-full -ml-2 sm:ml-0 text-xl md:text-base font-bold hover:text-pink-400 hover:cursor-pointer transition-colors duration-300">
                        <Link href="/" passHref>
                            H. Kamran
                        </Link>
                    </span>

                    <div className="space-x-4">
                        {links.map(({ href, name, aliases }, index) => (
                            <Link key={index} href={href} passHref>
                                <a>
                                    <span
                                        className={classNames(
                                            "hover:text-pink-400 hover:cursor-pointer transition-colors duration-300",
                                            router.asPath.startsWith(href) ||
                                                aliases
                                                    .map(
                                                        (alias) =>
                                                            router.asPath.indexOf(
                                                                alias,
                                                            ) !== -1,
                                                    )
                                                    .filter((alias) => alias)
                                                    .length > 0
                                                ? "text-pink-400"
                                                : "",
                                        )}
                                    >
                                        {name}
                                    </span>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center mt-8 md:mt-12">
                <div className="block text-black dark:text-white pb-8 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
