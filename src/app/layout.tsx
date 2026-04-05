import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@/components/Analytics";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f14" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.oneirova.com"),
  title: {
    default: "Oneirova",
    template: "%s · Oneirova",
  },
  description:
    "Rüyalar, astroloji, numeroloji ve kişilik testleri: kendini keşfetmek için sade bir deneyim.",
  verification: {
    google: "W3Xx9nB9vPXB9lgCKvaHf2k_WxgRoB3PA95I5exM2Lc", // Search Console için kalsın
  },
  other: {
    "google-adsense-account": "ca-pub-1180623149281816", // AdSense için asıl gereken bu
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Oneirova",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/icons/icon-192.png" }],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.oneirova.com",
    siteName: "Oneirova",
    title: "Oneirova",
    description:
      "Rüyalar, astroloji, numeroloji ve kişilik testleri: kendini keşfetmek için sade bir deneyim.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oneirova",
    description:
      "Rüyalar, astroloji, numeroloji ve kişilik testleri: kendini keşfetmek için sade bir deneyim.",
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
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const t = localStorage.getItem('oneirova_theme'); const p = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; const theme = t === 'dark' || t === 'light' ? t : p; if (theme === 'dark') document.documentElement.classList.add('theme-dark'); } catch {} })();",
          }}
        />
        <Script
          id="adsense-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1180623149281816"
          crossOrigin="anonymous"
        />
        <Analytics />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}