# Encoding samples

Small test files for character encoding detection and decoding: one per encoding [jschardet](https://github.com/aadsm/jschardet) can detect, plus a few mostly-ASCII CSV files. Each file is named after the encoding it is written in, using the name jschardet reports, in lower case.

## What is here

- `samples/` — the test files. `.txt` files hold about 1,000 characters of the Universal Declaration of Human Rights in a language that suits the encoding. `.csv` files hold a small table of names and cities, mostly plain ASCII with a few accented or non-Latin values, the realistic hard case for a detector.
- `expected/` — the same text in UTF-8, to check a file decodes correctly.
- `manifest.json` — each file's encoding, language and what jschardet detects.
- `chardet/` — a second set: chardet's own test files, with its licence. See [chardet's test files](#chardets-test-files).

Each sample keeps only characters its encoding can hold. `cp1006.txt` (Urdu) loses about 17% of the text, because that code page lacks several Urdu letters, and `cp864.txt` and `cp1006.txt` store Arabic letters as fixed presentation forms, as those code pages require.

## Results with jschardet 4.0.0

- **Exact** — jschardet names the file's own encoding: 71 files.
- **Same text** — jschardet names a sister encoding that decodes this file to exactly the same text, e.g. `windows-1252` for `iso-8859-1` text that avoids the characters where they differ: 17 files.
- **Wrong** — decoding as the detected encoding garbles the text: 5 files.

The tests in `tests/encoding/samples.test.ts` check every file against this table. Correct detections must stay correct, and the wrong ones run as expected failures, listed in every test run. Either kind fails the run if a jschardet upgrade changes its result, so the table never goes stale.

| File                                               | Encoding        | Language                                  | Detected     | Result       |
| :------------------------------------------------- | :-------------- | :---------------------------------------- | :----------- | :----------- |
| [ascii.txt](samples/ascii.txt)                     | ascii           | English                                   | ascii        | ✅ Exact     |
| [utf-8.txt](samples/utf-8.txt)                     | utf-8           | French                                    | utf-8        | ✅ Exact     |
| [utf-8-sig.txt](samples/utf-8-sig.txt)             | utf-8-sig       | Russian                                   | utf-8-sig    | ✅ Exact     |
| [utf-16.txt](samples/utf-16.txt)                   | utf-16          | German                                    | utf-16       | ✅ Exact     |
| [utf-16-be.txt](samples/utf-16-be.txt)             | utf-16-be       | Russian                                   | utf-16-be    | ✅ Exact     |
| [utf-16-le.txt](samples/utf-16-le.txt)             | utf-16-le       | Greek                                     | utf-16-le    | ✅ Exact     |
| [utf-32.txt](samples/utf-32.txt)                   | utf-32          | English                                   | utf-32       | ✅ Exact     |
| [utf-32-be.txt](samples/utf-32-be.txt)             | utf-32-be       | Japanese                                  | utf-32-be    | ✅ Exact     |
| [utf-32-le.txt](samples/utf-32-le.txt)             | utf-32-le       | Turkish                                   | utf-32-le    | ✅ Exact     |
| [utf-7.txt](samples/utf-7.txt)                     | utf-7           | French                                    | utf-7        | ✅ Exact     |
| [big5.txt](samples/big5.txt)                       | big5            | Chinese (Traditional)                     | big5         | ✅ Exact     |
| [cp932.txt](samples/cp932.txt)                     | cp932           | Japanese                                  | cp932        | ✅ Exact     |
| [cp949.txt](samples/cp949.txt)                     | cp949           | Korean                                    | cp949        | ✅ Exact     |
| [euc-jp.txt](samples/euc-jp.txt)                   | euc-jp          | Japanese                                  | euc-jp       | ✅ Exact     |
| [euc-kr.txt](samples/euc-kr.txt)                   | euc-kr          | Korean                                    | cp949        | ✅ Same text |
| [gb18030.txt](samples/gb18030.txt)                 | gb18030         | Chinese (Simplified)                      | gb18030      | ✅ Exact     |
| [hz-gb-2312.txt](samples/hz-gb-2312.txt)           | hz-gb-2312      | Chinese (Simplified)                      | hz-gb-2312   | ✅ Exact     |
| [iso-2022-jp.txt](samples/iso-2022-jp.txt)         | iso-2022-jp     | Japanese                                  | iso-2022-jp  | ✅ Exact     |
| [iso2022_jp_2004.txt](samples/iso2022_jp_2004.txt) | iso2022_jp_2004 | Japanese                                  | iso-2022-jp  | ✅ Same text |
| [iso2022_jp_ext.txt](samples/iso2022_jp_ext.txt)   | iso2022_jp_ext  | Japanese                                  | iso-2022-jp  | ✅ Same text |
| [iso-2022-kr.txt](samples/iso-2022-kr.txt)         | iso-2022-kr     | Korean                                    | iso-2022-kr  | ✅ Exact     |
| [shift_jis.txt](samples/shift_jis.txt)             | shift_jis       | Japanese                                  | cp932        | ✅ Same text |
| [cp874.txt](samples/cp874.txt)                     | cp874           | Thai                                      | cp874        | ✅ Exact     |
| [windows-1250.txt](samples/windows-1250.txt)       | windows-1250    | Polish                                    | windows-1250 | ✅ Exact     |
| [windows-1251.txt](samples/windows-1251.txt)       | windows-1251    | Russian                                   | windows-1251 | ✅ Exact     |
| [windows-1252.txt](samples/windows-1252.txt)       | windows-1252    | French                                    | windows-1252 | ✅ Exact     |
| [windows-1253.txt](samples/windows-1253.txt)       | windows-1253    | Greek                                     | windows-1253 | ✅ Exact     |
| [windows-1254.txt](samples/windows-1254.txt)       | windows-1254    | Turkish                                   | windows-1254 | ✅ Exact     |
| [windows-1255.txt](samples/windows-1255.txt)       | windows-1255    | Hebrew                                    | windows-1255 | ✅ Exact     |
| [windows-1256.txt](samples/windows-1256.txt)       | windows-1256    | Arabic                                    | windows-1256 | ✅ Exact     |
| [windows-1257.txt](samples/windows-1257.txt)       | windows-1257    | Lithuanian                                | windows-1257 | ✅ Exact     |
| [cp1258.txt](samples/cp1258.txt)                   | cp1258          | Vietnamese                                | cp1258       | ✅ Exact     |
| [koi8-r.txt](samples/koi8-r.txt)                   | koi8-r          | Russian                                   | koi8-r       | ✅ Exact     |
| [koi8-u.txt](samples/koi8-u.txt)                   | koi8-u          | Ukrainian                                 | koi8-u       | ✅ Exact     |
| [tis-620.txt](samples/tis-620.txt)                 | tis-620         | Thai                                      | cp874        | ✅ Same text |
| [iso-8859-1.txt](samples/iso-8859-1.txt)           | iso-8859-1      | German                                    | windows-1252 | ✅ Same text |
| [iso-8859-2.txt](samples/iso-8859-2.txt)           | iso-8859-2      | Czech                                     | iso-8859-2   | ✅ Exact     |
| [iso8859-3.txt](samples/iso8859-3.txt)             | iso8859-3       | Maltese                                   | iso8859-3    | ✅ Exact     |
| [iso8859-4.txt](samples/iso8859-4.txt)             | iso8859-4       | Latvian                                   | iso8859-4    | ✅ Exact     |
| [iso-8859-5.txt](samples/iso-8859-5.txt)           | iso-8859-5      | Bulgarian                                 | iso-8859-5   | ✅ Exact     |
| [iso-8859-6.txt](samples/iso-8859-6.txt)           | iso-8859-6      | Arabic                                    | iso-8859-6   | ✅ Exact     |
| [iso-8859-7.txt](samples/iso-8859-7.txt)           | iso-8859-7      | Greek                                     | windows-1253 | ✅ Same text |
| [iso-8859-8.txt](samples/iso-8859-8.txt)           | iso-8859-8      | Hebrew                                    | windows-1255 | ✅ Same text |
| [iso-8859-9.txt](samples/iso-8859-9.txt)           | iso-8859-9      | Turkish                                   | windows-1254 | ✅ Same text |
| [iso8859-10.txt](samples/iso8859-10.txt)           | iso8859-10      | Icelandic                                 | windows-1252 | ✅ Same text |
| [iso-8859-13.txt](samples/iso-8859-13.txt)         | iso-8859-13     | Latvian                                   | windows-1257 | ✅ Same text |
| [iso8859-14.txt](samples/iso8859-14.txt)           | iso8859-14      | Welsh                                     | iso8859-14   | ✅ Exact     |
| [iso8859-15.txt](samples/iso8859-15.txt)           | iso8859-15      | French                                    | windows-1252 | ✅ Same text |
| [iso8859-16.txt](samples/iso8859-16.txt)           | iso8859-16      | Romanian                                  | windows-1250 | ❌ Wrong     |
| [johab.txt](samples/johab.txt)                     | johab           | Korean                                    | johab        | ✅ Exact     |
| [maccyrillic.txt](samples/maccyrillic.txt)         | maccyrillic     | Russian                                   | maccyrillic  | ✅ Exact     |
| [macgreek.txt](samples/macgreek.txt)               | macgreek        | Greek                                     | macgreek     | ✅ Exact     |
| [maciceland.txt](samples/maciceland.txt)           | maciceland      | Icelandic                                 | maciceland   | ✅ Exact     |
| [maclatin2.txt](samples/maclatin2.txt)             | maclatin2       | Czech                                     | maclatin2    | ✅ Exact     |
| [macroman.txt](samples/macroman.txt)               | macroman        | French                                    | macroman     | ✅ Exact     |
| [macturkish.txt](samples/macturkish.txt)           | macturkish      | Turkish                                   | macturkish   | ✅ Exact     |
| [cp720.txt](samples/cp720.txt)                     | cp720           | Arabic                                    | cp720        | ✅ Exact     |
| [cp1006.txt](samples/cp1006.txt)                   | cp1006          | Urdu                                      | cp1006       | ✅ Exact     |
| [cp1125.txt](samples/cp1125.txt)                   | cp1125          | Ukrainian                                 | cp1125       | ✅ Exact     |
| [koi8-t.txt](samples/koi8-t.txt)                   | koi8-t          | Tajik                                     | koi8-t       | ✅ Exact     |
| [kz1048.txt](samples/kz1048.txt)                   | kz1048          | Kazakh                                    | kz1048       | ✅ Exact     |
| [ptcp154.txt](samples/ptcp154.txt)                 | ptcp154         | Kazakh                                    | ptcp154      | ✅ Exact     |
| [hp-roman8.txt](samples/hp-roman8.txt)             | hp-roman8       | French                                    | hp-roman8    | ✅ Exact     |
| [cp437.txt](samples/cp437.txt)                     | cp437           | French                                    | cp437        | ✅ Exact     |
| [cp737.txt](samples/cp737.txt)                     | cp737           | Greek                                     | cp737        | ✅ Exact     |
| [cp775.txt](samples/cp775.txt)                     | cp775           | Lithuanian                                | cp775        | ✅ Exact     |
| [cp850.txt](samples/cp850.txt)                     | cp850           | German                                    | cp437        | ✅ Same text |
| [cp852.txt](samples/cp852.txt)                     | cp852           | Polish                                    | cp852        | ✅ Exact     |
| [ibm855.txt](samples/ibm855.txt)                   | ibm855          | Bulgarian                                 | ibm855       | ✅ Exact     |
| [cp856.txt](samples/cp856.txt)                     | cp856           | Hebrew                                    | cp862        | ✅ Same text |
| [cp857.txt](samples/cp857.txt)                     | cp857           | Turkish                                   | cp857        | ✅ Exact     |
| [cp858.txt](samples/cp858.txt)                     | cp858           | French                                    | cp437        | ✅ Same text |
| [cp860.txt](samples/cp860.txt)                     | cp860           | Portuguese                                | cp860        | ✅ Exact     |
| [cp861.txt](samples/cp861.txt)                     | cp861           | Icelandic                                 | cp861        | ✅ Exact     |
| [cp862.txt](samples/cp862.txt)                     | cp862           | Hebrew                                    | cp862        | ✅ Exact     |
| [cp863.txt](samples/cp863.txt)                     | cp863           | French                                    | cp437        | ✅ Same text |
| [cp864.txt](samples/cp864.txt)                     | cp864           | Arabic                                    | windows-1256 | ❌ Wrong     |
| [cp865.txt](samples/cp865.txt)                     | cp865           | Norwegian                                 | cp865        | ✅ Exact     |
| [ibm866.txt](samples/ibm866.txt)                   | ibm866          | Russian                                   | ibm866       | ✅ Exact     |
| [cp869.txt](samples/cp869.txt)                     | cp869           | Greek                                     | cp869        | ✅ Exact     |
| [cp1140.txt](samples/cp1140.txt)                   | cp1140          | English                                   | cp500        | ✅ Same text |
| [cp424.txt](samples/cp424.txt)                     | cp424           | Hebrew                                    | ascii        | ❌ Wrong     |
| [cp500.txt](samples/cp500.txt)                     | cp500           | French                                    | cp500        | ✅ Exact     |
| [cp875.txt](samples/cp875.txt)                     | cp875           | Greek                                     | cp875        | ✅ Exact     |
| [cp1026.txt](samples/cp1026.txt)                   | cp1026          | Turkish                                   | cp1026       | ✅ Exact     |
| [cp273.txt](samples/cp273.txt)                     | cp273           | German                                    | cp273        | ✅ Exact     |
| [windows-1252.csv](samples/windows-1252.csv)       | windows-1252    | English, French, German, Spanish, Danish  | windows-1252 | ✅ Exact     |
| [windows-1250.csv](samples/windows-1250.csv)       | windows-1250    | English, Polish, Czech, Hungarian         | windows-1250 | ✅ Exact     |
| [windows-1251.csv](samples/windows-1251.csv)       | windows-1251    | English, Russian                          | windows-1251 | ✅ Exact     |
| [windows-1254.csv](samples/windows-1254.csv)       | windows-1254    | English, Turkish                          | windows-1254 | ✅ Exact     |
| [cp932.csv](samples/cp932.csv)                     | cp932           | English, Japanese                         | iso-8859-1   | ❌ Wrong     |
| [macroman.csv](samples/macroman.csv)               | macroman        | English, French, German, Portuguese       | iso-8859-1   | ❌ Wrong     |
| [cp850.csv](samples/cp850.csv)                     | cp850           | English, German, French, Swedish, Spanish | cp850        | ✅ Exact     |

## chardet's test files

The `chardet` folder holds the test files from [chardet](https://github.com/runk/node-chardet), copyright 2024 Dmitry Shirokov, under the MIT licence in `chardet/LICENSE`:

- `encodings/` — chardet's [unit-test files](https://github.com/runk/node-chardet/tree/master/src/test/data/encodings), 44 files.
- `corpus/` — chardet's [corpus](https://github.com/runk/node-chardet/tree/master/corpus), copied apart from `generated/ngrams.mjs`, a statistics file chardet builds its models from: its README, manifests, source texts (`sources.json`, `test-sources.json`) and the generated files under `generated/<encoding>/<language>/<train|validation|test>/`. 138 of the generated files are a source document's title and text, encoded, so their decoding is checked against that text. The rest are copies of the unit-test files.
- `samples.json` — ours, not chardet's: each file's true encoding, its source document where it has one, and what jschardet detects.

The tests run the same checks as for our own samples. With jschardet 4.0.0, of 216 files 144 are detected exactly, 61 as a sister encoding that gives the same text, and 11 wrong:

| File                                                        | Encoding    | Detected     |
| :---------------------------------------------------------- | :---------- | :----------- |
| `encodings/iso2022cn`                                       | iso-2022-cn | (none)       |
| `encodings/utf16be`                                         | utf-16-be   | utf-16       |
| `corpus/generated/CP949/ko/train/workshop.bin`              | cp949       | gb18030      |
| `corpus/generated/ISO-2022-CN/zh/validation/iso2022cn.bin`  | iso-2022-cn | (none)       |
| `corpus/generated/ISO-8859-16/ro/test/community-garden.bin` | iso8859-16  | windows-1250 |
| `corpus/generated/ISO-8859-16/ro/train/city-morning.bin`    | iso8859-16  | windows-1250 |
| `corpus/generated/ISO-8859-16/ro/train/library.bin`         | iso8859-16  | windows-1250 |
| `corpus/generated/ISO-8859-16/ro/train/market.bin`          | iso8859-16  | iso-8859-2   |
| `corpus/generated/ISO-8859-16/ro/train/workshop.bin`        | iso8859-16  | windows-1250 |
| `corpus/generated/ISO-8859-16/ro/validation/river-trip.bin` | iso8859-16  | windows-1250 |
| `corpus/generated/UTF-16BE/en/validation/utf16be.bin`       | utf-16-be   | utf-16       |

- `iso-2022-cn` is not an encoding jschardet can detect, and browsers cannot decode it.
- chardet's `utf16be` file starts with a big-endian byte-order mark but holds little-endian text, so it cannot be detected correctly.
- Node's `TextDecoder` decodes `corpus/generated/CP949/ko/train/workshop.bin` wrongly, because it lacks the Korean extension characters browsers include in `euc-kr`, such as `똠`. Chrome decodes it correctly. Its decoding test runs as an expected failure until Node catches up.

## Sources and licences

- The UDHR texts come from the [NLTK UDHR corpus (Unicode version)](https://www.nltk.org/nltk_data/), which is in the public domain.
- The CSV data, and two Welsh sentences added to `iso8859-14.txt` (the UDHR's Welsh text never uses `ŵ` or `ŷ`), are written for these tests.

The files were generated once, with Python's standard codecs, which use the same encoding names as jschardet.
