import type { Metadata } from "next";
import Link from "next/link";
import { ThankYouConfirmation } from "@/components/thank-you-confirmation";

export const metadata: Metadata = {
  title: "Estado de tu solicitud",
  description: "Estado de recepción de tu solicitud a NEXORA.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="thanks-page">
      <div className="thanks-card">
        <Link className="brand thanks-brand" href="/" aria-label="Volver a NEXORA, inicio">
          <span className="brand-mark" aria-hidden="true">N<span>.</span></span>
          <span className="brand-word">NEXORA<small>GROWTH & DIGITAL</small></span>
        </Link>
        <ThankYouConfirmation />
        <Link className="button button-mint" href="/">Volver al inicio <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
