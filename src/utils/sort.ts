export const creationAlphabeticalSort = (a: any, b: any): number => {
    let creationA = a.name.toLowerCase(),
        creationB = b.name.toLowerCase();

    return creationA < creationB ? -1 : creationA > creationB ? 1 : 0;
};

export const datePostsSortDescending = (a: any, b: any): number => {
    let postA = new Date(`${a.metadata.published}T12:00:00-07:00`),
        postB = new Date(`${b.metadata.published}T12:00:00-07:00`);

    return postA < postB ? -1 : postA > postB ? 1 : 0;
};

export const datePostsSortAscending = (a: any, b: any): number => {
    let postA = new Date(`${b.metadata.published}T12:00:00-07:00`),
        postB = new Date(`${a.metadata.published}T12:00:00-07:00`);

    return postA < postB ? -1 : postA > postB ? 1 : 0;
};
