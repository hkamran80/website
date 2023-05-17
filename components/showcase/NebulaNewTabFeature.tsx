import type { Icon } from "lucide-react";

type Props = {
    icon: React.ReactNode;
    name: string;
    children: React.ReactNode;
};

const NebulaNewTabFeature = ({ icon, name, children }: Props) => {
    return (
        <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900 text-white">
                {icon}
            </div>
            <div className="mt-5">
                <dt className="text-lg font-medium leading-6 text-gray-100">
                    {name}
                </dt>
                <dd className="mt-2 text-base text-gray-500">{children}</dd>
            </div>
        </div>
    );
};

export default NebulaNewTabFeature;
