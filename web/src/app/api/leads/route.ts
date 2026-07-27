import { NextResponse } from 'next/server';

/**
 * ---------------------------------------------------------------------------
 * STUB — not a production endpoint.
 * ---------------------------------------------------------------------------
 * It accepts and shape-checks a submission, then logs it. Replace the marked
 * section with the real destination once chosen. Before going live this
 * handler still needs:
 *   - spam protection (hCaptcha / Turnstile, plus a honeypot field)
 *   - rate limiting per IP
 *   - server-side persistence, so a downstream outage cannot drop a lead
 *   - notification routing (which partner receives which service enquiry)
 * These are called out in the design bundle's Blueprint, section 09.
 */

const KINDS = new Set(['guide', 'consultation', 'newsletter', 'application']);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { kind, source, lang, fields } = body as Record<string, unknown>;

  if (typeof kind !== 'string' || !KINDS.has(kind)) {
    return NextResponse.json({ error: 'Unknown submission kind' }, { status: 400 });
  }
  if (typeof source !== 'string' || typeof lang !== 'string') {
    return NextResponse.json({ error: 'Missing source or lang' }, { status: 400 });
  }
  if (typeof fields !== 'object' || fields === null) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // --- Replace from here -------------------------------------------------
  console.info('[lead] received', { kind, source, lang, fields });
  // --- to here -----------------------------------------------------------

  return NextResponse.json({ ok: true });
}
