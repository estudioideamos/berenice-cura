import { useRef } from "react";
import { blogPosts } from "../data/blog";
import { pageUrl } from "../utils/routes";

const asset = (name: string) => import.meta.env.BASE_URL + "assets/" + name;

export function BlogHighlights() {
  const track = useRef<HTMLDivElement>(null);
  const highlightedPosts = blogPosts.filter((post) => post.featured).slice(0, 6);
  const visiblePosts = highlightedPosts.length > 0 ? highlightedPosts : blogPosts.slice(0, 6);
  const move = (direction: number) => {
    const width = track.current?.getBoundingClientRect().width ?? 360;
    track.current?.scrollBy({ left: direction * width * .82, behavior: "smooth" });
  };

  return (
    <section className="blog-preview section" aria-labelledby="blog-preview-title">
      <div className="shell blog-preview__header">
        <div>
          <p className="eyebrow">Blog y novedades</p>
          <h2 id="blog-preview-title">Ideas, recursos y acciones que siguen construyendo comunidad.</h2>
        </div>
        <div className="blog-preview__controls">
          <button type="button" onClick={() => move(-1)} aria-label="Ver publicaciones anteriores">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Ver publicaciones siguientes">→</button>
        </div>
      </div>
      <div className="blog-preview__viewport shell" ref={track}>
        {visiblePosts.map((post, index) => (
          <article className="blog-card" key={post.slug}>
            <a className="blog-card__image" href={pageUrl("blog-y-novedades") + "?entrada=" + encodeURIComponent(post.slug)}>
              <img src={asset(post.image)} width="960" height="640" loading="lazy" alt={post.imageAlt} />
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </a>
            <p>{post.category}</p>
            <h3><a href={pageUrl("blog-y-novedades") + "?entrada=" + encodeURIComponent(post.slug)}>{post.title}</a></h3>
            <p>{post.summary}</p>
          </article>
        ))}
      </div>
      <div className="shell blog-preview__footer">
        <a className="button button--ghost" href={pageUrl("blog-y-novedades")}>Ver todo el blog <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
