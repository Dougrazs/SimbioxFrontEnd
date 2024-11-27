import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_URL } from './constants/urls';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token_simbiox')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {

    const response = await fetch(`${API_URL}/protectedroute`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      console.log('Token is invalid or expired');
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    if (!response.ok) {
      console.error('Error validating token:', response.statusText, { token });
      return NextResponse.redirect(new URL('/signin', req.url));
    }


  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/filmes', '/filmes/:path*', '/destaques', '/favoritos', '/conta'],
};
