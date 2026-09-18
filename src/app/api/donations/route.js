import { NextResponse } from "next/server";
import { createDonation, getRecentDonations } from "@/services/donationService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit"), 10) : 10;
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
