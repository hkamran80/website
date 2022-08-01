import NextLink from "next/link";

const TextLink = ({
    href,
    children,
    className,
    ...rest
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) => {
    const isInternalLink = href?.startsWith("/");
    if (isInternalLink) {
        return (
            <NextLink href={href} passHref>
                <a className={className} {...rest}>
                    {children}
                </a>
            </NextLink>
        );
    }
    return (
        <a
            href={href}
            rel="noopener noreferrer"
            className={className}
            target="_blank"
            {...rest}
        >
            {children}
        </a>
    );
};

export default TextLink;
