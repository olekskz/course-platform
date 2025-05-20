import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
  console.log('🚨 MIDDLEWARE WORKS!', request.nextUrl.pathname);
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/auth')) {
    if (token) {
      try {
        const decoded = jwtDecode(token) as any;
        
        if (decoded.exp * 1000 > Date.now()) {
          if (decoded.role === 'INSTRUCTOR') {
            return NextResponse.redirect(new URL('/dashboard/instructor', request.url));
          } else if (decoded.role === 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url));
          } else {
            return NextResponse.redirect(new URL('/dashboard/student', request.url));
          }
        }
      } catch (error) {
        const response = NextResponse.next();
        response.cookies.delete('token');
        return response;
      }
    }
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const decoded = jwtDecode(token) as any;
      
      if (decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        response.cookies.delete('token');
        return response;
      }

      if (pathname.startsWith('/dashboard/instructor') && decoded.role !== 'INSTRUCTOR') {
        return NextResponse.redirect(new URL('/dashboard/student', request.url));
      }
      
      if (pathname.startsWith('/dashboard/student') && decoded.role !== 'USER') {
        return NextResponse.redirect(new URL('/dashboard/instructor', request.url));
      }

      if (pathname.startsWith('/dashboard/admin') && decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
      }

    } catch (error) {
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
};