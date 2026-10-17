import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NEXORA — Publicidad digital con estrategia",
    template: "%s | NEXORA",
  },
  description:
    "Diseñamos estrategias de publicidad digital para ayudarte a captar oportunidades, medir resultados y tomar mejores decisiones.",
  applicationName: "NEXORA",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "NEXORA",
    title: "NEXORA — Publicidad digital con estrategia",
    description:
      "Estrategias de publicidad digital adaptadas a los objetivos de tu negocio.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
