import type { HeaderProps } from "@/types/components";

const PageHeader = ({ name, description }: HeaderProps) => {
    const header = (
        <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
            {name}
        </h1>
    );

    return !description ? (
        header
    ) : (
        <div className="space-y-2">
            {header}

            {description && (
                <p className="text-center font-light leading-snug text-gray-300 sm:text-left">
                    {description}
                </p>
            )}
        </div>
    );
};

export default PageHeader;
