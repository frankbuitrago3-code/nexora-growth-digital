"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type FormFields = {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  message: string;
  privacyAccepted: boolean;
  websiteConfirm: string;
};

type ApiResponse = {
  error?: string;
  fields?: Partial<Record<keyof FormFields, string>>;
  submissionId?: string;
};

const initialFields: FormFields = {
  fullName: "",
  email: "",
  phone: "",
  website: "",
  message: "",
  privacyAccepted: false,
  websiteConfirm: "",
};

export function ContactForm() {
  const router = useRouter();
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<NonNullable<ApiResponse["fields"]>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");
  const submissionId = useRef<string | null>(null);

  function updateField(field: keyof FormFields, value: string | boolean) {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrors({});
    setMessage("Estamos enviando tu solicitud de forma segura…");
    submissionId.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, submissionId: submissionId.current }),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        setStatus("error");
        setErrors(result.fields ?? {});
        setMessage(result.error ?? "No pudimos procesar la solicitud. Inténtalo de nuevo.");
        return;
      }

      if (!result.submissionId) {
        setStatus("error");
        setMessage("El servidor no confirmó la recepción. Inténtalo de nuevo más tarde.");
        return;
      }

      sessionStorage.setItem("nexora:confirmed-submission", result.submissionId);
      setFields(initialFields);
      router.push(`/gracias?ref=${encodeURIComponent(result.submissionId)}`);
    } catch {
      setStatus("error");
      setMessage("No pudimos conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading"><span>CUÉNTANOS SOBRE TU NEGOCIO</span><span aria-hidden="true">↘</span></div>
      <div className="form-grid">
        <div className="form-field form-field-wide">
          <label htmlFor="fullName">Nombre y apellidos <span>*</span></label>
          <input id="fullName" name="fullName" autoComplete="name" maxLength={120} required value={fields.fullName} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} onChange={(event) => updateField("fullName", event.target.value)} />
          {errors.fullName && <p className="field-error" id="fullName-error">{errors.fullName}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="email">Correo electrónico <span>*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required value={fields.email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onChange={(event) => updateField("email", event.target.value)} />
          {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Teléfono <span>*</span></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={32} placeholder="+34 600 000 000" required value={fields.phone} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} onChange={(event) => updateField("phone", event.target.value)} />
          {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="website">URL de la página web del negocio <span>*</span></label>
          <input id="website" name="website" type="url" autoComplete="url" maxLength={2048} placeholder="https://tusitio.com" required value={fields.website} aria-invalid={Boolean(errors.website)} aria-describedby={errors.website ? "website-error" : undefined} onChange={(event) => updateField("website", event.target.value)} />
          {errors.website && <p className="field-error" id="website-error">{errors.website}</p>}
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="message">¿Qué deberíamos saber para preparar tu estrategia? <span>*</span></label>
          <textarea id="message" name="message" rows={4} maxLength={3000} required value={fields.message} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-hint"} onChange={(event) => updateField("message", event.target.value)} />
          <p className="field-hint" id="message-hint">Evita incluir contraseñas, datos de salud u otra información sensible.</p>
          {errors.message && <p className="field-error" id="message-error">{errors.message}</p>}
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="websiteConfirm">Deja este campo vacío</label>
        <input id="websiteConfirm" name="websiteConfirm" tabIndex={-1} autoComplete="off" value={fields.websiteConfirm} onChange={(event) => updateField("websiteConfirm", event.target.value)} />
      </div>
      <label className="privacy-check">
        <input type="checkbox" name="privacyAccepted" required checked={fields.privacyAccepted} aria-invalid={Boolean(errors.privacyAccepted)} onChange={(event) => updateField("privacyAccepted", event.target.checked)} />
        <span>He leído la <a href="/privacidad" target="_blank" rel="noreferrer">política de privacidad</a> y autorizo el uso de mis datos para responder a esta solicitud. <b>*</b></span>
      </label>
      {errors.privacyAccepted && <p className="field-error privacy-error">{errors.privacyAccepted}</p>}
      <button className="button button-mint form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando solicitud…" : "Solicitar mi estrategia personalizada"}
        <span aria-hidden="true">{status === "sending" ? "…" : "↗"}</span>
      </button>
      <p className={`form-status${status === "error" ? " is-error" : ""}`} role="status" aria-live="polite">{message}</p>
    </form>
  );
}
