import type { Page } from "@/types/pages";

const ProgramCard = ({ program }: { program: Page }) => {
    return (
        <div
            className="h-full rounded-lg bg-hk-grey transition-colors duration-300 hover:bg-hk-grey-hover"
            aria-label={program.name}
        >
            <div className="w-full space-y-0.5 p-6">
                <span className="text-md font-medium text-white">
                    {program.name}
                </span>
                <p className="text-sm text-gray-400">{program.description}</p>
            </div>
        </div>
    );
};

export default ProgramCard;
