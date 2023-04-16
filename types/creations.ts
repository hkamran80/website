export type CreationStatus = "Completed" | "In Progress" | "Cancelled";

export type Creation = {
    name: string;
    description: string;
    repository: string;
    site: string;
    status: CreationStatus;
    featured: boolean;
};
