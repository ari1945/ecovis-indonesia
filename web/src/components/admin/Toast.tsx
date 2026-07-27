'use client';

import { useAdmin } from '@/lib/admin/store';

export default function Toast() {
  const { state } = useAdmin();
  if (!state.toast) return null;
  return (
    <div className="adm-toast" role="status" aria-live="polite">
      {state.toast}
    </div>
  );
}
