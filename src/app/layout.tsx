import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://proyect-cv.vercel.app'),
  title: {
    default: 'Generador de Currículum Profesional',
    template: 'Generador de Currículum Profesional'
  },
  description: 'Crea tu currículum vitae profesional con inteligencia artificial. Generador de CV online gratuito con plantillas modernas y personalizables. Optimiza tu búsqueda de empleo con un CV perfecto.',
  keywords: [
    'generador cv',
    'curriculum vitae',
    'crear cv online',
    'cv maker',
    'cv con ia',
    'cv inteligencia artificial',
    'plantillas cv',
    'cv profesional',
    'generador curriculum',
    'cv builder',
    'cv pdf',
    'cv gratis'
  ],
  authors: [{ name: 'micolash89' }],
  creator: 'micolash89',
  publisher: 'micolash89',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icons/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icons/icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://proyect-cv.vercel.app',
    title: 'Crea tu Currículum Profesional',
    description: 'Generador de CV profesional con inteligencia artificial. Crea tu currículum vitae perfecto en minutos con nuestras plantillas modernas.',
    siteName: 'Generador de Currículum Profesional',
    images: [{
      url: '/preview.png',
      width: 1200,
      height: 630,
      alt: 'Generador de Currículum Profesional'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de CV Profesional',
    description: 'Crea tu CV profesional con IA. Plantillas modernas y personalizables para destacar tu perfil.',
    images: ['/preview.png'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
      <header>
        <Navigation/>
      </header>
        <Toaster  position="top-right" />
        {children}
      <Footer/>
      </body>
    </html>
  );
}
