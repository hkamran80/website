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
    return (
        <>
            <WebPageJsonLd
                id={`${getBaseUrl()}/program/${type}${id}`}
                description={description}
            />

            <NextSeo
                title={name}
                description={description}
                canonical={`${getBaseUrl()}/${type}/${id}`}
                openGraph={{
                    title: name,
                    description,
                    url: `${getBaseUrl()}/${type}/${id}`,
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
