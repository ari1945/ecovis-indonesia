'use client';

import { useState } from 'react';
import { useAdmin } from '@/lib/admin/store';
import type { Block } from '@/lib/admin/types';

const STARTER_BLOCKS: Block[] = [
  { type: 'Heading', text: 'Section heading' },
  { type: 'Paragraph', text: 'Introductory copy for this page section.' },
];

export default function PagesView() {
  const { state, patch, remove, push, openModal, openEditor, toast } = useAdmin();
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();
  const rows = query
    ? state.pageList.filter((page) => `${page.title} ${page.url}`.toLowerCase().includes(query))
    : state.pageList;

  const addPage = () =>
    openModal({
      title: 'New page',
      fields: [
        { key: 'title', label: 'Page title', type: 'text', value: '' },
        { key: 'slug', label: 'URL slug', type: 'text', value: '' },
        { key: 'pub', label: 'Publish now', type: 'toggle', value: false },
      ],
      save: (values) => {
        if (!values.title) {
          toast('Title required');
          return;
        }
        const slug = String(values.slug || String(values.title).toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        push('pageList', { title: String(values.title), url: `/${slug}`, slug, blocks: 0, pub: Boolean(values.pub) });
        toast('Page created');
      },
    });

  return (
    <>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <input
          className="adm-search"
          style={{ marginLeft: 0 }}
          type="search"
          placeholder="Search pages…"
          aria-label="Search pages"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="button" className="adm-btn" style={{ marginLeft: 'auto' }} onClick={addPage}>
          + New page
        </button>
      </div>

      <div className="adm-card" style={{ padding: '18px 8px' }}>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>URL</th>
                <th>Sections</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((page) => (
                <tr key={page.id}>
                  <td className="adm-strong">{page.title}</td>
                  <td className="adm-muted">{page.url}</td>
                  <td>{page.blocks}</td>
                  <td>
                    <span
                      className="adm-pill"
                      style={
                        page.pub
                          ? { background: '#E9F0E4', color: '#5E7A3E' }
                          : { background: '#F0ECEA', color: '#9A9089' }
                      }
                    >
                      {page.pub ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--sm"
                        onClick={() =>
                          openEditor({
                            kind: 'page',
                            id: page.id,
                            title: page.title,
                            slug: page.slug,
                            blocks: STARTER_BLOCKS.map((block) => ({ ...block })),
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--sm"
                        onClick={() => {
                          patch('pageList', page.id, { pub: !page.pub });
                          toast(page.pub ? 'Unpublished' : 'Published');
                        }}
                      >
                        {page.pub ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--danger adm-btn--sm"
                        onClick={() => {
                          remove('pageList', page.id);
                          toast('Page deleted');
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
          {rows.length === 0 && <div className="adm-empty">No pages match “{search}”.</div>}
        </div>
      </div>
    </>
  );
}
