import { db } from '@/app/db';
import { events, registrations } from '@/app/db/schema';
import { table, time } from 'console';
import { eq, desc, count } from 'drizzle-orm';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tableId = searchParams.get("event_id");

    if (!tableId) {
      return NextResponse.json(
        { error: "Missing event_id" },
        { status: 400 }
      );
    }

    const regCount = await db
      .select({ count: count() })
      .from(registrations)
      .where(eq(registrations.event_id, Number(tableId)));

    const countValue = regCount[0].count;

    return NextResponse.json({ count: countValue });
  } catch (err) {
    return NextResponse.json(
      { error: "Event does not exist", detail: err },
      { status: 500 }
    );
  }
}