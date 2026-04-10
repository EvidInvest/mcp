import { NextResponse } from "next/server";
import { fetchDashboardData } from "@/lib/mcp-client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchDashboardData();
    return NextResponse.json(data, { status: data.setupRequired ? 503 : 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "fetch_failed", message },
      { status: 500 }
    );
  }
}
