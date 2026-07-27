'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { SEED, SEO_DEFAULTS } from './seed';
import type {
  AiProvider,
  Article,
  EditorTarget,
  IndustryRow,
  Integration,
  Job,
  Lead,
  MediaAsset,
  Modal,
  PageRow,
  Resource,
  ServiceRow,
  Subscriber,
  TeamMember,
  User,
  View,
} from './types';

type Collections = {
  leads: Lead[];
  articles: Article[];
  pageList: PageRow[];
  resources: Resource[];
  services: ServiceRow[];
  industries: IndustryRow[];
  jobs: Job[];
  media: MediaAsset[];
  subscribers: Subscriber[];
  team: TeamMember[];
  integrations: Integration[];
  aiProviders: AiProvider[];
  users: User[];
};

type CollectionKey = keyof Collections;

type AdminState = Collections & {
  view: View;
  editor: EditorTarget | null;
  selectedLead: number | null;
  modal: Modal | null;
  toast: string;
  seo: { title: string; desc: string };
  aiDefault: string;
};

type AdminApi = {
  state: AdminState;
  go: (view: View) => void;
  setView: (patch: Partial<AdminState>) => void;
  toast: (message: string) => void;
  patch: <K extends CollectionKey>(key: K, id: number | string, values: Partial<Collections[K][number]>) => void;
  remove: (key: CollectionKey, id: number | string) => void;
  push: <K extends CollectionKey>(key: K, item: Omit<Collections[K][number], 'id'>) => void;
  move: (key: CollectionKey, id: number, direction: -1 | 1) => void;
  openModal: (modal: Modal) => void;
  closeModal: () => void;
  openEditor: (target: EditorTarget) => void;
  closeEditor: () => void;
  setEditor: (target: EditorTarget) => void;
  selectLead: (id: number | null) => void;
  setSeo: (patch: Partial<{ title: string; desc: string }>) => void;
  setAiDefault: (id: string) => void;
};

const AdminContext = createContext<AdminApi | null>(null);

let nextId = 10_000;
const makeId = () => nextId++;

/**
 * In-memory store for the admin prototype. State is intentionally not
 * persisted — this console is a UX reference, not a production CMS.
 */
export function AdminProvider({ children, defaultView = 'dashboard' as View }: { children: React.ReactNode; defaultView?: View }) {
  const [state, setState] = useState<AdminState>(() => ({
    ...(SEED as unknown as Collections),
    view: defaultView,
    editor: null,
    selectedLead: null,
    modal: null,
    toast: '',
    seo: { ...SEO_DEFAULTS },
    aiDefault: 'anthropic',
  }));

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((message: string) => {
    setState((prev) => ({ ...prev, toast: message }));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setState((prev) => ({ ...prev, toast: '' })), 2200);
  }, []);

  const api = useMemo<AdminApi>(
    () => ({
      state,
      go: (view) => setState((prev) => ({ ...prev, view, editor: null, selectedLead: null })),
      setView: (patchValues) => setState((prev) => ({ ...prev, ...patchValues })),
      toast,
      patch: (key, id, values) =>
        setState((prev) => ({
          ...prev,
          [key]: (prev[key] as Array<{ id: number | string }>).map((row) =>
            row.id === id ? { ...row, ...values } : row,
          ),
        })),
      remove: (key, id) =>
        setState((prev) => ({
          ...prev,
          [key]: (prev[key] as Array<{ id: number | string }>).filter((row) => row.id !== id),
        })),
      push: (key, item) =>
        setState((prev) => ({
          ...prev,
          [key]: [...(prev[key] as unknown[]), { ...item, id: makeId() }],
        })),
      move: (key, id, direction) =>
        setState((prev) => {
          const list = [...(prev[key] as Array<{ id: number | string }>)];
          const index = list.findIndex((row) => row.id === id);
          const target = index + direction;
          if (index < 0 || target < 0 || target >= list.length) return prev;
          [list[index], list[target]] = [list[target], list[index]];
          return { ...prev, [key]: list };
        }),
      openModal: (modal) => setState((prev) => ({ ...prev, modal })),
      closeModal: () => setState((prev) => ({ ...prev, modal: null })),
      openEditor: (target) => setState((prev) => ({ ...prev, editor: target })),
      closeEditor: () => setState((prev) => ({ ...prev, editor: null })),
      setEditor: (target) => setState((prev) => ({ ...prev, editor: target })),
      selectLead: (id) => setState((prev) => ({ ...prev, selectedLead: id })),
      setSeo: (patchValues) => setState((prev) => ({ ...prev, seo: { ...prev.seo, ...patchValues } })),
      setAiDefault: (id) => setState((prev) => ({ ...prev, aiDefault: id })),
    }),
    [state, toast],
  );

  return <AdminContext.Provider value={api}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminApi {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used inside AdminProvider');
  return context;
}

export const initials = (name: string) =>
  (name || '')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const formatIdr = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
