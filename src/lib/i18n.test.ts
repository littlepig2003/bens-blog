import { describe, expect, it } from 'vitest';
import { normalizeLocale, t } from './i18n';

describe('i18n', () => {
  it('normalizes browser locales and falls back to English', () => {
    expect(normalizeLocale('de-DE')).toBe('de');
    expect(normalizeLocale('pt-BR')).toBe('en');
  });
  it('returns translated copy', () => expect(t('zh', 'home')).toBe('首页'));
});
