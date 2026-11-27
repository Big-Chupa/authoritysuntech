import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.authoritysuntech.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/',
          '/api/*',
          '/cart',
          '/checkout',
          '/dashboard',
          '/dashboard/*',
          '/auth/',
          '/auth/*',
          '/order-success/',
          '/order-success/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
