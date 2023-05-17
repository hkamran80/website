import Breadcrumbs from "../navigation/Breadcrumbs";
import PageHeader from "../pages/header";
import { getBaseUrl } from "@/lib/urls";
import { NextSeo, WebPageJsonLd } from "next-seo";
import type { ProgramHeaderProps } from "@/types/components";

const ProgramHeader = ({ id, name, description }: ProgramHeaderProps) => {
    return (
        <>
            <WebPageJsonLd
                id={`${getBaseUrl()}/program/${id}`}
                description={description}
            />

            <NextSeo
                title={name}
                description={description}
                canonical={`${getBaseUrl()}/program/${id}`}
                openGraph={{
                    title: name,
                    description,
                    url: `${getBaseUrl()}/program/${id}`,
                    type: "website",
                }}
                twitter={{
                    cardType: "summary",
                }}
            />

            <Breadcrumbs
                basePath="/programs"
                baseLabel="Programs"
                currentLabel={name}
            />

            <PageHeader name={name} description={description} />
        </>
    );
};

export default ProgramHeader;
