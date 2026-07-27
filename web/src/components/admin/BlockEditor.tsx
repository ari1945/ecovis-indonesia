'use client';

import { useState } from 'react';
import { useAdmin } from '@/lib/admin/store';
import { BLOCK_PALETTE } from '@/lib/admin/seed';
import type { Block } from '@/lib/admin/types';

const BLOCK_COLORS: Record<string, string> = {
  Heading: '#6E1423',
  Paragraph: '#9A9089',
  Image: '#3E5E7A',
  Quote: '#B5702A',
  'CTA band': '#A31631',
  'Stat grid': '#5E7A3E',
};

const TONES = ['Professional', 'Conversational', 'Technical', 'Persuasive'];
const LENGTHS = ['Short', 'Medium', 'Long'];

export default function BlockEditor() {
  const { state, setEditor, closeEditor, toast, patch } = useAdmin();
  const editor = state.editor;

  const [prompt, setPrompt] = useState('');
  const [provider, setProvider] = useState(state.aiDefault);
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium');
  const [generating, setGenerating] = useState(false);

  if (!editor) return null;

  const setBlocks = (blocks: Block[]) => setEditor({ ...editor, blocks });

  const updateBlock = (index: number, text: string) =>
    setBlocks(editor.blocks.map((block, i) => (i === index ? { ...block, text } : block)));

  const addBlock = (type: string) => setBlocks([...editor.blocks, { type, text: '' }]);

  const removeBlock = (index: number) => setBlocks(editor.blocks.filter((_, i) => i !== index));

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= editor.blocks.length) return;
    const next = [...editor.blocks];
    [next[index], next[target]] = [next[target], next[index]];
    setBlocks(next);
  };

  const activeProvider = state.aiProviders.find((item) => item.id === provider);

  /**
   * Drafts an article outline locally. The prototype called a live model; a
   * production build would route this through a server action that holds the
   * provider key configured in Settings → AI content providers.
   */
  const generate = () => {
    if (!prompt.trim()) {
      toast('Describe what to write first');
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const topic = prompt.trim();
      const drafted: Block[] = [
        { type: 'Heading', text: topic.replace(/^./, (char) => char.toUpperCase()) },
        {
          type: 'Paragraph',
          text: `[${tone} · ${length} draft — ${activeProvider?.short ?? provider}] Opening paragraph introducing ${topic} and why it matters for businesses operating in Indonesia.`,
        },
        { type: 'Heading', text: 'What the rules say' },
        {
          type: 'Paragraph',
          text: 'Summarise the current regulatory position, the thresholds that apply, and the dates that matter.',
        },
        { type: 'Quote', text: 'A pull quote that captures the single most important practical takeaway.' },
        { type: 'Heading', text: 'What to do next' },
        {
          type: 'Paragraph',
          text: 'Concrete steps a finance or compliance team should take, in the order they should take them.',
        },
        { type: 'CTA band', text: 'Talk to a partner about how this applies to your business.' },
      ];
      setEditor({ ...editor, blocks: drafted });
      setGenerating(false);
      toast('Draft generated — every block is editable');
    }, 600);
  };

  const save = () => {
    if (editor.kind === 'article') {
      patch('articles', editor.id, { title: editor.title, slug: editor.slug });
    } else {
      patch('pageList', editor.id, { title: editor.title, slug: editor.slug, blocks: editor.blocks.length });
    }
    toast('Saved');
    closeEditor();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 18, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
        <div className="adm-card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
            <div className="adm-field" style={{ marginBottom: 0 }}>
              <label className="adm-label" htmlFor="editor-title">
                Title
              </label>
              <input
                id="editor-title"
                className="adm-input"
                value={editor.title}
                onChange={(event) => setEditor({ ...editor, title: event.target.value })}
              />
            </div>
            <div className="adm-field" style={{ marginBottom: 0 }}>
              <label className="adm-label" htmlFor="editor-slug">
                URL slug
              </label>
              <input
                id="editor-slug"
                className="adm-input"
                value={editor.slug}
                onChange={(event) => setEditor({ ...editor, slug: event.target.value })}
              />
            </div>
          </div>
        </div>

        {/* AI assist */}
        <div className="adm-card" style={{ borderColor: '#E3D6D8', background: '#FDFBFA' }}>
          <h2 className="adm-card-title">Write with AI</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 12 }}>
            <div className="adm-field" style={{ marginBottom: 0 }}>
              <label className="adm-label" htmlFor="ai-provider">
                Provider
              </label>
              <select id="ai-provider" className="adm-select" value={provider} onChange={(event) => setProvider(event.target.value)}>
                {state.aiProviders.map((item) => (
                  <option key={item.id} value={item.id} disabled={!item.on}>
                    {item.name}
                    {item.on ? '' : ' (disabled)'}
                  </option>
                ))}
              </select>
            </div>
            <div className="adm-field" style={{ marginBottom: 0 }}>
              <label className="adm-label" htmlFor="ai-model">
                Model
              </label>
              <select id="ai-model" className="adm-select" value={activeProvider?.model} disabled>
                {(activeProvider?.models ?? []).map((model) => (
                  <option key={model}>{model}</option>
                ))}
              </select>
            </div>
            <div className="adm-field" style={{ marginBottom: 0 }}>
              <label className="adm-label" htmlFor="ai-tone">
                Tone
              </label>
              <select id="ai-tone" className="adm-select" value={tone} onChange={(event) => setTone(event.target.value)}>
                {TONES.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="adm-field" style={{ marginBottom: 0 }}>
              <label className="adm-label" htmlFor="ai-length">
                Length
              </label>
              <select id="ai-length" className="adm-select" value={length} onChange={(event) => setLength(event.target.value)}>
                {LENGTHS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="adm-field">
            <label className="adm-label" htmlFor="ai-prompt">
              What should this article cover?
            </label>
            <textarea
              id="ai-prompt"
              className="adm-textarea"
              placeholder="e.g. the 2026 VAT transition rules and what to change in invoicing systems"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
          </div>

          <button type="button" className="adm-btn" onClick={generate} disabled={generating}>
            {generating ? 'Generating…' : '✦ Generate draft'}
          </button>
          <p className="adm-muted" style={{ fontSize: 12, marginTop: 10, marginBottom: 0 }}>
            Generated blocks land in the editor below and stay fully editable. Provider keys are configured in
            Settings → AI content providers.
          </p>
        </div>

        {/* Blocks */}
        <div className="adm-card">
          <h2 className="adm-card-title">Sections</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {editor.blocks.map((block, index) => (
              <div
                key={`${block.type}-${index}`}
                style={{
                  border: '1px solid var(--border-350)',
                  borderLeft: `3px solid ${BLOCK_COLORS[block.type] ?? '#9A9089'}`,
                  borderRadius: 8,
                  padding: '12px 14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span className="adm-crumb" style={{ margin: 0 }}>
                    {block.type}
                  </span>
                  <div className="adm-actions" style={{ marginLeft: 'auto' }}>
                    <button
                      type="button"
                      className="adm-btn adm-btn--ghost adm-btn--icon"
                      aria-label={`Move ${block.type} up`}
                      onClick={() => moveBlock(index, -1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="adm-btn adm-btn--ghost adm-btn--icon"
                      aria-label={`Move ${block.type} down`}
                      onClick={() => moveBlock(index, 1)}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="adm-btn adm-btn--danger adm-btn--icon"
                      aria-label={`Delete ${block.type}`}
                      onClick={() => removeBlock(index)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <textarea
                  className="adm-textarea"
                  aria-label={`${block.type} content`}
                  style={{ minHeight: block.type === 'Paragraph' || block.type === 'Quote' ? 72 : 42 }}
                  value={block.text}
                  onChange={(event) => updateBlock(index, event.target.value)}
                />
              </div>
            ))}
            {editor.blocks.length === 0 && <div className="adm-empty">No sections yet — add one below.</div>}
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
            {BLOCK_PALETTE.map((item) => (
              <button
                key={item.type}
                type="button"
                className="adm-btn adm-btn--ghost adm-btn--sm"
                onClick={() => addBlock(item.type)}
              >
                + {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="adm-card">
          <h2 className="adm-card-title">Search preview</h2>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>
            <div style={{ color: '#1a0dab', fontSize: 16 }}>{editor.title || 'Untitled'}</div>
            <div style={{ color: '#006621', fontSize: 12.5 }}>
              ecovisindonesia.com/{editor.slug || 'slug'}
            </div>
            <div className="adm-muted" style={{ marginTop: 4 }}>
              {editor.blocks.find((block) => block.type === 'Paragraph')?.text.slice(0, 150) ||
                'Add a paragraph block to preview the description.'}
            </div>
          </div>
        </div>

        <div className="adm-card">
          <button type="button" className="adm-btn" style={{ width: '100%' }} onClick={save}>
            Save changes
          </button>
          <button
            type="button"
            className="adm-btn adm-btn--ghost"
            style={{ width: '100%', marginTop: 8 }}
            onClick={closeEditor}
          >
            Cancel
          </button>
        </div>
      </aside>
    </div>
  );
}
