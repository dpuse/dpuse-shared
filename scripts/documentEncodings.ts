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
    ({ groupLabel, id, isDecodable, isDetectable }) => `|${groupLabel === '' ? '—' : groupLabel}|${id}|${isDetectable ? '✅' : '❌'}|${isDecodable ? '✅' : '❌'}|`
);
const table = [
    "The table below lists every supported encoding. Detectable means it can be identified from a file's contents; decodable means browsers can decode it.",
    '',
    '|Group|Encoding|Detectable|Decodable|',
    '|:-|:-|:-:|:-:|',
    ...rows
].join('\n');

const readme = await readFile(README_PATH, 'utf-8');
const startIndex = readme.indexOf(START_MARKER);
const endIndex = readme.indexOf(END_MARKER);
if (startIndex === -1 || endIndex === -1) throw new Error(`'${README_PATH}' needs the '${START_MARKER}' and '${END_MARKER}' markers.`);

await writeFile(README_PATH, `${readme.slice(0, startIndex + START_MARKER.length)}\n\n${table}\n\n${readme.slice(endIndex)}`, 'utf-8');
console.log(`✅ ${String(rows.length)} encodings documented`);
