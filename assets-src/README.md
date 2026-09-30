# Original image sources (not deployed)

These are the full-quality originals. `website/public/` ships the optimised
`.webp` derivatives instead (plus `-800.webp` variants used via srcset).

Nothing here is served — it sits outside `public/` deliberately.

## Site photos

`photos/` holds one original per scene. `make-web-images.py` crops each one to
the shape of the slot it fills (the home slideshow, the gallery, the photo card
on the inner pages) and writes the `.webp` files into `public/hero/` and
`public/gallery/`. Run it from `website/`:

    python assets-src/make-web-images.py

To swap a photo, drop the new original in `photos/`, point its job at it in the
script, set the focus point so faces and goods stay in frame, and re-run.

## Share card

`make-og-image.py` builds `app/opengraph-image.jpg` and `app/twitter-image.jpg` —
the preview card WhatsApp, Facebook and LinkedIn show when a link is shared.
Run it from `website/`:

    python assets-src/make-og-image.py

Re-run it if the tagline, logo or photo changes. The matching
`app/*-image.alt.txt` files hold the alt text and are edited by hand.
