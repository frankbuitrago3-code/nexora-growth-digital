import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const leadSchema = z.object({
  submissionId: z.string().uuid("La solicitud no es válida."),
  fullName: z.string().trim().min(2, "Escribe tu nombre y apellidos.").max(120),
  email: z.email("Introduce un correo electrónico válido.").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Introduce un teléfono válido.")
    .max(32)
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15 && /^[+\d().\s-]+$/.test(value);
    }, "Introduce un teléfono válido, incluyendo el prefijo internacional si corresponde."),
  website: z
    .url("Introduce una URL completa, por ejemplo https://tusitio.com.")
    .max(2048)
    .refine((value) => {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    }, "La URL debe comenzar con http:// o https://."),
  message: z.string().trim().min(10, "Cuéntanos un poco más sobre tu reto.").max(3000),
  privacyAccepted: z.literal(true, {
    error: "Debes aceptar el uso de tus datos para responder a esta solicitud.",
  }),
  websiteConfirm: z.string().max(0, "No se pudo validar la solicitud."),
});

type Lead = z.infer<typeof leadSchema>;

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 10_000;

function json(data: object, status: number) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (rateLimits.size > 1000) {
      for (const [entry, limit] of rateLimits) {
        if (limit.resetAt <= now) rateLimits.delete(entry);
      }
    }
    return true;
  }
  if (current.count >= MAX_REQUESTS) return false;
  current.count += 1;
  return true;
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || forwardedFor || "unknown";
}

function fieldErrors(error: z.ZodError) {
  return error.issues.reduce<Record<string, string>>((fields, issue) => {
    const field = issue.path[0];
    if (typeof field === "string" && !fields[field]) fields[field] = issue.message;
    return fields;
  }, {});
}

function leadText(lead: Lead) {
  return [
    `Nombre: ${lead.fullName}`,
    `Correo: ${lead.email}`,
    `Teléfono: ${lead.phone}`,
    `Web del negocio: ${lead.website}`,
    "",
    "¿Qué deberíamos saber para preparar tu estrategia?",
    lead.message,
    "",
    `Referencia de solicitud: ${lead.submissionId}`,
    "La persona aceptó la política de privacidad para recibir respuesta a esta solicitud.",
  ].join("\n");
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || requestUrl.protocol.slice(0, -1);
  const expectedOrigin = host ? `${protocol}://${host}` : requestUrl.origin;
  if (origin && origin !== requestUrl.origin && origin !== expectedOrigin) {
    return json({ error: "No se pudo procesar la solicitud." }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ error: "La solicitud supera el tamaño permitido." }, 413);
  }

  if (!consumeRateLimit(getClientKey(request))) {
    return json(
      { error: "Has enviado varias solicitudes recientemente. Espera unos minutos e inténtalo de nuevo." },
      429,
    );
  }

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) {
      return json({ error: "No pudimos leer el formulario. Revisa los campos e inténtalo de nuevo." }, 400);
    }
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ error: "La solicitud supera el tamaño permitido." }, 413);
      }
      chunks.push(value);
    }
    const payload = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      payload.set(chunk, offset);
      offset += chunk.byteLength;
    }
    body = JSON.parse(new TextDecoder().decode(payload));
  } catch {
    return json({ error: "No pudimos leer el formulario. Revisa los campos e inténtalo de nuevo." }, 400);
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        error: "Revisa los campos marcados antes de volver a enviar.",
        fields: fieldErrors(parsed.error),
      },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const destination = process.env.LEADS_TO_EMAIL;
  if (!apiKey || !from || !destination) {
    return json(
      { error: "El envío de solicitudes todavía no está configurado. Inténtalo de nuevo más tarde." },
      503,
    );
  }

  const lead = parsed.data;
  const resend = new Resend(apiKey);
  const text = leadText(lead);

  try {
    const [teamResult, senderResult] = await Promise.all([
      resend.emails.send(
        {
          from,
          to: [destination],
          replyTo: lead.email,
          subject: "Nueva solicitud de estrategia — NEXORA",
          text,
        },
        { idempotencyKey: `nexora-${lead.submissionId}-team` },
      ),
      resend.emails.send(
        {
          from,
          to: [lead.email],
          replyTo: destination,
          subject: "Hemos recibido tu solicitud — NEXORA",
          text: [
            `Hola, ${lead.fullName}:`,
            "",
            "Gracias por contactar con NEXORA.",
            "",
            "Hemos recibido la información de tu negocio y revisaremos los datos que nos has facilitado para comprender mejor tus necesidades.",
            "",
            "Si corresponde a tu solicitud, nos pondremos en contacto contigo para conocer tus objetivos y explicarte los siguientes pasos.",
            "",
            "Si tienes alguna preferencia sobre el horario o el medio de contacto, puedes responder a este correo.",
            "",
            "Un saludo,",
            "El equipo de NEXORA.",
          ].join("\n"),
        },
        { idempotencyKey: `nexora-${lead.submissionId}-confirmation` },
      ),
    ]);

    if (teamResult.error || senderResult.error) {
      console.error("NEXORA email delivery failed", {
        team: Boolean(teamResult.error),
        confirmation: Boolean(senderResult.error),
      });
      return json(
        { error: "No se pudo confirmar el envío. Puedes intentarlo de nuevo en unos minutos." },
        502,
      );
    }

    return json({ ok: true, submissionId: lead.submissionId }, 201);
  } catch {
    console.error("NEXORA email provider request failed");
    return json(
      { error: "El servicio de correo no está disponible ahora. Inténtalo de nuevo en unos minutos." },
      502,
    );
  }
}
