# Ben's Blog design

## Purpose

Publish a fast, minimal personal blog at `blog.gbyb.de`. Ben writes posts in Markdown and readers can comment through GitHub.

## Architecture

- **Site generator:** Astro with TypeScript in strict mode.
- **Content:** Astro Content Collections read Markdown files from `src/content/blog/`. Each post has a title, description, publication date, tags, optional draft state, and optional cover image.
- **Rendering:** Static HTML generated at build time. The home page lists recent posts; posts render typography-focused Markdown; tag and archive views provide lightweight discovery.
- **Comments:** Giscus runs only on post pages. It is configured against the public GitHub repository `littlepig2003/bens-blog`, using GitHub Discussions as storage and GitHub identity for moderation and sign-in.
- **Hosting:** Cloudflare Pages builds from the `main` branch and serves the output. Its custom domain is `blog.gbyb.de`.

## Authoring and publishing

1. Add or edit a Markdown file in `src/content/blog/`.
2. Commit and push the change to `main`.
3. Cloudflare Pages runs the production build and publishes the generated site.

There is intentionally no separate web administration panel. GitHub is the authoring backend; it provides access control, revision history, and a familiar Markdown workflow without adding a database or server.

## Interface

- A calm, responsive reading layout with generous whitespace and a single-column article measure.
- Light theme by default, optional dark theme, and a small system-aware theme toggle.
- Warm off-white surfaces, slate text, and a restrained deep blue/green accent.
- Header with the site name, home, archive, and theme control; footer links to the GitHub profile and RSS feed.
- Accessible semantics, visible keyboard focus, readable contrast, and responsive navigation.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Recent post index and short introduction |
| `/posts/[slug]` | Individual article and its Giscus comments |
| `/tags/[tag]` | Posts for one tag |
| `/archive` | Chronological post archive |
| `/rss.xml` | Feed generated during build |

## Deployment and required account actions

1. Create the GitHub repository `littlepig2003/bens-blog`, make it public, and enable Discussions.
2. Install the Giscus GitHub App for that repository. The site is configured after Giscus provides repository/category identifiers.
3. Create a Cloudflare Pages project connected to the GitHub repository. Build command: `npm run build`; output directory: `dist`.
4. Add `blog.gbyb.de` as a custom domain in Pages. Replace the existing proxied A record with the DNS record Cloudflare Pages provides (typically a proxied CNAME).

The Cloudflare and GitHub account changes require Ben's interactive authorization. No credentials are stored in the repository.

## Error handling and quality checks

- Content schema rejects posts missing required metadata at build time.
- Build fails on malformed Markdown or TypeScript errors, preventing a bad deployment.
- A missing optional cover image falls back to text-only article headers.
- The Giscus component degrades gracefully: if its client script cannot load, the article remains fully readable and the comment area links to the discussion provider.
- Automated checks run type checking, unit tests for content helpers, a production build, and linting/formatting where configured.

## Non-goals

- No custom accounts, database, editor dashboard, analytics, newsletter, search service, or server-side API in the first version.
- No migration of the current Cloudflare A record until Cloudflare Pages is ready to bind the domain.
