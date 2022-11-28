import type { Creation } from "@/types/creations";

const CreationCard = ({ creation }: { creation: Creation }) => {
    if (creation) {
        return (
            <div
                className={
                    "flex h-full flex-col space-y-1 rounded-lg bg-hk-grey p-6 transition-colors duration-300 " +
                    (creation.site ? "hover:bg-hk-grey-hover" : "")
                }
            >
                <span>{creation.name}</span>
                <span className="text-sm font-light text-gray-400">
                    {creation.status}
                </span>
                <span className="text-sm font-light">
                    {creation.description}
                </span>

                <div className="flex flex-row items-center justify-center pt-3 text-sm font-light">
                    {creation.repository && (
                        <a
                            href={creation.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`${creation.name} source code`}
                            aria-label={`${creation.name} source code`}
                            className="flex-1 text-center"
                        >
                            Source Code
                        </a>
                    )}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default CreationCard;
