'use client';

import { useEffect, useId, useState } from 'react';
import { useAdmin } from '@/lib/admin/store';
import type { ModalField } from '@/lib/admin/types';

/** Generic add/edit dialog shared by every collection in the console. */
export default function ModalHost() {
  const { state, closeModal } = useAdmin();
  const modal = state.modal;
  const id = useId();
  const [fields, setFields] = useState<ModalField[]>([]);

  useEffect(() => {
    setFields(modal ? modal.fields.map((field) => ({ ...field })) : []);
  }, [modal]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal, closeModal]);

  if (!modal) return null;

  const update = (index: number, value: string | boolean) =>
    setFields((prev) => prev.map((field, i) => (i === index ? { ...field, value } : field)));

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    const values: Record<string, string | boolean> = {};
    fields.forEach((field) => {
      values[field.key] = field.value;
    });
    modal.save(values);
    closeModal();
  };

  return (
    <>
      <button type="button" className="adm-modal-scrim" aria-label="Close dialog" onClick={closeModal} />
      <form className="adm-modal" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} onSubmit={save}>
        <h2 className="adm-modal-title" id={`${id}-title`}>
          {modal.title}
        </h2>

        {fields.map((field, index) => {
          const fieldId = `${id}-${field.key}`;
          if (field.type === 'toggle') {
            return (
              <div className="adm-field" key={field.key}>
                <label className="adm-switch" htmlFor={fieldId}>
                  <input
                    id={fieldId}
                    type="checkbox"
                    checked={Boolean(field.value)}
                    onChange={(event) => update(index, event.target.checked)}
                  />
                  {field.label}
                </label>
              </div>
            );
          }
          return (
            <div className="adm-field" key={field.key}>
              <label className="adm-label" htmlFor={fieldId}>
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={fieldId}
                  className="adm-textarea"
                  value={String(field.value)}
                  onChange={(event) => update(index, event.target.value)}
                />
              ) : field.type === 'select' ? (
                <select
                  id={fieldId}
                  className="adm-select"
                  value={String(field.value)}
                  onChange={(event) => update(index, event.target.value)}
                >
                  {(field.options ?? []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={fieldId}
                  className="adm-input"
                  value={String(field.value)}
                  onChange={(event) => update(index, event.target.value)}
                />
              )}
            </div>
          );
        })}

        <div className="adm-modal-actions">
          <button type="button" className="adm-btn adm-btn--ghost" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="adm-btn">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
