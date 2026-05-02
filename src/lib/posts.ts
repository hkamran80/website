const convertToDate = (dateString: string): Date =>
    new Date(
        dateString + (!dateString.includes("T") ? "T07:00:00.000-08:00" : ""),
    );

export const getPosts = async (apiKey: string) => {
    const response = await fetch(
        "https://raw.githubusercontent.com/hkamran80/articles/main/index.json",
    );
    // TODO: Add actual type
    const data = (await response.json()) as any[];

    const posts = data.map((post) => {
        let converted: { [key: string]: string | Date | object } = {};

        if (post.status !== "draft") {
            converted.published = convertToDate(post.published);

            if (post.type === "article")
                converted.img = {
                    src: `https://assets.hkamran.com/graphics/article/${post.id}`,
                    alt: post.imgAlt,
                };
        }

        if (post.status === "updated")
            converted.updated = convertToDate(post.updated);

        return {
            ...post,
            ...converted,
        };
    });

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

        // TODO: Add actual type
        const data = (await response.json()) as any[];

        const postId = branch.name.split("/")[1];
        const post = data.find(({ id }) => id === postId);
        if (!post) {
            console.error(`Failed to get post for ${branch.name}.`, data);
            continue;
        }

        if (!Object.keys(post).includes("branch")) post.branch = branch.name;

        if (post.status === "draft") posts.push(post);
    }

    return posts;
};
