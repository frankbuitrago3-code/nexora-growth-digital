import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";

const services = [
  {
    number: "01",
    title: "Google Ads",
    description:
      "Conecta con personas que ya están buscando una solución como la tuya. Planificamos campañas alineadas con tu oferta y tu mercado.",
    icon: "⌕",
  },
  {
    number: "02",
    title: "YouTube Ads",
    description:
      "Presenta tu propuesta en formato audiovisual y llega a audiencias relevantes en los momentos adecuados.",
    icon: "▷",
  },
  {
    number: "03",
    title: "Meta Ads",
    description:
      "Da visibilidad a tu negocio en Facebook e Instagram con campañas pensadas para descubrir, evaluar y volver a conectar.",
    icon: "◉",
  },
  {
    number: "04",
    title: "Estrategia multicanal",
    description:
      "Coordinamos canales solo cuando tiene sentido para tus objetivos, tu mercado y el presupuesto disponible.",
    icon: "⌘",
  },
  {
    number: "05",
    title: "Auditoría de campañas",
    description:
      "Revisamos la estructura, la medición y la inversión para detectar problemas y oportunidades antes de proponer cambios.",
    icon: "⊙",
  },
  {
    number: "06",
    title: "Analítica y conversión",
    description:
      "Ordenamos la medición y buscamos fricciones en el recorrido para que puedas decidir con información más útil.",
    icon: "↗",
  },
];

const approach = [
  "Análisis previo del negocio y su propuesta de valor.",
  "Investigación de mercado, competencia y demanda.",
  "Recomendaciones personalizadas, no paquetes universales.",
  "Medición acordada y optimización basada en datos.",
  "Comunicación clara sobre decisiones, avances y límites.",
];

const process = [
  {
    number: "01",
    title: "Conocemos tu negocio",
    text: "Conversamos sobre tus objetivos, tus clientes, tu oferta y lo que ya has probado.",
    deliverable: "Recibes una primera lectura de tus necesidades.",
  },
  {
    number: "02",
    title: "Analizamos el contexto",
    text: "Estudiamos el mercado, la competencia y tu situación publicitaria y de medición.",
    deliverable: "Identificamos preguntas, oportunidades y posibles limitaciones.",
  },
  {
    number: "03",
    title: "Diseñamos una estrategia",
    text: "Priorizamos acciones y canales según tus objetivos, presupuesto y capacidad operativa.",
    deliverable: "Recibes una propuesta adaptada a tu caso.",
  },
  {
    number: "04",
    title: "Acordamos siguientes pasos",
    text: "Revisamos la propuesta contigo y definimos cómo avanzar, si decides continuar.",
    deliverable: "Tú decides con claridad y sin compromiso implícito.",
  },
];

const caseTemplates = [
  { sector: "Comercio", title: "Proyecto de captación local" },
  { sector: "Servicios profesionales", title: "Proyecto de generación de consultas" },
  { sector: "Educación", title: "Proyecto de inscripción a programas" },
];

