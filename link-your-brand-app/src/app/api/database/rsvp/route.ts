import { db } from '@/app/db';
import { events, registrations } from '@/app/db/schema';
import { table, time } from 'console';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const tableId = searchParams.get('id');

    const rsvps = await db
    .select()
    .from(registrations)
    .where(eq(registrations.id, Number(tableId)));

    return NextResponse.json(registrations);

}

export async function POST(request: Request){
    try{
        const body = await request.json();

        const rsvps = await db
        .insert(registrations)
        .values({
            id: body.id,
            event_id: body.event_id,
            attendee_email_hash: body.email,
            attendee_cognito_id: body.UUid,
            status: body.status,
        })
        .returning();

        return NextResponse.json(rsvps, { status: 201 });

    } catch (err) {
        return NextResponse.json(
        {
            error: "Failed to insert RSVP",
            detail: err,
        },
        { status: 500 }
        );
    }

}

export async function DELETE(request: Request){
    try{
        const { searchParams } = new URL(request.url);
        const tableId = searchParams.get('id');
        if(!tableId){
             return NextResponse.json(
                { error: "Event id required to delete"},
                { status: 400 }
            );
        }
        const deleted = await db
        .delete(registrations)
        .where(eq(registrations.id,Number(tableId)))
        .returning()

        if(deleted.length === 0){
            return NextResponse.json(
            { error: "Registeration not found" },
            { status: 404 }
            );
        }
        return NextResponse.json(
                { message: "Rsvp deleted successfully", deleted },
                { status: 200 }
                );
                
    } catch(err){
        return NextResponse.json(
        { error: "Failed to registration event", detail: err },
        { status: 500 }
        );
    }
}

export async function PUT(request: Request){
    try{
        const { searchParams } = new URL(request.url);
        const tableId = searchParams.get('id');

        const body = await request.json();
        const { status } = body;

        if(!tableId){
            return NextResponse.json(
                { error: "Table id required to update"},
                { status: 400 }
            );
        }

        const updated = await db
        .update(registrations)
        .set({
            status,
        })
        .where(eq(registrations.id,Number(tableId)))
        .returning();

        if(updated.length === 0){
            return NextResponse.json(
                { error: "Registration not found" },
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
            { error: "failed to update registrations", detail: err },
            { status: 500 }
        );
    }
}
