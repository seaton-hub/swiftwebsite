# Original image sources (not deployed)

These are the full-quality originals. `website/public/` ships the optimised
`.webp` derivatives instead (plus `-800.webp` variants used via srcset).

Nothing here is served — it sits outside `public/` deliberately.
To regenerate the web versions after adding or replacing an original, re-run the
Pillow conversion (quality 82, `method=6`) and drop the output into
`public/hero/` or `public/gallery/`.

## Share card

`make-og-image.py` builds `app/opengraph-image.jpg` and `app/twitter-image.jpg` —
the preview card WhatsApp, Facebook and LinkedIn show when a link is shared.
Run it from `website/`:

    python assets-src/make-og-image.py

Re-run it if the tagline, logo or hero photo changes. The matching
`app/*-image.alt.txt` files hold the alt text and are edited by hand.
