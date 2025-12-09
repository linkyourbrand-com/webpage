import { db } from '@/app/db';
import { events } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

//todo add options to get events from specific user.
export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("uuid");

    const event = await db
    .select()
    .from(events)
    .where(eq(events.id, Number(eventId)));

    return NextResponse.json(event);
}