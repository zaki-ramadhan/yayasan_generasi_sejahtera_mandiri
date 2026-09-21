import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatRupiah, isCampaignClosed } from "@/lib/formatters";
import { CampaignPrayersSidebar } from "@/components/modules/CampaignPrayersSidebar";

export function CampaignSidebarDonate({ campaign, progress, daysLeft }) {
	const hasTarget = Boolean(
		campaign.targetAmount &&
		Number(
			campaign.targetAmount,
		) > 0,
	);
	const hasEndDate = Boolean(
		campaign.endDate &&
		daysLeft !== null,
	);
	const isClosed = isCampaignClosed(campaign);

	return (
		<div className="lg:col-span-4 hidden lg:block sticky top-24 space-y-4">
			<div className="px-6 sm:px-7 py-6 sm:py-5 bg-white rounded-xl border border-slate-300 space-y-4 shadow-xs">
				{hasTarget ? (
					<div className="space-y-2.5">
						<span className="text-sm sm:text-base text-slate-700 block font-normal">
							Dana
							Terkumpul
						</span>
						<div className="text-3xl font-semibold text-slate-950 tracking-tight">
							{formatRupiah(
								campaign.collectedAmount,
							)}
						</div>
						<div className="text-sm sm:text-base text-slate-700 flex justify-between items-center pt-1">
							<span>
								Target:{" "}
								<strong className="font-medium text-slate-900">
									{formatRupiah(
										campaign.targetAmount,
									)}
								</strong>
							</span>
							<span className="font-semibold text-slate-900">
								{
									progress
								}
								%
							</span>
						</div>
						<Progress
							value={
								progress
							}
							className="h-3"
						/>
					</div>
				) : (
					<div className="space-y-2.5">
						<span className="text-sm sm:text-base text-slate-700 block font-normal">
							Dana
							Terkumpul
						</span>
						<div className="text-3xl font-semibold text-slate-950 tracking-tight">
							{formatRupiah(
								campaign.collectedAmount,
							)}
						</div>
						<p className="text-xs text-slate-500 leading-relaxed pt-0.5">
							Program
							bantuan
							dan
							operasional
							rutin
							berkelanjutan
							untuk
							kemaslahatan
							umat.
						</p>
					</div>
				)}

				{/* Metrics row */}
				{hasEndDate ? (
					<div className="grid grid-cols-2 divide-x divide-slate-200 py-3.5 border-y border-slate-200 text-center">
						<div className="pr-3">
							<span className="block font-semibold text-slate-950 text-xl sm:text-2xl">
								{
									campaign.donorCount
								}
							</span>
							<span className="text-sm text-slate-700">
								Orang
								Baik
							</span>
						</div>
						<div className="pl-3">
							<span className="block font-semibold text-slate-950 text-xl sm:text-2xl">
								{isClosed
									? "Selesai"
									: daysLeft >
										  0
										? daysLeft
										: 0}
							</span>
							<span className="text-sm text-slate-700">
								{isClosed
									? "Status"
									: "Hari Tersisa"}
							</span>
						</div>
					</div>
				) : (
					<div className="py-3.5 border-y border-slate-200 text-center">
						<span className="block font-semibold text-slate-950 text-xl sm:text-2xl">
							{
								campaign.donorCount
							}
						</span>
						<span className="text-sm text-slate-700">
							Orang
							Baik
							Telah
							Berdonasi
						</span>
					</div>
				)}

				{/* Donation CTA or Closed State */}
				{isClosed ? (
					<div className="space-y-3 pt-1">
						<Button
							size="lg"
							disabled
							className="w-full text-base font-semibold h-12 rounded-lg bg-slate-200 text-slate-500 cursor-not-allowed shadow-none"
						>
							Penggalangan
							Dana
							Ditutup
						</Button>
						<p className="text-xs text-slate-600 text-center leading-relaxed px-1">
							Masa
							penggalangan
							dana
							untuk
							program
							ini
							telah
							berakhir.
							Terima
							kasih
							atas
							kepedulian
							dan
							donasi
							yang
							telah
							disalurkan.
						</p>
					</div>
				) : (
					<>
						<Link
							href={`/campaign/${campaign.slug}/donate`}
							className="block"
						>
							<Button
								size="lg"
								className="w-full text-base font-semibold h-12 shadow-xs rounded-lg bg-primary hover:bg-primary-hover text-white cursor-pointer"
							>
								Donasi
								Sekarang
							</Button>
						</Link>

						<div className="text-sm text-slate-700 text-center flex items-center justify-center gap-1.5">
							<ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
							<span>
								Pembayaran
								aman
								&amp;
								terverifikasi
								otomatis
							</span>
						</div>
					</>
				)}
			</div>

			{/* 3-5 Titipan Doa Terbaru / Terpopuler Sidebar Widget */}
			<CampaignPrayersSidebar
				initialDonors={
					campaign.recentDonors ||
					[]
				}
				campaignSlug={
					campaign.slug
				}
			/>
		</div>
	);
}
