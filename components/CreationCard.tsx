import type { Creation } from "@/types/creations";
import { classNames } from "@hkamran/utility-web";
import { Globe } from "lucide-react";
import { siGithub } from "simple-icons/icons";

const CreationCard = ({ creation }: { creation: Creation }) => {
    return (
        <div
            className={classNames(
                "group flex h-full flex-col space-y-4 rounded-lg p-6 text-sm font-light transition-colors duration-300 hover:bg-hk-grey",
                creation.site ? "hover:bg-hk-grey-hover" : "",
            )}
        >
            <div className="space-y-1">
                <p className="text-base font-normal">{creation.name}</p>
                <p>{creation.description}</p>
            </div>

            <div className="flex flex-row space-x-4">
                {creation.site && (
                    <Globe className="text-gray-500 transition duration-300 hover:scale-125 hover:stroke-pink-700" />
                )}

                {creation.repository && (
                    <a
                        href={creation.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${creation.name} source code`}
                        aria-label={`${creation.name} source code`}
                        className="flex-1 text-center"
                    >
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 fill-gray-500 transition duration-300 hover:scale-125 hover:fill-pink-700"
                        >
                            <title>{siGithub.title}</title>
                            <path d={siGithub.path} />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
};

export default CreationCard;
