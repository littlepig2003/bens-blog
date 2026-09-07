import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const source = (file: string) => readFile(new URL(file, import.meta.url), 'utf8');

describe('public routes', () => {
  it('defines static post and tag paths', async () => {
    await expect(source('../pages/posts/[...slug].astro')).resolves.toContain('getStaticPaths');
    await expect(source('../pages/tags/[tag].astro')).resolves.toContain('getStaticPaths');
  });

  it('loads content on the home page', async () => {
    await expect(source('../pages/index.astro')).resolves.toContain('getCollection');
  });
});
