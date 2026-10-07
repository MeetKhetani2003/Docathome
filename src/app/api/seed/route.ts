import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { services } from "@/lib/site";

export async function GET() {
  try {
    await connectDB();
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(services);
      return NextResponse.json({ success: true, message: "Services seeded!" });
    }
    return NextResponse.json({ success: true, message: "Already seeded." });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
