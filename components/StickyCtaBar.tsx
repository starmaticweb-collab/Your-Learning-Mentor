"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";

interface StickyCtaBarProps {
  href: string;
  message?: string;
  ctaLabel?: string;
  storageKey?: string;
}

const StickyCtaBar = ({
  href,
  message = "Try Covenant Eyes free for 30 days",
  ctaLabel = "Start Free Trial",
  storageKey = "sticky-cta-covenant-eyes-review",
}: StickyCtaBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.sessionStorage.getItem(storageKey);
    if (!dismissed) {
      const onScroll = () => {
        if (window.scrollY > 300) {
          setVisible(true);
          window.removeEventListener("scroll", onScroll);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [storageKey]);

  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black bg-[#212121] text-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
      role="complementary"
      aria-label="Promotional offer"
    >
      <div className="container mx-auto flex flex-col gap-2 px-3 py-2.5 md:flex-row md:items-center md:justify-between md:gap-4 md:py-3">
        <p className="hidden text-sm font-medium text-white/90 md:block md:text-base">
          {message}
        </p>
        <div className="flex items-center gap-2 md:shrink-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => {
              try {
                window.sessionStorage.setItem(storageKey, "1");
              } catch {
                /* ignore */
              }
            }}
            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground md:w-auto md:px-8 md:py-3 md:text-base"
          >
            {ctaLabel}
            <ArrowRight size={16} />
          </a>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="shrink-0 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyCtaBar;
