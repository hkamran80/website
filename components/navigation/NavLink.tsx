import { classNames } from "@hkamran/utility-web";
import Link from "next/link";
import { useRouter } from "next/router";
import { type HTMLAttributeAnchorTarget } from "react";
import { EVENT_NAMES } from "@/data/constants";

type Props = {
    href: string;
    children: React.ReactNode;
    className?: string;
    conditionalClassNames?: string;
    target?: HTMLAttributeAnchorTarget;
    rel?: string;
    noReferrer?: boolean;
} & Partial<Pick<HTMLAnchorElement, "title" | "ariaLabel">>;

const NavLink = ({
    href,
    children,
    className,
    conditionalClassNames,
    target,
    rel,
    noReferrer,
    ...rest
}: Props) => {
    const { asPath } = useRouter();

    if (href === asPath) {
        return <span className={className}>{children}</span>;
    } else if (href.startsWith("http")) {
        return (
            <a
                href={
                    noReferrer === true
                        ? href
                        : `${
                              href.includes("?") ? `${href}&` : `${href}?`
                          }ref=hkamran.com`
                }
                className={
                    classNames(className ?? "", conditionalClassNames ?? "") ||
                    undefined
                }
                target={target ?? "_blank"}
                rel={rel ?? "noopener noreferrer"}
                {...(href.includes("unsplash.com")
                    ? {
                          "data-umami-event": EVENT_NAMES.SOCIAL,
                          "data-umami-event-platform": "Unsplash",
                      }
                    : {
                          "data-umami-event": EVENT_NAMES.OUTBOUND,
                          "data-umami-event-url": href,
                      })}
                {...rest}
            >
                {children}
            </a>
        );
    } else {
        return (
            <Link
                href={href}
                className={
                    classNames(className ?? "", conditionalClassNames ?? "") ||
                    undefined
                }
                target={target}
                rel={rel}
                data-umami-event={EVENT_NAMES.LOCAL}
                data-umami-event-url={href}
                {...rest}
            >
                {children}
            </Link>
        );
    }
};

export default NavLink;
