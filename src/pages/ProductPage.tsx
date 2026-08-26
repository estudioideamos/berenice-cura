import { PageIntro } from "../components/PageIntro";
import { contact, contactMessages, products, whatsappUrl } from "../data/content";
import { currentPage, pageUrl } from "../utils/routes";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function ProductPage() {
  const page = currentPage();
  const product = products.find((item) => item.page === page) ?? products[0];

  return (
    <main id="contenido" className="internal-page store-page">
      <PageIntro
        index="07"
        eyebrow={`Tienda · ${product.subtitle}`}
        title={product.title}
        description={product.description}
      />

      <section className="brand-page__feature section" aria-labelledby="product-title">
        <div className="shell brand-page__grid">
          <figure className="brand-page__visual" data-reveal>
            <img src={asset(product.image)} width={product.imageWidth} height={product.imageHeight} alt={`Tapa de ${product.title}`} />
            <figcaption>{product.author}</figcaption>
          </figure>
          <div data-reveal>
            <p className="eyebrow">{product.audience}</p>
            <h2 id="product-title">{product.title}</h2>
            <p className="brand-page__lead">{product.longDescription}</p>
            {product.moral ? (
              <blockquote className="product-page__moral">“{product.moral}”</blockquote>
            ) : null}
            <ul className="product-topics">
              {product.topics.map((topic) => <li key={topic}>{topic}</li>)}
            </ul>
            {product.price ? <p className="product-page__price">{product.price}</p> : null}
            <a className="button button--signal collab-cta" href={product.paymentUrl} target="_blank" rel="noreferrer">Comprar por Mercado Pago <span aria-hidden="true">↗</span></a>
            <p className="product-page__note">
              Pago seguro a través de Mercado Pago. Una vez realizado, envianos el comprobante por{" "}
              <a href={whatsappUrl(contactMessages.receipt, 1)} target="_blank" rel="noreferrer">WhatsApp</a>{" "}
              o por{" "}
              <a href={`mailto:${contact.email}`}>correo electrónico</a>{" "}
              para coordinar la entrega.
            </p>
            <a className="text-link product-page__back" href={pageUrl("tienda")}><span aria-hidden="true">←</span> Volver a la tienda</a>
          </div>
        </div>
      </section>
    </main>
  );
}
