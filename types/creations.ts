export type CreationContributorLink = {
    title: string;
    url: string;
};

export type CreationContributor = {
    name: string;
    role: string;
    link: CreationContributorLink;
};

export type CreationStatus = "Completed" | "In Progress" | "Cancelled";

export type Creation = {
    name: string;
    description: string;
    repository: string;
    site: string;
    status: CreationStatus;
    featured: boolean;
    contributors: CreationContributor[];
};
