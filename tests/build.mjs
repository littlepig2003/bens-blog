import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('emits a top-level 404 page to disable Cloudflare Pages SPA fallback', async () => {
  const html = await readFile(new URL('../dist/404.html', import.meta.url), 'utf8');
  assert.match(html, /Page not found/);
  assert.match(html, /href="\/"/);
});
