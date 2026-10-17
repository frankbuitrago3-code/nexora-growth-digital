"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "nexora:tracking-consent";
const PENDING_CONVERSION_KEY = "nexora:pending-conversion";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
const CONSENT_EVENT = "nexora:consent-updated";

function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readConsent(): "accepted" | "rejected" | null {
  const value = localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

function loadMeasurementScripts() {
  if (typeof window.gtag === "function") return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
  window.gtag("js", new Date());

  if (GA_ID) window.gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false });

  const measurementIds = [GA_ID, ADS_ID?.split("/")[0]].filter(
    (value): value is string => Boolean(value),
  );
  for (const id of new Set(measurementIds)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.append(script);
  }
}

export function CookieConsent() {
  const choice = useSyncExternalStore(subscribeToConsent, readConsent, () => null);
  const [showSettings, setShowSettings] = useState(false);
  const pathname = usePathname();

  const sendPendingConversion = useCallback(() => {
    const submissionId = sessionStorage.getItem(PENDING_CONVERSION_KEY);
    if (!submissionId) return;
    loadMeasurementScripts();
    if (GA_ID) window.gtag?.("event", "generate_lead", { method: "website_form" });
    if (ADS_ID) window.gtag?.("event", "conversion", { send_to: ADS_ID });
    sessionStorage.removeItem(PENDING_CONVERSION_KEY);
  }, []);

  useEffect(() => {
    if (choice !== "accepted") return;
    if (GA_ID || ADS_ID) loadMeasurementScripts();
    sendPendingConversion();
    window.addEventListener("nexora:confirmed-lead", sendPendingConversion);
    return () => window.removeEventListener("nexora:confirmed-lead", sendPendingConversion);
  }, [choice, sendPendingConversion]);

  useEffect(() => {
    if (choice !== "accepted" || !GA_ID) return;
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [choice, pathname]);

  function saveChoice(nextChoice: "accepted" | "rejected") {
    localStorage.setItem(CONSENT_KEY, nextChoice);
    if (window.gtag) {
      window.gtag?.("consent", "update", {
        analytics_storage: nextChoice === "accepted" ? "granted" : "denied",
        ad_storage: nextChoice === "accepted" ? "granted" : "denied",
        ad_user_data: nextChoice === "accepted" ? "granted" : "denied",
        ad_personalization: nextChoice === "accepted" ? "granted" : "denied",
      });
    }
    if (nextChoice === "rejected") {
      sessionStorage.removeItem(PENDING_CONVERSION_KEY);
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setShowSettings(false);
  }

  function reopenSettings() {
    localStorage.removeItem(CONSENT_KEY);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  return (
    <>
      {choice === null && (
        <aside className="consent-banner" aria-label="Preferencias de cookies">
          <div><strong>Tu privacidad importa.</strong><p>Solo activamos analítica y medición publicitaria si lo autorizas. Puedes cambiar de opinión cuando quieras.</p></div>
          <div className="consent-actions">
            <button type="button" className="consent-secondary" onClick={() => saveChoice("rejected")}>Rechazar opcionales</button>
            <button type="button" className="consent-primary" onClick={() => saveChoice("accepted")}>Aceptar analítica y medición</button>
            <button type="button" className="consent-settings" onClick={() => setShowSettings(!showSettings)}>Detalles</button>
          </div>
          {showSettings && <p className="consent-detail">Las cookies técnicas necesarias no se utilizan para publicidad. Si aceptas, Google Analytics y Google Ads pueden recibir eventos de uso y conversiones. <a href="/privacidad#cookies">Más información</a>.</p>}
        </aside>
      )}
      {choice !== null && (
        <button className="consent-reopen" type="button" onClick={reopenSettings} aria-label="Cambiar preferencias de cookies">Cookies</button>
      )}
    </>
  );
}
