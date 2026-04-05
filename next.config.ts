import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/** Admin HTML sayfaları: kök layout’taki inline tema script’i ve Tailwind için kontrollü CSP. */
function buildAdminContentSecurityPolicy(): string {
  const connectSrc = isProd ? "'self' https:" : "'self' https: http: ws: wss: data:";
  const scriptSrc = isProd ? "'self' 'unsafe-inline'" : "'self' 'unsafe-inline' 'unsafe-eval'";
  const parts = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    `connect-src ${connectSrc}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "media-src 'self'",
  ];
  if (isProd) parts.push("upgrade-insecure-requests");
  return parts.join("; ");
}

const adminPageSecurityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: buildAdminContentSecurityPolicy() },
];

const adminApiSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      { source: "/admin", headers: adminPageSecurityHeaders },
      { source: "/admin/:path*", headers: adminPageSecurityHeaders },
      { source: "/api/admin/:path*", headers: adminApiSecurityHeaders },
    ];
  },
};

export default nextConfig;
