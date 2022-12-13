import Link from "next/link";
import { classNames } from "@hkamran/utility-web";
import { useRouter } from "next/router";
import { type HTMLAttributeAnchorTarget } from "react";

const NavLink = ({
    href,
    children,
    className,
    conditionalClassNames,
    target,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
    conditionalClassNames?: string;
    target?: HTMLAttributeAnchorTarget;
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
                target={target}
            >
                {children}
            </Link>
        );
    }
};

export default NavLink;
