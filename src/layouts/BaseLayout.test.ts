import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('BaseLayout', () => {
  it('provides semantic navigation, content, and a theme control', async () => {
    const source = await readFile(new URL('./BaseLayout.astro', import.meta.url), 'utf8');

    expect(source).toContain('<main');
    expect(source).toContain('aria-label="Primary navigation"');
    expect(source).toContain('ThemeToggle');
    expect(source).toContain('<slot />');
  });

  it('shows dynamic copyright and social profile links in the footer', async () => {
    const source = await readFile(new URL('./BaseLayout.astro', import.meta.url), 'utf8');

    expect(source).toContain('new Date().getFullYear()');
    expect(source).toContain('https://t.me/littlepig2003');
    expect(source).toContain('https://twitter.com/WenZhu0717');
  });

  it('uses Telegram and keeps both copyright years visible', async () => {
    const source = await readFile(new URL('./BaseLayout.astro', import.meta.url), 'utf8');

    expect(source).toContain('https://t.me/littlepig2003');
    expect(source).toContain('Copyright © 2026–${currentYear}');
  });

  it('places the copyright in the footer center region', async () => {
    const source = await readFile(new URL('./BaseLayout.astro', import.meta.url), 'utf8');

    expect(source).toContain('<div class="footer-center"><span>{copyright}</span></div>');
  });
});
