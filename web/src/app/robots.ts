import type { MetadataRoute } from 'next';
import { IS_PRODUCTION_SITE, SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // Preview and staging deployments must never be indexed — they would compete
  // with the production domain for the same content.
  if (!IS_PRODUCTION_SITE) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The admin console and the post-submit confirmation are not for search.
        disallow: ['/admin', '/api', '/en/thank-you', '/id/thank-you'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
