import { db } from '@/app/db';
import { events } from '@/app/db/schema';
import { time } from 'console';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

//todo add options to get events from specific user.
export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('tags');

    const event = await db
    .select()
    .from(events)
    .where(eq(events.tags, String(eventId)));

    return NextResponse.json(event);
}