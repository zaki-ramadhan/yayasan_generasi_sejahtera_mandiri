import { NextResponse } from "next/server";
import { createDonation, getRecentDonations } from "@/services/donationService";
import { getCampaignDonationsPaginated } from "@/services/campaignService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignSlug = searchParams.get("campaignSlug");
    const limit = searchParams.get("limit")
      ? Math.min(parseInt(searchParams.get("limit"), 10) || 20, 100)
      : 20;
    const skip = searchParams.get("skip")
      ? Math.max(parseInt(searchParams.get("skip"), 10) || 0, 0)
      : 0;

    if (campaignSlug) {
      const result = await getCampaignDonationsPaginated({ campaignSlug, skip, limit });
      return NextResponse.json({ success: true, data: result });
    }

    const donations = await getRecentDonations(limit);
    return NextResponse.json({ success: true, data: donations });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengambil data donasi." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const donation = await createDonation(body);
    return NextResponse.json({ success: true, data: donation }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal memproses donasi." },
      { status: 400 }
    );
  }
}
