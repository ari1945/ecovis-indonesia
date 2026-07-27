'use client';

import { useAdmin } from '@/lib/admin/store';

export default function MediaView() {
  const { state, remove, push, openModal, toast } = useAdmin();

  return (
    <>
      <div style={{ display: 'flex', marginBottom: 18 }}>
        <button
          type="button"
          className="adm-btn"
          style={{ marginLeft: 'auto' }}
          onClick={() =>
            openModal({
              title: 'Upload asset',
              fields: [
                { key: 'name', label: 'File name', type: 'text', value: '' },
                { key: 'kind', label: 'Type', type: 'select', value: 'JPG', options: ['JPG', 'PNG', 'PDF', 'SVG'] },
              ],
              save: (values) => {
                if (!values.name) {
                  toast('File name required');
                  return;
                }
                push('media', {
                  name: String(values.name),
                  kind: String(values.kind),
                  size: '—',
                  bg: '#6E1423',
                });
                toast('Asset uploaded');
              },
            })
          }
        >
          + Upload
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
        {state.media.map((asset) => (
          <figure key={asset.id} className="adm-card" style={{ padding: 0, overflow: 'hidden', margin: 0 }}>
            <div
              style={{
                height: 110,
                background: asset.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 13,
                letterSpacing: '0.1em',
              }}
              aria-hidden="true"
            >
              {asset.kind}
            </div>
            <figcaption style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {asset.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <span className="adm-muted" style={{ fontSize: 12 }}>
                  {asset.size}
                </span>
                <button
                  type="button"
                  className="adm-btn adm-btn--danger adm-btn--sm"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => {
                    remove('media', asset.id);
                    toast('Asset deleted');
                  }}
                >
                  Delete
                </button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
