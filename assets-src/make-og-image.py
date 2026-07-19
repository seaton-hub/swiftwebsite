"""Generates the Open Graph share card: website/app/opengraph-image.jpg (+ twitter copy).

This is the image WhatsApp / Facebook / LinkedIn show when someone shares a
Seaton Swift link. Run from the `website/` directory:

    python assets-src/make-og-image.py

Layout is a split card: brand panel on the left (always legible, whatever the
photo), photo on the right. 1200x630 is the size every platform crops from.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
PANEL = 700            # left brand panel ends here
FADE = 90              # soft blend so the photo doesn't hit a hard seam
PAD = 64

INK = (20, 22, 28)
BRAND = (232, 64, 42)
WHITE = (255, 255, 255)
MUTED = (166, 176, 190)

ROOT = Path(__file__).resolve().parent.parent
FONTS = Path("C:/Windows/Fonts")
black = lambda s: ImageFont.truetype(str(FONTS / "seguibl.ttf"), s)
bold = lambda s: ImageFont.truetype(str(FONTS / "segoeuib.ttf"), s)
reg = lambda s: ImageFont.truetype(str(FONTS / "segoeui.ttf"), s)


def fit(draw, text, size_fn, max_w, start):
    """Largest font size at which `text` still fits in max_w."""
    size = start
    while size > 12:
        f = size_fn(size)
        if draw.textlength(text, font=f) <= max_w:
            return f
        size -= 2
    return size_fn(12)


def cover(img, w, h):
    """Crop-to-fill, centred."""
    scale = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left = (img.width - w) // 2
    top = (img.height - h) // 2
    return img.crop((left, top, left + w, top + h))


card = Image.new("RGB", (W, H), INK)

# ── right side: photo ────────────────────────────────────────────────────────
photo = cover(Image.open(ROOT / "public/hero/swift1.webp").convert("RGB"), W - PANEL + FADE, H)
# Fade the photo's left edge into the panel.
mask = Image.new("L", photo.size, 255)
mdraw = ImageDraw.Draw(mask)
for x in range(FADE):
    mdraw.line([(x, 0), (x, H)], fill=int(255 * (x / FADE) ** 1.5))
card.paste(photo, (PANEL - FADE, 0), mask)

# ── left side: brand panel with a red glow bottom-left ───────────────────────
glow = Image.new("RGB", (W, H), INK)
gdraw = ImageDraw.Draw(glow)
gdraw.ellipse([-260, H - 300, 420, H + 320], fill=BRAND)
glow = glow.filter(ImageFilter.GaussianBlur(120))
card.paste(Image.blend(card.crop((0, 0, PANEL - FADE, H)), glow.crop((0, 0, PANEL - FADE, H)), 0.22), (0, 0))

draw = ImageDraw.Draw(card)
inner = PANEL - FADE - PAD * 2 + 40  # usable text width

# logo mark + wordmark
logo = Image.open(ROOT / "public/logo-mark.png").convert("RGBA")
lh = 54
logo = logo.resize((round(logo.width * lh / logo.height), lh), Image.LANCZOS)
card.paste(logo, (PAD, PAD), logo)
wf = black(32)
x = PAD + logo.width + 14
y = PAD + (lh - 40) // 2
draw.text((x, y), "Seaton", font=wf, fill=WHITE)
draw.text((x + draw.textlength("Seaton ", font=wf), y), "Swift", font=wf, fill=BRAND)

# headline
lines = ["Anything, anywhere,", "delivered swiftly."]
hf = min((fit(draw, ln, black, inner, 58) for ln in lines), key=lambda f: f.size)
y = 214
for ln in lines:
    draw.text((PAD, y), ln, font=hf, fill=WHITE)
    y += round(hf.size * 1.16)

# subline
y += 18
for ln in ["Ghana's fastest delivery network.", "Verified riders. Live tracking. Price before you confirm."]:
    f = fit(draw, ln, reg, inner, 23)
    draw.text((PAD, y), ln, font=f, fill=MUTED)
    y += 32

# url, bottom-left
uf = bold(23)
draw.text((PAD, H - PAD - 22), "swift.seatonlogistics.com", font=uf, fill=WHITE)

# brand rule along the bottom
draw.rectangle([0, H - 8, W, H], fill=BRAND)

# JPEG, not PNG: the card is mostly photograph, and WhatsApp's link-preview
# fetcher is unreliable on large files. ~150 KB keeps every platform happy.
out = ROOT / "app/opengraph-image.jpg"
card.save(out, "JPEG", quality=88, optimize=True, progressive=True)
card.save(ROOT / "app/twitter-image.jpg", "JPEG", quality=88, optimize=True, progressive=True)
print(f"{out.name} -> {out.stat().st_size // 1024} KB")
