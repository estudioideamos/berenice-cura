import { PageIntro } from "../components/PageIntro";
import { contact, contactMessages, whatsappUrl } from "../data/content";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function ContactPage() {
  return (
    <main id="contenido" className="internal-page contact-page">
      <PageIntro
        index="05"
        eyebrow="Abrir una conversación"
        title="Construyamos comunicación accesible"
        description="Elegí el motivo de tu consulta y comunicate directamente con la asociación para resolverla juntos."
      />

      <section className="contact contact-page__options section" aria-labelledby="contact-options-title">
        <h2 className="sr-only" id="contact-options-title">Opciones de contacto</h2>
        <div className="shell contact__actions">
          <a className="contact-card contact-card--primary" href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer"><span>01 / Asociación</span><strong>Conocer y participar</strong><small>WhatsApp · {contact.phones[1].display}</small><i aria-hidden="true">↗</i></a>
          <a className="contact-card" href={whatsappUrl(contactMessages.training, 1)} target="_blank" rel="noreferrer"><span>02 / Capacitaciones</span><strong>Solicitar información</strong><small>Accesibilidad y Lengua de Señas Argentina</small><i aria-hidden="true">↗</i></a>
          <a className="contact-card" href={whatsappUrl(contactMessages.activity)} target="_blank" rel="noreferrer"><span>03 / Actividades</span><strong>Invitar a Berenice</strong><small>Encuentros y sensibilización</small><i aria-hidden="true">↗</i></a>
          <a className="contact-card" href={whatsappUrl(contactMessages.book)} target="_blank" rel="noreferrer"><span>04 / Libro</span><strong>Consultar por un ejemplar</strong><small>WhatsApp · {contact.phones[0].display}</small><i aria-hidden="true">↗</i></a>
        </div>
      </section>

      <section className="contact-page__direct section" aria-labelledby="direct-contact-title">
        <div className="shell contact-page__direct-grid">
          <div>
            <p className="eyebrow">Contacto directo</p>
            <h2 id="direct-contact-title">También podés encontrarnos acá.</h2>
            <dl>
              <div><dt>Correo</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
              <div><dt>WhatsApp</dt><dd><a href={whatsappUrl(contactMessages.association)} target="_blank" rel="noreferrer">{contact.phones[0].display}</a><a href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer">{contact.phones[1].display}</a></dd></div>
              <div><dt>Redes</dt><dd><a href={contact.instagram.url} target="_blank" rel="noreferrer">Instagram {contact.instagram.handle}</a><a href={contact.facebook.url} target="_blank" rel="noreferrer">Facebook {contact.facebook.label}</a></dd></div>
            </dl>
          </div>
          <div className="contact-page__qr">
            <a href={contact.instagram.url} target="_blank" rel="noreferrer"><img src={asset("qr-instagram.webp")} width="720" height="946" loading="lazy" alt="Código QR del Instagram de la asociación" /></a>
            <p>Escaneá para abrir Instagram</p>
          </div>
        </div>
      </section>
    </main>
  );
}
