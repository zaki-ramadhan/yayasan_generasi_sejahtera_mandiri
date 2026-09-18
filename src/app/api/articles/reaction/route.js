import { NextResponse } from "next/server";
import { updateArticleReaction } from "@/services/articleService";

export async function POST(request) {
  try {
    const { slug, type } = await request.json();
    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug is required" }, { status: 400 });
    }
    const updated = await updateArticleReaction(slug, type);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal memperbarui reaksi artikel." },
      { status: 500 }
    );
  }
}
