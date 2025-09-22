// app/[slug]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ShortUrl from "@/lib/models/ShortUrl";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await connectDB();
  const doc = await ShortUrl.findOne({ slug: params.slug }).lean();
  if (!doc) return new NextResponse("Not found", { status: 404 });
  return NextResponse.redirect(doc.url);
}
