"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Heart, MessageCircle, ArrowUpRight, Flame } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { formatCompactNumber } from "@/lib/formatters";
import { INSTAGRAM_ACCOUNT as DEFAULT_ACCOUNT } from "@/data/instagramPosts";
import { InstagramProfileCard } from "@/components/home/InstagramProfileCard";
import { CurvedLoop } from "@/components/ui/CurvedLoop";
import { cn } from "@/lib/utils";

function InstagramIcon({ className = "w-4 h-4" }) {
	return (
		<svg
			className={
				className
			}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
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

export function HomeInstagramFeed({ posts = [], account = DEFAULT_ACCOUNT }) {
	const [filterType, setFilterType] =
		useState("popular"); // By default: "popular"
	const currentAccount = account || DEFAULT_ACCOUNT;

	// Sorting Dinamis: "Terbaru" (timestamp) vs "Terpopuler" (likes + comments)
	const sortedPosts = useMemo(() => {
		if (
			!Array.isArray(
				posts,
			) ||
			posts.length ===
				0
		)
			return [];
		const cloned = [...posts];

		if (
			filterType ===
			"popular"
		) {
			cloned.sort(
				(
					a,
					b,
				) => {
					const scoreA =
						(a.likes ||
							0) +
						(a.comments ||
							0);
					const scoreB =
						(b.likes ||
							0) +
						(b.comments ||
							0);
					if (
						scoreB !==
						scoreA
					)
						return (
							scoreB -
							scoreA
						);
					return (
						(b.timestamp ||
							0) -
						(a.timestamp ||
							0)
					);
				},
			);
		} else {
			cloned.sort(
				(
					a,
					b,
				) =>
					(b.timestamp ||
						0) -
					(a.timestamp ||
						0),
			);
		}

		return cloned.slice(0, 9);
	}, [posts, filterType]);

	const hasPosts = sortedPosts.length > 0;

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
			{/* Centered Section Header */}
			<div className="text-center max-w-2xl mx-auto space-y-2">
				<h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-950 tracking-tight">
					Follow
					Kami
					di
					Instagram
				</h2>
				<p className="text-sm sm:text-base text-slate-700 leading-relaxed">
					Aktivitas
					harian
					santri,
					penyaluran
					amanah
					zakat,
					dan
					aksi
					kemanusiaan
					terkini.
				</p>
			</div>

			{/* Profile Card Container with Animated CurvedLoop Decorative Backdrop */}
			<div className="relative py-4 sm:py-6 overflow-hidden flex items-center justify-center">
				{/* Curved Loop Background Multi-layer (Clean Loop) */}
				<div className="absolute inset-0 flex flex-col items-center justify-center -z-0 pointer-events-none select-none opacity-100 scale-105 sm:scale-100">
					{Array.from(
						{
							length: 5,
						},
					).map(
						(
							_,
							idx,
						) => (
							<CurvedLoop
								key={
									idx
								}
								marqueeText="DOKUMENTASI KEGIATAN & KABAR TERKINI ✦ BERBAGI KEBAIKAN TANPA BATAS ✦"
								speed={
									0.7
								}
								curveAmount={
									-320
								}
								direction={
									idx %
										2 ===
									0
										? "left"
										: "right"
								}
								interactive={
									false
								}
								className="fill-slate-200/60 font-slate-950"
							/>
						),
					)}
				</div>

				{/* Modular Compact Instagram Profile Preview Card */}
				<div className="relative z-10 w-full flex justify-center">
					<InstagramProfileCard
						account={
							currentAccount
						}
						posts={
							posts
						}
					/>
				</div>
			</div>

			{/* Switch Toggle: [Terbaru] ( O ) [Terpopuler] */}
			{hasPosts && (
				<div className="flex justify-center -mt-2">
					<div className="inline-flex items-center gap-3 sm:gap-4 select-none">
						{/* Label Kiri: Terbaru (Tanpa icon) */}
						<button
							type="button"
							onClick={() =>
								setFilterType(
									"latest",
								)
							}
							className={cn(
								"inline-flex items-center text-sm sm:text-base transition-colors cursor-pointer",
								filterType ===
									"latest"
									? "text-slate-950 font-medium"
									: "text-slate-500 hover:text-slate-700 font-normal",
							)}
						>
							<span>
								Terbaru
							</span>
						</button>

						{/* Switch Toggle Slider (Ukuran Besar w-11 h-6) */}
						<button
							type="button"
							role="switch"
							aria-checked={
								filterType ===
								"popular"
							}
							onClick={() =>
								setFilterType(
									(
										prev,
									) =>
										prev ===
										"latest"
											? "popular"
											: "latest",
								)
							}
							className={cn(
								"relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-hidden",
								filterType ===
									"popular"
									? "bg-primary"
									: "bg-slate-300",
							)}
						>
							<span className="sr-only">
								Toggle
								urutan
								postingan
							</span>
							<span
								className={cn(
									"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out",
									filterType ===
										"popular"
										? "translate-x-5"
										: "translate-x-0",
								)}
							/>
						</button>

						{/* Label Kanan: Terpopuler (Dengan Fill Icon Flame) */}
						<button
							type="button"
							onClick={() =>
								setFilterType(
									"popular",
								)
							}
							className={cn(
								"inline-flex items-center gap-1.5 text-sm sm:text-base transition-colors cursor-pointer",
								filterType ===
									"popular"
									? "text-slate-950 font-medium"
									: "text-slate-500 hover:text-slate-700 font-normal",
							)}
						>
							<span>
								Terpopuler
							</span>
							<Flame
								className={cn(
									"w-4 h-4 sm:w-5 sm:h-5 -ml-0.5",
									filterType ===
										"popular"
										? "text-amber-600 fill-amber-500"
										: "text-slate-300 fill-slate-300",
								)}
							/>
						</button>
					</div>
				</div>
			)}

			{/* Konten Feed: Jika ada postingan, tampilkan Photo Grid */}
			{hasPosts ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
					{sortedPosts.map(
						(
							post,
						) => (
							<a
								key={
									post.id
								}
								href={
									post.postUrl ||
									currentAccount.profileUrl
								}
								target="_blank"
								rel="noopener noreferrer"
								className="group relative aspect-square w-full rounded sm:rounded-xl overflow-hidden bg-slate-100 select-none block"
							>
								{/* Square SafeImage */}
								<SafeImage
									src={
										post.imageUrl
									}
									alt={
										post.alt ||
										post.caption ||
										"Postingan Instagram"
									}
									fill
									sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
									className="object-cover"
								/>

								{/* Hover Dark Overlay showing Centered Likes & Comments */}
								<div className="absolute inset-0 bg-slate-950/65 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3.5 sm:gap-5 p-2 text-white pointer-events-none z-20">
									<span className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
										<Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white" />
										{formatCompactNumber(
											post.likes,
										)}
									</span>
									<span className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
										<MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white" />
										{formatCompactNumber(
											post.comments,
										)}
									</span>
								</div>
							</a>
						),
					)}
				</div>
			) : (
				/* Empty State UI: Tampilan rapi ketika belum ada data postingan */
				<div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-3">
					<div className="w-12 h-12 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-700">
						<InstagramIcon className="w-6 h-6" />
					</div>
					<div className="max-w-md space-y-1">
						<p className="text-sm sm:text-base font-semibold text-slate-900">
							Belum
							ada
							postingan
							yang
							disorot
						</p>
						<p className="text-xs sm:text-sm text-slate-600">
							Ikuti
							akun
							resmi
							kami
							di
							Instagram
							untuk
							melihat
							dokumentasi
							kegiatan
							santri,
							penyaluran
							donasi,
							dan
							informasi
							terkini.
						</p>
					</div>
					<a
						href={
							currentAccount.profileUrl
						}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-700 underline underline-offset-4 transition-colors"
					>
						<span>
							Kunjungi
							profil{" "}
							{
								currentAccount.username
							}
						</span>
						<ArrowUpRight className="w-3.5 h-3.5" />
					</a>
				</div>
			)}
		</section>
	);
}
