import { NextResponse } from "next/server";
import { getDonorHistory } from "@/services/donorService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email") || "";
    const userName = searchParams.get("name") || "";
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "date";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "25";

    if (!userEmail && !userName) {
      return NextResponse.json(
        {
          success: false,
          message: "Parameter identitas pengguna (email/name) diperlukan.",
        },
        { status: 400 }
      );
    }

    const data = await getDonorHistory({
      userEmail,
      userName,
      search,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("API GET /api/user/donations error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal memuat riwayat donasi.",
      },
      { status: 500 }
    );
  }
}
