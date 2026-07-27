'use client';

import { useState } from 'react';
import { useAdmin } from '@/lib/admin/store';

export default function NewsletterView() {
  const { state, remove, push, openModal, toast } = useAdmin();
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState('All');

  const segments = ['All', ...Array.from(new Set(state.subscribers.map((row) => row.segment)))];
  const query = search.trim().toLowerCase();

  const rows = state.subscribers.filter(
    (row) =>
      (segment === 'All' || row.segment === segment) &&
      (!query || row.email.toLowerCase().includes(query)),
  );

  const exportCsv = () => {
    const header = 'email,segment,source,joined';
    const body = rows.map((row) => [row.email, row.segment, row.source, row.joined].join(',')).join('\n');
    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ecovis-subscribers.csv';
    link.click();
    URL.revokeObjectURL(url);
    toast(`Exported ${rows.length} subscribers`);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          className="adm-search"
          style={{ marginLeft: 0 }}
          type="search"
          placeholder="Search email…"
          aria-label="Search subscribers"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="adm-select"
          style={{ width: 'auto' }}
          aria-label="Filter by segment"
          value={segment}
          onChange={(event) => setSegment(event.target.value)}
        >
          {segments.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button type="button" className="adm-btn adm-btn--ghost" onClick={exportCsv}>
            Export CSV
          </button>
          <button
            type="button"
            className="adm-btn"
            onClick={() =>
              openModal({
                title: 'Add subscriber',
                fields: [
                  { key: 'email', label: 'Email', type: 'text', value: '' },
                  { key: 'segment', label: 'Segment', type: 'text', value: 'Tax' },
                ],
                save: (values) => {
                  if (!values.email) {
                    toast('Email required');
                    return;
                  }
                  push('subscribers', {
                    email: String(values.email),
                    segment: String(values.segment || 'General'),
                    source: 'Manual',
                    joined: 'Just now',
                  });
                  toast('Subscriber added');
                },
              })
            }
          >
            + Add
          </button>
        </div>
      </div>

      <div className="adm-card" style={{ padding: '18px 8px' }}>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Segment</th>
                <th>Source</th>
                <th>Joined</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="adm-strong">{row.email}</td>
                  <td>
                    <span className="adm-pill" style={{ background: '#F4F1EE', color: 'var(--text-600)' }}>
                      {row.segment}
                    </span>
                  </td>
                  <td className="adm-muted">{row.source}</td>
                  <td className="adm-muted">{row.joined}</td>
                  <td>
                    <div className="adm-actions">
                      <button
                        type="button"
                        className="adm-btn adm-btn--danger adm-btn--sm"
                        onClick={() => {
                          remove('subscribers', row.id);
                          toast('Subscriber removed');
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <div className="adm-empty">No subscribers match this filter.</div>}
        </div>
      </div>
    </>
  );
}
