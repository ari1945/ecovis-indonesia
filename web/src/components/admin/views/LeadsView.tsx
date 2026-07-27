'use client';

import { useState } from 'react';
import { formatIdr, initials, useAdmin } from '@/lib/admin/store';
import { OWNERS, SERVICE_NAMES, STAGES } from '@/lib/admin/seed';
import type { Lead, Stage } from '@/lib/admin/types';
import LeadDrawer from '../LeadDrawer';

const STAGE_ORDER: Stage[] = ['new', 'contacted', 'consultation', 'client'];

export default function LeadsView() {
  const { state, patch, push, selectLead, openModal, toast } = useAdmin();
  const [mode, setMode] = useState<'board' | 'list'>('board');
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();
  const leads = query
    ? state.leads.filter((lead) =>
        [lead.name, lead.company, lead.email, lead.service].some((field) =>
          field.toLowerCase().includes(query),
        ),
      )
    : state.leads;

  const addLead = () =>
    openModal({
      title: 'Add lead',
      fields: [
        { key: 'name', label: 'Contact name', type: 'text', value: '' },
        { key: 'company', label: 'Company', type: 'text', value: '' },
        { key: 'email', label: 'Email', type: 'text', value: '' },
        { key: 'phone', label: 'Phone', type: 'text', value: '' },
        { key: 'service', label: 'Service interest', type: 'select', value: 'Tax', options: SERVICE_NAMES },
        { key: 'message', label: 'Enquiry', type: 'textarea', value: '' },
      ],
      save: (values) => {
        if (!values.name) {
          toast('Contact name required');
          return;
        }
        push('leads', {
          name: String(values.name),
          company: String(values.company || '—'),
          email: String(values.email || ''),
          phone: String(values.phone || ''),
          service: String(values.service),
          stage: 'new',
          assigned: 'Unassigned',
          value: 0,
          source: 'Manual entry',
          priority: 'medium',
          ago: 'Just now',
          followUp: '',
          message: String(values.message || ''),
          notes: [],
        } as Omit<Lead, 'id'>);
        toast('Lead added');
      },
    });

  return (
    <>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid var(--border-350)', borderRadius: 8, padding: 4 }}>
          {(['board', 'list'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              aria-pressed={mode === option}
              className={`adm-btn adm-btn--sm ${mode === option ? '' : 'adm-btn--ghost'}`}
              style={mode === option ? undefined : { border: 'none' }}
            >
              {option === 'board' ? 'Pipeline' : 'List'}
            </button>
          ))}
        </div>

        <input
          className="adm-search"
          style={{ marginLeft: 0 }}
          type="search"
          placeholder="Search leads…"
          aria-label="Search leads"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button type="button" className="adm-btn" style={{ marginLeft: 'auto' }} onClick={addLead}>
          + New lead
        </button>
      </div>

      {mode === 'board' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14, alignItems: 'start' }}>
          {STAGE_ORDER.map((stage) => {
            const column = leads.filter((lead) => lead.stage === stage);
            const meta = STAGES[stage];
            return (
              <section key={stage} className="adm-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: meta.col }} aria-hidden="true" />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, margin: 0 }}>
                    {meta.label}
                  </h2>
                  <span className="adm-muted" style={{ marginLeft: 'auto', fontSize: 12.5 }}>
                    {column.length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {column.map((lead) => (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => selectLead(lead.id)}
                      style={{
                        textAlign: 'left',
                        border: '1px solid var(--border-350)',
                        borderLeft: `3px solid ${meta.col}`,
                        borderRadius: 8,
                        padding: '12px 13px',
                        background: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                      }}
                    >
                      <span className="adm-strong" style={{ fontSize: 14 }}>
                        {lead.name}
                      </span>
                      <span className="adm-muted" style={{ fontSize: 12.5 }}>
                        {lead.company}
                      </span>
                      <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 3 }}>
                        <span className="adm-pill" style={{ background: '#F4F1EE', color: 'var(--text-600)' }}>
                          {lead.service}
                        </span>
                        <span className="adm-muted" style={{ fontSize: 11.5 }}>
                          {lead.ago}
                        </span>
                      </span>
                    </button>
                  ))}
                  {column.length === 0 && (
                    <div className="adm-muted" style={{ fontSize: 12.5, padding: '8px 0' }}>
                      No leads in this stage.
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="adm-card" style={{ padding: '18px 8px' }}>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Stage</th>
                  <th>Owner</th>
                  <th>Est. value</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const meta = STAGES[lead.stage as Stage];
                  return (
                    <tr key={lead.id}>
                      <td>
                        <button
                          type="button"
                          onClick={() => selectLead(lead.id)}
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                        >
                          <span className="adm-strong" style={{ display: 'block' }}>
                            {lead.name}
                          </span>
                          <span className="adm-muted" style={{ fontSize: 12.5 }}>
                            {lead.company}
                          </span>
                        </button>
                      </td>
                      <td>{lead.service}</td>
                      <td>
                        <select
                          className="adm-select"
                          style={{ width: 'auto', fontSize: 12.5, padding: '5px 8px' }}
                          value={lead.stage}
                          aria-label={`Stage for ${lead.name}`}
                          onChange={(event) => {
                            patch('leads', lead.id, { stage: event.target.value as Stage });
                            toast(`${lead.name} → ${STAGES[event.target.value as Stage].label}`);
                          }}
                        >
                          {Object.entries(STAGES).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="adm-select"
                          style={{ width: 'auto', fontSize: 12.5, padding: '5px 8px' }}
                          value={lead.assigned}
                          aria-label={`Owner for ${lead.name}`}
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
                      </td>
                      <td>{lead.value ? formatIdr(lead.value) : '—'}</td>
                      <td className="adm-muted">
                        <span className="adm-pill" style={{ background: meta.bg, color: meta.color, marginRight: 8 }}>
                          {initials(lead.assigned === 'Unassigned' ? '–' : lead.assigned)}
                        </span>
                        {lead.ago}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {leads.length === 0 && <div className="adm-empty">No leads match “{search}”.</div>}
          </div>
        </div>
      )}

      <LeadDrawer />
    </>
  );
}
