import { slugify } from "@hkamran/utility-strings";
import type { Writing, WritingTags } from "@/types/writings";

/**
 * Generate a list of tags from an array of `Writing` objects
 * @param {Writing[]} writings An array of `Writing` objects
 * @param {boolean} [slugifyTag=false] Whether to slugify the tag names or not (defaults to `false`)
 * @returns {WritingTags} A instance of `WritingTags`
 */
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

/**
 * Remove duplicate entries from an array
 * @param {any[]} array Remove duplicate entries from an array
 * @returns {any[]} The array without duplicate entries
 */
export const arrayUnique = (array: any[]): any[] => {
    var a = array.concat();

    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) a.splice(j--, 1);
        }
    }

    return a;
};
