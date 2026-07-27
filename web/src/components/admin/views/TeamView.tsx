'use client';

import { initials, useAdmin } from '@/lib/admin/store';
import type { TeamMember } from '@/lib/admin/types';

export default function TeamView() {
  const { state, patch, remove, push, openModal, toast } = useAdmin();

  const fields = (existing?: TeamMember) => [
    { key: 'name', label: 'Full name', type: 'text' as const, value: existing?.name ?? '' },
    { key: 'title', label: 'Title', type: 'text' as const, value: existing?.title ?? '' },
    { key: 'cred', label: 'Credentials', type: 'textarea' as const, value: existing?.cred ?? '' },
  ];

  return (
    <>
      <div style={{ display: 'flex', marginBottom: 18 }}>
        <button
          type="button"
          className="adm-btn"
          style={{ marginLeft: 'auto' }}
          onClick={() =>
            openModal({
              title: 'Add team member',
              fields: fields(),
              save: (values) => {
                if (!values.name) {
                  toast('Name required');
                  return;
                }
                push('team', {
                  name: String(values.name),
                  title: String(values.title || ''),
                  cred: String(values.cred || ''),
                  bg: '#6E1423',
                  leads: 0,
                });
                toast('Team member added');
              },
            })
          }
        >
          + Add member
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
        {state.team.map((member) => (
          <div key={member.id} className="adm-card">
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span className="adm-avatar" style={{ background: member.bg, width: 44, height: 44, fontSize: 15 }} aria-hidden="true">
                {initials(member.name)}
              </span>
              <div style={{ minWidth: 0 }}>
                <div className="adm-strong" style={{ fontSize: 16 }}>
                  {member.name}
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--maroon-800)', fontWeight: 600 }}>{member.title}</div>
                <div className="adm-muted" style={{ fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>
                  {member.cred}
                </div>
              </div>
            </div>
            <div className="adm-actions" style={{ marginTop: 14 }}>
              <span className="adm-muted" style={{ marginRight: 'auto', fontSize: 12.5 }}>
                {member.leads} active {member.leads === 1 ? 'lead' : 'leads'}
              </span>
              <button
                type="button"
                className="adm-btn adm-btn--ghost adm-btn--sm"
                onClick={() =>
                  openModal({
                    title: 'Edit team member',
                    fields: fields(member),
                    save: (values) => {
                      patch('team', member.id, {
                        name: String(values.name),
                        title: String(values.title),
                        cred: String(values.cred),
                      });
                      toast('Saved');
                    },
                  })
                }
              >
                Edit
              </button>
              <button
                type="button"
                className="adm-btn adm-btn--danger adm-btn--sm"
                onClick={() => {
                  remove('team', member.id);
                  toast('Removed');
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
