import { useState, type FormEvent } from "react";
import { contact } from "../data/content";

const reasons = [
  { value: "association", label: "Conocer y participar de la asociación", phoneIndex: 1 },
  { value: "training", label: "Capacitaciones y talleres de LSA", phoneIndex: 1 },
  { value: "activity", label: "Invitar a Berenice a una actividad", phoneIndex: 0 },
  { value: "book", label: "Consultar por el libro", phoneIndex: 0 },
  { value: "other", label: "Otra consulta", phoneIndex: 1 },
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState<(typeof reasons)[number]["value"]>("association");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = reasons.find((item) => item.value === reason) ?? reasons[0];
    const text = `Hola, soy ${name}. Motivo de mi consulta: ${selected.label}.\n\n${message}`;
    const phone = contact.phones[selected.phoneIndex].international;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setStatus("sent");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input type="text" name="nombre" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" />
      </label>
      <label>
        Motivo de la consulta
        <select name="motivo" value={reason} onChange={(event) => setReason(event.target.value as typeof reason)}>
          {reasons.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </label>
      <label>
        Mensaje
        <textarea name="mensaje" required rows={4} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Contanos en qué podemos ayudarte" />
      </label>
      <button type="submit" className="button button--signal">Enviar por WhatsApp <span aria-hidden="true">↗</span></button>
      {status === "sent" ? <p className="contact-form__status" role="status">Se abrió WhatsApp con tu mensaje listo para enviar.</p> : null}
    </form>
  );
}
