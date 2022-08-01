import CreationCard from "./CreationCard";
import Link from "next/link";
import type { Creation } from "../types/creations";

const CreationCardLinked = ({ creation }: { creation: Creation }) => {
    if (creation) {
        if (creation.site && !creation.site.startsWith("/")) {
            return (
                <a
                    href={creation.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open ${creation.name}`}
                >
                    <CreationCard creation={creation} />
                </a>
            );
        } else if (creation.site && creation.site.startsWith("/")) {
            return (
                <Link href={creation.site.replace("/creations", "/showcase")}>
                    <a title={`Open ${creation.name}`}>
                        <CreationCard creation={creation} />
                    </a>
                </Link>
            );
        } else {
            return <CreationCard creation={creation} />;
        }
    } else {
        return <></>;
    }
};

export default CreationCardLinked;
