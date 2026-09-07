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
});
