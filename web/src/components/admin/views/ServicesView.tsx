'use client';

import { useAdmin } from '@/lib/admin/store';
import type { IndustryRow, ServiceRow } from '@/lib/admin/types';

export default function ServicesView() {
  const { state, patch, remove, push, move, openModal, toast } = useAdmin();

  const serviceForm = (existing?: ServiceRow) => [
    { key: 'name', label: 'Service name', type: 'text' as const, value: existing?.name ?? '' },
    { key: 'tagline', label: 'Tagline', type: 'text' as const, value: existing?.tagline ?? '' },
    { key: 'priority', label: 'Featured (priority)', type: 'toggle' as const, value: existing ? existing.priority : false },
  ];

  return (
    <div className="adm-grid adm-grid--halves">
      <section className="adm-card" style={{ padding: '18px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 14px 12px' }}>
          <h2 className="adm-card-title" style={{ margin: 0 }}>
            Services
          </h2>
          <button
            type="button"
            className="adm-btn adm-btn--sm"
            style={{ marginLeft: 'auto' }}
            onClick={() =>
              openModal({
                title: 'Add service',
                fields: serviceForm(),
                save: (values) => {
                  if (!values.name) {
                    toast('Name required');
                    return;
                  }
                  push('services', {
                    name: String(values.name),
                    tagline: String(values.tagline || ''),
                    priority: Boolean(values.priority),
                    leads: 0,
                  });
                  toast('Service added');
                },
              })
            }
          >
            + Add
          </button>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Leads</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.services.map((service) => (
                <tr key={service.id}>
                  <td>
                    <span className="adm-strong" style={{ display: 'block' }}>
                      {service.name}
                      {service.priority && (
                        <span className="adm-pill" style={{ background: '#F7EBED', color: '#A31631', marginLeft: 8 }}>
                          Priority
                        </span>
                      )}
                    </span>
                    <span className="adm-muted" style={{ fontSize: 12.5 }}>
                      {service.tagline}
                    </span>
                  </td>
                  <td>{service.leads}</td>
                  <td>
                    <div className="adm-actions">
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--icon"
                        aria-label={`Move ${service.name} up`}
                        onClick={() => move('services', service.id, -1)}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--icon"
                        aria-label={`Move ${service.name} down`}
                        onClick={() => move('services', service.id, 1)}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--sm"
                        onClick={() =>
                          openModal({
                            title: 'Edit service',
                            fields: serviceForm(service),
                            save: (values) => {
                              patch('services', service.id, {
                                name: String(values.name),
                                tagline: String(values.tagline),
                                priority: Boolean(values.priority),
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
                          remove('services', service.id);
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
      </section>

      <section className="adm-card" style={{ padding: '18px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 14px 12px' }}>
          <h2 className="adm-card-title" style={{ margin: 0 }}>
            Industries
          </h2>
          <button
            type="button"
            className="adm-btn adm-btn--sm"
            style={{ marginLeft: 'auto' }}
            onClick={() =>
              openModal({
                title: 'Add industry',
                fields: [{ key: 'name', label: 'Industry name', type: 'text', value: '' }],
                save: (values) => {
                  if (!values.name) {
                    toast('Name required');
                    return;
                  }
                  push('industries', { name: String(values.name), pages: 0 });
                  toast('Industry added');
                },
              })
            }
          >
            + Add
          </button>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Industry</th>
                <th>Pages</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.industries.map((industry: IndustryRow) => (
                <tr key={industry.id}>
                  <td className="adm-strong">{industry.name}</td>
                  <td>{industry.pages}</td>
                  <td>
                    <div className="adm-actions">
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--icon"
                        aria-label={`Move ${industry.name} up`}
                        onClick={() => move('industries', industry.id, -1)}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--icon"
                        aria-label={`Move ${industry.name} down`}
                        onClick={() => move('industries', industry.id, 1)}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--danger adm-btn--sm"
                        onClick={() => {
                          remove('industries', industry.id);
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
      </section>
    </div>
  );
}
