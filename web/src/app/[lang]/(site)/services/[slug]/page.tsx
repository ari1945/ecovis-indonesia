import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CompanySetupPage from '@/components/CompanySetupPage';
import ServicePage from '@/components/ServicePage';
import { getTemplatedService, TEMPLATED_SERVICES } from '@/lib/content/services';
import { bi, isLang, LANGS, type Lang } from '@/lib/i18n';
import { companySetup } from '@/lib/content/company-setup';

export function generateStaticParams() {
  const slugs = [...Object.keys(TEMPLATED_SERVICES), 'company-setup'];
  return LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : 'en';

  const content = slug === 'company-setup' ? companySetup : getTemplatedService(slug);
  if (!content) return {};

  return {
    title: bi(lang, content.kicker),
    description: bi(lang, content.heroSub),
    alternates: {
      canonical: `/${lang}/services/${slug}`,
      languages: {
        en: `/en/services/${slug}`,
        'id-ID': `/id/services/${slug}`,
        'x-default': `/en/services/${slug}`,
      },
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  if (slug === 'company-setup') {
    return <CompanySetupPage lang={lang} />;
  }

  const content = getTemplatedService(slug);
  if (!content) notFound();

  return <ServicePage lang={lang} content={content} />;
}
