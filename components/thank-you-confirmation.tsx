"use client";

import { useEffect, useSyncExternalStore } from "react";

const CONFIRMED_KEY = "nexora:confirmed-submission";
const CONVERTED_KEY = "nexora:conversion-sent";
const PENDING_CONVERSION_KEY = "nexora:pending-conversion";
const CONSENT_KEY = "nexora:tracking-consent";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

function isSubmissionConfirmed() {
  const id = new URLSearchParams(window.location.search).get("ref");
  return Boolean(id && sessionStorage.getItem(CONFIRMED_KEY) === id);
}

export function ThankYouConfirmation() {
  const confirmed = useSyncExternalStore(() => () => {}, isSubmissionConfirmed, () => false);

  useEffect(() => {
    if (!confirmed) return;
    const id = new URLSearchParams(window.location.search).get("ref");
    if (!id) return;

    const conversionKey = `${CONVERTED_KEY}:${id}`;
    if (sessionStorage.getItem(conversionKey)) return;
    sessionStorage.setItem(conversionKey, "1");

    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "rejected") return;
    sessionStorage.setItem(PENDING_CONVERSION_KEY, id);
    if (consent === "accepted") {
      window.dispatchEvent(new Event("nexora:confirmed-lead"));
    }
  }, [confirmed]);

  return (
    <div className={`thank-copy${confirmed ? " is-confirmed" : ""}`} role="status" aria-live="polite">
      {confirmed ? (
        <>
          <div className="thanks-icon" aria-hidden="true">✓</div>
          <p className="section-label"><span>SOLICITUD RECIBIDA</span></p>
          <h1>Gracias por contactar con NEXORA.</h1>
          <p>Hemos recibido tu solicitud y el correo de confirmación se ha aceptado para su envío. Revisaremos la información y, si corresponde, nos pondremos en contacto para conversar sobre los siguientes pasos.</p>
          <p>Enviar el formulario no supone aceptar una propuesta ni contratar un servicio.</p>
          {CONTACT_EMAIL && <p>Si necesitas añadir información, puedes escribirnos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>}
        </>
      ) : (
        <>
          <p className="section-label"><span>ESTADO DE LA SOLICITUD</span></p>
          <h1>Aún no podemos confirmar tu solicitud.</h1>
          <p>Esta dirección no acredita un envío reciente. Vuelve al formulario de contacto para enviar tu solicitud.</p>
        </>
      )}
    </div>
  );
}
