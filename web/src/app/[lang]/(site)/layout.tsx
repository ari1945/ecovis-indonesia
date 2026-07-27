import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { isLang, type Lang } from '@/lib/i18n';

/** Chrome shared by every marketing page: sticky header, main landmark, footer. */
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  return (
    <>
      <SiteHeader lang={lang} />
      {/* Skip-link target. */}
      <div id="main" tabIndex={-1} />
      <main>{children}</main>
      <SiteFooter lang={lang} />
    </>
  );
}
