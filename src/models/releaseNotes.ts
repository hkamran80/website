export interface ReleaseDetails {
    releaseDate: string;
    changelog: string[];
}

export interface RawRelease {
    0: string;
    1: ReleaseDetails;
}

export interface Release {
    version: string;
    date: string;
    changelog: string[];
}
