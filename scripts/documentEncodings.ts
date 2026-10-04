// Writes the table of supported encodings into the README, from the same data the library ships, so the two always
// match. Run by 'npm run document', after the build.

// ── External Dependencies & Registrations
import { getEncodingTypeConfigs } from '@dpuse/dpuse-shared';
import { readFile, writeFile } from 'node:fs/promises';

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const END_MARKER = '<!-- ENCODINGS_END -->';
const README_PATH = 'README.md';
const START_MARKER = '<!-- ENCODINGS_START -->';

// ── Main ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

const rows = getEncodingTypeConfigs('en').map(
    ({ decoderId, groupLabel, id, isDecodable, isDetectable }) =>
        `|${groupLabel === '' ? '—' : groupLabel}|${id}|${isDetectable ? '✅' : '❌'}|${isDecodable ? '✅' : '❌'}|${decoderId ?? '—'}|`
);
const table = [
    'The table below lists every supported encoding.',
    '',
    "- **Detectable** — the encoding can be identified from a file's contents.",
    "- **Decodable** — the browser's built-in `TextDecoder` can decode it. The four that cannot are refused by all the major browsers: `iso-2022-cn` and `iso-2022-kr` are blocked by the WHATWG Encoding Standard for security reasons, and UTF-32 is not part of the standard.",
    '- **Decoded As** — the encoding browsers actually use, where it differs from the name. The Encoding Standard treats some names as aliases, so for example `latin1` and `ascii` are decoded as `windows-1252`. The practical effects: bytes 0x80–0x9F decode as Windows-1252 characters (such as `€` and curly quotes) rather than control codes, `ascii` never rejects bytes above 0x7F, and a big-endian UTF-16 file read as `utf-16` decodes as little-endian and comes out garbled.',
    '',
    'The major browsers all follow the Encoding Standard, so these columns hold for each of them. This was confirmed by running `TextDecoder` against every encoding in Chrome 154, Edge 154, Firefox 156 and Safari 26.6 (October 2026), and all four gave identical results. To re-check them on a Mac, run `npm run check:browsers` after a build.',
    '',
    '|Group|Encoding|Detectable|Decodable|Decoded As|',
    '|:-|:-|:-:|:-:|:-|',
    ...rows
].join('\n');

const readme = await readFile(README_PATH, 'utf-8');
const startIndex = readme.indexOf(START_MARKER);
const endIndex = readme.indexOf(END_MARKER);
if (startIndex === -1 || endIndex === -1) throw new Error(`'${README_PATH}' needs the '${START_MARKER}' and '${END_MARKER}' markers.`);

await writeFile(README_PATH, `${readme.slice(0, startIndex + START_MARKER.length)}\n\n${table}\n\n${readme.slice(endIndex)}`, 'utf-8');
console.log(`✅ ${String(rows.length)} encodings documented`);
