import { NextResponse, type NextRequest } from 'next/server';
import { guardAdmin } from '@/lib/admin-auth';
import { DEFAULT_LANG, LANGS } from '@/lib/i18n';

const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Every public route lives under a locale segment (`/en/...`, `/id/...`) so both
 * language versions are independently crawlable. Anything that arrives without
 * one is redirected into the default locale rather than 404'ing.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The admin console sits behind a password (see src/lib/admin-auth.ts).
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return guardAdmin(request);
  }

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = LANGS.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${DEFAULT_LANG}` : `/${DEFAULT_LANG}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
