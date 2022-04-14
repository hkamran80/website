import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { classNames } from "../util/classNames";

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

            <div className="select-none relative h-screen">
                <div
                    id="container"
                    className="max-w-2xl md:max-w-5xl mx-auto w-full text-center leading-normal absolute left-1/2 top-1/2 px-8"
                >
                    <h1 className="text-outline-pink text-9xl md:text-[250px] font-black text-black uppercase">
                        404
                    </h1>
                    <h2 className="text-outline-pink text-5xl font-black text-black -mt-2 mb-8">
                        Page not found
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { href: "/", name: "Homepage" },
                            { href: "/showcase", name: "Showcase" },
                            { href: "/articles", name: "Articles" },
                            { href: "/notes", name: "Notes" },
                            { href: "/programs", name: "Programs" },
                        ].map(({ href, name }, index) => (
                            <Link key={index} href={href} passHref>
                                <a
                                    className={classNames(
                                        "transition duration-300",
                                        "inline-block py-2.5 px-10",
                                        "text-sm text-pink-400 hover:text-pink-700 no-underline font-bold",
                                        "border-2 border-pink-400 hover:border-pink-700",
                                        index === 0 ? "md:col-span-2" : "",
                                    )}
                                >
                                    {name}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <style>{styling}</style>
        </>
    );
};

export default Error404;
