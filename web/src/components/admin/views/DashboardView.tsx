'use client';

import { useAdmin } from '@/lib/admin/store';
import { STAGES } from '@/lib/admin/seed';
import type { Stage } from '@/lib/admin/types';

const KPIS = [
  { label: 'Conversion rate', value: '4.6%', note: 'Sessions → leads (30d)', trend: '+0.4pt' },
  { label: 'Leads this month', value: '186', note: 'MQL across all channels', trend: '+22%' },
  { label: 'MQL → SQL', value: '25.6%', note: 'Leads → consultations', trend: '+1.2pt' },
  { label: 'LCP (speed)', value: '2.1s', note: 'Core Web Vitals — Good', trend: '−0.3s' },
];

const FUNNEL = [
  { name: 'Visitors', count: '18,420', rate: '100%', width: '100%', bg: '#4E0D19' },
  { name: 'Engaged', count: '6,240', rate: '34%', width: '62%', bg: '#6E1423' },
  { name: 'Leads (MQL)', count: '842', rate: '4.6%', width: '34%', bg: '#8E2136' },
  { name: 'Consultations', count: '214', rate: '25%', width: '20%', bg: '#A31631' },
  { name: 'Clients', count: '52', rate: '24%', width: '10%', bg: '#C24A5E' },
];

const CHANNELS = [
  { name: 'Organic Search (SEO)', pct: 45 },
  { name: 'ECOVIS Network Referral', pct: 20 },
  { name: 'LinkedIn & Social', pct: 15 },
  { name: 'Direct / Brand', pct: 12 },
  { name: 'Google Business', pct: 8 },
];

const ACTIVITY = [
  { text: 'New consultation request from James Whitfield (PT PMA)', who: 'Web form', time: '2h ago', dot: '#A31631' },
  { text: '“Coretax e-Faktur migration” article published', who: 'Sinta Halim', time: '5h ago', dot: '#5E7A3E' },
  { text: 'Robert Klein moved to Consultation', who: 'Ari Wibowo', time: '1d ago', dot: '#C98A3A' },
  { text: 'Tax Calendar 2026 guide — 40 new downloads', who: 'System', time: '1d ago', dot: '#3E5E7A' },
  { text: 'Meridian Capital marked as Client', who: 'Ari Wibowo', time: '2d ago', dot: '#5B7A9A' },
  { text: '186 new newsletter subscribers this month', who: 'Mailchimp', time: '2d ago', dot: '#5B7A9A' },
];

export default function DashboardView() {
  const { state, setView } = useAdmin();
  const recent = state.leads.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="adm-grid adm-grid--kpi">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="adm-card">
            <div className="adm-muted">{kpi.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '6px 0 4px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28 }}>{kpi.value}</span>
              <span
                className="adm-pill"
                style={{ background: '#E9F0E4', color: '#5E7A3E' }}
              >
                {kpi.trend}
              </span>
            </div>
            <div className="adm-muted" style={{ fontSize: 12.5 }}>
              {kpi.note}
            </div>
          </div>
        ))}
      </div>

      <div className="adm-grid adm-grid--halves">
        <div className="adm-card">
          <h2 className="adm-card-title">Conversion funnel</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FUNNEL.map((stage) => (
              <div key={stage.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                  <span className="adm-strong">{stage.name}</span>
                  <span className="adm-muted">
                    {stage.count} · {stage.rate}
                  </span>
                </div>
                <div style={{ height: 10, background: '#F2EFEC', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: stage.width, height: '100%', background: stage.bg, borderRadius: 5 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="adm-card">
          <h2 className="adm-card-title">Traffic by channel</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CHANNELS.map((channel) => (
              <div key={channel.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 5 }}>
                  <span>{channel.name}</span>
                  <span className="adm-strong">{channel.pct}%</span>
                </div>
                <div style={{ height: 6, background: '#F2EFEC', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${channel.pct}%`, height: '100%', background: '#6E1423' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="adm-grid adm-grid--halves">
        <div className="adm-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 className="adm-card-title" style={{ margin: 0 }}>
              Recent leads
            </h2>
            <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setView({ view: 'leads' })}>
              View all →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recent.map((lead) => {
              const stage = STAGES[lead.stage as Stage];
              return (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => setView({ view: 'leads', selectedLead: lead.id })}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    padding: '11px 0',
                    borderTop: '1px solid var(--border-100)',
                    background: 'none',
                    border: 'none',
                    borderTopStyle: 'solid',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <span style={{ minWidth: 0 }}>
                    <span className="adm-strong" style={{ display: 'block', fontSize: 14 }}>
                      {lead.name}
                    </span>
                    <span className="adm-muted" style={{ fontSize: 12.5 }}>
                      {lead.company} · {lead.service}
                    </span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span className="adm-pill" style={{ background: stage.bg, color: stage.color }}>
                      {stage.label}
                    </span>
                    <span className="adm-muted" style={{ fontSize: 12 }}>
                      {lead.ago}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="adm-card">
          <h2 className="adm-card-title">Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ACTIVITY.map((item) => (
              <div key={item.text} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: item.dot,
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                <div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.45 }}>{item.text}</div>
                  <div className="adm-muted" style={{ fontSize: 12 }}>
                    {item.who} · {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
