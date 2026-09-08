/**
 * Regenerates the printable QR codes in public/.
 *
 *   npm run qr
 *
 * Deliberately NOT part of `npm run build`. The codes change roughly never, and
 * a build step that rewrites committed files makes every deploy look like it
 * has uncommitted changes.
 *
 * ── Why these encode our own URLs and not store links ──────────────────────
 *
 * A QR printed on a sticker, a shop counter or a rider's flyer outlives every
 * URL it could point at. Encoding an App Store link would mean:
 *
 *   - every Android scan lands on a page they cannot install from, and there
 *     are two apps, so half of those are the wrong app as well;
 *   - the day a store URL changes, every printed sticker is dead paper.
 *
 * Pointing at /download fixes both. The page decides where the visitor goes,
 * and it can change as often as it likes without reprinting anything.
 *
 * ── Error correction ───────────────────────────────────────────────────────
 *
 * Level M (15%). H would survive a logo punched into the middle, but nothing
 * here punches a logo in, and H inflates the module count, which makes the
 * printed squares smaller and HARDER to scan at the sizes these run at.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import QRCode from 'qrcode';

// Must match SITE_URL in lib/seo.ts. Hardcoded rather than imported because
// that file is TypeScript and this script has to run without a build step.
const SITE = 'https://swift.seatonlogistics.com';

const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

const CODES = [
  { file: 'qr-download.svg', url: `${SITE}/download`,       what: 'both apps' },
  { file: 'qr-merchant.svg', url: `${SITE}/download#shop`,  what: 'Swift Merchant, for shops' },
  { file: 'qr-swift.svg',    url: `${SITE}/download#rider`, what: 'Seaton Swift, for riders' },
];

// Pure black on pure white. A brand-tinted code is a real scanning risk on a
// cheap camera in poor light, and these get printed.
//
// margin 4 is the quiet zone the QR spec requires. Phone cameras usually cope
// with less, and the file this replaced shipped 2 — which is invisible on the
// website, where the card adds white space around the image anyway, and a
// problem on a sticker trimmed to the edge of the artwork.
const OPTIONS = {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 4,
  color: { dark: '#000000', light: '#FFFFFF' },
};

await mkdir(PUBLIC, { recursive: true });

for (const { file, url, what } of CODES) {
  const svg = await QRCode.toString(url, OPTIONS);
  await writeFile(path.join(PUBLIC, file), svg, 'utf8');
  console.log(`  ${file.padEnd(18)} → ${url}   (${what})`);
}

console.log(`\n${CODES.length} codes written to public/`);
console.log('Scan every one with a real phone before printing anything.');
