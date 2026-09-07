type PostLike = {
  data: {
    pubDate: Date;
    tags?: string[];
  };
};

export function sortPosts<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort(
    (first, second) => second.data.pubDate.getTime() - first.data.pubDate.getTime(),
  );
}

export function getAllTags<T extends PostLike>(posts: T[]): string[] {
  return [...new Set(posts.flatMap((post) => post.data.tags ?? []).map((tag) => tag.toLowerCase()))]
    .sort((first, second) => first.localeCompare(second));
}

export function isPublicPost<T extends { data: { draft?: boolean } }>(post: T): boolean {
  return post.data.draft !== true;
}
