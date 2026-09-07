import { describe, expect, it } from 'vitest';
import { getAllTags, sortPosts } from './posts';

const posts = [
  {
    id: 'old.md',
    data: { pubDate: new Date('2025-01-01'), tags: ['Markdown', 'Astro'] },
  },
  {
    id: 'new.md',
    data: { pubDate: new Date('2026-01-01'), tags: ['astro'] },
  },
];

describe('post helpers', () => {
  it('sorts newer posts before older posts', () => {
    expect(sortPosts(posts).map((post) => post.id)).toEqual(['new.md', 'old.md']);
  });

  it('returns lowercase unique tags in alphabetical order', () => {
    expect(getAllTags(posts)).toEqual(['astro', 'markdown']);
  });
});
