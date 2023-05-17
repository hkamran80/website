import type { HeaderProps } from "@/types/components";

const PageHeader = ({ name, description }: HeaderProps) => {
    return (
        <div className="space-y-2">
            <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                {name}
            </h1>
            {description && (
                <h2 className="text-center text-xl font-light leading-snug text-gray-300 sm:text-left sm:text-2xl">
                    {description}
                </h2>
            )}
        </div>
    );
};

export default PageHeader;
