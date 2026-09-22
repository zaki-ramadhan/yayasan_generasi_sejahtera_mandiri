import { InstagramPhotoCard } from "./InstagramPhotoCard";

/**
 * Grid of square Instagram feed photos with hover details
 *
 * @param {object} props
 * @param {Array} props.posts - Array of Instagram post objects
 * @param {object} props.account - Instagram account profile data
 */
export function InstagramPhotoGrid({ posts = [], account = {} }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
      {posts.map((post) => (
        <InstagramPhotoCard
          key={post.id}
          post={post}
          fallbackUrl={account.profileUrl}
        />
      ))}
    </div>
  );
}

