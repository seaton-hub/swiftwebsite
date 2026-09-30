"""Builds every photo the website shows from the originals in assets-src/photos/.

Run from the `website/` directory:

    python assets-src/make-web-images.py

Each job crops one original to the shape of the slot it fills, then writes a
1280px .webp (quality 82, method 6) into public/, plus a -800 variant where the
component offers one through srcset (the gallery and the page heroes).

The crop is centred on a focus point given as fractions of the original
(0.5, 0.5 is the middle) and clamped so it never leaves the picture. When a
new original goes in, set the focus so the faces and the goods stay in frame.
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src/photos"

WIDE = 3 / 2   # home slideshow and gallery
CARD = 4 / 3   # PageHero photo card

# (original, output under public/, aspect, focus x, focus y, -800 variant)
JOBS = [
    # Home page slideshow, full-bleed behind the headline. The headline and a
    # dark scrim sit on the left, so the subject should sit centre or right.
    ("rider-road.jpg",      "hero/road.webp",            WIDE, 0.58, 0.50, False),
    ("food.jpg",            "hero/food.webp",            WIDE, 0.50, 0.54, False),
    ("rider-kumasi.jpg",    "hero/rider.webp",           WIDE, 0.50, 0.38, False),
    ("aboboyaa-market.jpg", "hero/carry.webp",           WIDE, 0.50, 0.42, False),
    ("sofa-move.jpg",       "hero/move.webp",            WIDE, 0.50, 0.50, False),

    # Home page gallery ("Seaton Swift in motion"), in slide order.
    ("shop-counter.jpg",    "gallery/shop-counter.webp", WIDE, 0.50, 0.42, True),
    ("food.jpg",            "gallery/food.webp",         WIDE, 0.50, 0.54, True),
    ("doorstep.jpg",        "gallery/doorstep.webp",     WIDE, 0.50, 0.40, True),
    ("rider-road.jpg",      "gallery/on-the-road.webp",  WIDE, 0.58, 0.50, True),
    ("market-load.jpg",     "gallery/market.webp",       WIDE, 0.50, 0.60, True),
    ("students.jpg",        "gallery/students.webp",     WIDE, 0.50, 0.50, True),
    ("macho.jpg",           "gallery/macho.webp",        WIDE, 0.50, 0.55, True),
    ("home-move.jpg",       "gallery/home-move.webp",    WIDE, 0.50, 0.53, True),
    ("office-move.jpg",     "gallery/office-move.webp",  WIDE, 0.50, 0.50, True),

    # PageHero photo cards on the inner pages.
    ("rider-recruit.jpg",   "gallery/page-riders.webp",  CARD, 0.00, 0.50, True),
    ("pharmacy.jpg",        "gallery/page-shops.webp",   CARD, 0.50, 0.56, True),
    ("market-load.jpg",     "gallery/page-about.webp",   CARD, 0.50, 0.60, True),
]


def crop(img, aspect, fx, fy):
    """The largest crop of `aspect` centred on (fx, fy), kept inside the image."""
    w, h = img.size
    cw, ch = (round(h * aspect), h) if w / h > aspect else (w, round(w / aspect))
    left = min(max(round(fx * w - cw / 2), 0), w - cw)
    top = min(max(round(fy * h - ch / 2), 0), h - ch)
    return img.crop((left, top, left + cw, top + ch))


for src, out, aspect, fx, fy, small in JOBS:
    img = crop(Image.open(SRC / src).convert("RGB"), aspect, fx, fy)
    dest = ROOT / "public" / out
    sizes = [(1280, dest)]
    if small:
        sizes.append((800, dest.with_name(dest.stem + "-800.webp")))
    for width, path in sizes:
        img.resize((width, round(width / aspect)), Image.LANCZOS).save(path, "WEBP", quality=82, method=6)
        print(f"{path.relative_to(ROOT)}  {path.stat().st_size // 1024} KB")
