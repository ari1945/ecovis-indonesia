export type Stage = 'new' | 'contacted' | 'consultation' | 'client' | 'lost';

export type Note = {
  author: string;
  text: string;
  time: string;
  initials: string;
  bg: string;
};

export type Lead = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  stage: Stage;
  assigned: string;
  value: number;
  source: string;
  priority: 'high' | 'medium' | 'low';
  ago: string;
  followUp: string;
  message: string;
  notes: Note[];
};

export type Article = {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  views: string;
  published: boolean;
  slug: string;
};

export type PageRow = {
  id: number;
  title: string;
  url: string;
  slug: string;
  blocks: number;
  pub: boolean;
};

export type Resource = {
  id: number;
  type: string;
  title: string;
  downloads: number;
  leads: number;
  gated: boolean;
};

export type ServiceRow = {
  id: number;
  name: string;
  tagline: string;
  priority: boolean;
  leads: number;
};

export type IndustryRow = { id: number; name: string; pages: number };

export type Job = {
  id: number;
  role: string;
  dept: string;
  location: string;
  applicants: number;
  open: boolean;
};

export type MediaAsset = { id: number; name: string; kind: string; size: string; bg: string };

export type Subscriber = {
  id: number;
  email: string;
  segment: string;
  source: string;
  joined: string;
};

export type TeamMember = {
  id: number;
  name: string;
  title: string;
  cred: string;
  bg: string;
  leads: number;
};

export type Integration = { id: number; abbr: string; name: string; desc: string; on: boolean };

export type AiProvider = {
  id: string;
  name: string;
  short: string;
  abbr: string;
  color: string;
  docs: string;
  models: string[];
  model: string;
  key: string;
  on: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: string;
  status: string;
};

/** A section in the block-based page/article editor. */
export type Block = { type: string; text: string };

export type EditorTarget =
  | { kind: 'page'; id: number; title: string; slug: string; blocks: Block[] }
  | { kind: 'article'; id: number; title: string; slug: string; blocks: Block[] };

export type View =
  | 'dashboard'
  | 'leads'
  | 'pages'
  | 'insights'
  | 'resources'
  | 'services'
  | 'careers'
  | 'media'
  | 'newsletter'
  | 'team'
  | 'seo'
  | 'users';

export type ModalField = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'toggle' | 'select';
  value: string | boolean;
  options?: string[];
};

export type Modal = {
  title: string;
  fields: ModalField[];
  save: (values: Record<string, string | boolean>) => void;
};
