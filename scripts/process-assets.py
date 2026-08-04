from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source-materials"
RENDERS = ROOT / "tmp" / "renders"
OUTPUT = ROOT / "public" / "assets"
OUTPUT.mkdir(parents=True, exist_ok=True)


def first_pdf_image(filename: str) -> Image.Image:
    reader = PdfReader(SOURCE / filename)
    return reader.pages[0].images[0].image.convert("RGB")


def trim_white(image: Image.Image, padding: int = 24) -> Image.Image:
    rgb = image.convert("RGB")
    background = Image.new("RGB", rgb.size, "white")
    diff = ImageChops.difference(rgb, background).convert("L")
    mask = diff.point(lambda value: 255 if value > 14 else 0)
    box = mask.getbbox()
    if not box:
        return rgb
    left, top, right, bottom = box
    return rgb.crop(
        (
            max(0, left - padding),
            max(0, top - padding),
            min(rgb.width, right + padding),
            min(rgb.height, bottom + padding),
        )
    )


def save_webp(image: Image.Image, name: str, max_size: tuple[int, int], quality: int = 82) -> None:
    image = image.convert("RGB")
    image.thumbnail(max_size, Image.Resampling.LANCZOS)
    image.save(OUTPUT / name, "WEBP", quality=quality, method=6)


cover = first_pdf_image("portada-ebook.pdf")
save_webp(cover, "book-cover.webp", (1024, 1536), 86)

wrap = Image.open(RENDERS / "portada-fisico.png").convert("RGB")
save_webp(wrap, "book-wrap.webp", (1400, 1100), 82)
back = wrap.crop((0, 0, 770, wrap.height))
save_webp(back, "book-back.webp", (760, 1240), 84)

author_source = Image.open(SOURCE / "presentacion-berenice.jpg").convert("RGB")
author = author_source.crop((505, 24, 1054, 1048))
save_webp(author, "berenice-cura.webp", (720, 1100), 84)
save_webp(author_source, "berenice-presentacion.webp", (740, 1050), 80)

association_logo = trim_white(first_pdf_image("logo-asociacion.pdf"), padding=32)
hands_logo = trim_white(first_pdf_image("logo-primero-mis-manos.pdf"), padding=32)
save_webp(association_logo, "logo-asociacion.webp", (720, 420), 88)
save_webp(hands_logo, "logo-primero-mis-manos.webp", (720, 420), 88)

for source, target in (
    ("qr-instagram.jpg", "qr-instagram.webp"),
    ("sin-subtitulos.jpg", "sin-subtitulos.webp"),
    ("derechos-personas-discapacidad.jpg", "derechos-personas-discapacidad.webp"),
    ("todos-tenemos-derechos.jpg", "todos-tenemos-derechos.webp"),
):
    save_webp(Image.open(SOURCE / source), target, (760, 1100), 80)

og = Image.new("RGB", (1200, 630), "#e9e4da")
draw = ImageDraw.Draw(og)
draw.rectangle((0, 0, 1200, 630), fill="#e9e4da")
draw.ellipse((-240, 290, 520, 980), fill="#cbd1dc")
draw.polygon([(820, 0), (1200, 0), (1200, 630), (610, 630)], fill="#17243f")

cover_card = cover.copy()
cover_card.thumbnail((350, 550), Image.Resampling.LANCZOS)
shadow = Image.new("RGBA", (cover_card.width + 50, cover_card.height + 50), (0, 0, 0, 0))
shadow_draw = ImageDraw.Draw(shadow)
shadow_draw.rounded_rectangle(
    (30, 24, cover_card.width + 30, cover_card.height + 24),
    radius=12,
    fill=(8, 18, 36, 72),
)
og.paste(shadow, (804, 42), shadow)
og.paste(cover_card, (805, 34))

serif_path = Path("C:/Windows/Fonts/georgia.ttf")
serif_bold_path = Path("C:/Windows/Fonts/georgiab.ttf")
sans_path = Path("C:/Windows/Fonts/arial.ttf")
serif = ImageFont.truetype(str(serif_path), 68)
serif_bold = ImageFont.truetype(str(serif_bold_path), 68)
sans = ImageFont.truetype(str(sans_path), 25)
sans_small = ImageFont.truetype(str(sans_path), 20)

draw.text((72, 70), "¿Y si escuchar no", font=serif, fill="#17243f")
draw.text((72, 146), "empezara por los oídos?", font=serif_bold, fill="#17243f")
draw.line((74, 244, 410, 244), fill="#a6844f", width=3)
draw.text((72, 280), "ESCUCHAR EN OTROS SENTIDOS", font=sans_small, fill="#49566d")
draw.text((72, 326), "Primero mis manos", font=serif_bold, fill="#17243f")
draw.text((72, 435), "Un libro de Berenice Cura", font=sans, fill="#17243f")
draw.text((72, 488), "Comunicación accesible · LSA · inclusión", font=sans_small, fill="#49566d")
og.save(OUTPUT / "og-berenice-cura.png", "PNG", optimize=True)

favicon = Image.new("RGB", (96, 96), "#17243f")
favicon_draw = ImageDraw.Draw(favicon)
favicon_draw.ellipse((17, 30, 79, 66), outline="#e9e4da", width=5)
favicon_draw.ellipse((40, 37, 56, 59), fill="#b49761")
favicon.save(OUTPUT / "favicon.png", "PNG", optimize=True)

print("Assets generated:")
for asset in sorted(OUTPUT.iterdir()):
    print(f"- {asset.name}: {asset.stat().st_size} bytes")
