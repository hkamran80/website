export type HeaderProps = {
    name: string;
    description?: string;
};

export type ProgramHeaderProps = Required<HeaderProps> & {
    id: string;
};
