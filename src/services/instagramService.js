import { prisma } from "@/lib/prisma";
import { INSTAGRAM_POSTS, INSTAGRAM_ACCOUNT } from "@/data/instagramPosts";

export async function getInstagramPosts(limit = 12) {
  try {
    const posts = await prisma.instagramPost.findMany({
      orderBy: { postedAt: "desc" },
      take: limit,
    });

    if (posts && posts.length > 0) {
      return posts.map((post) => ({
        id: post.id,
        imageUrl: post.imageUrl,
        alt: post.altText || post.caption,
        caption: post.caption,
        date: new Date(post.postedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        likes: post.likeCount,
        comments: post.commentCount,
        postUrl: post.postUrl,
      }));
    }
  } catch (error) {
    console.warn("Prisma InstagramPost fetch warning (using fallback data):", error?.message);
  }

  // Fallback to static mock data if DB is empty or during migration
  return INSTAGRAM_POSTS.slice(0, limit);
}

export function getInstagramAccount() {
  return INSTAGRAM_ACCOUNT;
}
