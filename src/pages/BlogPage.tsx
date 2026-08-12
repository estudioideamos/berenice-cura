import { PageIntro } from "../components/PageIntro";
import { blogPosts } from "../data/blog";
import { pageUrl } from "../utils/routes";

const asset = (name: string) => import.meta.env.BASE_URL + "assets/" + name;

const PAGE_SIZE = 6;

export function BlogPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("entrada");
  const selected = slug ? blogPosts.find((post) => post.slug === slug) : undefined;

  if (selected) {
    return (
      <main id="contenido" className="internal-page blog-page">
        <PageIntro index="06" eyebrow={selected.category} title={selected.title} description={selected.summary} />
        <article className="blog-entry section">
          <figure className="shell blog-entry__hero">
            <img src={asset(selected.image)} width="1536" height="1024" alt={selected.imageAlt} />
            {selected.imageCredit && <figcaption>{selected.imageCredit}</figcaption>}
          </figure>
          <div className="shell blog-entry__body">
            {selected.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {selected.takeaways && selected.takeaways.length > 0 && (
              <section className="blog-entry__infographic" aria-labelledby="blog-takeaways-title">
                <p className="eyebrow">En síntesis</p>
                <h2 id="blog-takeaways-title">Claves para llevar a la práctica</h2>
                <ol>
                  {selected.takeaways.map((item, index) => (
                    <li key={item}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>
                  ))}
                </ol>
              </section>
            )}
            {selected.sources && selected.sources.length > 0 && (
              <aside className="blog-entry__sources" aria-labelledby="blog-sources-title">
                <h2 id="blog-sources-title">Fuentes para seguir leyendo</h2>
                <ul>{selected.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<span aria-hidden="true"> ↗</span></a></li>)}</ul>
              </aside>
            )}
            <a className="button button--ghost" href={pageUrl("blog-y-novedades")}>Volver a Blog y novedades</a>
          </div>
        </article>
      </main>
    );
  }

  const totalPages = Math.max(1, Math.ceil(blogPosts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(Number(params.get("pagina")) || 1, 1), totalPages);
  const pagePosts = blogPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageHref = (page: number) => pageUrl("blog-y-novedades") + (page > 1 ? "?pagina=" + page : "");

  return (
    <main id="contenido" className="internal-page blog-page">
      <PageIntro
        index="06"
        eyebrow="La asociación en movimiento"
        title="Blog y novedades"
        description="Ideas, recursos y acciones para construir accesibilidad, educación e inclusión."
      />
      <section className="blog-index section" aria-labelledby="blog-index-title">
        <div className="shell">
          <div className="blog-index__heading">
            <p className="eyebrow">Publicaciones</p>
            <h2 id="blog-index-title">Comunicación que circula y construye puentes.</h2>
          </div>
          <div className="blog-index__grid">
            {pagePosts.map((post, index) => (
              <article className="blog-card" key={post.slug}>
                <a className="blog-card__image" href={pageUrl("blog-y-novedades") + "?entrada=" + encodeURIComponent(post.slug)}>
                  <img src={asset(post.image)} width="960" height="640" loading={index < 2 ? "eager" : "lazy"} alt={post.imageAlt} />
                  <span aria-hidden="true">{String((currentPage - 1) * PAGE_SIZE + index + 1).padStart(2, "0")}</span>
                </a>
                <p>{post.category}</p>
                <h3><a href={pageUrl("blog-y-novedades") + "?entrada=" + encodeURIComponent(post.slug)}>{post.title}</a></h3>
                <p>{post.summary}</p>
              </article>
            ))}
          </div>
          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Paginación de publicaciones">
              {currentPage > 1 ? (
                <a className="blog-pagination__arrow" href={pageHref(currentPage - 1)} aria-label="Página anterior">←</a>
              ) : (
                <span className="blog-pagination__arrow" aria-disabled="true" aria-hidden="true">←</span>
              )}
              <ol className="blog-pagination__pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li key={page}>
                    {page === currentPage ? (
                      <span aria-current="page">{String(page).padStart(2, "0")}</span>
                    ) : (
                      <a href={pageHref(page)}>{String(page).padStart(2, "0")}</a>
                    )}
                  </li>
                ))}
              </ol>
              {currentPage < totalPages ? (
                <a className="blog-pagination__arrow" href={pageHref(currentPage + 1)} aria-label="Página siguiente">→</a>
              ) : (
                <span className="blog-pagination__arrow" aria-disabled="true" aria-hidden="true">→</span>
              )}
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
