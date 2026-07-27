import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/content/articles';
import { LANGS } from '@/lib/i18n';
import { SERVICE_SLUGS, SITE } from '@/lib/site';

/** Static marketing routes, relative to a locale prefix. */
const STATIC_PATHS = [
  '',
  '/about',
  '/services',
  '/industries',
  '/insights',
  '/resources',
  '/careers',
  '/contact',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
    ...ARTICLES.map((article) => `/insights/${article.slug}`),
    '/guides/company-establishment',
  ];

  return LANGS.flatMap((lang) =>
    paths.map((path) => ({
      url: `${SITE.url}/${lang}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      // Both language versions are declared as alternates of each other.
      alternates: {
        languages: Object.fromEntries(
          LANGS.map((other) => [other === 'id' ? 'id-ID' : other, `${SITE.url}/${other}${path}`]),
        ),
      },
    })),
  );
}
