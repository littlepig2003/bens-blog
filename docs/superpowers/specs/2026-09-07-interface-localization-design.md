# Interface localization design

## Goal

Localize Ben's Blog interface into English, Chinese, German, Spanish, and French without translating or duplicating Markdown article bodies.

## Language behavior

- Supported locales are `en`, `zh`, `de`, `es`, and `fr`.
- The initial locale uses the first supported value from `navigator.languages`, then `navigator.language`.
- Unsupported or unavailable browser locales fall back to English.
- A header language selector lets visitors override automatic detection.
- The selected locale is stored in `localStorage` and wins over browser detection on later visits.
- Theme and language preferences use separate storage keys.

## Architecture

- `src/lib/i18n.ts` owns locale types, localized message dictionaries, locale detection, and fallback behavior.
- `src/components/LanguageSelector.astro` displays five language choices and updates the page's locale preference.
- `BaseLayout` makes the locale available to site chrome and adds the selector beside the existing theme control.
- Page and component copy uses translation keys rather than hard-coded English text.
- Dates use `Intl.DateTimeFormat` with the selected locale.

## Scope

Translate site navigation, introductory copy, page titles, archive labels, post metadata, footer text, comment heading/fallback text, and language selector labels. Article Markdown and its URLs, RSS canonical URLs, GitHub/Giscus thread mapping, and content schema remain unchanged.

## Resilience and testing

- Missing message keys resolve to English.
- Locale normalization accepts browser values such as `zh-CN` and `de-DE`.
- Unit tests cover normalization, supported-locale selection, fallback, and message lookup.
- The full test suite, Astro type checking, and production build must pass.
