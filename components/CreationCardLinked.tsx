import CreationCard from './CreationCard';
import NavLink from './NavLink';
import type { Creation } from "@/types/creations";

const CreationCardLinked = ({ creation }: { creation: Creation }) => {
    if (creation) {
        if (creation.site) {
            return (
                <NavLink href={creation.site}>
                    <CreationCard creation={creation} />
                </NavLink>
            );
        } else {
            return <CreationCard creation={creation} />;
        }
    }

    return null;
};

export default CreationCardLinked;
