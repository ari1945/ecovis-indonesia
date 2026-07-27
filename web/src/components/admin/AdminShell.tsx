'use client';

import Image from 'next/image';
import { useAdmin, initials } from '@/lib/admin/store';
import type { View } from '@/lib/admin/types';
import DashboardView from './views/DashboardView';
import LeadsView from './views/LeadsView';
import PagesView from './views/PagesView';
import InsightsView from './views/InsightsView';
import ResourcesView from './views/ResourcesView';
import ServicesView from './views/ServicesView';
import CareersView from './views/CareersView';
import MediaView from './views/MediaView';
import NewsletterView from './views/NewsletterView';
import TeamView from './views/TeamView';
import SeoView from './views/SeoView';
import UsersView from './views/UsersView';
import BlockEditor from './BlockEditor';
import ModalHost from './ModalHost';
import Toast from './Toast';

const NAV: Array<{ group: string; items: Array<{ id: View; label: string }> }> = [
  {
    group: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'leads', label: 'Leads & Consultations' },
    ],
  },
  {
    group: 'Content',
    items: [
      { id: 'pages', label: 'Pages' },
      { id: 'insights', label: 'Insights' },
      { id: 'resources', label: 'Resources' },
      { id: 'services', label: 'Services & Industries' },
      { id: 'careers', label: 'Careers' },
      { id: 'media', label: 'Media Library' },
    ],
  },
  {
    group: 'Audience & people',
    items: [
      { id: 'newsletter', label: 'Newsletter' },
      { id: 'team', label: 'Team & Partners' },
    ],
  },
  {
    group: 'System',
    items: [
      { id: 'seo', label: 'SEO & Settings' },
      { id: 'users', label: 'Users & Roles' },
    ],
  },
];

const TITLES: Record<View, { title: string; crumb: string }> = {
  dashboard: { title: 'Dashboard', crumb: 'Overview' },
  leads: { title: 'Leads & Consultations', crumb: 'Overview · CRM' },
  pages: { title: 'Pages', crumb: 'Content' },
  insights: { title: 'Insights', crumb: 'Content · Articles' },
  resources: { title: 'Resources', crumb: 'Content · Lead magnets' },
  services: { title: 'Services & Industries', crumb: 'Content' },
  careers: { title: 'Careers', crumb: 'Content · Job postings' },
  media: { title: 'Media Library', crumb: 'Content' },
  newsletter: { title: 'Newsletter', crumb: 'Audience' },
  team: { title: 'Team & Partners', crumb: 'People' },
  seo: { title: 'SEO & Settings', crumb: 'System' },
  users: { title: 'Users & Roles', crumb: 'System' },
};

const VIEWS: Record<View, React.ComponentType> = {
  dashboard: DashboardView,
  leads: LeadsView,
  pages: PagesView,
  insights: InsightsView,
  resources: ResourcesView,
  services: ServicesView,
  careers: CareersView,
  media: MediaView,
  newsletter: NewsletterView,
  team: TeamView,
  seo: SeoView,
  users: UsersView,
};

export default function AdminShell() {
  const { state, go } = useAdmin();
  const newLeadCount = state.leads.filter((lead) => lead.stage === 'new').length;
  const meta = TITLES[state.view];
  const ActiveView = VIEWS[state.view];

  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        <div className="adm-brand">
          <div className="adm-brand-logo">
            <Image src="/logo.png" alt="Ecovis" width={90} height={24} priority />
          </div>
          <div className="adm-brand-text">
            ADMIN
            <br />
            CONSOLE
          </div>
        </div>

        <nav className="adm-nav" aria-label="Admin sections">
          {NAV.map((group) => (
            <div key={group.group}>
              <div className="adm-nav-group">{group.group.toUpperCase()}</div>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="adm-nav-item"
                  aria-current={state.view === item.id && !state.editor ? 'page' : undefined}
                  onClick={() => go(item.id)}
                  title={item.label}
                >
                  <span className="adm-nav-dot" aria-hidden="true" />
                  <span className="adm-nav-label">{item.label}</span>
                  {item.id === 'leads' && newLeadCount > 0 && (
                    <span className="adm-badge">{newLeadCount}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-user">
          <div className="adm-avatar" style={{ background: '#A31631' }} aria-hidden="true">
            {initials('Ari Wibowo')}
          </div>
          <div className="adm-user-text">
            <div className="adm-user-name">Ari Wibowo</div>
            <div className="adm-user-role">Administrator</div>
          </div>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <div className="adm-crumb">{state.editor ? 'Content · Editor' : meta.crumb}</div>
            <h1 className="adm-title">{state.editor ? state.editor.title : meta.title}</h1>
          </div>
          {!state.editor && (
            <input
              className="adm-search"
              type="search"
              placeholder="Search…"
              aria-label="Search the console"
            />
          )}
        </header>

        <div className="adm-scroll">{state.editor ? <BlockEditor /> : <ActiveView />}</div>
      </div>

      <ModalHost />
      <Toast />
    </div>
  );
}
