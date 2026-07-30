const convertToDate = (dateString: string): Date =>
    new Date(
        dateString + (!dateString.includes("T") ? "T07:00:00.000-08:00" : ""),
    );

type Post = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    type: "article" | "note";
    status: "draft" | "published" | "updated";
    toc?: boolean;
    imgAlt?: string;
    oldNotice?: boolean;
    published?: string;
    updated?: string;
    filename?: string;
    branch?: string;
};

const getPostContent = async (post: Post): Promise<string | null> => {
    let branchName = "main";
    if (post.status === "draft") {
        if ("branch" in post) branchName = post.branch as string;
        else branchName = post.type + "/" + post.id;
    }

    const postContentUrl = `https://raw.githubusercontent.com/hkamran80/articles/${branchName}/posts/${post.filename ?? post.id}.md`;
    const postContentResponse = await fetch(postContentUrl);

    if (postContentResponse.ok) {
        const postContent = await postContentResponse.text();
        return postContent;
    } else {
        console.error(
            `Failed to load content for ${post.id} (HTTP ${postContentResponse.status}): `,
            postContentUrl,
        );
        return null;
    }
};

type PostConverted = Omit<Post, "imgAlt"> & {
    img?: { src: string; alt: string };
    published?: Date;
    updated?: Date;
    content?: string | null;
};

type Options = { fullText?: boolean; excludeDrafts?: boolean };
export const getPosts = async (
    apiKey: string,
    options: Options = { fullText: true, excludeDrafts: false },
): Promise<PostConverted[]> => {
    const response = await fetch(
        "https://raw.githubusercontent.com/hkamran80/articles/main/index.json",
    );
    const data = (await response.json()) as Post[];
    const filteredData = options.excludeDrafts
        ? data.filter(({ status }) => status !== "draft")
        : data;

    const posts: (PostConverted | Promise<PostConverted>)[] = filteredData.map(
        async (post) => {
            let converted: { [key: string]: string | Date | object | null } =
                {};

            if (post.status !== "draft") {
                converted.published = convertToDate(post.published as string);

                if (post.type === "article")
                    converted.img = {
                        src: `https://assets.hkamran.com/graphics/article/${post.id}`,
                        alt: post.imgAlt,
                    };
            }

            if (post.status === "updated")
                converted.updated = convertToDate(post.updated as string);

            if (options.fullText)
                converted.content = await getPostContent(post);

            return {
                ...post,
                ...converted,
            } as PostConverted;
        },
    );

    if (!options.excludeDrafts) {
        const branchResponse = await fetch(
            "https://api.github.com/repos/hkamran80/articles/branches",
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${apiKey}`,
                },
            },
        );
        const branches = (await branchResponse.json()) as {
            name: string;
        }[];
        for (const branch of branches) {
            if (
                !(
                    branch.name.startsWith("article/") ||
                    branch.name.startsWith("post/")
                )
            )
                continue;

            const response = await fetch(
                `https://raw.githubusercontent.com/hkamran80/articles/${branch.name}/index.json`,
            );
            if (!response.ok) {
                console.error(`Failed to get index for ${branch.name}.`);
                continue;
            }

            const data = (await response.json()) as Post[];

            const postId = branch.name.split("/")[1];
            const post = data.find(({ id }) => id === postId);
            if (!post) {
                console.error(`Failed to get post for ${branch.name}.`, data);
                continue;
            }

            if (!Object.keys(post).includes("branch"))
                post.branch = branch.name;

            if (post.status === "draft") {
                if (options.fullText)
                    posts.push({
                        ...post,
                        content: await getPostContent(post),
                    } as PostConverted);
                else posts.push(post as PostConverted);
            }
        }
    }

    return await Promise.all(posts);
};
