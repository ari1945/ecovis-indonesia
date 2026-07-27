'use client';

import { useId, useState } from 'react';

export type Faq = { q: string; a: string };

/** Single-open accordion; the first item starts expanded, as in the prototype. */
export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="faq">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.q} className="faq__item" data-open={isOpen}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={buttonId}
                className="faq__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                {item.q}
                <span className="faq__icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="faq__answer">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
