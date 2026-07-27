'use client';

import { useAdmin } from '@/lib/admin/store';
import { RESOURCE_TYPES } from '@/lib/admin/seed';
import type { Resource } from '@/lib/admin/types';

export default function ResourcesView() {
  const { state, patch, remove, push, openModal, toast } = useAdmin();

  const form = (existing?: Resource) => ({
    title: existing ? 'Edit lead magnet' : 'Add lead magnet',
    fields: [
      { key: 'title', label: 'Title', type: 'text' as const, value: existing?.title ?? '' },
      {
        key: 'type',
        label: 'Type',
        type: 'select' as const,
        value: existing?.type ?? 'GUIDE · PDF',
        options: RESOURCE_TYPES,
      },
      { key: 'gated', label: 'Email-gated (capture leads)', type: 'toggle' as const, value: existing ? existing.gated : true },
    ],
  });

  const add = () =>
    openModal({
      ...form(),
      save: (values) => {
        if (!values.title) {
          toast('Title required');
          return;
        }
        push('resources', {
          title: String(values.title),
          type: String(values.type),
          gated: Boolean(values.gated),
          downloads: 0,
          leads: 0,
        });
        toast('Lead magnet added');
      },
    });

  const edit = (resource: Resource) =>
    openModal({
      ...form(resource),
      save: (values) => {
        patch('resources', resource.id, {
          title: String(values.title),
          type: String(values.type),
          gated: Boolean(values.gated),
        });
        toast('Saved');
      },
    });

  return (
    <>
      <div style={{ display: 'flex', marginBottom: 18 }}>
        <button type="button" className="adm-btn" style={{ marginLeft: 'auto' }} onClick={add}>
          + New lead magnet
        </button>
      </div>

      <div className="adm-card" style={{ padding: '18px 8px' }}>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Type</th>
                <th>Downloads</th>
                <th>Leads</th>
                <th>Gating</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.resources.map((resource) => (
                <tr key={resource.id}>
                  <td className="adm-strong">{resource.title}</td>
                  <td className="adm-muted">{resource.type}</td>
                  <td>{resource.downloads.toLocaleString('en-US')}</td>
                  <td>{resource.leads.toLocaleString('en-US')}</td>
                  <td>
                    <label className="adm-switch">
                      <input
                        type="checkbox"
                        checked={resource.gated}
                        aria-label={`Email gating for ${resource.title}`}
                        onChange={() => {
                          patch('resources', resource.id, { gated: !resource.gated });
                          toast(resource.gated ? 'Gating off' : 'Gating on');
                        }}
                      />
                      {resource.gated ? 'Gated' : 'Open'}
                    </label>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => edit(resource)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--danger adm-btn--sm"
                        onClick={() => {
                          remove('resources', resource.id);
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
