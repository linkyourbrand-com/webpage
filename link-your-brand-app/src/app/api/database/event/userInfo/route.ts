import { db } from '@/app/db';
import { userInfo } from '@/app/db/schema';
import { time } from 'console';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';


export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { email, accountType, location } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required to update a user" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(userInfo)
      .set({
        accountType,
        location,
      })
      .where(eq(userInfo.email, email))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, updated },
      { status: 200 }
    );

  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json(
      { error: "Failed to update user", detail: err },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request){
    try{
        const { email }= await request.json();

        if(!email){
            return NextResponse.json(
                { error: "Email is required to delete a user" },
                { status: 400 }
            );
        }

        const deleted = await db
        .delete(userInfo)
        .where(eq(userInfo.email, email))
        .returning()

        if(deleted.length === 0){
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, deleted },
            { status: 200 }
        );
    } catch(err){
        console.error("Deleted error:", err);
        return NextResponse.json(
            { error: "Failed to delete user", detail: err },
            { status: 500 }
        );
    }
}

export async function POST(request: Request){
    try{
        const body = await request.json();
        const acctTypes = ["Organizer", "Attendee"];

        if(!acctTypes.includes(body.acctTypes)) {
            return NextResponse.json(
                { error: "Invalid location_type" },
                { status: 400 }
            )
        }

        const user = await db
        .insert(userInfo)
        .values({
            email: body.email,
            accountType: body.accountType,
            location: body.location,
        })
        .returning();

        return NextResponse.json(user, {status: 201});
    } catch(err){
        return NextResponse.json(
            { err: 'Failed to insert user info', detail: err },
            { status: 400 });
    }
}

export async function GET() {
  try {
    const users = await db
      .select()
      .from(userInfo);

    return NextResponse.json(users, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch user info", detail: err },
      { status: 500 }
    );
  }
}