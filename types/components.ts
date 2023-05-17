export type HeaderProps = {
    name: string;
    description?: string;
};

export type DynamicHeaderProps = HeaderProps & {
    id: string;
    type?: "program" | "showcase" | "tag";
};
