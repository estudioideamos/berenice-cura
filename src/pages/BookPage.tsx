import { AudienceExplorer } from "../components/AudienceExplorer";
import { BookVisual } from "../components/BookVisual";
import { FragmentReader } from "../components/FragmentReader";
import { PageIntro } from "../components/PageIntro";
import { book, contactMessages, whatsappUrl } from "../data/content";

export function BookPage() {
  return (
    <main id="contenido" className="internal-page book-page">
      <PageIntro
        index="03"
        eyebrow="Una publicación dentro del proyecto"
        title={`${book.title}: ${book.subtitle}`}
        description={book.description}
      />

      <section className="book-page__presentation section" aria-labelledby="book-purpose-title">
        <div className="shell book-section__grid">
          <div className="book-section__visual"><div className="book-section__halo" aria-hidden="true" /><BookVisual compact /><p className="visual-caption">Portada y contratapa reales</p></div>
          <div className="book-section__content">
            <p className="eyebrow">Propósito del libro</p>
            <h2 id="book-purpose-title">Una invitación a transformar la comunicación.</h2>
            <p className="book-section__lead">{book.purpose}</p>
            <div className="topic-matrix" aria-label="Temas principales">{book.topics.map((topic, index) => <span key={topic}><i>{String(index + 1).padStart(2, "0")}</i>{topic}</span>)}</div>
            <a className="button button--light" href={whatsappUrl(contactMessages.book)} target="_blank" rel="noreferrer">Consultar por el libro <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="purpose section" aria-labelledby="audiences-title">
        <div className="shell book-page__section-heading">
          <p className="eyebrow">A quiénes acompaña</p>
          <h2 id="audiences-title">Un libro para construir puentes.</h2>
          <p>Explorá qué mirada propone para docentes, familias, instituciones y comunidad.</p>
        </div>
        <div className="shell"><AudienceExplorer /></div>
      </section>

      <section className="fragments section" aria-labelledby="fragments-title">
        <div className="shell fragments__header">
          <div><p className="eyebrow">Lector de fragmentos</p><h2 id="fragments-title">Palabras para leer con otros sentidos</h2></div>
          <p>Frases reales de la contratapa del libro.</p>
        </div>
        <div className="shell"><FragmentReader /></div>
      </section>
    </main>
  );
}
