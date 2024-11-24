export const WRITINGS_URL =
    "https://raw.githubusercontent.com/hkamran80/articles/main/markdown/contents.json";
export const BASE_WRITINGS_URL =
    "https://raw.githubusercontent.com/hkamran80/articles/main/markdown";

export const SHOWCASE_URL = "https://assets.hkamran.com/showcase";
export const UNSPLASH_URL =
    "https://unsplash.com/@hkamran?utm_source=hkwebsite&utm_medium=referral";

export const EVENT_NAMES = {
    /**
     * The outbound link event
     * 
     * There are three properties associated with it:
     * - `url` (required)
     * - `location`: the relative location of the link
     * - `group`: the group name
     */
    OUTBOUND: "outbound-link",

    /**
     * The local link event
     * 
     * There are three properties associated with it:
     * - `url` (required)
     * - `location`: the relative location of the link
     * - `group`: the group name
     */
    LOCAL: "local-link",

    /**
     * The social link event
     * 
     * There are two properties:
     * - `platform` (required)
     * - `location` (required): the relative location of the link
     */
    SOCIAL: "social-link",
}
