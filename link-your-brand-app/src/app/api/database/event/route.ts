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
        const location_types = ["in_person", "remote", "hybrid"];

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
            description: body.description,
            organizer_cognito_id: body.organizerId,
            rsvp_count: body.attendCount,
            location_type: body.location_type,
            address: body.addy,
            start_time: body.start_time,
            end_time: body.end_time,
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

export async function DELETE(request: Request){
    try{
        const { searchParams } = new URL(request.url);
        const eventId = searchParams.get('id');
        if(!eventId){
            return NextResponse.json(
                { error: "Event id required to delete"},
                { status: 400 }
            );
        }

        const deleted = await db
        .delete(events)
        .where(eq(events.id, Number(eventId)))
        .returning();

        // if nothing was deleted
        if (deleted.length === 0) {
        return NextResponse.json(
            { error: "Event not found" },
            { status: 404 }
        );
        }

        return NextResponse.json(
        { message: "Event deleted successfully", deleted },
        { status: 200 }
        );

    } catch (err) {
        return NextResponse.json(
        { error: "Failed to delete event", detail: err },
        { status: 500 }
        );
    }
}

export default async function PUT(request: Request){
    try{
        const { searchParams } = new URL(request.url);
        const eventId = searchParams.get('id');

        const body = await request.json();
        const { title, description, rsvp_count,
            location_type,
            address,
            start_time,
            end_time,
            organizer_contact,
            tags } = body;

        if(!eventId){
            return NextResponse.json(
                { error: "Event id required to update"},
                { status: 400 }
            );
        }

        const updated = await db
        .update(events)
        .set({
            title,
            description,
            rsvp_count,
            location_type,
            address,
            start_time,
            end_time,
            organizer_contact,
            tags
        })
        .where(eq(events.id, Number(eventId)))
        .returning();

        if (updated.length === 0) {
              return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
              );
            }
        
            return NextResponse.json(
              { success: true, updated },
              { status: 200 }
            );
    }
    catch(err){
        console.error("PUT error:", err);
        return NextResponse.json(
            { error: "failed to update events", detail: err },
            { status: 500 }
        );
    }
}