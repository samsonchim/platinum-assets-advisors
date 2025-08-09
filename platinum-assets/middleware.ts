import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function middleware(request: NextRequest) {
  // Handle admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to admin login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // For other admin routes, we'll handle authentication in the component
    // since localStorage is not accessible in middleware
    return NextResponse.next();
  }

  // Only protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Try to get the session from the Supabase cookie
    const access_token = request.cookies.get('sb-access-token')?.value;
    if (!access_token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Optionally, verify the token with Supabase
    const { data: { user } } = await supabase.auth.getUser(access_token);
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
