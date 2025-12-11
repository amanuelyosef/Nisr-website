import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    __turnstileOnLoad?: (() => void) | undefined;
  }
}

type TurnstileProps = {
  siteKey: string;
  action?: string;
  cData?: string;
  theme?: "light" | "dark" | "auto";
  appearance?: "always" | "execute" | "interaction-only";
  size?: "normal" | "compact";
  className?: string;
  onVerify: (token: string) => void;
  onError?: (error: string) => void;
  onExpire?: () => void;
};

const loadTurnstileScript = (): Promise<void> => {
  if (window.turnstile) return Promise.resolve();

  // If loading already started, wait for it.
  if (typeof window.__turnstileOnLoad === "function") {
    return new Promise<void>((resolve) => {
      const prev = window.__turnstileOnLoad;
      window.__turnstileOnLoad = () => {
        prev?.();
        resolve();
      };
    });
  }

  return new Promise<void>((resolve, reject) => {
    window.__turnstileOnLoad = resolve;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__turnstileOnLoad";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Turnstile script"));
    document.head.appendChild(script);
  });
};

export const Turnstile = ({
  siteKey,
  action,
  cData,
  theme = "auto",
  appearance = "interaction-only",
  size = "normal",
  className,
  onVerify,
  onError,
  onExpire,
}: TurnstileProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const renderWidget = async () => {
      try {
        await loadTurnstileScript();
        if (cancelled || !window.turnstile || !containerRef.current) return;

        // Remove existing instance if re-rendering
        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          cData,
          theme,
          appearance,
          size,
          callback: (token: string) => onVerify(token),
          "error-callback": () => onError?.("Turnstile error"),
          "expired-callback": () => onExpire?.(),
        });

        setReady(true);
      } catch (err) {
        setReady(false);
        onError?.(err instanceof Error ? err.message : "Turnstile failed to load");
      }
    };

    renderWidget();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, action, cData, theme, appearance, size, onVerify, onError, onExpire]);

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <div ref={containerRef} className="min-h-[65px]" />
      {!ready && <span className="text-xs text-gray-500">Loading verification…</span>}
    </div>
  );
};
