// app/api/create/route.ts
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import validator from "validator";
import { connectDB } from "@/lib/db";
import ShortUrl from "@/lib/models/ShortUrl";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const originalUrl = (body.url || "").trim();
    const custom = (body.custom || "").trim();

    if (!originalUrl || !validator.isURL(originalUrl, { require_protocol: true })) {
      return NextResponse.json({ error: "Invalid URL. Use https://..." }, { status: 400 });
    }

    await connectDB();

    let slug = custom || nanoid(7);

    if (custom) {
      const exists = await ShortUrl.findOne({ slug }).lean();
      if (exists) {
        return NextResponse.json({ error: "Alias already taken." }, { status: 409 });
      }
    } else {
      while (await ShortUrl.findOne({ slug }).lean()) {
        slug = nanoid(7);
      }
    }

    const newDoc = await ShortUrl.create({ slug, url: originalUrl });

    const origin = req.headers.get("x-forwarded-host")
      ? `${req.headers.get("x-forwarded-proto") || "https"}://${req.headers.get("x-forwarded-host")}`
      : `${req.headers.get("x-forwarded-proto") || "http"}://${req.headers.get("host")}`;

    const short = `${origin}/${slug}`;

    return NextResponse.json({ slug, short, url: newDoc.url, createdAt: newDoc.createdAt });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
