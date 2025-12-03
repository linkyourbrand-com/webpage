import { db } from '@/app/db';
import { events } from '@/app/db/schema';
import { time } from 'console';
import { eq, desc } from 'drizzle-orm';
import { pgEnum } from 'drizzle-orm/pg-core';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location_type");

    // Validate and cast to enum type
    if (!location || !['in_person', 'remote', 'hybrid'].includes(location)) {
      return NextResponse.json(
        { error: "Invalid or missing location_type" },
        { status: 400 }
      );
    }

    // TypeScript: cast to the exact enum type
    const locationEnum = location as "in_person" | "remote" | "hybrid";

    const event = await db
      .select()
      .from(events)
      .where(eq(events.location_type, locationEnum));

    return NextResponse.json(event, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch events", detail: err },
      { status: 500 }
    );
  }
}