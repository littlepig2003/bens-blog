import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isPublicPost, sortPosts } from '../lib/posts';

export const GET: APIRoute = async (context) => {
  const posts = sortPosts((await getCollection('blog')).filter(isPublicPost));
  return rss({
    title: "Ben's Blog",
    description: 'Notes by Ben.',
    site: context.site!,
    items: posts.map((post) => ({ title: post.data.title, description: post.data.description, pubDate: post.data.pubDate, link: `/posts/${post.id}` })),
  });
};
