import { NextResponse } from "next/server";
import { updateDonorPassword } from "@/services/donorService";

export async function PUT(request) {
  try {
    const body = await request.json();
    const { email, oldPassword, newPassword } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email pengguna diperlukan.",
        },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Kata sandi baru minimal 6 karakter.",
        },
        { status: 400 }
      );
    }

    const result = await updateDonorPassword({
      userEmail: email,
      oldPassword,
      newPassword,
    });

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("API PUT /api/user/password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal memperbarui kata sandi.",
      },
      { status: 400 }
    );
  }
}
