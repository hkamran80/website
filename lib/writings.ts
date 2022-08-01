import { WRITINGS_URL } from "../data/constants";
import type { WritingState, WritingTags } from "../types/state";
import type { Article, Writing } from "../types/writings";

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

export const getTags = (writings: Writing[]): WritingTags => {
    return Object.fromEntries(
        Array.from(
            new Set(writings.flatMap((writing: Writing) => writing.tags)),
        ).map((tag) => [
            tag,
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

export const loadWritings = async (): Promise<WritingState> => {
    const writings = await (await fetch(WRITINGS_URL)).json();

    return {
        articles: (writings.articles as Article[]).sort(sortByPublishDate),
        notes: (writings.notes as Writing[]).sort(sortByPublishDate),
        articleTags: getTags(writings.articles),
        noteTags: getTags(writings.notes),
    };
};
