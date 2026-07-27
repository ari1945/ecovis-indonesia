import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
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
