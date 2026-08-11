import { useEffect, useRef } from "react";
import { blogPosts } from "../data/blog";
import { pageUrl } from "../utils/routes";

const asset = (name: string) => import.meta.env.BASE_URL + "assets/" + name;
const AUTOPLAY_DELAY = 4500;

export function BlogHighlights() {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const highlightedPosts = blogPosts.filter((post) => post.featured).slice(0, 6);
  const visiblePosts = highlightedPosts.length > 0 ? highlightedPosts : blogPosts.slice(0, 6);
  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".blog-card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const step = card.getBoundingClientRect().width + gap;
    if (direction > 0 && el.scrollLeft + el.getBoundingClientRect().width >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (visiblePosts.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!paused.current) move(1);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visiblePosts.length]);

  return (
    <section
      className="blog-preview section"
      aria-labelledby="blog-preview-title"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onFocus={() => { paused.current = true; }}
      onBlur={() => { paused.current = false; }}
    >
      <div className="shell blog-preview__header">
        <div>
          <p className="eyebrow">Blog y novedades</p>
          <h2 id="blog-preview-title">Ideas, recursos y acciones que siguen construyendo comunidad.</h2>
        </div>
        <div className="blog-preview__actions">
          <a className="button button--ghost" href={pageUrl("blog-y-novedades")}>Ver todo el blog <span aria-hidden="true">↗</span></a>
          <div className="blog-preview__controls">
            <button type="button" onClick={() => move(-1)} aria-label="Ver publicaciones anteriores">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Ver publicaciones siguientes">→</button>
          </div>
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
    </section>
  );
}
