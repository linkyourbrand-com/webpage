import { cookies } from "next/headers";
import jwt from "jsonwebtoken"; // optional if you want to decode it
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "No access token found" }, { status: 401 });
  }

  // Optional: decode token to return user info instead of the raw token
  const decoded = jwt.decode(token);

  return NextResponse.json({ token, claims:decoded });
}
