import { slugify } from "@hkamran/utility-strings";
import NavLink from "../navigation/NavLink";
import CreationCard from "./CreationCard";
import type { Creation } from "@/types/creations";

const CreationCardLinked = ({ creation }: { creation: Creation }) => {
    if (creation) {
        if (creation.site) {
            return (
                <NavLink
                    href={creation.site}
                    data-umami-event-group={`creation:${slugify(creation.name)}`}
                    data-umami-event-location="creation-site"
                >
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
