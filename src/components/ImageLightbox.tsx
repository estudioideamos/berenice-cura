import { useEffect } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
};

export function ImageLightbox({ src, alt, caption, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Cerrar">✕</button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={src} alt={alt} />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    </div>
  );
}
