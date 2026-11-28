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
    ({ groupLabel, iconvLiteDecoderId, id, isDecodable, isDetectable, textDecoderId }) =>
        `|${groupLabel === '' ? '—' : groupLabel}|${id}|${isDetectable ? '✅' : '❌'}|${isDecodable ? '✅' : '❌'}|${textDecoderId ?? '—'}|${iconvLiteDecoderId ?? '—'}|`
);
const table = [
    "The table below lists every encoding [jschardet](https://github.com/aadsm/jschardet) can identify from a file's contents, under the name it reports, plus those that the browser or [iconv-lite](https://github.com/pillarjs/iconv-lite) can decode but jschardet never reports. A test checks the table against jschardet's own list of encodings, so it fails if a jschardet upgrade adds, drops, renames or remaps one.",
    '',
    "- **Detectable** — jschardet can report it. One that is not can only be chosen by hand. `gbk` is also read by `gb18030`.",
    "- **Decodable** — the browser's built-in `TextDecoder` or iconv-lite can decode it. iconv-lite is used only for an encoding the browser cannot decode. It is not part of this library: it is the `dpuse-tool-iconv-lite-decoder` tool, which `constructTextDecoder` loads only when a file needs it. Neither decodes the rest: `HZ-GB-2312` and `ISO-2022-KR` are blocked by the WHATWG Encoding Standard for security reasons, and the mainframe code pages, two ISO-2022-JP variants, Johab and cp1006 are in neither library. A file in one can still be named, even though it cannot be read.",
    "- **TextDecoder** — the name browsers decode it with, taken from jschardet's own map. Browsers treat some names as aliases, so for example `ascii` and `ISO-8859-1` are decoded as `windows-1252`. The practical effects: bytes 0x80–0x9F decode as Windows-1252 characters (such as `€` and curly quotes) rather than control codes, and `ascii` never rejects bytes above 0x7F.",
    "- **iconv-lite** — the name iconv-lite decodes it with, used only where there is no TextDecoder name: most DOS and Mac code pages, UTF-7, UTF-32, and `UTF-16`, whose byte-order mark decides which way round it is read, so it has no single browser name. A test checks that iconv-lite accepts every name, and the sample tests check that it decodes each sample back to its original text.",
    '',
    "The major browsers all follow the Encoding Standard, so these columns hold for each of them. A test checks that Node's `TextDecoder`, which follows the same standard, accepts every TextDecoder name as its own. They were also confirmed in Chrome 154, Edge 154, Firefox 156 and Safari 26.6 (October 2026), and all four gave identical results. To re-check them on a Mac, run `npm run check:browsers` after a build.",
    '',
    '|Group|Encoding|Detectable|Decodable|TextDecoder|iconv-lite|',
    '|:-|:-|:-:|:-:|:-|:-|',
    ...rows
].join('\n');

const readme = await readFile(README_PATH, 'utf-8');
const startIndex = readme.indexOf(START_MARKER);
const endIndex = readme.indexOf(END_MARKER);
if (startIndex === -1 || endIndex === -1) throw new Error(`'${README_PATH}' needs the '${START_MARKER}' and '${END_MARKER}' markers.`);

await writeFile(README_PATH, `${readme.slice(0, startIndex + START_MARKER.length)}\n\n${table}\n\n${readme.slice(endIndex)}`, 'utf-8');
console.log(`✅ ${String(rows.length)} encodings documented`);
