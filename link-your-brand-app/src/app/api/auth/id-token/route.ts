import { cookies } from "next/headers";
import jwt from "jsonwebtoken"; // optional if you want to decode it
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const idToken = cookieStore.get("idToken")?.value;

  if (!idToken) {
    return NextResponse.json({ error: "No ID token found" }, { status: 401 });
  }

  // Optional: decode token to return user info instead of the raw token
  const decoded = jwt.decode(idToken);

  return NextResponse.json({ idToken, decoded });
}
