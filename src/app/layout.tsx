import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.authoritysuntech.com'),
  title: {
    default: 'Authority SunTech | Powering Homes & Businesses with Smart Solar Energy',
    template: '%s | Authority SunTech',
  },
  description:
    'Authority SunTech is Kwara State and Nigeria’s leading renewable energy company providing tier-1 solar panels, lithium batteries, hybrid inverters, and professional turn-key installation.',
  keywords: [
    'Authority SunTech',
    'solar panels ilorin kwara state',
    'lithium batteries taiwo road',
    'inverters ogbomosho',
    'solar installation ilorin',
    'clean energy kwara',
    'solar energy nigeria',
    'hybrid inverters ilorin',
  ],
  authors: [{ name: 'Authority SunTech' }],
  creator: 'Authority SunTech',
  publisher: 'Authority SunTech',
  alternates: {
    canonical: 'https://www.authoritysuntech.com',
  },
  openGraph: {
    title: 'Authority SunTech | Solar Energy Solutions',
    description: 'High-quality solar panels, lithium batteries, and inverters in Nigerian Naira.',
    url: 'https://www.authoritysuntech.com',
    siteName: 'Authority SunTech',
    locale: 'en_NG',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0B1329] text-gray-100 font-sans antialiased min-h-screen flex flex-col justify-between">
        <CartProvider>
          <Preloader />
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
