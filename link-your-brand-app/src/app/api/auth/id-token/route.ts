import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const idToken = cookieStore.get("idToken")?.value;

  if (!idToken) {
    return NextResponse.json({ error: "No ID token found" }, { status: 401 });
  }

  // For MVP we just return the raw token; client code can treat this
  // as an opaque identifier or decode it with a library if needed.
  return NextResponse.json({ idToken });
}
