import { connectToDatabase } from "@/db/mongo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const skip = (Number(page) - 1) * Number(limit);

  try {
    const db = await connectToDatabase();
    const gigsCollection = db.collection("gigs");

    const gigs = await gigsCollection
      .find({ status: "open" }) // Filter for open gigs
      .skip(skip)
      .limit(Number(limit))
      .toArray();

    const totalGigs = await gigsCollection.countDocuments({ status: "open" });

    return NextResponse.json({
      gigs,
      totalGigs,
      totalPages: Math.ceil(totalGigs / Number(limit)),
      currentPage: Number(page),
    });
  } catch (err) {
    console.error("Error fetching gigs:", err);
    return NextResponse.error();
  }
}
