'use client';

import { useState } from 'react';
import { useAdmin } from '@/lib/admin/store';
import type { Block } from '@/lib/admin/types';

const TABS = ['all', 'published', 'draft'] as const;
type Tab = (typeof TABS)[number];

const STARTER_BLOCKS: Block[] = [
  { type: 'Heading', text: '' },
  { type: 'Paragraph', text: '' },
];

export default function InsightsView() {
  const { state, patch, remove, push, openEditor, openModal, toast } = useAdmin();
  const [tab, setTab] = useState<Tab>('all');

  const rows = state.articles.filter((article) =>
    tab === 'all' ? true : tab === 'published' ? article.published : !article.published,
  );

  const draftWithAi = () =>
    openModal({
      title: 'Draft with AI',
      fields: [
        { key: 'title', label: 'Working title', type: 'text', value: '' },
        { key: 'category', label: 'Category', type: 'text', value: 'Tax' },
      ],
      save: (values) => {
        if (!values.title) {
          toast('Title required');
          return;
        }
        const title = String(values.title);
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        push('articles', {
          title,
          category: String(values.category || 'Tax'),
          author: 'Ari Wibowo',
          date: '—',
          views: '0',
          published: false,
          slug,
        });
        toast('Draft created — open it to generate content');
      },
    });

  return (
    <>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid var(--border-350)', borderRadius: 8, padding: 4 }}>
          {TABS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={tab === option}
              onClick={() => setTab(option)}
              className={`adm-btn adm-btn--sm ${tab === option ? '' : 'adm-btn--ghost'}`}
              style={tab === option ? undefined : { border: 'none' }}
            >
              {option === 'all' ? 'All' : option === 'published' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
        <button type="button" className="adm-btn" style={{ marginLeft: 'auto' }} onClick={draftWithAi}>
          ✦ Draft with AI
        </button>
      </div>

      <div className="adm-card" style={{ padding: '18px 8px' }}>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th>Author</th>
                <th>Published</th>
                <th>Views</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((article) => (
                <tr key={article.id}>
                  <td>
                    <span className="adm-strong" style={{ display: 'block' }}>
                      {article.title}
                    </span>
                    <span className="adm-muted" style={{ fontSize: 12.5 }}>
                      /{article.slug}
                    </span>
                  </td>
                  <td>
                    <span className="adm-pill" style={{ background: '#F7EBED', color: '#A31631' }}>
                      {article.category}
                    </span>
                  </td>
                  <td className="adm-muted">{article.author}</td>
                  <td className="adm-muted">{article.date}</td>
                  <td className="adm-muted">{article.views}</td>
                  <td>
                    <div className="adm-actions">
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--sm"
                        onClick={() =>
                          openEditor({
                            kind: 'article',
                            id: article.id,
                            title: article.title,
                            slug: article.slug,
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
                          patch('articles', article.id, {
                            published: !article.published,
                            date: article.published ? '—' : 'Just now',
                          });
                          toast(article.published ? 'Unpublished' : 'Published');
                        }}
                      >
                        {article.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        type="button"
                        className="adm-btn adm-btn--danger adm-btn--sm"
                        onClick={() => {
                          remove('articles', article.id);
                          toast('Article deleted');
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
          {rows.length === 0 && <div className="adm-empty">Nothing here yet.</div>}
        </div>
      </div>
    </>
  );
}
