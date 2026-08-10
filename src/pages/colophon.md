---
layout: ../layouts/MarkdownPageLayout.astro
title: Colophon
---

This is the sixth version of my personal site, currently built with [Astro](https://astro.build) and hosted on [Netlify](https://netlify.com).
Styling is done with a mixture of CSS and [Tailwind CSS](https://tailwindcss.com).
The source code is on [GitHub](https://github.com/hkamran80/website).

I previously used Vue.js and Next.js for this site.
The current version uses as little JavaScript as possible, unlike the past few versions which depended on JavaScript to run.
All posts have Atom, RSS, and JSON feeds, which you can find on [the feeds page](/feeds).

Some of the data on this website is sourced from my Git repositorites and other data is from my [Personal Data Server](https://atproto.wiki/en/wiki/reference/core-architecture/pds) (PDS), a core component of the [AT Protocol](https://atproto.com/guides/overview).

- [Blogroll](/blogroll): sourced from [my FreshRSS instance](/self-hosted)
- [Posts](/posts): sourced from [a repository](https://github.com/hkamran80/articles)

    I compose my posts in Markdown using [Neovim](/uses#development), then push them to [GitHub](https://github.com/hkamran80/articles).
    A webhook triggers a new Netlify build when the `main` branch is updated.

- [Photos](/photos): sourced from [Unsplash](https://unsplash.com/@hkamran)
- [Reading](/reading): sourced from [Bookhive](https://bookhive.buzz/profile/hkamran.com?ref=hkamran.com) through [my PDS](https://pdsls.dev/at://did:plc:s63rvnxw37nv4dwnnxrpe7jb/buzz.bookhive.book)
- [Userscripts](/userscripts): sourced from [a repository](https://github.com/hkamran80/userscripts)

I am currently evaluating moving away from GitHub given their reorganization within Microsoft under their "CoreAI" organization and the general ensloppification[^1].

[^1]: *See e.g.:* [Why is GitHub UI getting so much slower?](https://lobste.rs/s/5qq2k2/why_is_github_ui_getting_so_much_slower)
