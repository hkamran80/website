import Link from "next/link";
import { classNames } from "@hkamran/utility-web";
import { useRouter } from "next/router";

const NavLink = ({
    href,
    children,
    className,
    conditionalClassNames,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
    conditionalClassNames?: string;
}) => {
    const { asPath } = useRouter();

    if (href === asPath) {
        return <span className={className}>{children}</span>;
    } else {
        return (
            <Link
                href={href}
                className={classNames(
                    className ?? "",
                    conditionalClassNames ?? "",
                )}
            >
                {children}
            </Link>
        );
    }
};

export default NavLink;
