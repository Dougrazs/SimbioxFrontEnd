import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_URL } from './constants/urls';

export async function middleware(req: NextRequest) {
  const tokenFromCookie = req.cookies.get('auth_token_simbiox')?.value;

  const setToken = (): string | null | undefined => {
    if (!tokenFromCookie) {
      const referer = req.headers.get('referer');
      if (referer) {
        const url = new URL(referer);
        const tokenFromRef = url.searchParams.get('token');
        return tokenFromRef
      }
    }
    return tokenFromCookie
  }
  const token = setToken()

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
    const res = NextResponse.next();

    res.cookies.set('auth_token_simbiox', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: ['/filmes', '/filmes/:path*', '/destaques', '/favoritos', '/conta'],
};
