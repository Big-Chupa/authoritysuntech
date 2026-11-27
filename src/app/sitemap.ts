import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authoritysuntech.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  let dynamicProductRoutes: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    const products = await Product.find({}, '_id updatedAt').lean();
    if (products && products.length > 0) {
      dynamicProductRoutes = products.map((product: any) => ({
        url: `${baseUrl}/products/${product._id}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    // Graceful fallback during static build if database is unreachable
    console.warn('Sitemap: MongoDB connection skipped during build, using static routes.');
  }

  return [...staticRoutes, ...dynamicProductRoutes];
}
