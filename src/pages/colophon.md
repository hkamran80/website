---
layout: ../layouts/MarkdownPageLayout.astro
title: Colophon
---

This site is built with [Astro](https://astro.build) and hosted on [Netlify](https://netlify.com).
Styling is currently done with [Tailwind CSS](https://tailwindcss.com).
The source code is on [GitHub](https://github.com/hkamran80/website).

I previously used Vue.js and Next.js for this site.
The current version uses as little JavaScript as possible, unlike the past few versions which depended on JavaScript to run.
All posts have Atom, RSS, and JSON feeds, which you can find on [the feeds page](/feeds).

I compose my posts in Markdown using [Neovim](/uses#development), then push them to [GitHub](https://github.com/hkamran80/articles).
A webhook triggers a new Netlify build when the `main` branch is updated.

I am currently evaluating moving away from GitHub given their reorganization within Microsoft under their "CoreAI" organization and the general ensloppification[^1].

[^1]: *See e.g.:* [Why is GitHub UI getting so much slower?](https://lobste.rs/s/5qq2k2/why_is_github_ui_getting_so_much_slower)
