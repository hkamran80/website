export const getBaseUrl = (): string =>
    typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
