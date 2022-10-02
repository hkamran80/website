import CreationCard from './CreationCard';
import TextLink from './TextLink';
import type { Creation } from "../types/creations";

const CreationCardLinked = ({ creation }: { creation: Creation }) => {
    if (creation) {
        if (creation.site) {
            return (
                <TextLink href={creation.site}>
                    <CreationCard creation={creation} />
                </TextLink>
            );
        } else {
            return <CreationCard creation={creation} />;
        }
    } else {
        return <></>;
    }
};

export default CreationCardLinked;
