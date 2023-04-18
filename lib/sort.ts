export const alphabeticalSort = (stringA: string, stringB: string) => {
    const lowerStringA = stringA.toLowerCase(),
        lowerStringB = stringB.toLowerCase();

    return lowerStringA < lowerStringB
        ? -1
        : lowerStringA > lowerStringB
        ? 1
        : 0;
};

/**
 * Sort an array by date
 * @param {Date} dateA
 * @param {Date} dateB
 * @returns {number} A number to sort with
 */
export const sortByDate = (dateA: Date, dateB: Date): number => {
    if (dateA < dateB) {
        return 1;
    } else if (dateA > dateB) {
        return -1;
    }

    return 0;
};
