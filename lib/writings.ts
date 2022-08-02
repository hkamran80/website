import type { Writing, WritingTags } from "../types/writings";
import { slugify } from "../util/string";

export const sortByPublishDate = (
    { published: publishedA }: { published: string },
    { published: publishedB }: { published: string },
): number => {
    if (publishedA < publishedB) {
        return 1;
    } else if (publishedA > publishedB) {
        return -1;
    }
    return 0;
};

export const getTags = (
    writings: Writing[],
    slugifyTag: boolean = false,
): WritingTags => {
    return Object.fromEntries(
        Array.from(
            new Set(writings.flatMap((writing: Writing) => writing.tags)),
        ).map((tag) => [
            slugifyTag ? slugify(tag) : tag,
            writings
                .filter(({ tags }) => tags.indexOf(tag) !== -1)
                .map(({ id }) => id),
        ]),
    );
};

export const arrayUnique = (array: any[]): any[] => {
    var a = array.concat();

    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) a.splice(j--, 1);
        }
    }

    return a;
};
