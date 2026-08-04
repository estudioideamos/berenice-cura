import { useState, type FormEvent } from "react";
import { PageIntro } from "../components/PageIntro";
import { blogRepository, type BlogPost } from "../data/blog";
import { pageUrl } from "../utils/routes";

type GitHubFile = { sha: string; content: string };
type Status = { kind: "idle" | "working" | "success" | "error"; message: string };

const apiHeaders = (token: string) => ({
  Accept: "application/vnd.github+json",
  Authorization: "Bearer " + token,
  "X-GitHub-Api-Version": "2022-11-28",
  "Content-Type": "application/json",
});

const apiUrl = (path: string) =>
  "https://api.github.com/repos/" + blogRepository.owner + "/" + blogRepository.repository + "/contents/" + path;

const encodeText = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
};

const decodeText = (value: string) => {
  const binary = atob(value.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const fileBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result).split(",")[1]);
  reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
  reader.readAsDataURL(file);
});

const slugify = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

async function getRemotePosts(token: string) {
  const response = await fetch(apiUrl(blogRepository.contentPath) + "?ref=" + blogRepository.branch, {
    headers: apiHeaders(token),
  });
  if (!response.ok) throw new Error("No se pudo leer el contenido. Revisá el token y sus permisos.");
  const remote = await response.json() as GitHubFile;
  return { sha: remote.sha, posts: JSON.parse(decodeText(remote.content)) as BlogPost[] };
}

async function putFile(token: string, path: string, content: string, message: string, sha?: string) {
  const response = await fetch(apiUrl(path), {
    method: "PUT",
    headers: apiHeaders(token),
    body: JSON.stringify({ message, content, branch: blogRepository.branch, ...(sha ? { sha } : {}) }),
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(detail?.message || "GitHub no pudo guardar la publicación.");
  }
}

export function BlogAdminPage() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  const publish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") || "").trim();
    const slug = slugify(title);
    const paragraphs = String(data.get("body") || "").split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
    const takeaways = String(data.get("takeaways") || "").split(/\n/).map((item) => item.trim()).filter(Boolean);
    const image = data.get("image");

    if (!token.trim()) {
      setStatus({ kind: "error", message: "Ingresá un token de GitHub con permiso Contents: Read and write." });
      return;
    }
    if (!title || !slug || paragraphs.length === 0) {
      setStatus({ kind: "error", message: "Completá el título y el contenido de la entrada." });
      return;
    }
    if (image instanceof File && image.size > 2_500_000) {
      setStatus({ kind: "error", message: "La imagen debe pesar menos de 2,5 MB." });
      return;
    }

    try {
      setStatus({ kind: "working", message: "Publicando la entrada…" });
      const remote = await getRemotePosts(token.trim());
      if (remote.posts.some((post) => post.slug === slug)) {
        throw new Error("Ya existe una entrada con ese título. Cambialo para generar una URL distinta.");
      }

      let imageName = "home-comunidad-editorial.webp";
      if (image instanceof File && image.size > 0) {
        const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
        imageName = "blog/" + slug + "-" + Date.now() + "." + extension;
        await putFile(
          token.trim(),
          "public/assets/" + imageName,
          await fileBase64(image),
          "Agregar imagen de Blog y novedades: " + title,
        );
      }

      const post: BlogPost = {
        slug,
        title,
        category: String(data.get("category") || "Novedades").trim(),
        summary: String(data.get("summary") || "").trim(),
        body: paragraphs,
        takeaways,
        sources: [],
        image: imageName,
        imageAlt: String(data.get("imageAlt") || "").trim() || "Imagen de la publicación " + title,
        imageCredit: image instanceof File && image.size > 0 ? "Imagen provista para esta publicación." : undefined,
        featured: Boolean(data.get("featured")),
        publishedAt: String(data.get("publishedAt") || ""),
      };
      const updated = [post, ...remote.posts];
      await putFile(
        token.trim(),
        blogRepository.contentPath,
        encodeText(JSON.stringify(updated, null, 2) + "\n"),
        "Publicar en Blog y novedades: " + title,
        remote.sha,
      );
      form.reset();
      setStatus({ kind: "success", message: "Entrada publicada. GitHub Pages comenzará a actualizar el sitio automáticamente." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "No se pudo publicar la entrada." });
    }
  };

  return (
    <main id="contenido" className="internal-page blog-admin">
      <PageIntro
        index="CMS"
        eyebrow="Administración"
        title="Publicar una novedad"
        description="Cargá una entrada y una imagen. El panel actualiza el repositorio y activa automáticamente la publicación en GitHub Pages."
      />
      <section className="blog-admin__section section">
        <div className="shell blog-admin__grid">
          <aside>
            <p className="eyebrow">Acceso seguro</p>
            <h2>Tu clave no se guarda en el sitio.</h2>
            <p>Usá un token de acceso específico para este repositorio con el único permiso <strong>Contents: Read and write</strong>. Se mantiene solo en la memoria de esta pestaña.</p>
            <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer">Crear token en GitHub <span aria-hidden="true">↗</span></a>
            <a href={pageUrl("blog-y-novedades")}>Ver Blog y novedades <span aria-hidden="true">↗</span></a>
          </aside>
          <form onSubmit={publish}>
            <label>Token de GitHub
              <input type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" required />
            </label>
            <div className="blog-admin__row">
              <label>Título
                <input name="title" type="text" maxLength={90} required />
              </label>
              <label>Categoría
                <input name="category" type="text" defaultValue="Novedades" maxLength={42} required />
              </label>
            </div>
            <label>Resumen
              <textarea name="summary" rows={3} maxLength={240} required />
            </label>
            <label>Contenido
              <textarea name="body" rows={10} required aria-describedby="body-help" />
              <small id="body-help">Separá los párrafos con una línea en blanco.</small>
            </label>
            <label>Claves infográficas
              <textarea name="takeaways" rows={5} aria-describedby="takeaways-help" />
              <small id="takeaways-help">Escribí una clave breve por línea. Se mostrarán como una síntesis visual.</small>
            </label>
            <div className="blog-admin__row">
              <label>Imagen
                <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
              </label>
              <label>Texto alternativo
                <input name="imageAlt" type="text" maxLength={150} />
              </label>
            </div>
            <div className="blog-admin__row">
              <label>Fecha de publicación
                <input name="publishedAt" type="date" />
              </label>
              <label className="blog-admin__check">
                <input name="featured" type="checkbox" defaultChecked />
                Destacar en la portada
              </label>
            </div>
            <button className="button" type="submit" disabled={status.kind === "working"}>Publicar entrada</button>
            {status.message && <p className={"blog-admin__status blog-admin__status--" + status.kind} role={status.kind === "error" ? "alert" : "status"}>{status.message}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
