import { NextResponse } from "next/server";
import { getWorkspaceBookingsByID } from "@/lib/db/data-query";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const workspaceId = requestUrl.searchParams.get("workspaceId");

  if (!workspaceId) {
    return NextResponse.json(
      { error: "workspaceId is required." },
      { status: 400 }
    );
  }

  try {
    const bookingDates = await getWorkspaceBookingsByID(workspaceId);
    const bookedDates = bookingDates.map((item) => item.booking_date);

    return NextResponse.json({ bookedDates });
  } catch {
    return NextResponse.json(
      { error: "Could not load booking availability." },
      { status: 500 }
    );
  }
}
