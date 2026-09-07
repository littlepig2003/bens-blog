# Ben's Blog

A lightweight, Markdown-first blog built with Astro.

## Write locally

```bash
npm install
npm run dev
```

Create a post in `src/content/blog/your-slug.md`:

```md
---
title: Your post title
description: A short summary for readers and feeds.
pubDate: 2026-09-07
tags: [Writing]
---

# Your post
```

Set `draft: true` in the frontmatter to keep a post out of public pages. Before publishing, run:

```bash
npm test
npm run check
npm run build
git add src/content/blog
git commit -m "feat: publish a post"
git push origin main
```

## Enable comments

1. Create public GitHub repository `littlepig2003/bens-blog` and enable **Discussions**.
2. Install the [Giscus GitHub App](https://github.com/apps/giscus) for that repository only.
3. Open [giscus.app](https://giscus.app), select the repository and a Discussions category, then copy the generated `repo`, `repoId`, `category`, and `categoryId` values into `src/components/GiscusComments.astro`.
4. Commit and push the resulting configuration. No token or password belongs in the repository.

## Deploy to Cloudflare Pages

1. In Cloudflare Dashboard, choose **Workers & Pages → Create → Pages → Connect to Git** and select `littlepig2003/bens-blog`.
2. Set production branch to `main`, build command to `npm run build`, and build output directory to `dist`.
3. After the initial deployment succeeds, add `blog.gbyb.de` in **Custom domains**.
4. Apply the exact DNS record suggested by Pages. Replace the existing proxied A record only once Pages reports the custom domain active.
5. Verify `https://blog.gbyb.de/` and `https://blog.gbyb.de/rss.xml` both return HTTP 200.

Cloudflare Pages automatically rebuilds when a commit is pushed to `main`.
