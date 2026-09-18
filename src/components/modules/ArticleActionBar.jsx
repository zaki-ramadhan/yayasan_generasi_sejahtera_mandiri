"use client";

import { useState, useMemo, useSyncExternalStore, useId } from "react";
import { ThumbsUp, ThumbsDown, Share2, Link as LinkIcon, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const LIKE_STORAGE_KEY = "ygsm_liked_articles";
const DISLIKE_STORAGE_KEY = "ygsm_disliked_articles";
const SYNC_EVENT = "ygsm_article_reaction_sync";

function subscribeReactions(callback) {
	window.addEventListener("storage", callback);
	window.addEventListener(SYNC_EVENT, callback);
	return () => {
		window.removeEventListener("storage", callback);
		window.removeEventListener(SYNC_EVENT, callback);
	};
}

function getLikesSnapshot() {
	return localStorage.getItem(LIKE_STORAGE_KEY) || "[]";
}

function getDislikesSnapshot() {
	return localStorage.getItem(DISLIKE_STORAGE_KEY) || "[]";
}

function getServerSnapshot() {
	return "[]";
}

export function ArticleActionBar({
	articleId,
	slug,
	initialLikes = 0,
	initialDislikes = 0,
	title = "",
	bordered = true,
	className = "",
}) {
	const instanceId = useId();
	const [likes, setLikes] = useState(initialLikes);
	const [dislikes, setDislikes] = useState(initialDislikes);
	const [copied, setCopied] = useState(false);
	const targetSlug = slug || articleId;

	const storedLikesRaw = useSyncExternalStore(subscribeReactions, getLikesSnapshot, getServerSnapshot);
	const storedDislikesRaw = useSyncExternalStore(subscribeReactions, getDislikesSnapshot, getServerSnapshot);

	const hasLiked = useMemo(() => {
		try {
			const arr = JSON.parse(storedLikesRaw);
			return Array.isArray(arr) && (arr.includes(articleId) || arr.includes(targetSlug));
		} catch {
			return false;
		}
	}, [storedLikesRaw, articleId, targetSlug]);

	const hasDisliked = useMemo(() => {
		try {
			const arr = JSON.parse(storedDislikesRaw);
			return Array.isArray(arr) && (arr.includes(articleId) || arr.includes(targetSlug));
		} catch {
			return false;
		}
	}, [storedDislikesRaw, articleId, targetSlug]);

	const handleToggleLike = () => {
		try {
			const storedLikes = JSON.parse(
				localStorage.getItem(LIKE_STORAGE_KEY) || "[]",
			);
			const storedDislikes = JSON.parse(
				localStorage.getItem(DISLIKE_STORAGE_KEY) || "[]",
			);

			const nextLiked = !hasLiked;
			const updatedLikes = nextLiked
				? [...storedLikes, targetSlug]
				: storedLikes.filter((id) => id !== targetSlug && id !== articleId);

			const updatedDislikes = hasDisliked
				? storedDislikes.filter((id) => id !== targetSlug && id !== articleId)
				: storedDislikes;

			localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(updatedLikes));
			localStorage.setItem(
				DISLIKE_STORAGE_KEY,
				JSON.stringify(updatedDislikes),
			);

			const likeDelta = nextLiked ? 1 : -1;
			const dislikeDelta = hasDisliked ? -1 : 0;

			setLikes((prev) => Math.max(0, prev + likeDelta));
			if (hasDisliked) {
				setDislikes((prev) => Math.max(0, prev - 1));
			}

			if (nextLiked && targetSlug) {
				fetch("/api/articles/reaction", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ slug: targetSlug, type: "like" }),
				}).catch(() => {});
			}

			window.dispatchEvent(
				new CustomEvent(SYNC_EVENT, {
					detail: {
						sourceId: instanceId,
						articleId: targetSlug,
						hasLiked: nextLiked,
						likeDelta,
						hasDisliked: false,
						dislikeDelta,
					},
				}),
			);
		} catch {
			// ignore storage error
		}
	};

	const handleToggleDislike = () => {
		try {
			const storedLikes = JSON.parse(
				localStorage.getItem(LIKE_STORAGE_KEY) || "[]",
			);
			const storedDislikes = JSON.parse(
				localStorage.getItem(DISLIKE_STORAGE_KEY) || "[]",
			);

			const nextDisliked = !hasDisliked;
			const updatedDislikes = nextDisliked
				? [...storedDislikes, targetSlug]
				: storedDislikes.filter((id) => id !== targetSlug && id !== articleId);

			const updatedLikes = hasLiked
				? storedLikes.filter((id) => id !== targetSlug && id !== articleId)
				: storedLikes;

			localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(updatedLikes));
			localStorage.setItem(
				DISLIKE_STORAGE_KEY,
				JSON.stringify(updatedDislikes),
			);

			const dislikeDelta = nextDisliked ? 1 : -1;
			const likeDelta = hasLiked ? -1 : 0;

			setDislikes((prev) => Math.max(0, prev + dislikeDelta));
			if (hasLiked) {
				setLikes((prev) => Math.max(0, prev - 1));
			}

			if (nextDisliked && targetSlug) {
				fetch("/api/articles/reaction", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ slug: targetSlug, type: "dislike" }),
				}).catch(() => {});
			}

			window.dispatchEvent(
				new CustomEvent(SYNC_EVENT, {
					detail: {
						sourceId: instanceId,
						articleId: targetSlug,
						hasDisliked: nextDisliked,
						dislikeDelta,
						hasLiked: false,
						likeDelta,
					},
				}),
			);
		} catch {
			// ignore storage error
		}
	};

	const handleCopyLink = async () => {
		try {
			if (typeof window !== "undefined") {
				await navigator.clipboard.writeText(window.location.href);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		} catch {
			// ignore clipboard error
		}
	};

	const handleShareWhatsApp = () => {
		if (typeof window === "undefined") return;
		const url = window.location.href;
		const text = encodeURIComponent(
			`*${title}*\n\nBaca artikel selengkapnya di:\n${url}`,
		);
		window.open(
			`https://api.whatsapp.com/send?text=${text}`,
			"_blank",
			"noopener,noreferrer",
		);
	};

	return (
		<div
			className={cn(
				"flex items-center justify-between text-sm gap-3",
				bordered ? "py-3 border-y border-slate-200" : "",
				className,
			)}
		>
			{/* Action Buttons: Like + Dislike + Share (Sejajar) */}
			<div className="flex items-center gap-2">
				{/* Like Button */}
				<button
					type="button"
					onClick={handleToggleLike}
					className={cn(
						"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors cursor-pointer",
						hasLiked
							? "bg-slate-100 border-slate-400 text-slate-900"
							: "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900",
					)}
					aria-label={hasLiked ? "Batalkan suka" : "Sukai artikel"}
					title={hasLiked ? "Disukai" : "Sukai"}
				>
					<ThumbsUp
						className={cn(
							"w-4 h-4 transition-transform active:scale-125",
							hasLiked
								? "fill-slate-800 text-slate-800"
								: "text-slate-500",
						)}
					/>
					<span className="font-semibold text-slate-800">{likes}</span>
				</button>

				{/* Dislike Button */}
				<button
					type="button"
					onClick={handleToggleDislike}
					className={cn(
						"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors cursor-pointer",
						hasDisliked
							? "bg-slate-100 border-slate-400 text-slate-900"
							: "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900",
					)}
					aria-label={
						hasDisliked
							? "Batalkan tidak suka"
							: "Tidak sukai artikel"
					}
					title={hasDisliked ? "Tidak disukai" : "Tidak suka"}
				>
					<ThumbsDown
						className={cn(
							"w-4 h-4 transition-transform active:scale-125",
							hasDisliked
								? "fill-slate-800 text-slate-800"
								: "text-slate-500",
						)}
					/>
					<span className="font-semibold text-slate-800">
						{dislikes}
					</span>
				</button>

				{/* Share Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className="h-8.5 px-2.5 sm:px-3 text-xs sm:text-sm font-medium border-slate-300 text-slate-700 hover:bg-slate-50 gap-1.5 rounded-lg cursor-pointer"
						>
							<Share2 className="w-3.5 h-3.5 text-slate-500" />
							<span>Bagikan</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-48">
						<DropdownMenuItem
							onClick={handleShareWhatsApp}
							className="cursor-pointer gap-2 text-xs sm:text-sm"
						>
							<MessageCircle className="w-4 h-4 text-emerald-600" />
							<span>WhatsApp</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={handleCopyLink}
							className="cursor-pointer gap-2 text-xs sm:text-sm"
						>
							{copied ? (
								<Check className="w-4 h-4 text-emerald-600" />
							) : (
								<LinkIcon className="w-4 h-4 text-slate-500" />
							)}
							<span>
								{copied ? "Tautan Tersalin!" : "Salin Tautan"}
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
