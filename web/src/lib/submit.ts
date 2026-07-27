export type LeadKind = 'guide' | 'consultation' | 'newsletter' | 'application';

export type LeadPayload = {
  kind: LeadKind;
  /** Which page or asset the submission came from, for routing and attribution. */
  source: string;
  lang: string;
  fields: Record<string, string>;
};

/**
 * ---------------------------------------------------------------------------
 * INTEGRATION POINT
 * ---------------------------------------------------------------------------
 * Every form on the site funnels through here. `/api/leads` is a stub that
 * validates and logs; point it at the real destination (CRM, transactional
 * email, marketing automation) when those decisions are made. See
 * src/app/api/leads/route.ts.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Lead submission failed (${response.status})`);
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}
