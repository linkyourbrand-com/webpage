import { db } from '@/app/db';
import { events } from '@/app/db/schema';
import { time } from 'console';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('id');

    const event = await db
    .select()
    .from(events)
    .where(eq(events.id, Number(eventId)))

    return NextResponse.json(event);
}


export async function POST(request: Request){
    try{
        const body = await request.json();
        const location_types = ["in_person", "remote", "hybird"];

        if (!location_types.includes(body.location_type)) {
            return NextResponse.json(
            { error: "Invalid location_type" },
            { status: 400 }
            )
        }

        const event = await db
        .insert(events)
        .values({
            title: body.title,
            description: body.descrption,
            organizer_cognito_id: body.organizerId,
            rsvp_count: body.attendCount,
            location_type: body.location_type,
            address: body.addy,
            start_time: body.start,
            end_time: body.end,
            organizer_contact: body.organizer_contact,
            tags: body.eventTags,
        })
        .returning();

        return NextResponse.json(event, {status: 201});
    } catch(error){
        return NextResponse.json(
        { error: 'Failed to insert event', detail: error },
        { status: 400 })
    }
}