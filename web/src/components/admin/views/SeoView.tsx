'use client';

import { useAdmin } from '@/lib/admin/store';

export default function SeoView() {
  const { state, setSeo, patch, setAiDefault, toast } = useAdmin();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <section className="adm-card">
        <h2 className="adm-card-title">Search defaults</h2>
        <div className="adm-field">
          <label className="adm-label" htmlFor="seo-title">
            Title template
          </label>
          <input
            id="seo-title"
            className="adm-input"
            value={state.seo.title}
            onChange={(event) => setSeo({ title: event.target.value })}
          />
        </div>
        <div className="adm-field">
          <label className="adm-label" htmlFor="seo-desc">
            Meta description
          </label>
          <textarea
            id="seo-desc"
            className="adm-textarea"
            value={state.seo.desc}
            onChange={(event) => setSeo({ desc: event.target.value })}
          />
        </div>
        <button type="button" className="adm-btn" onClick={() => toast('Settings saved')}>
          Save settings
        </button>
      </section>

      <section className="adm-card">
        <h2 className="adm-card-title">Integrations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
          {state.integrations.map((integration) => (
            <div
              key={integration.id}
              style={{
                border: '1px solid var(--border-350)',
                borderRadius: 8,
                padding: '14px 16px',
                display: 'flex',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <span
                className="adm-avatar"
                style={{ background: integration.on ? '#6E1423' : '#B0A79F', borderRadius: 8, width: 36, height: 36 }}
                aria-hidden="true"
              >
                {integration.abbr}
              </span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="adm-strong" style={{ fontSize: 14 }}>
                  {integration.name}
                </div>
                <div className="adm-muted" style={{ fontSize: 12.5 }}>
                  {integration.desc}
                </div>
              </div>
              <button
                type="button"
                className={`adm-btn adm-btn--sm ${integration.on ? 'adm-btn--danger' : 'adm-btn--ghost'}`}
                onClick={() => {
                  patch('integrations', integration.id, { on: !integration.on });
                  toast(integration.on ? `${integration.name} disconnected` : `${integration.name} connected`);
                }}
              >
                {integration.on ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="adm-card">
        <h2 className="adm-card-title">AI content providers</h2>
        <p className="adm-muted" style={{ marginTop: -8, marginBottom: 16, fontSize: 13 }}>
          Keys entered here are the configuration surface a production backend would route through. Never ship
          provider keys to the browser — store them server-side.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {state.aiProviders.map((provider) => {
            const isDefault = state.aiDefault === provider.id;
            return (
              <div
                key={provider.id}
                style={{
                  border: `1px solid ${isDefault ? '#E3B6BF' : 'var(--border-350)'}`,
                  background: isDefault ? '#FDF8F9' : '#fff',
                  borderRadius: 8,
                  padding: '14px 16px',
                }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="adm-avatar" style={{ background: provider.color, borderRadius: 8, width: 34, height: 34 }} aria-hidden="true">
                    {provider.abbr}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div className="adm-strong" style={{ fontSize: 14 }}>
                      {provider.name}
                    </div>
                    <div className="adm-muted" style={{ fontSize: 12 }}>
                      {provider.on ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                  <div className="adm-actions" style={{ marginLeft: 'auto' }}>
                    <button
                      type="button"
                      className="adm-btn adm-btn--ghost adm-btn--sm"
                      onClick={() => {
                        setAiDefault(provider.id);
                        toast(`${provider.short} set as default`);
                      }}
                      disabled={isDefault}
                    >
                      {isDefault ? '✓ Default' : 'Set default'}
                    </button>
                    <button
                      type="button"
                      className={`adm-btn adm-btn--sm ${provider.on ? 'adm-btn--danger' : 'adm-btn--ghost'}`}
                      onClick={() => {
                        patch('aiProviders', provider.id, { on: !provider.on });
                        toast(provider.on ? `${provider.short} disabled` : `${provider.short} enabled`);
                      }}
                    >
                      {provider.on ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12, marginTop: 12 }}>
                  <div className="adm-field" style={{ marginBottom: 0 }}>
                    <label className="adm-label" htmlFor={`key-${provider.id}`}>
                      API key
                    </label>
                    <input
                      id={`key-${provider.id}`}
                      className="adm-input"
                      type="password"
                      placeholder={provider.docs}
                      value={provider.key}
                      onChange={(event) => patch('aiProviders', provider.id, { key: event.target.value })}
                    />
                  </div>
                  <div className="adm-field" style={{ marginBottom: 0 }}>
                    <label className="adm-label" htmlFor={`model-${provider.id}`}>
                      Default model
                    </label>
                    <select
                      id={`model-${provider.id}`}
                      className="adm-select"
                      value={provider.model}
                      onChange={(event) => patch('aiProviders', provider.id, { model: event.target.value })}
                    >
                      {provider.models.map((model) => (
                        <option key={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
