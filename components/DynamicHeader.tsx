import { NextSeo, WebPageJsonLd } from "next-seo";

import { getBaseUrl } from "@/lib/urls";

import Breadcrumbs from "./navigation/Breadcrumbs";
import PageHeader from "./pages/PageHeader";
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
    pageDescription,
    type,
}: DynamicHeaderProps) => {
    const url = `${getBaseUrl()}/${type ?? ""}${id}`;

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
                basePath={type && typeMap.basePath[type]}
                baseLabel={type ? typeMap.baseLabel[type] : name}
                currentLabel={type && name}
            />

            <PageHeader
                name={name}
                description={pageDescription ?? description}
            />
        </>
    );
};

export default DynamicHeader;
