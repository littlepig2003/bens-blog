import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('comments and feed', () => {
  it('includes Giscus with a fallback link', async () => {
    const source = await readFile(new URL('../components/GiscusComments.astro', import.meta.url), 'utf8');
    expect(source).toContain('https://giscus.app/client.js');
    expect(source).toContain("setAttribute('data-mapping', 'pathname')");
    expect(source).toContain('https://giscus.app');
  });
  it('uses the Astro RSS integration', async () => {
    const source = await readFile(new URL('../pages/rss.xml.ts', import.meta.url), 'utf8');
    expect(source).toContain("import rss from '@astrojs/rss'");
  });
});
