import { NextResponse, type NextRequest } from 'next/server';

/**
 * HTTP Basic Auth gate for the admin console.
 *
 * Credentials come from environment variables set in the hosting dashboard —
 * never from the code:
 *   ADMIN_PASSWORD  required
 *   ADMIN_USER      optional, defaults to "admin"
 *
 * Fails closed: if ADMIN_PASSWORD is not set, nobody gets in. A forgotten
 * setting must lock the console, not leave it open.
 */
export function guardAdmin(request: NextRequest): NextResponse {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const expectedUser = process.env.ADMIN_USER || 'admin';

  if (!expectedPassword) {
    return new NextResponse(
      'Admin console is locked: ADMIN_PASSWORD is not configured on this deployment.',
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const credentials = parseBasicAuth(request.headers.get('authorization'));
  const ok =
    credentials !== null &&
    // Evaluate both comparisons so the response time doesn't reveal which half failed.
    [safeEqual(credentials.user, expectedUser), safeEqual(credentials.password, expectedPassword)].every(Boolean);

  if (!ok) {
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Ecovis Admin", charset="UTF-8"',
        'Cache-Control': 'no-store',
      },
    });
  }

  const response = NextResponse.next();
  // Authenticated admin pages must never be stored by shared caches.
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

function parseBasicAuth(header: string | null): { user: string; password: string } | null {
  if (!header || !header.toLowerCase().startsWith('basic ')) return null;
  try {
    const binary = atob(header.slice(6).trim());
    const decoded = new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
    const separator = decoded.indexOf(':');
    if (separator < 0) return null;
    return { user: decoded.slice(0, separator), password: decoded.slice(separator + 1) };
  } catch {
    return null;
  }
}

/** Length-independent constant-time string comparison (Edge runtime has no crypto.timingSafeEqual). */
function safeEqual(a: string, b: string): boolean {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  let diff = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let i = 0; i < length; i += 1) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return diff === 0;
}
