import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { registrations } from "@/app/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request, { params }: { params: { eventId: string } }) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const eventId = Number(params.eventId);

    const existing = await db
      .select()
      .from(registrations)
      .where(and(eq(registrations.event_id, eventId), eq(registrations.attendee_email_hash, email)));

    if (existing.length > 0) {
      return NextResponse.json({ success: false, message: "You are already registered for this event." }, { status: 409 });
    }

    await db.insert(registrations).values({
      event_id: eventId,
      attendee_email_hash: email,
      status: "registered",
    });

    return NextResponse.json({ success: true, message: "You’re registered for this event!" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}
