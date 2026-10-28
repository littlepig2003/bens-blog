# Cloudflare Pages Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this small configuration change inline.

**Goal:** Make Cloudflare Pages Git integration the sole documented deployment path.

**Architecture:** Pages builds main and serves dist. Local development, GitHub validation and Pages use the same verify script; GitHub Actions has no deployment credentials or upload step.

**Tech Stack:** Astro, npm, Node.js 24, Vitest, GitHub Actions, Cloudflare Pages.

**Spec:** ../specs/2026-09-07-bens-blog-design.md; user confirmed Pages on 2026-10-27.

## Global Constraints

- Work on chore/unify-cloudflare-pages; open a PR without merging.
- Do not change live Cloudflare settings, DNS, domain bindings, or production deployments.
- Preserve Astro static output, content and the canonical URL https://blog.gbyb.de.
- Remove the Workers deploy script, Wrangler configuration and dependency.

## Review Focus

- A failing test or type check must stop the verification command before publishing.
- Pages and Actions must install the committed lockfile with development dependencies available.
- GitHub Actions is validation only and cannot gate an independently configured Cloudflare build.
- Existing Workers hosting may still be active; do not imply repository changes migrate it.
- Domain conflicts and emergency rollback require a documented sequence without executing it.

## Task 1: Unify configuration and operational documentation

**Files:** package.json, package-lock.json, .node-version, .github/workflows/validate.yml, README.md, docs/superpowers/specs/2026-09-07-bens-blog-design.md; delete wrangler.jsonc.

**Interfaces:** npm run verify runs npm test, npm run check, npm run build, npm run test:build in order. Pages build runs npm ci && npm run verify, with SKIP_DEPENDENCY_INSTALL=1.

**Review correction:** Add src/pages/404.astro and tests/build.mjs. Without a top-level dist/404.html Pages enables SPA fallback; a Python static server's 404 is not a Pages routing test. The artifact regression test was observed failing on missing dist/404.html before the fix. Actual Cloudflare HTTP behavior remains a rollout check.

- [x] Remove Workers entry points; add verify and Node.js major selection.
- [x] Add a read-only Actions workflow for pull requests, main pushes and manual runs.
- [x] Update README and design with exact Pages settings, preview, rollout boundaries, domain binding and rollback instructions.
- [x] Run npm ci, npm run verify and static output smoke checks. Expect all existing tests, diagnostics and build to pass.
- [x] Inspect the lockfile diff, workflow syntax and absence of active Workers deployment references. No implementation-mirroring tests for this configuration-only change.
- [ ] Review the complete diff, commit, push only the feature branch, and open an unmerged PR.

## Verification record

- npm ci succeeded after removing Wrangler. Shared dependency versions did not change.
- npm run verify: 12 Vitest tests, zero Astro diagnostics, static build, and the 404 artifact regression test passed.
- Independent review found the missing Pages 404; the regression test failed first, then passed after adding the static page. No other findings.
- YAML parsing and git diff --check passed. Local static serving is a smoke check only, not a Cloudflare routing/certificate test.
- Live Cloudflare hosting, DNS, certificates and branch protection remain unverified and unchanged; the owner rollout checklist covers them.
