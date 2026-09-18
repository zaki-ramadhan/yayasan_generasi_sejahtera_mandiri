import { NextResponse } from "next/server";
import { registerVolunteer } from "@/services/volunteerService";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await registerVolunteer(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal memproses pendaftaran relawan." },
      { status: 400 }
    );
  }
}
