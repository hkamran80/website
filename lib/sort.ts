export const alphabeticalSort = (stringA: string, stringB: string) => {
    const lowerStringA = stringA.toLowerCase(),
        lowerStringB = stringB.toLowerCase();

    return lowerStringA < lowerStringB ? -1 : lowerStringA > lowerStringB ? 1 : 0;
};
