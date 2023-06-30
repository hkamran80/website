import Breadcrumbs from "./navigation/Breadcrumbs";
import PageHeader from "./pages/PageHeader";
import { getBaseUrl } from "@/lib/urls";
import { NextSeo, WebPageJsonLd } from "next-seo";
import type { DynamicHeaderProps } from "@/types/components";

const typeMap = {
    basePath: {
        program: "/programs",
        showcase: "/showcase",
        tag: undefined,
    },
    baseLabel: { program: "Programs", showcase: "Showcase", tag: "Tags" },
};

const DynamicHeader = ({
    id,
    name,
    description,
    type = "program",
}: DynamicHeaderProps) => {
    const url = `${getBaseUrl()}/${type}${id}`;

    return (
        <>
            <WebPageJsonLd id={url} description={description} />

            <NextSeo
                title={name}
                description={description}
                canonical={url}
                openGraph={{
                    title: name,
                    description,
                    url: url,
                    type: "website",
                }}
                twitter={{
                    cardType: "summary",
                }}
            />

            <Breadcrumbs
                basePath={typeMap.basePath[type]}
                baseLabel={typeMap.baseLabel[type]}
                currentLabel={name}
            />

            <PageHeader name={name} description={description} />
        </>
    );
};

export default DynamicHeader;
