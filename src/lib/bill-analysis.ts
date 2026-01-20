export const chamberAbbreviation = { senate: "S", house: "HR" } as const;

export const getNumberWithOrdinal = (n: number): string => {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;

    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
