import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oneirova.com"),
  title: {
    default: "Oneirova",
    template: "%s · Oneirova",
  },
  description: "Rüyalar, astroloji, numeroloji ve kişilik testleri: kendini keşfetmek için sade bir deneyim.",
  verification: {
    google: "W3Xx9nB9vPXB9lgCKvaHf2k_WxgRoB3PA95I5exM2Lc",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://oneirova.com",
    siteName: "Oneirova",
    title: "Oneirova",
    description: "Rüyalar, astroloji, numeroloji ve kişilik testleri: kendini keşfetmek için sade bir deneyim.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oneirova",
    description: "Rüyalar, astroloji, numeroloji ve kişilik testleri: kendini keşfetmek için sade bir deneyim.",
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
      <body className="antialiased">
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
