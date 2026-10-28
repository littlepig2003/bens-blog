# Ben's Blog

A lightweight, Markdown-first blog built with Astro.

## Write locally

Use Node.js 24 (see `.node-version`) and npm. Install the committed lockfile,
including development dependencies:

```bash
npm ci
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
npm run verify
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

Cloudflare Pages Git integration is the sole deployment path. There is no local
`npm run deploy` command or Workers/Wrangler configuration. Astro generates static
files in `dist`; no Cloudflare adapter or server-side runtime is needed.

### Check existing hosting before rollout

Repository configuration does not identify the currently active Cloudflare
project. Before merging deployment changes, the owner should inspect **Workers &
Pages**, the connected repository/branch, the latest deployment commit, and the
binding for `blog.gbyb.de`. An empty GitHub Actions history does not establish
whether Pages or Workers is serving the site.

These repository changes do not migrate an existing Worker, create a Pages
project, or change dashboard build commands. If Workers Builds is active, its
old deploy command must not be left as a second production publisher. Plan that
change separately; do not delete a working Worker or its domain binding before
the Pages build has been verified. Merging to `main` can trigger any existing
Cloudflare production integration.

### Pages build settings

Reuse the existing Pages project if appropriate. Otherwise, in Cloudflare
Dashboard choose **Workers & Pages → Create → Pages → Connect to Git** and select
`littlepig2003/bens-blog`. Configure both production and preview builds:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | Repository root |
| Build command | `npm ci && npm run verify` |
| Build output directory | `dist` |
| Node.js | `24`, selected by the committed `.node-version` |
| Environment variable | `SKIP_DEPENDENCY_INSTALL=1` |
| Preview branches | Enable the branches used for pull requests |

Remove a conflicting dashboard `NODE_VERSION` override, or align it with
`.node-version`. Do not omit development dependencies: Vitest and `astro check`
are required during builds. `SKIP_DEPENDENCY_INSTALL=1` disables Pages' automatic
installation so the explicit `npm ci` above installs exactly the lockfile.

Pages builds and publishes when commits reach `main`; enabled preview branches
get separate preview URLs. Validate the project's `*.pages.dev` URL first.
Preview URLs still use the production canonical/feed base URL from
`astro.config.mjs`, so inspect the preview HTML as well as navigation links.

### Validation and publishing

`npm run verify` runs unit tests, `astro check`, `astro build`, then the build
artifact test, stopping on the first failure. `astro build` alone does not run
TypeScript diagnostics or unit tests. The artifact test ensures a top-level
`dist/404.html` exists so Pages returns a not-found page rather than enabling
its default SPA fallback. Run `npm run test:build` after a build to check it alone.

The **Validate** GitHub Actions workflow runs the same checks on pull requests,
pushes to `main`, and manual dispatch. It only validates; it has no Cloudflare
token or deployment step. To require it before merging, separately configure
branch protection for **Test, check and build**. This GitHub check does not gate
Cloudflare's independent Git build, so Pages must also use the build command
above. Changes to dashboard settings and branch protection are owner actions.

### Bind `blog.gbyb.de` after preview verification

Domain/DNS changes are a separate production operation. Record the existing
records, project binding and working deployment before making them.

1. Confirm the intended Pages deployment works at its `*.pages.dev` URL.
2. Add `blog.gbyb.de` under the Pages project's **Custom domains**. Adding the
   domain can itself propose or apply DNS changes; review those changes.
3. Follow the exact Pages-provided DNS instructions, resolving any existing
   A/AAAA/CNAME or Workers binding during the planned cutover. Do not merely
   create a CNAME without associating the domain with Pages. Domain activation
   may require replacing the conflicting record first; do not wait for an
   impossible "Active before DNS change" condition.
4. Wait for the domain and certificate to become active, then check HTTPS for
   `/`, `/archive/`, a published article, and `/rss.xml` (all should return 200).
   Check an unknown path returns 404. Retain the previous hosting until verified.

The `site` value in `astro.config.mjs` supplies canonical/feed URLs; it does not
bind the domain or configure DNS.

### Roll back and maintain

For an incorrect Pages release, use **Deployments → All deployments → … →
Rollback to this deployment** on a previously successful production deployment.
Preview deployments are not rollback targets. This restores the deployed files;
it does not revert Git commits, DNS, project settings, or external services.

Temporarily pause automatic production deployments if necessary while fixing
the issue. Revert the bad source change through a PR, pass validation, then
resume publishing so the next push does not reintroduce it. A first deployment
has no previous Pages release to restore: use the recorded previous hosting and
domain configuration for a separately approved migration rollback.

Keep `package-lock.json` committed. Review dependency updates in PRs and run
`npm ci && npm run verify`; update `.node-version` and any dashboard override
together when changing Node.js major versions.

References: [Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/),
[build environment](https://developers.cloudflare.com/pages/configuration/build-image/),
[custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/),
[rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/).
