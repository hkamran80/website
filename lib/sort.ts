/**
 * Sort an array alphabetically
 * @param {string} stringB
 * @param {string} stringA
 * @returns {number} A number to sort with
 */
export const alphabeticalSort = (stringA: string, stringB: string): number => {
    const lowerStringA = stringA.toLowerCase(),
        lowerStringB = stringB.toLowerCase();

    if (lowerStringA < lowerStringB) {
        return -1;
    } else if (lowerStringA > lowerStringB) {
        return 1;
    }

    return 0;
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
