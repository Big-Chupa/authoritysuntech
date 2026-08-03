import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Authority SunTech | Powering Homes & Businesses with Smart Solar Energy',
  description:
    'Authority SunTech is Kwara State and Nigeria’s leading renewable energy company providing tier-1 solar panels, lithium batteries, hybrid inverters, and professional turn-key installation.',
  keywords: [
    'Authority SunTech',
    'solar panels ilorin kwara state',
    'lithium batteries taiwo road',
    'inverters ogbomosho',
    'solar installation ilorin',
    'clean energy kwara',
  ],
  openGraph: {
    title: 'Authority SunTech Solar Energy Solutions',
    description: 'High-quality solar panels, lithium batteries, and inverters in Nigerian Naira.',
    type: 'website',
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
