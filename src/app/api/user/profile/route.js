import { NextResponse } from "next/server";
import { getDonorProfile, updateDonorProfile } from "@/services/donorService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email") || "";
    const userId = searchParams.get("id") || "";

    if (!userEmail && !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Parameter identitas pengguna (email/id) diperlukan.",
        },
        { status: 400 }
      );
    }

    const data = await getDonorProfile({ userEmail, userId });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("API GET /api/user/profile error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal memuat profil pengguna.",
      },
      { status: 404 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { email, profileData } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email pengguna diperlukan untuk memperbarui profil.",
        },
        { status: 400 }
      );
    }

    if (!profileData || typeof profileData !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Data profil tidak valid.",
        },
        { status: 400 }
      );
    }

    const updatedUser = await updateDonorProfile({
      userEmail: email,
      profileData,
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: "Profil pengguna berhasil diperbarui.",
    });
  } catch (error) {
    console.error("API PUT /api/user/profile error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal memperbarui profil pengguna.",
      },
      { status: 500 }
    );
  }
}
