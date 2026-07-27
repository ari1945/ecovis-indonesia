'use client';

import { initials, useAdmin } from '@/lib/admin/store';
import { ROLE_OPTIONS } from '@/lib/admin/seed';

const PERMISSIONS: Record<string, string> = {
  Administrator: 'Full access — content, leads, users and settings.',
  Editor: 'Create and publish content; read-only on leads and settings.',
  Consultant: 'Own and update assigned leads; no content or settings access.',
};

export default function UsersView() {
  const { state, patch, remove, push, openModal, toast } = useAdmin();

  const counts = ROLE_OPTIONS.map((role) => ({
    role,
    count: state.users.filter((user) => user.role === role).length,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', marginBottom: 2 }}>
        <button
          type="button"
          className="adm-btn"
          style={{ marginLeft: 'auto' }}
          onClick={() =>
            openModal({
              title: 'Invite user',
              fields: [
                { key: 'name', label: 'Full name', type: 'text', value: '' },
                { key: 'email', label: 'Email address', type: 'text', value: '' },
                { key: 'role', label: 'Role', type: 'select', value: 'Editor', options: ROLE_OPTIONS },
              ],
              save: (values) => {
                if (!values.email) {
                  toast('Email required');
                  return;
                }
                push('users', {
                  name: String(values.name || values.email),
                  email: String(values.email),
                  role: String(values.role),
                  active: '—',
                  status: 'Invited',
                });
                toast('Invitation sent');
              },
            })
          }
        >
          + Invite user
        </button>
      </div>

      <div className="adm-grid adm-grid--kpi">
        {counts.map((entry) => (
          <div key={entry.role} className="adm-card">
            <div className="adm-strong" style={{ fontSize: 15 }}>
              {entry.role}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, margin: '4px 0' }}>
              {entry.count}
            </div>
            <div className="adm-muted" style={{ fontSize: 12.5, lineHeight: 1.5 }}>
              {PERMISSIONS[entry.role]}
            </div>
          </div>
        ))}
      </div>

      <div className="adm-card" style={{ padding: '18px 8px' }}>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Last active</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span className="adm-avatar" style={{ background: '#6E1423', width: 30, height: 30 }} aria-hidden="true">
                        {initials(user.name)}
                      </span>
                      <div>
                        <span className="adm-strong" style={{ display: 'block' }}>
                          {user.name}
                        </span>
                        <span className="adm-muted" style={{ fontSize: 12.5 }}>
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      className="adm-select"
                      style={{ width: 'auto', fontSize: 12.5, padding: '5px 8px' }}
                      value={user.role}
                      aria-label={`Role for ${user.name}`}
                      onChange={(event) => {
                        patch('users', user.id, { role: event.target.value });
                        toast(`${user.name} is now ${event.target.value}`);
                      }}
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role}>{role}</option>
                      ))}
                    </select>
                  </td>
                  <td className="adm-muted">{user.active}</td>
                  <td>
                    <span
                      className="adm-pill"
                      style={
                        user.status === 'Active'
                          ? { background: '#E9F0E4', color: '#5E7A3E' }
                          : user.status === 'Invited'
                            ? { background: '#FBF0E4', color: '#B5702A' }
                            : { background: '#F0ECEA', color: '#9A9089' }
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--sm"
                        onClick={() => {
                          const next = user.status === 'Suspended' ? 'Active' : 'Suspended';
                          patch('users', user.id, { status: next });
                          toast(`${user.name} ${next.toLowerCase()}`);
                        }}
                      >
                        {user.status === 'Suspended' ? 'Activate' : 'Suspend'}
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--danger adm-btn--sm"
                        onClick={() => {
                          remove('users', user.id);
                          toast('User removed');
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
        </div>
      </div>
    </div>
  );
}
