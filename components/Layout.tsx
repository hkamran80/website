import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import { classNames } from "@hkamran/utility-web";

export default function Layout({
    navigationBar,
    center,
    containerClasses,
    children,
    childrenClasses,
    footer,
    footerClasses,
}: {
    navigationBar?: boolean;
    center?: boolean;
    containerClasses?: string;
    children: React.ReactNode;
    childrenClasses?: string;
    footer?: React.ReactNode;
    footerClasses?: string;
}) {
    return (
        <div
            className={classNames(
                containerClasses
                    ? containerClasses
                    : "h-screen bg-black text-white",
            )}
        >
            <div className="h-screen max-w-5xl mx-auto flex flex-col">
                {navigationBar || navigationBar === undefined ? (
                    <NavigationBar />
                ) : (
                    ""
                )}

                <div className="grow flex px-12 md:px-0">
                    <div
                        className={classNames(
                            "w-full",
                            center ? "m-auto" : "",
                            childrenClasses ? childrenClasses : "mb-10",
                        )}
                    >
                        {children}
                    </div>
                </div>

                <footer
                    className={classNames(
                        "flex-none mx-auto",
                        !footerClasses || footerClasses.indexOf("pb-") === -1
                            ? "pb-10"
                            : "",
                        !footer
                            ? "text-xs text-center text-gray-500 space-y-4"
                            : "",
                        footerClasses ? footerClasses : "",
                    )}
                >
                    {footer || footer === false ? footer : <Footer />}
                </footer>
            </div>
        </div>
    );
}
