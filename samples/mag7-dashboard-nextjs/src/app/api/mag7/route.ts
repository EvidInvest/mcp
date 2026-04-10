import { NextResponse } from "next/server";
import { fetchMag7Data } from "@/lib/mcp-client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchMag7Data();
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    if (message.includes("not configured")) {
      return NextResponse.json(
        { error: "api_key_missing", message },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "fetch_failed", message },
      { status: 500 }
    );
  }
}
