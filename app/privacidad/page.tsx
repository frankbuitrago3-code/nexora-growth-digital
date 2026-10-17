import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad y cookies",
  description: "Información sobre el tratamiento de datos y las cookies de NEXORA.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-header">
        <Link className="brand" href="/" aria-label="NEXORA, inicio"><span className="brand-mark">N<span>.</span></span><span className="brand-word">NEXORA<small>GROWTH & DIGITAL</small></span></Link>
        <Link href="/">← Volver al inicio</Link>
      </div>
      <article className="legal-content">
        <p className="section-label"><span>INFORMACIÓN LEGAL</span></p>
        <h1>Privacidad y cookies</h1>
        <p className="legal-warning"><strong>Antes de publicar:</strong> NEXORA es un nombre provisional. Completa y revisa esta política con los datos legales reales de la persona o entidad responsable y con asesoría aplicable a los países donde operes. No publiques datos de ejemplo.</p>
        <p><strong>Última actualización:</strong> pendiente de revisión antes de lanzamiento.</p>

        <h2>1. Responsable del tratamiento</h2>
        <p><strong>Responsable:</strong> [nombre legal o razón social del titular].<br /><strong>Domicilio:</strong> [dirección profesional o domicilio legal requerido].<br /><strong>Correo de privacidad:</strong> [correo de contacto que debe configurarse antes del lanzamiento].</p>

        <h2>2. Datos que solicitamos y para qué</h2>
        <p>El formulario puede recoger nombre y apellidos, correo electrónico, teléfono, dirección de la web del negocio y el mensaje que escribas. Usamos esos datos para recibir, revisar y responder a tu solicitud de estrategia. No incluyas contraseñas, datos de salud ni otra información sensible.</p>
        <p>La base jurídica y el plazo de conservación deben ser revisados y completados por el responsable según la jurisdicción aplicable y la forma real en que se gestionan las solicitudes. Los datos no deben conservarse más tiempo del necesario para atender la consulta y cumplir las obligaciones aplicables.</p>

        <h2>3. Destinatarios y proveedores</h2>
        <p>El envío de formularios, cuando está habilitado, se procesa en el servidor y utiliza Resend para entregar el aviso al equipo y el correo de recepción a quien consulta. Configura y verifica su región de tratamiento, contrato y condiciones antes del lanzamiento. No se venden los datos personales.</p>

        <h2>4. Seguridad y derechos</h2>
        <p>El formulario utiliza una conexión segura cuando el sitio se publica con HTTPS. El responsable debe definir cómo atender solicitudes de acceso, rectificación, eliminación, oposición y demás derechos reconocidos por la normativa aplicable, e incluir aquí el procedimiento y la autoridad competente correspondiente.</p>

        <h2 id="cookies">5. Cookies y medición</h2>
        <p>Las cookies o tecnologías de analítica y publicidad permanecen desactivadas hasta que eliges aceptarlas en el aviso de preferencias. Si aceptas y se configuran los identificadores, Google Analytics y Google Ads pueden recibir eventos de navegación y de solicitudes confirmadas. Si rechazas, esas etiquetas no se cargan. La preferencia se guarda en el almacenamiento local del navegador y puedes cambiarla desde el botón «Cookies».</p>
        <p>La URL de agradecimiento por sí sola no registra una conversión: la medición requiere confirmación del servidor y se limita a una vez por solicitud en la sesión del navegador. El almacenamiento estrictamente funcional que permite comprobar dicha confirmación no se usa para crear perfiles publicitarios.</p>

        <h2>6. Cambios y contacto</h2>
        <p>Actualiza esta política cuando cambien el responsable, los proveedores o las finalidades. Para consultas sobre privacidad, utiliza el correo del responsable indicado al inicio.</p>
        <Link className="legal-back" href="/#contacto">Volver al formulario de contacto ↗</Link>
      </article>
    </main>
  );
}
