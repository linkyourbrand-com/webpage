import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'lyb_session';

export async function GET(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  return NextResponse.json({ loggedIn: !!session, email: session ?? null });
}

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const res = NextResponse.json({ success: true, email });
  res.cookies.set(SESSION_COOKIE, email, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
