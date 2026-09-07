# Interface Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Localize the blog interface into English, Chinese, German, Spanish, and French with browser detection and a persistent user override.

**Architecture:** A single typed locale module supplies messages and fallback rules. Layout and pages use it for UI copy; a client-side selector updates the stored preference and reloads to render the chosen locale.

**Tech Stack:** Astro, TypeScript, Vitest, browser `Intl` and `localStorage` APIs.

**Spec:** `docs/superpowers/specs/2026-09-07-interface-localization-design.md`

### Task 1: Add typed locale resolution

**Files:** Create `src/lib/i18n.ts`, `src/lib/i18n.test.ts`.

- [ ] Write tests for `normalizeLocale('de-DE')`, unsupported language fallback, and English fallback for absent keys.
- [ ] Run `npm test -- src/lib/i18n.test.ts` and observe failure.
- [ ] Implement typed locale dictionaries and `normalizeLocale`, `t`, and date formatter helpers.
- [ ] Run the unit test, `npm run check`, and `npm run build`; commit `feat: add interface localization helpers`.

### Task 2: Add persistent language selector

**Files:** Create `src/components/LanguageSelector.astro`, test it with source-level assertions.

- [ ] Write a failing test that requires the five locale values and `localStorage` persistence.
- [ ] Implement a semantic selector that persists `blog-locale` and reloads the current page.
- [ ] Verify test, type check, and build; commit `feat: add language selector`.

### Task 3: Localize site chrome and pages

**Files:** Modify layouts, Giscus component, and public page routes.

- [ ] Write failing source-level tests for layout and route localization imports.
- [ ] Pass locale from `BaseLayout` to page markup; localize navigation, headings, metadata labels, footer, comments, and dates.
- [ ] Verify all tests, type check, and production build; commit `feat: localize blog interface`.

### Task 4: Publish and verify

**Files:** Modify `README.md`.

- [ ] Document locale behavior and supported languages.
- [ ] Run full test suite, type check, production build, and push `main`.
