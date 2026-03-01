"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function AstrologyScroll() {
  const searchParams = useSearchParams();
  const burc = searchParams.get("burc");

  useEffect(() => {
    if (burc) {
      // Biraz gecikme ekleyelim ki DOM güncellenmiş olsun
      const timer = setTimeout(() => {
        const element = document.getElementById("astro-result");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [burc]);

  return null;
}
