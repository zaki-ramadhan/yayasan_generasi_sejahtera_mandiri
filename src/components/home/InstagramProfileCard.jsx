/* eslint-disable @next/next/no-img-element */
import { BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCompactNumber } from "@/lib/formatters";

function InstagramIcon({ className = "w-3.5 h-3.5", strokeWidth = 2.5 }) {
	return (
		<svg
			className={
				className
			}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={
				strokeWidth
			}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect
				width="20"
				height="20"
				x="2"
				y="2"
				rx="5"
				ry="5"
			/>
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line
				x1="17.5"
				x2="17.51"
				y1="6.5"
				y2="6.5"
			/>
		</svg>
	);
}

/**
 * Subkomponen: Header Profil Instagram (Avatar, Nama, Handle, Verified Badge)
 */
export function InstagramProfileHeader({ account }) {
	const initial =
		(account?.displayName ||
			account?.username ||
			"Z")[0]?.toUpperCase() ||
		"Z";
	const username = (
		account?.handle ||
		account?.username ||
		"zqramadhan_"
	).replace("@", "");
	const displayName =
		account?.displayName ||
		"Zaki Ramadhan";

	return (
		<div className="flex items-center gap-3.5 px-3 sm:px-3.5">
			{/* Circle Avatar dengan Story Gradient Ring (Lebih Tebal) */}
			<div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-[2.7px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0 shadow-sm">
				<div className="relative w-full h-full rounded-full border-2 border-slate-900 bg-slate-950 overflow-hidden flex items-center justify-center">
					{account?.avatarUrl ? (
						<img
							src={
								account.avatarUrl
							}
							alt={
								displayName
							}
							referrerPolicy="no-referrer"
							className="w-full h-full object-cover"
						/>
					) : (
						<span className="font-semibold text-white text-sm sm:text-base">
							{
								initial
							}
						</span>
					)}
				</div>
			</div>

			{/* Detail Akun (Username & Nama Lengkap tanpa chip) */}
			<div className="min-w-0 flex-1 space-y-0.5">
				<div className="flex items-center gap-1.5">
					<span className="font-semibold text-white text-sm sm:text-base tracking-tight truncate">
						{
							username
						}
					</span>
					{Boolean(
						account?.isVerified,
					) && (
						<BadgeCheck className="w-4 h-4 text-sky-400 fill-sky-400 text-slate-950 shrink-0" />
					)}
				</div>
				<p className="text-xs text-slate-300 font-normal truncate">
					{
						displayName
					}
				</p>
			</div>
		</div>
	);
}

/**
 * Subkomponen: Statistik Akun (Postingan, Pengikut, Mengikuti)
 */
export function InstagramProfileStats({ account, totalPostsCount }) {
	return (
		<div className="grid grid-cols-3 text-center py-2 px-3 sm:px-3.5 border-t border-b border-slate-800/80">
			<div>
				<div className="font-semibold text-sm sm:text-base text-white tracking-tight">
					{formatCompactNumber(
						totalPostsCount ??
							account?.postsCount ??
							0,
					)}
				</div>
				<div className="text-[11px] sm:text-xs text-white/90">
					postingan
				</div>
			</div>
			<div>
				<div className="font-semibold text-sm sm:text-base text-white tracking-tight">
					{account?.followersCount ||
						"0"}
				</div>
				<div className="text-[11px] sm:text-xs text-white/90">
					pengikut
				</div>
			</div>
			<div>
				<div className="font-semibold text-sm sm:text-base text-white tracking-tight">
					{formatCompactNumber(
						account?.followingCount ||
							0,
					)}
				</div>
				<div className="text-[11px] sm:text-xs text-white/90">
					mengikuti
				</div>
			</div>
		</div>
	);
}

/**
 * Subkomponen: 3 Postingan Mini Preview (Flush edge-to-edge / Non-hoverable)
 */
export function InstagramProfileMiniGrid({ posts = [] }) {
	const previewPosts = posts.slice(0, 3);
	if (previewPosts.length === 0) return null;

	return (
		<div className="grid grid-cols-3 gap-[2px] w-full bg-slate-950 pointer-events-none select-none">
			{previewPosts.map(
				(
					post,
					idx,
				) => (
					<div
						key={
							post.id ||
							idx
						}
						className="relative aspect-square w-full bg-slate-800"
					>
						<SafeImage
							src={
								post.imageUrl
							}
							alt={
								post.alt ||
								"Preview post"
							}
							fill
							sizes="130px"
							className="object-cover"
						/>
					</div>
				),
			)}
		</div>
	);
}

/**
 * Subkomponen: Tombol Aksi Tunggal (Follow di Instagram)
 */
export function InstagramProfileActions({ account }) {
	const profileUrl =
		account?.profileUrl ||
		`https://www.instagram.com/${(account?.username || "zqramadhan_").replace("@", "")}/`;

	return (
		<div className="px-3 sm:px-3.5 pt-0.5">
			<Button
				asChild
				variant="default"
				className="w-full h-8.5 sm:h-9 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-none"
			>
				<a
					href={
						profileUrl
					}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center justify-center gap-1.5"
				>
					<InstagramIcon className="w-3.5 h-3.5" />
					<span>
						Follow
						di
						Instagram
					</span>
				</a>
			</Button>
		</div>
	);
}

/**
 * Skeleton Loader untuk Mini Card Profil Instagram
 */
export function InstagramProfileCardSkeleton() {
	return (
		<div className="relative max-w-sm sm:max-w-md mx-auto w-full">
			{/* Tooltip Arrow Pointer Skeleton */}
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-t border-l border-slate-800 rotate-45 rounded-tl-[3px] z-20"
				aria-hidden="true"
			/>

			<Card className="w-full rounded-xl bg-slate-900 border-slate-800 shadow-xl overflow-hidden animate-pulse relative z-10">
				<CardContent className="p-0 py-3.5 sm:py-4 space-y-3 sm:space-y-3.5">
					{/* Header Skeleton */}
					<div className="flex items-center gap-3.5 px-3 sm:px-3.5">
						<Skeleton className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-slate-800 shrink-0" />
						<div className="space-y-2 flex-1">
							<Skeleton className="h-4 w-28 bg-slate-800 rounded" />
							<Skeleton className="h-3 w-36 bg-slate-800 rounded" />
						</div>
					</div>

					{/* Stats Skeleton */}
					<div className="grid grid-cols-3 gap-2 py-2 px-3 sm:px-3.5 border-t border-b border-slate-800/80">
						<Skeleton className="h-8 w-full bg-slate-800 rounded" />
						<Skeleton className="h-8 w-full bg-slate-800 rounded" />
						<Skeleton className="h-8 w-full bg-slate-800 rounded" />
					</div>

					{/* Mini Grid Skeleton */}
					<div className="grid grid-cols-3 gap-[2px] w-full bg-slate-950">
						<Skeleton className="aspect-square w-full bg-slate-800 rounded-none" />
						<Skeleton className="aspect-square w-full bg-slate-800 rounded-none" />
						<Skeleton className="aspect-square w-full bg-slate-800 rounded-none" />
					</div>

					{/* Button Skeleton */}
					<div className="px-3 sm:px-3.5 pt-0.5">
						<Skeleton className="h-8.5 sm:h-9 w-full bg-slate-800 rounded-md" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

/**
 * Komponen Utama: Mini Card Profil Instagram
 */
export function InstagramProfileCard({ account, posts = [] }) {
	return (
		<div className="relative max-w-sm sm:max-w-md mx-auto w-full pt-2">
			{/* Tooltip Arrow Pointer (Segitiga di atas card) */}
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-t border-l border-slate-800 rotate-45 rounded-tl-[3px] z-20"
				aria-hidden="true"
			/>

			<Card className="w-full rounded-xl bg-slate-900 text-white shadow-xl border-slate-800 overflow-hidden relative z-10">
				<CardContent className="p-0 py-3.5 sm:py-4 space-y-3 sm:space-y-3.5">
					{/* 1. Header Profile */}
					<InstagramProfileHeader
						account={
							account
						}
					/>

					{/* 2. Statistik Akun */}
					<InstagramProfileStats
						account={
							account
						}
						totalPostsCount={
							posts.length
						}
					/>

					{/* 3. 3 Postingan Mini Berjejeran (Flush Edge-to-Edge) */}
					<InstagramProfileMiniGrid
						posts={
							posts
						}
					/>

					{/* 4. Tombol Aksi */}
					<InstagramProfileActions
						account={
							account
						}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
