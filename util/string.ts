export const cleanString = (stringToClean: string): string =>
    stringToClean
        .replace(/[^A-Za-z0-9\s]/gm, "")
        .replace(/ /gm, "-")
        .toLowerCase();
