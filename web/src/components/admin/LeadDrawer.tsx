'use client';

import { useEffect, useState } from 'react';
import { formatIdr, initials, useAdmin } from '@/lib/admin/store';
import { OWNERS, STAGES } from '@/lib/admin/seed';
import type { Stage } from '@/lib/admin/types';

/** Full lead record: change stage, assign an owner, set follow-up, post notes. */
export default function LeadDrawer() {
  const { state, patch, selectLead, toast } = useAdmin();
  const lead = state.leads.find((row) => row.id === state.selectedLead) ?? null;
  const [note, setNote] = useState('');

  useEffect(() => {
    setNote('');
  }, [state.selectedLead]);

  useEffect(() => {
    if (!lead) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') selectLead(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lead, selectLead]);

  if (!lead) return null;

  const meta = STAGES[lead.stage as Stage];

  const addNote = () => {
    const text = note.trim();
    if (!text) return;
    patch('leads', lead.id, {
      notes: [
        ...lead.notes,
        {
          author: 'Ari Wibowo',
          text,
          time: 'Just now',
          initials: 'AW',
          bg: '#6E1423',
        },
      ],
    });
    setNote('');
    toast('Note added');
  };

  return (
    <>
      <button type="button" className="adm-drawer-scrim" aria-label="Close lead" onClick={() => selectLead(null)} />
      <aside className="adm-drawer" role="dialog" aria-modal="true" aria-label={`Lead: ${lead.name}`}>
        <header className="adm-drawer-head">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div>
              <div className="adm-crumb">{lead.source}</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 21, margin: '2px 0 4px' }}>
                {lead.name}
              </h2>
              <div className="adm-muted">{lead.company}</div>
            </div>
            <button type="button" className="adm-btn adm-btn--ghost adm-btn--icon" aria-label="Close" onClick={() => selectLead(null)}>
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <span className="adm-pill" style={{ background: meta.bg, color: meta.color }}>
              {meta.label}
            </span>
            <span className="adm-pill" style={{ background: '#F4F1EE', color: 'var(--text-600)' }}>
              {lead.service}
            </span>
            {lead.value > 0 && (
              <span className="adm-pill" style={{ background: '#F4F1EE', color: 'var(--text-600)' }}>
                {formatIdr(lead.value)}
              </span>
            )}
          </div>
        </header>

        <div className="adm-drawer-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            <div className="adm-field">
              <label className="adm-label" htmlFor="lead-stage">
                Stage
              </label>
              <select
                id="lead-stage"
                className="adm-select"
                value={lead.stage}
                onChange={(event) => {
                  patch('leads', lead.id, { stage: event.target.value as Stage });
                  toast(`Moved to ${STAGES[event.target.value as Stage].label}`);
                }}
              >
                {Object.entries(STAGES).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="adm-field">
              <label className="adm-label" htmlFor="lead-owner">
                Assigned to
              </label>
              <select
                id="lead-owner"
                className="adm-select"
                value={lead.assigned}
                onChange={(event) => {
                  patch('leads', lead.id, { assigned: event.target.value });
                  toast(`Assigned to ${event.target.value}`);
                }}
              >
                {OWNERS.map((owner) => (
                  <option key={owner} value={owner}>
                    {owner}
                  </option>
                ))}
              </select>
            </div>

            <div className="adm-field">
              <label className="adm-label" htmlFor="lead-followup">
                Follow-up date
              </label>
              <input
                id="lead-followup"
                type="date"
                className="adm-input"
                value={lead.followUp}
                onChange={(event) => patch('leads', lead.id, { followUp: event.target.value })}
              />
            </div>
          </div>

          <div className="adm-card" style={{ background: '#FBFAF9', marginTop: 6 }}>
            <div className="adm-crumb">Enquiry</div>
            <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-800)' }}>
              {lead.message}
            </p>
            <div style={{ display: 'flex', gap: 18, marginTop: 14, flexWrap: 'wrap', fontSize: 13.5 }}>
              <a href={`mailto:${lead.email}`}>{lead.email}</a>
              <a href={`tel:${lead.phone.replace(/\s/g, '')}`}>{lead.phone}</a>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="adm-crumb">Notes &amp; activity</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '12px 0 16px' }}>
              {lead.notes.map((entry, index) => (
                <div key={`${entry.time}-${index}`} style={{ display: 'flex', gap: 11 }}>
                  <span className="adm-avatar" style={{ background: entry.bg, width: 30, height: 30 }} aria-hidden="true">
                    {entry.initials}
                  </span>
                  <div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.5 }}>{entry.text}</div>
                    <div className="adm-muted" style={{ fontSize: 11.5 }}>
                      {entry.author} · {entry.time}
                    </div>
                  </div>
                </div>
              ))}
              {lead.notes.length === 0 && (
                <div className="adm-muted" style={{ fontSize: 13 }}>
                  No notes yet.
                </div>
              )}
            </div>

            <label className="adm-label" htmlFor="lead-note">
              Add a note
            </label>
            <textarea
              id="lead-note"
              className="adm-textarea"
              style={{ marginTop: 6 }}
              placeholder="What happened on this lead?"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button type="button" className="adm-btn" onClick={addNote} disabled={!note.trim()}>
                Post note
              </button>
            </div>
          </div>

          <div className="adm-muted" style={{ marginTop: 20, fontSize: 12 }}>
            Owner initials: {initials(lead.assigned)} · Priority: {lead.priority}
          </div>
        </div>
      </aside>
    </>
  );
}
