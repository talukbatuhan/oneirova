"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/**
 * Opsiyonel display reklam: `NEXT_PUBLIC_ADSENSE_CLIENT` + `NEXT_PUBLIC_ADSENSE_SLOT` tanımlıysa
 * ins.adsbygoogle doldurulur; değilse CLS için rezerv alan kalır.
 */
export function AdDisplaySlot({ className = "" }: { className?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT?.trim();
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      pushed.current = false;
    }
  }, [client, slot]);

  const reserve = "mx-auto w-full max-w-[728px] min-h-[120px] rounded-xl border border-dashed border-border/60 bg-surface2/20";

  if (!client || !slot) {
    return <div className={`${reserve} ${className}`} aria-hidden />;
  }

  return (
    <div className={`${reserve} overflow-hidden border-border ${className}`} role="complementary" aria-label="Reklam">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
