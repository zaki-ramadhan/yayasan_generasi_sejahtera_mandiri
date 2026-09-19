import Link from "next/link";
import { Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { formatCompactNumber } from "@/lib/formatters";
import { INSTAGRAM_ACCOUNT as DEFAULT_ACCOUNT, INSTAGRAM_POSTS as DEFAULT_POSTS } from "@/data/instagramPosts";

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function HomeInstagramFeed({ posts = DEFAULT_POSTS, account = DEFAULT_ACCOUNT }) {
  const displayPosts = posts && posts.length > 0 ? posts : DEFAULT_POSTS;
  const currentAccount = account || DEFAULT_ACCOUNT;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
      {/* Instagram Profile Header Strip */}
      <div className="border-b border-slate-300 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
            Follow Kami di Instagram
          </h2>
          <p className="text-xs sm:text-sm text-slate-700">
            Aktivitas harian santri, penyaluran amanah zakat, dan aksi kemanusiaan terkini.
          </p>
        </div>

        {/* Account Info & Direct Link */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex flex-col text-right text-xs text-slate-600 leading-tight">
            <span className="font-semibold text-slate-900">{currentAccount.username}</span>
            <span>{currentAccount.followersCount} Pengikut</span>
          </div>
          <a
            href={currentAccount.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Buka Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* Authentic Instagram Photo Grid (4 Cols on Laptop/Desktop - 3 Rows of 4 = 12 Posts) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
        {displayPosts.map((post) => (
          <a
            key={post.id}
            href={post.postUrl || currentAccount.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square w-full rounded sm:rounded-xl overflow-hidden bg-slate-100 select-none block"
            title={post.caption}
          >
            {/* Square SafeImage */}
            <SafeImage
              src={post.imageUrl}
              alt={post.alt || post.caption || "Postingan Instagram Yayasan GSM"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />

            {/* Hover Dark Overlay showing Centered Likes & Comments */}
            <div className="absolute inset-0 bg-slate-950/65 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3.5 sm:gap-5 p-2 text-white pointer-events-none z-20">
              <span className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white" />
                {formatCompactNumber(post.likes)}
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
                <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white" />
                {formatCompactNumber(post.comments)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
