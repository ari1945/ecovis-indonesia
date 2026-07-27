import AdminShell from '@/components/admin/AdminShell';
import { AdminProvider } from '@/lib/admin/store';

export default function AdminPage() {
  return (
    <AdminProvider>
      <AdminShell />
    </AdminProvider>
  );
}
