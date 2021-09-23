export interface Contributors {
    [name: string]: ContributorDetails;
}

export interface ContributorDetails {
    role: string;
    link: Link;
}

export interface Link {
    title: string;
    url: string;
    iconPath: string;
}