const faqs = [
  {
    question: "¿Qué tipo de negocios pueden trabajar con NEXORA?",
    answer:
      "Empresas, emprendedores y profesionales independientes. Antes de recomendar un servicio, comprobamos si los objetivos, el mercado, los recursos y el presupuesto son compatibles con una estrategia de publicidad digital.",
  },
  {
    question: "¿Cómo se desarrolla una estrategia?",
    answer:
      "Empezamos por entender tu negocio y tus objetivos; después analizamos el mercado y la actividad publicitaria. Con ese contexto preparamos recomendaciones priorizadas y explicamos sus supuestos y límites.",
  },
  {
    question: "¿Qué información necesitan para comenzar?",
    answer:
      "Para una primera conversación basta con tus datos de contacto, la web del negocio y una breve descripción del reto. Si avanzamos, podremos solicitar objetivos, públicos, datos de campañas y acceso de solo lectura cuando sea necesario.",
  },
  {
    question: "¿Qué presupuesto publicitario necesito?",
    answer:
      "No hay una cifra universal y no publicamos tarifas sin conocer el caso. El presupuesto depende del mercado, la competencia, los objetivos y el coste de probar y medir los canales adecuados. La inversión en medios se acuerda por separado de los honorarios profesionales.",
  },
  {
    question: "¿Cómo se miden los resultados?",
    answer:
      "Acordamos indicadores relacionados con tus objetivos y revisamos la calidad de la medición antes de interpretar cifras. Las plataformas atribuyen resultados de maneras distintas; explicamos qué puede y qué no puede concluirse de los datos.",
  },
  {
    question: "¿Qué pasa después de enviar el formulario?",
    answer:
      "Si el envío se procesa correctamente, verás una confirmación y recibirás un correo automático. El equipo revisará tu información y, si corresponde, te contactará para conversar sobre los siguientes pasos.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="inicio">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span /> ESTRATEGIA DE PUBLICIDAD DIGITAL</p>
              <h1>Convierte tu inversión digital en <em>oportunidades de negocio.</em></h1>
              <p className="hero-summary">
                Creamos estrategias de publicidad digital adaptadas a tu negocio
                para ayudarte a captar clientes, medir resultados y tomar mejores
                decisiones.
              </p>
              <div className="hero-actions">
                <a className="button button-mint" href="#contacto">
                  Solicitar una estrategia <span aria-hidden="true">↗</span>
                </a>
                <a className="button button-quiet" href="#metodologia">
                  Descubrir cómo trabajamos <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="hero-note">
                Recomendaciones honestas. Sin promesas de resultados garantizados.
              </p>
            </div>
            <div className="hero-visual" aria-label="Identidad visual NEXORA">
              <div className="visual-grid" aria-hidden="true" />
              <div className="brand-emblem" aria-hidden="true">N<span>.</span></div>
              <div className="visual-label">ESTRATEGIA <span>→</span> MEDICIÓN</div>
              <div className="visual-card">
                <span className="visual-card-kicker">OBJETIVO</span>
                <strong>Mejores decisiones.<br />Con datos, no con ruido.</strong>
                <span className="visual-card-line"><i /></span>
                <span className="visual-card-foot">NEXORA / GROWTH & DIGITAL</span>
              </div>
              <div className="visual-index">01 — 04</div>
            </div>
          </div>
          <div className="container hero-bottom">
            <span>PUBLICIDAD CON PROPÓSITO</span><span className="hero-rule" />
            <a href="#servicios" aria-label="Ir a servicios">↓</a>
          </div>
        </section>

        <section className="video-section" aria-labelledby="video-title">
          <div className="container video-layout">
            <div className="video-placeholder">
              <div className="video-mark" aria-hidden="true"><span>▶</span></div>
              <span className="video-stamp">NEXORA / PRESENTACIÓN</span>
              <p>Espacio preparado para una entrevista o vídeo de presentación.</p>
              <span className="video-duration">VÍDEO PRÓXIMAMENTE</span>
            </div>
            <div className="video-copy">
              <p className="section-label"><span>01</span> UNA MIRADA CLARA</p>
              <h2 id="video-title">Estrategia antes que presupuesto.</h2>
              <p>La publicidad puede acercar tu negocio a nuevas oportunidades cuando parte de una comprensión real del cliente, una oferta clara y una medición bien planteada.</p>
              <p>No partimos de una combinación fija de plataformas. Primero entendemos el problema; luego valoramos si la publicidad puede ayudar a resolverlo.</p>
            </div>
          </div>
        </section>

        <section className="services section-pad" id="servicios">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-label"><span>02</span> SERVICIOS</p><h2>Canales distintos.<br /><em>Una estrategia para tu negocio.</em></h2></div>
              <p>Seleccionamos lo que encaja con tus objetivos, mercado y presupuesto. No necesitas contratar todos los servicios.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-card-top"><span>{service.number} / NEXORA</span><span className="service-icon" aria-hidden="true">{service.icon}</span></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#contacto" aria-label={`Consultar sobre ${service.title}`}>Explorar servicio <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="value section-pad" id="agencia">
          <div className="container value-layout">
            <div className="value-heading">
              <p className="section-label"><span>03</span> FORMA DE TRABAJAR</p>
              <h2>Primero entendemos.<br /><em>Después recomendamos.</em></h2>
              <p>Una relación de trabajo útil empieza con preguntas claras, expectativas realistas y decisiones que podemos explicar.</p>
            </div>
            <ul className="value-list">
              {approach.map((item, index) => (
                <li key={item}><span>0{index + 1}</span>{item}<b aria-hidden="true">↗</b></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="method section-pad" id="metodologia">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-label"><span>04</span> METODOLOGÍA</p><h2>Un proceso claro.<br /><em>Siguientes pasos acordados.</em></h2></div>
              <p>Desde tu primer mensaje hasta la propuesta, sabrás qué estamos revisando y qué puedes esperar.</p>
            </div>
            <div className="process-grid">
              {process.map((step) => (
                <article className="process-card" key={step.number}>
                  <span className="process-number">{step.number}</span>
                  <span className="process-arrow" aria-hidden="true">↗</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <div><span>RECIBES</span><p>{step.deliverable}</p></div>
                </article>
              ))}
            </div>
            <p className="process-footnote">Enviar una solicitud no implica contratación. El alcance, los tiempos y las condiciones se acuerdan antes de iniciar cualquier servicio.</p>
          </div>
        </section>

        <section className="cases section-pad" id="casos">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-label"><span>05</span> EXPERIENCIA MEDIBLE</p><h2>Casos reales,<br /><em>cuando podamos documentarlos.</em></h2></div>
              <p>Preferimos publicar evidencia autorizada y contextualizada, no resultados sin fuente ni periodo.</p>
            </div>
            <p className="case-notice"><span aria-hidden="true">i</span> Sección preparada: todavía no hay casos reales autorizados para publicar. Las siguientes fichas son campos editoriales, no resultados de clientes.</p>
            <div className="case-grid">
              {caseTemplates.map((item, index) => (
                <article className="case-card" key={item.sector}>
                  <div className={`case-symbol case-symbol-${index + 1}`} aria-hidden="true">{["↗", "◎", "⌘"][index]}</div>
                  <span className="case-sector">{item.sector.toUpperCase()} / FICHA PENDIENTE</span>
                  <h3>{item.title}</h3>
                  <dl>
                    <div><dt>Situación y reto</dt><dd>Completar con información verificada.</dd></div>
                    <div><dt>Estrategia</dt><dd>Completar con acciones realizadas.</dd></div>
                    <div><dt>Resultados y periodo</dt><dd>Publicar solo con datos autorizados y fuente.</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="story section-pad">
          <div className="container story-layout">
            <div className="story-media">
              <div className="story-monogram" aria-hidden="true">N<span>.</span></div>
              <div className="story-media-label">PRESENTACIÓN DEL EQUIPO</div>
            </div>
            <div className="story-copy">
              <p className="section-label"><span>06</span> LA AGENCIA</p>
              <h2>Una agencia en construcción.<br /><em>Un estándar claro desde el inicio.</em></h2>
              <p>NEXORA nace con una convicción: una buena estrategia debe poder explicarse, medirse y adaptarse a la realidad del negocio.</p>
              <p>Estamos preparando la historia del equipo y una entrevista de presentación. Hasta entonces, preferimos contar con transparencia cómo trabajamos y qué información respalda cada recomendación.</p>
              <div className="values-row"><span>CLARIDAD</span><span>CRITERIO</span><span>RESPONSABILIDAD</span></div>
            </div>
          </div>
        </section>

        <section className="faq section-pad" id="preguntas">
          <div className="container faq-layout">
            <div><p className="section-label"><span>07</span> PREGUNTAS FRECUENTES</p><h2>Lo importante,<br /><em>sin letra pequeña.</em></h2><a className="faq-contact-link" href="#contacto">¿Tienes otra pregunta? Escríbenos <span aria-hidden="true">↗</span></a></div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contacto">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="section-label"><span>08</span> PRIMER PASO</p>
              <h2>Cuéntanos qué quieres <em>conseguir.</em></h2>
              <p>Con tu contexto podemos entender mejor el reto. Si hay encaje, revisaremos contigo qué información hace falta para preparar una propuesta.</p>
              <div className="contact-expectation"><span aria-hidden="true">↗</span><p><strong>¿Qué ocurre después?</strong><br />Al recibir tu solicitud verás una confirmación. Si el envío por correo está configurado, también recibirás un acuse y podremos revisar juntos los siguientes pasos.</p></div>
              <p className="contact-privacy">Usaremos tus datos para responder a esta solicitud. Consulta la <Link href="/privacidad">política de privacidad</Link>. No compartas información sensible en el formulario.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <Link className="brand" href="#inicio" aria-label="NEXORA, inicio"><span className="brand-mark">N<span>.</span></span><span className="brand-word">NEXORA<small>GROWTH & DIGITAL</small></span></Link>
          <p>Estrategia clara.<br />Decisiones con criterio.</p>
          <a href="#inicio">VOLVER ARRIBA <span aria-hidden="true">↑</span></a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} NEXORA</span>
          <nav aria-label="Enlaces legales"><Link href="/privacidad">Privacidad</Link><Link href="/privacidad#cookies">Cookies</Link><a href="#contacto">Contacto</a></nav>
          <span>PUBLICIDAD DIGITAL CON PROPÓSITO</span>
        </div>
      </footer>
    </>
  );
}
