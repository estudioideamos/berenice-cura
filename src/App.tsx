import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { EditorialMarquee } from "./components/EditorialMarquee";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { BlogHighlights } from "./components/BlogHighlights";
import { AssociationPage } from "./pages/AssociationPage";
import { AuthorPage } from "./pages/AuthorPage";
import { BookPage } from "./pages/BookPage";
import { BrandPage } from "./pages/BrandPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { BlogPage } from "./pages/BlogPage";
import { BlogAdminPage } from "./pages/BlogAdminPage";
import { StorePage } from "./pages/StorePage";
import { ProductPage } from "./pages/ProductPage";
import { CollaborationsPage } from "./pages/CollaborationsPage";
import { currentPage, type SitePage } from "./utils/routes";

const pages: Record<SitePage, () => React.JSX.Element> = {
  inicio: HomePage,
  asociacion: AssociationPage,
  "primero-mis-manos": BrandPage,
  libro: BookPage,
  berenice: AuthorPage,
  contacto: ContactPage,
  "blog-y-novedades": BlogPage,
  tienda: StorePage,
  "tienda/escuchar-en-otros-sentidos": ProductPage,
  "tienda/luna-y-el-puente-de-las-manos": ProductPage,
  colaboraciones: CollaborationsPage,
  admin: BlogAdminPage,
};

export function App() {
  const page = currentPage();
  const Page = pages[page];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -5%" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [page]);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll-progress", String(total > 0 ? window.scrollY / total : 0));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [page]);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <Page />
      {page === "inicio" && <BlogHighlights />}
      <EditorialMarquee />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
