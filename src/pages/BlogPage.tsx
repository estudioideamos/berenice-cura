import { PageIntro } from "../components/PageIntro";
import { blogPosts } from "../data/blog";
import { pageUrl } from "../utils/routes";

const asset = (name: string) => import.meta.env.BASE_URL + "assets/" + name;

export function BlogPage() {
  const slug = new URLSearchParams(window.location.search).get("entrada");
  const selected = slug ? blogPosts.find((post) => post.slug === slug) : undefined;

  if (selected) {
    return (
      <main id="contenido" className="internal-page blog-page">
        <PageIntro index="06" eyebrow={selected.category} title={selected.title} description={selected.summary} />
        <article className="blog-entry section">
          <div className="shell blog-entry__grid">
            <figure>
              <img src={asset(selected.image)} width="1536" height="1024" alt={selected.imageAlt} />
              {selected.imageCredit && <figcaption>{selected.imageCredit}</figcaption>}
            </figure>
            <div className="blog-entry__body">
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
          </div>
        </article>
      </main>
    );
  }

  return (
    <main id="contenido" className="internal-page blog-page">
      <PageIntro
        index="06"
        eyebrow="La asociación en movimiento"
        title="Blog y novedades"
        description="Ideas, recursos y acciones para seguir construyendo accesibilidad comunicacional, educación e inclusión."
      />
      <section className="blog-index section" aria-labelledby="blog-index-title">
        <div className="shell">
          <div className="blog-index__heading">
            <p className="eyebrow">Publicaciones</p>
            <h2 id="blog-index-title">Comunicación que circula y construye puentes.</h2>
          </div>
          <div className="blog-index__grid">
            {blogPosts.map((post, index) => (
              <article className="blog-card" key={post.slug}>
                <a className="blog-card__image" href={pageUrl("blog-y-novedades") + "?entrada=" + encodeURIComponent(post.slug)}>
                  <img src={asset(post.image)} width="960" height="640" loading={index < 2 ? "eager" : "lazy"} alt={post.imageAlt} />
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </a>
                <p>{post.category}</p>
                <h3><a href={pageUrl("blog-y-novedades") + "?entrada=" + encodeURIComponent(post.slug)}>{post.title}</a></h3>
                <p>{post.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
