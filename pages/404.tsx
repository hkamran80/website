import Head from "next/head";
import Link from "next/link";
import { classNames } from "@hkamran/utility-web";
import type { NextPage } from "next";
import NavLink from "../components/NavLink";

const styling = `
* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

body {
    padding: 0;
    margin: 0;
}

#container {
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.text-outline-pink {
    text-shadow: -1px 0 #F472B6, 0 1px #F472B6, 1px 0 #F472B6, 0 -1px #F472B6;
}
`;

const Error404: NextPage = () => {
    return (
        <>
            <Head>
                <title>Page Not Found | H. Kamran</title>
            </Head>

            <div className="relative h-screen select-none">
                <div
                    id="container"
                    className="absolute left-1/2 top-1/2 mx-auto w-full max-w-2xl px-8 text-center leading-normal md:max-w-5xl"
                >
                    <h1 className="text-outline-pink text-9xl font-black uppercase text-black md:text-[250px]">
                        404
                    </h1>
                    <h2 className="text-outline-pink -mt-2 mb-8 text-5xl font-black text-black">
                        Page not found
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[
                            { href: "/", name: "Homepage" },
                            { href: "/showcase", name: "Showcase" },
                            { href: "/articles", name: "Articles" },
                            { href: "/notes", name: "Notes" },
                            { href: "/programs", name: "Programs" },
                        ].map(({ href, name }, index) => (
                            <NavLink
                                key={index}
                                href={href}
                                className={classNames(
                                    "transition duration-300",
                                    "inline-block py-2.5 px-10",
                                    "text-sm font-bold text-pink-400 no-underline hover:text-pink-700",
                                    "border-2 border-pink-400 hover:border-pink-700",
                                    index === 0 ? "md:col-span-2" : "",
                                )}
                            >
                                {name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            <style>{styling}</style>
        </>
    );
};

export default Error404;
