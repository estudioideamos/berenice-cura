import { contactMessages, whatsappUrl } from "../data/content";

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl(contactMessages.association)}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar a la asociación por WhatsApp"
    >
      <span>WhatsApp</span>
      <img src={`${import.meta.env.BASE_URL}assets/whatsapp.svg`} width="32" height="32" alt="" aria-hidden="true" />
    </a>
  );
}
