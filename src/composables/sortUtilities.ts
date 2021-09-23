export function alphabetical(key1: string, key2: string) {
    const nameA = key1.toLowerCase();
    const nameB = key2.toLowerCase();

    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
}


