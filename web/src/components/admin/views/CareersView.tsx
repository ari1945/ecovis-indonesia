'use client';

import { useAdmin } from '@/lib/admin/store';
import type { Job } from '@/lib/admin/types';

export default function CareersView() {
  const { state, patch, remove, push, openModal, toast } = useAdmin();

  const fields = (existing?: Job) => [
    { key: 'role', label: 'Role title', type: 'text' as const, value: existing?.role ?? '' },
    { key: 'dept', label: 'Department', type: 'text' as const, value: existing?.dept ?? '' },
    { key: 'location', label: 'Location', type: 'text' as const, value: existing?.location ?? '' },
    { key: 'open', label: 'Open for applications', type: 'toggle' as const, value: existing ? existing.open : true },
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
              title: 'Add role',
              fields: fields(),
              save: (values) => {
                if (!values.role) {
                  toast('Role title required');
                  return;
                }
                push('jobs', {
                  role: String(values.role),
                  dept: String(values.dept || 'General'),
                  location: String(values.location || 'Jakarta'),
                  applicants: 0,
                  open: Boolean(values.open),
                });
                toast('Role posted');
              },
            })
          }
        >
          + New role
        </button>
      </div>

      <div className="adm-card" style={{ padding: '18px 8px' }}>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Department</th>
                <th>Location</th>
                <th>Applicants</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.jobs.map((job) => (
                <tr key={job.id}>
                  <td className="adm-strong">{job.role}</td>
                  <td className="adm-muted">{job.dept}</td>
                  <td className="adm-muted">{job.location}</td>
                  <td>{job.applicants}</td>
                  <td>
                    <span
                      className="adm-pill"
                      style={job.open ? { background: '#E9F0E4', color: '#5E7A3E' } : { background: '#F0ECEA', color: '#9A9089' }}
                    >
                      {job.open ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--sm"
                        onClick={() =>
                          openModal({
                            title: 'Edit role',
                            fields: fields(job),
                            save: (values) => {
                              patch('jobs', job.id, {
                                role: String(values.role),
                                dept: String(values.dept),
                                location: String(values.location),
                                open: Boolean(values.open),
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
                        className="adm-btn adm-btn--ghost adm-btn--sm"
                        onClick={() => {
                          patch('jobs', job.id, { open: !job.open });
                          toast(job.open ? 'Role closed' : 'Role opened');
                        }}
                      >
                        {job.open ? 'Close' : 'Reopen'}
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--danger adm-btn--sm"
                        onClick={() => {
                          remove('jobs', job.id);
                          toast('Deleted');
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
