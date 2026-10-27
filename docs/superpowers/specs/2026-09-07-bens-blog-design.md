# Ben's Blog design

## Purpose

Publish a fast, minimal personal blog at `blog.gbyb.de`. Ben writes posts in Markdown and readers can comment through GitHub.

## Deployment decision (2026-10-27)

Ben selected Cloudflare Pages Git integration as the single deployment path.
Pages fits the existing static Markdown workflow, PR previews and production
rollback needs. Workers static assets with Workers Builds can also publish
from GitHub and suit future server-side features, but would retain Wrangler
maintenance and require rewriting the Pages operations guide. Maintaining two
production publishers is out of scope. Removing the Workers repository setup
does not migrate or identify the live Cloudflare project; account and domain
changes remain separate owner actions. See README.md for the rollout runbook.

## Architecture

- **Site generator:** Astro with TypeScript in strict mode.
- **Content:** Astro Content Collections read Markdown files from `src/content/blog/`. Each post has a title, description, publication date, tags, optional draft state, and optional cover image.
- **Rendering:** Static HTML generated at build time. The home page lists recent posts; posts render typography-focused Markdown; tag and archive views provide lightweight discovery.
- **Comments:** Giscus runs only on post pages. It is configured against the public GitHub repository `littlepig2003/bens-blog`, using GitHub Discussions as storage and GitHub identity for moderation and sign-in.
- **Hosting:** Cloudflare Pages builds from the `main` branch and serves the output. Its custom domain is `blog.gbyb.de`.

## Authoring and publishing

1. Add or edit a Markdown file in `src/content/blog/`.
2. Commit and push the change to `main`.
3. Cloudflare Pages installs locked dependencies and runs tests, type checking and the production build before publishing the generated site.

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
3. Inspect existing hosting first; reuse or create a Cloudflare Pages project connected to the GitHub repository and production branch `main`. Build command: `npm ci && npm run verify`; output directory: `dist`; Node.js 24 from `.node-version`; set `SKIP_DEPENDENCY_INSTALL=1` for production and previews. Include development dependencies.
4. Verify the `*.pages.dev` deployment before a separately approved custom-domain cutover. Add `blog.gbyb.de` in Pages and follow its exact DNS instructions, resolving conflicting records and Workers bindings as described in README.md. Keep the previous hosting until verification succeeds.
5. GitHub Actions validates PRs and main pushes but does not deploy. Required checks/branch protection and Cloudflare dashboard settings are configured separately by the owner. An existing Workers publisher must be retired in the planned rollout, not implicitly by this repository change.

The Cloudflare and GitHub account changes require Ben's interactive authorization. No credentials are stored in the repository.

## Error handling and quality checks

- Content schema rejects posts missing required metadata at build time.
- `npm run verify` runs unit tests, `astro check`, `astro build`, then a build artifact test and stops on failure. This command is the Pages validation gate; `astro build` alone does not run type diagnostics or unit tests. A top-level `dist/404.html` prevents Pages from applying SPA fallback to unknown paths.
- A missing optional cover image falls back to text-only article headers.
- The Giscus component degrades gracefully: if its client script cannot load, the article remains fully readable and the comment area links to the discussion provider.
- Automated checks run type checking, unit tests for content helpers, and a production build. No linting/formatting command is currently configured.
- Pages can roll back to a previous successful production deployment; previews are not rollback targets. Rollback does not revert Git, DNS or project settings. Repair/revert the source before resuming automatic production deployments.

## Non-goals

- No custom accounts, database, editor dashboard, analytics, newsletter, search service, or server-side API in the first version.
- No live Cloudflare, DNS, domain binding or production deployment changes as part of the repository unification PR.
