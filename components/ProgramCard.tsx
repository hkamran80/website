import type { Page } from "../types/pages";

const ProgramCard = ({ program }: { program: Page }) => {
    return (
        <div
            className="h-full bg-hk-grey hover:bg-hk-grey-hover transition-colors duration-300 rounded-lg"
            aria-label={program.name}
        >
            <div className="w-full p-6 space-y-0.5">
                <span className="text-white text-md font-medium">
                    {program.name}
                </span>
                <p className="text-gray-400 text-sm">
                    {program.description}
                </p>
            </div>
        </div>
    );
};

export default ProgramCard;
