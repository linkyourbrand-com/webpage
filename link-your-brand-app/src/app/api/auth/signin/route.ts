import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie';
import { signIn } from '@/app/api/cognito/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    const result = await signIn(email, password)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      )
    }
    
    const response = NextResponse.json({
      success: true,
      accessToken: result.accessToken,
      idToken: result.idToken,
      refreshToken: result.refreshToken,
      expiresIn: result.expiresIn
    })

    response.cookies.set({
      name: "accessToken",
      value: String(result.accessToken),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: result.expiresIn, // usually 3600 seconds
      path: "/",
    });

    // (Optional) Store the idToken
    response.cookies.set({
      name: "idToken",
      value: String(result.idToken),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: result.expiresIn,
      path: "/",
    });

    return response;

  } catch (error: any) {
    console.error('Signin API error:', error)
    return NextResponse.json(
      { error: 'Sign in failed' },
      { status: 500 }
    )
  }
}