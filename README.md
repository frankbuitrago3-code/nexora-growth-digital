# NEXORA — Growth & Digital

Landing page en español para una agencia de publicidad digital, desarrollada con Next.js. Incluye servicios, propuesta de trabajo, metodología, fichas editoriales para futuros casos reales, preguntas frecuentes, formulario validado y páginas independientes de privacidad y agradecimiento.

## Desarrollo local

Requisitos: Node.js 20.9 o superior.

```powershell
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Configurar correo de solicitudes

El formulario no simula un envío. Solo confirma la solicitud y redirige a `/gracias` cuando el servidor consigue enviar los dos correos a través de Resend.

1. Crea una cuenta de Resend y verifica un dominio o remitente autorizado.
2. Copia `.env.example` a `.env.local` en desarrollo. En producción, registra las variables en el panel de la plataforma de hosting.
3. Configura estas variables **solo en el servidor**:
   - `RESEND_API_KEY`: clave privada de Resend. Nunca usar el prefijo `NEXT_PUBLIC_`.
   - `RESEND_FROM_EMAIL`: remitente verificado, por ejemplo `NEXORA <hola@tu-dominio.com>`.
   - `LEADS_TO_EMAIL`: buzón autorizado que recibe el aviso con la solicitud.
   - `NEXT_PUBLIC_CONTACT_EMAIL`: opcional; correo público de alternativa de contacto en la página de agradecimiento.
4. Reinicia el servidor después de modificar variables.
5. Envía una prueba controlada y comprueba el aviso interno, el correo de acuse, la URL de agradecimiento y los registros del proveedor.

Si falta cualquiera de estas variables, la API responde `503`, muestra un error comprensible y **no** navega a la página de confirmación.

## Analítica y consentimiento

- Antes de habilitar analítica, completa `NEXT_PUBLIC_GA_MEASUREMENT_ID` con un ID `G-...`.
- Para Google Ads, completa opcionalmente `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID` con el destino de conversión `AW-.../etiqueta`.
- Define `NEXT_PUBLIC_SITE_URL` con el dominio canónico y HTTPS en producción.
- Las etiquetas de Google se cargan solo cuando la persona acepta la medición. El rechazo no carga las etiquetas; la preferencia se puede cambiar desde el botón «Cookies».
- El evento de lead se produce solo al llegar a `/gracias` con el identificador de una respuesta `201` recibida durante esa sesión y se deduplica por identificador en `sessionStorage`. Una visita directa o refresco de la página no crea otra conversión.
- La medición no está activa hasta configurar los IDs y probarlos en las herramientas de diagnóstico de Google. Adapta la interfaz y el consentimiento a los requisitos legales de tus mercados.

## Privacidad y protección de formularios

- Revisa `/privacidad` con asesoría competente y sustituye los campos pendientes por el responsable legal, dirección, contacto, base jurídica, conservación y derechos aplicables. No publiques el sitio con los campos entre corchetes.
- El servidor valida los campos, restringe el envío al mismo origen, incluye un honeypot y aplica un límite básico de cinco intentos por IP cada 15 minutos. Usa claves de idempotencia del proveedor para reducir duplicados de los dos correos al repetir un envío.
- El límite en memoria es local a cada proceso y no sustituye un servicio distribuido ni un WAF. Antes de campañas públicas, configura límites de solicitudes en tu plataforma o CDN y considera añadir Cloudflare Turnstile u otra mitigación CAPTCHA verificada en servidor.
- Los datos enviados se entregan a Resend y quedan sujetos a la configuración, región, condiciones y retención del proveedor. Revisa esos aspectos y limita el acceso al buzón receptor.
- La casilla de privacidad es obligatoria para enviar esta consulta; el consentimiento de analítica y publicidad es independiente y opcional.

## Publicación y dominio

1. Publica el proyecto en una plataforma que admita Next.js y variables de entorno privadas (por ejemplo, Vercel).
2. Añade las variables del correo, el dominio y, si procede, los IDs de medición.
3. Registra tu dominio en la plataforma y configura los registros DNS que te indique: habitualmente CNAME para `www` y A/ALIAS para el dominio raíz.
4. Configura en Resend los registros DNS requeridos para verificar el dominio de correo (SPF, DKIM y, si corresponde, DMARC).
5. Activa HTTPS, revisa los textos legales, realiza un envío real de prueba y comprueba que el consentimiento y la conversión funcionen antes de iniciar campañas.

## Comprobaciones

```powershell
npm run lint
npm run build
```

## Pendiente antes de lanzamiento

- Nombre legal definitivo, dominio, correo y datos de contacto reales.
- Revisión legal y finalización de la política de privacidad.
- Credenciales de Resend, dominio/remitente verificados y buzón receptor.
- ID de analítica/conversión si se van a medir campañas.
- Vídeo de la agencia y casos de éxito: las fichas visibles son espacios editoriales explícitamente pendientes; no contienen clientes ni resultados inventados.
- Protección anti-spam distribuida (WAF/límites del hosting y, según riesgo, CAPTCHA validado en servidor).

No se han incluido claves, clientes, testimonios ni métricas inventadas.
