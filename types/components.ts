export type HeaderProps = {
    name: string;
    description?: string;
};

export type DynamicHeaderProps = HeaderProps & {
    id: string;
    /**
     * A description to be shown on the page
     */
    pageDescription?: string;
    type?: "program" | "showcase" | "tag";
};
