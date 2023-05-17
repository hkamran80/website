import Link from "next/link";
import { classNames } from "@hkamran/utility-web";
import { useRouter } from "next/router";
import { type HTMLAttributeAnchorTarget } from "react";

type Props = {
    href: string;
    children: React.ReactNode;
    className?: string;
    conditionalClassNames?: string;
    target?: HTMLAttributeAnchorTarget;
    rel?: string;
} & Partial<Pick<HTMLAnchorElement, "title" | "ariaLabel">>;

const NavLink = ({
    href,
    children,
    className,
    conditionalClassNames,
    target,
    rel,
    ...rest
}: Props) => {
    const { asPath } = useRouter();

    if (href === asPath) {
        return <span className={className}>{children}</span>;
    } else if (href.startsWith("http")) {
        return (
            <a
                href={`${
                    href.includes("?") ? `${href}&` : `${href}?`
                }ref=hkamran.com`}
                className={classNames(
                    className ?? "",
                    conditionalClassNames ?? "",
                )}
                target={target ?? "_blank"}
                rel={rel ?? "noopener noreferrer"}
                {...rest}
            >
                {children}
            </a>
        );
    } else {
        return (
            <Link
                href={href}
                className={classNames(
                    className ?? "",
                    conditionalClassNames ?? "",
                )}
                target={target}
                rel={rel}
                {...rest}
            >
                {children}
            </Link>
        );
    }
};

export default NavLink;
