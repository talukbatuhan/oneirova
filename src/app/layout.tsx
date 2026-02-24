import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oneirova.com"),
  title: {
    default: "Oneirova",
    template: "%s · Oneirova",
  },
  description:
    "Rüya tabirlerini keşfedin: sade, anlaşılır ve hızlı arama deneyimi.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://oneirova.com",
    siteName: "Oneirova",
    title: "Oneirova",
    description: "Rüya tabirlerini keşfedin: sade, anlaşılır ve hızlı arama deneyimi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oneirova",
    description: "Rüya tabirlerini keşfedin: sade, anlaşılır ve hızlı arama deneyimi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const t = localStorage.getItem('oneirova_theme'); const p = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; const theme = t === 'dark' || t === 'light' ? t : p; if (theme === 'dark') document.documentElement.classList.add('theme-dark'); } catch {} })();",
          }}
        />
        {children}
      </body>
    </html>
  );
}
