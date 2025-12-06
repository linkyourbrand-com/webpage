import { NextResponse } from "next/server";
import { db } from "../../../../../components/db";
import { registrations } from "../../../../../components/db/schema";
import crypto from "crypto";
import { jwtVerify } from "jose";

const COGNITO_USER_POOL_ID = "us-east-1_xxxxxxxx";
const COGNITO_REGION = "us-east-1";
const COGNITO_ISSUER = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`;

async function getPublicKeys() {
  const res = await fetch(`${COGNITO_ISSUER}/.well-known/jwks.json`);
  const { keys } = await res.json();
  return keys;
}

export async function POST(req: Request, { params }: { params: { eventId: string } }) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return NextResponse.json({ success: false, message: "No auth token" }, { status: 401 });

  const token = authHeader.replace("Bearer ", "");

  let payload;
  try {
    const JWKS = await getPublicKeys();
    const key = JWKS[0]; // production: match by 'kid'
    payload = await jwtVerify(token, key as any, { issuer: COGNITO_ISSUER });
  } catch (err) {
    console.error("JWT verification failed", err);
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }

  const userId = payload.payload.sub;
  const email = payload.payload.email;
  const emailHash = crypto.createHash("sha256").update(email).digest("hex");

  try {
    await db.insert(registrations).values({
      event_id: params.eventId,
      attendee_cognito_id: userId,
      attendee_email_hash: emailHash,
      status: "registered",
    });

    return NextResponse.json({ success: true, message: "You have successfully registered" });
  } catch (err: any) {
    if (err.code === "23505") {
      return NextResponse.json({ success: false, message: "You are already registered" });
    }
    return NextResponse.json({ success: false, message: "An error occurred" });
  }
}
