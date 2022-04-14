export type ReleaseDetails = {
    releaseDate: string;
    changelog: string[];
};

export type RawRelease = {
    0: string;
    1: ReleaseDetails;
};

export type Release = {
    version: string;
    date: string;
    changelog: string[];
};
