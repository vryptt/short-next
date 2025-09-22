// lib/models/ShortUrl.ts
import mongoose, { Schema, models } from "mongoose";

const ShortUrlSchema = new Schema({
  slug: { type: String, unique: true, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default models.ShortUrl || mongoose.model("ShortUrl", ShortUrlSchema);
