"""Genera el favicon (SVG, ICO y PNG) a partir del isotipo vectorizado."""
from pathlib import Path

from PIL import Image, ImageDraw

PUBLIC = Path(__file__).resolve().parents[1] / "public"
NAVY = "#0B1730"
BLUE_LIGHT, BLUE_DEEP = (45, 196, 245), (22, 122, 214)

# Trazos en las coordenadas del isotipo original: punto inicial + curvas cúbicas.
CRESCENT = [(475, 14),
            (400, 0, 296, 18, 214, 68), (86, 148, 16, 268, 16, 402), (16, 566, 98, 696, 238, 772),
            (330, 820, 434, 834, 528, 823), (424, 792, 310, 752, 224, 686), (136, 616, 86, 514, 84, 402),
            (82, 302, 122, 226, 186, 170), (240, 122, 298, 94, 345, 82), (388, 64, 434, 40, 475, 14)]
BODY = [(345, 78),
        (244, 128, 158, 250, 158, 386), (158, 472, 186, 540, 238, 610), (318, 718, 420, 784, 528, 823),
        (452, 752, 384, 682, 346, 622), (322, 584, 316, 552, 324, 516), (344, 436, 432, 370, 540, 312),
        (472, 336, 404, 346, 342, 338), (290, 330, 256, 292, 254, 236), (254, 174, 288, 122, 345, 78)]
HEAD = (375, 244, 72)

# El isotipo ocupa el centro de un lienzo de 1000 x 1000.
SCALE, DX, DY = 0.94, 239.0, 107.0


def points(path, steps=60):
    x, y = path[0]
    out = [(x, y)]
    for x1, y1, x2, y2, x3, y3 in path[1:]:
        for i in range(1, steps + 1):
            t = i / steps
            u = 1 - t
            out.append((u**3 * x + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t**3 * x3,
                        u**3 * y + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t**3 * y3))
        x, y = x3, y3
    return out


def svg_path(path):
    x, y = path[0]
    return f"M{x} {y}" + "".join("C" + " ".join(map(str, c)) for c in path[1:]) + "Z"


def render(size, radius=0.22):
    full = 2048
    k = full / 1000
    place = lambda x, y: ((x * SCALE + DX) * k, (y * SCALE + DY) * k)

    mask = Image.new("L", (full, full), 0)
    draw = ImageDraw.Draw(mask)
    for path in (CRESCENT, BODY):
        draw.polygon([place(*p) for p in points(path)], fill=255)
    cx, cy, r = HEAD
    draw.ellipse([*place(cx - r, cy - r), *place(cx + r, cy + r)], fill=255)

    ramp = Image.new("RGB", (full, 1))
    for i in range(full):
        t = i / (full - 1)
        ramp.putpixel((i, 0), tuple(round(a + (b - a) * t) for a, b in zip(BLUE_LIGHT, BLUE_DEEP)))
    gradient = ramp.resize((full, full))

    tile = Image.new("RGBA", (full, full), (0, 0, 0, 0))
    ImageDraw.Draw(tile).rounded_rectangle([0, 0, full - 1, full - 1], radius=full * radius, fill=NAVY)
    tile.paste(gradient, (0, 0), mask)
    return tile.resize((size, size), Image.LANCZOS)


def main():
    cx, cy, r = HEAD
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">'
        '<defs><linearGradient id="g" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">'
        '<stop stop-color="#2DC4F5"/><stop offset="1" stop-color="#167AD6"/></linearGradient></defs>'
        f'<rect width="1000" height="1000" rx="220" fill="{NAVY}"/>'
        '<mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">'
        f'<g fill="#fff" transform="translate({DX} {DY}) scale({SCALE})">'
        f'<path d="{svg_path(CRESCENT)}"/><path d="{svg_path(BODY)}"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{r}"/></g></mask>'
        '<rect width="1000" height="1000" fill="url(#g)" mask="url(#m)"/></svg>\n'
    )
    (PUBLIC / "assets" / "favicon.svg").write_text(svg, encoding="utf-8")
    render(256).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    # iOS recorta las esquinas por su cuenta: va a sangre completa.
    render(180, radius=0).convert("RGB").save(PUBLIC / "assets" / "apple-touch-icon.png")


if __name__ == "__main__":
    main()
