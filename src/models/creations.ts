export interface CreationContributorLink {
    title: string;
    url: string;
}

export interface CreationContributor {
    name: string;
    role: string;
    link: CreationContributorLink;
}

export type CreationStatus = "Completed" | "In Progress" | "Cancelled";

export interface Creation {
    name: string;
    description: string;
    repository: string;
    site: string;
    status: CreationStatus;
    featured: boolean;
    contributors: CreationContributor[];
}

export interface CreationPage {
    id: string;
    name: string;
    description: string;
    centerContent: boolean;
    componentFilename: string;
}
