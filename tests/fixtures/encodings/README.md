# Encoding samples

Small test files for character encoding detection and decoding: one per encoding [jschardet](https://github.com/aadsm/jschardet) can detect, plus a few mostly-ASCII CSV files. Each file is named after the encoding it is written in, using the name jschardet reports.

## What is here

- `samples/` — the test files. `.txt` files hold about 1,000 characters of the Universal Declaration of Human Rights in a language that suits the encoding. `.csv` files hold a small table of names and cities, mostly plain ASCII with a few accented or non-Latin values, the realistic hard case for a detector.
- `expected/` — the same text in UTF-8, to check a file decodes correctly.
- `manifest.json` — each file's encoding, language and what jschardet detects.
- `chardet/` — a second set: chardet's own test files, with its licence. See [chardet's test files](#chardets-test-files).

Each sample keeps only characters its encoding can hold. `cp1006.txt` (Urdu) loses about 17% of the text, because that code page lacks several Urdu letters, and `cp864.txt` and `cp1006.txt` store Arabic letters as fixed presentation forms, as those code pages require.

## Results with jschardet 4.0.0

- **Exact** — jschardet names the file's own encoding: 71 files.
- **Same text** — jschardet names a sister encoding that decodes this file to exactly the same text, e.g. `Windows-1252` for `ISO-8859-1` text that avoids the characters where they differ: 17 files.
- **Wrong** — decoding as the detected encoding garbles the text: 5 files.

The tests in `tests/encoding/samples.test.ts` check every file against this table. Correct detections must stay correct, and the wrong ones run as expected failures, listed in every test run. Either kind fails the run if a jschardet upgrade changes its result, so the table never goes stale.

| File                                               | Encoding        | Language                                  | Detected     | Result       |
| :------------------------------------------------- | :-------------- | :---------------------------------------- | :----------- | :----------- |
| [ascii.txt](samples/ascii.txt)                     | ascii           | English                                   | ascii        | ✅ Exact     |
| [utf-8.txt](samples/utf-8.txt)                     | utf-8           | French                                    | utf-8        | ✅ Exact     |
| [UTF-8-SIG.txt](samples/UTF-8-SIG.txt)             | UTF-8-SIG       | Russian                                   | UTF-8-SIG    | ✅ Exact     |
| [UTF-16.txt](samples/UTF-16.txt)                   | UTF-16          | German                                    | UTF-16       | ✅ Exact     |
| [utf-16-be.txt](samples/utf-16-be.txt)             | utf-16-be       | Russian                                   | utf-16-be    | ✅ Exact     |
| [utf-16-le.txt](samples/utf-16-le.txt)             | utf-16-le       | Greek                                     | utf-16-le    | ✅ Exact     |
| [UTF-32.txt](samples/UTF-32.txt)                   | UTF-32          | English                                   | UTF-32       | ✅ Exact     |
| [utf-32-be.txt](samples/utf-32-be.txt)             | utf-32-be       | Japanese                                  | utf-32-be    | ✅ Exact     |
| [utf-32-le.txt](samples/utf-32-le.txt)             | utf-32-le       | Turkish                                   | utf-32-le    | ✅ Exact     |
| [utf-7.txt](samples/utf-7.txt)                     | utf-7           | French                                    | utf-7        | ✅ Exact     |
| [Big5.txt](samples/Big5.txt)                       | Big5            | Chinese (Traditional)                     | Big5         | ✅ Exact     |
| [CP932.txt](samples/CP932.txt)                     | CP932           | Japanese                                  | CP932        | ✅ Exact     |
| [CP949.txt](samples/CP949.txt)                     | CP949           | Korean                                    | CP949        | ✅ Exact     |
| [EUC-JP.txt](samples/EUC-JP.txt)                   | EUC-JP          | Japanese                                  | EUC-JP       | ✅ Exact     |
| [EUC-KR.txt](samples/EUC-KR.txt)                   | EUC-KR          | Korean                                    | CP949        | ✅ Same text |
| [GB18030.txt](samples/GB18030.txt)                 | GB18030         | Chinese (Simplified)                      | GB18030      | ✅ Exact     |
| [HZ-GB-2312.txt](samples/HZ-GB-2312.txt)           | HZ-GB-2312      | Chinese (Simplified)                      | HZ-GB-2312   | ✅ Exact     |
| [ISO-2022-JP.txt](samples/ISO-2022-JP.txt)         | ISO-2022-JP     | Japanese                                  | ISO-2022-JP  | ✅ Exact     |
| [iso2022_jp_2004.txt](samples/iso2022_jp_2004.txt) | iso2022_jp_2004 | Japanese                                  | ISO-2022-JP  | ✅ Same text |
| [iso2022_jp_ext.txt](samples/iso2022_jp_ext.txt)   | iso2022_jp_ext  | Japanese                                  | ISO-2022-JP  | ✅ Same text |
| [ISO-2022-KR.txt](samples/ISO-2022-KR.txt)         | ISO-2022-KR     | Korean                                    | ISO-2022-KR  | ✅ Exact     |
| [SHIFT_JIS.txt](samples/SHIFT_JIS.txt)             | SHIFT_JIS       | Japanese                                  | CP932        | ✅ Same text |
| [CP874.txt](samples/CP874.txt)                     | CP874           | Thai                                      | CP874        | ✅ Exact     |
| [Windows-1250.txt](samples/Windows-1250.txt)       | Windows-1250    | Polish                                    | Windows-1250 | ✅ Exact     |
| [Windows-1251.txt](samples/Windows-1251.txt)       | Windows-1251    | Russian                                   | Windows-1251 | ✅ Exact     |
| [Windows-1252.txt](samples/Windows-1252.txt)       | Windows-1252    | French                                    | Windows-1252 | ✅ Exact     |
| [Windows-1253.txt](samples/Windows-1253.txt)       | Windows-1253    | Greek                                     | Windows-1253 | ✅ Exact     |
| [Windows-1254.txt](samples/Windows-1254.txt)       | Windows-1254    | Turkish                                   | Windows-1254 | ✅ Exact     |
| [Windows-1255.txt](samples/Windows-1255.txt)       | Windows-1255    | Hebrew                                    | Windows-1255 | ✅ Exact     |
| [Windows-1256.txt](samples/Windows-1256.txt)       | Windows-1256    | Arabic                                    | Windows-1256 | ✅ Exact     |
| [Windows-1257.txt](samples/Windows-1257.txt)       | Windows-1257    | Lithuanian                                | Windows-1257 | ✅ Exact     |
| [cp1258.txt](samples/cp1258.txt)                   | cp1258          | Vietnamese                                | cp1258       | ✅ Exact     |
| [KOI8-R.txt](samples/KOI8-R.txt)                   | KOI8-R          | Russian                                   | KOI8-R       | ✅ Exact     |
| [koi8-u.txt](samples/koi8-u.txt)                   | koi8-u          | Ukrainian                                 | koi8-u       | ✅ Exact     |
| [TIS-620.txt](samples/TIS-620.txt)                 | TIS-620         | Thai                                      | CP874        | ✅ Same text |
| [ISO-8859-1.txt](samples/ISO-8859-1.txt)           | ISO-8859-1      | German                                    | Windows-1252 | ✅ Same text |
| [ISO-8859-2.txt](samples/ISO-8859-2.txt)           | ISO-8859-2      | Czech                                     | ISO-8859-2   | ✅ Exact     |
| [iso8859-3.txt](samples/iso8859-3.txt)             | iso8859-3       | Maltese                                   | iso8859-3    | ✅ Exact     |
| [iso8859-4.txt](samples/iso8859-4.txt)             | iso8859-4       | Latvian                                   | iso8859-4    | ✅ Exact     |
| [ISO-8859-5.txt](samples/ISO-8859-5.txt)           | ISO-8859-5      | Bulgarian                                 | ISO-8859-5   | ✅ Exact     |
| [ISO-8859-6.txt](samples/ISO-8859-6.txt)           | ISO-8859-6      | Arabic                                    | ISO-8859-6   | ✅ Exact     |
| [ISO-8859-7.txt](samples/ISO-8859-7.txt)           | ISO-8859-7      | Greek                                     | Windows-1253 | ✅ Same text |
| [ISO-8859-8.txt](samples/ISO-8859-8.txt)           | ISO-8859-8      | Hebrew                                    | Windows-1255 | ✅ Same text |
| [ISO-8859-9.txt](samples/ISO-8859-9.txt)           | ISO-8859-9      | Turkish                                   | Windows-1254 | ✅ Same text |
| [iso8859-10.txt](samples/iso8859-10.txt)           | iso8859-10      | Icelandic                                 | Windows-1252 | ✅ Same text |
| [ISO-8859-13.txt](samples/ISO-8859-13.txt)         | ISO-8859-13     | Latvian                                   | Windows-1257 | ✅ Same text |
| [iso8859-14.txt](samples/iso8859-14.txt)           | iso8859-14      | Welsh                                     | iso8859-14   | ✅ Exact     |
| [iso8859-15.txt](samples/iso8859-15.txt)           | iso8859-15      | French                                    | Windows-1252 | ✅ Same text |
| [iso8859-16.txt](samples/iso8859-16.txt)           | iso8859-16      | Romanian                                  | Windows-1250 | ❌ Wrong     |
| [Johab.txt](samples/Johab.txt)                     | Johab           | Korean                                    | Johab        | ✅ Exact     |
| [MacCyrillic.txt](samples/MacCyrillic.txt)         | MacCyrillic     | Russian                                   | MacCyrillic  | ✅ Exact     |
| [MacGreek.txt](samples/MacGreek.txt)               | MacGreek        | Greek                                     | MacGreek     | ✅ Exact     |
| [MacIceland.txt](samples/MacIceland.txt)           | MacIceland      | Icelandic                                 | MacIceland   | ✅ Exact     |
| [MacLatin2.txt](samples/MacLatin2.txt)             | MacLatin2       | Czech                                     | MacLatin2    | ✅ Exact     |
| [MacRoman.txt](samples/MacRoman.txt)               | MacRoman        | French                                    | MacRoman     | ✅ Exact     |
| [MacTurkish.txt](samples/MacTurkish.txt)           | MacTurkish      | Turkish                                   | MacTurkish   | ✅ Exact     |
| [cp720.txt](samples/cp720.txt)                     | cp720           | Arabic                                    | cp720        | ✅ Exact     |
| [cp1006.txt](samples/cp1006.txt)                   | cp1006          | Urdu                                      | cp1006       | ✅ Exact     |
| [cp1125.txt](samples/cp1125.txt)                   | cp1125          | Ukrainian                                 | cp1125       | ✅ Exact     |
| [koi8-t.txt](samples/koi8-t.txt)                   | koi8-t          | Tajik                                     | koi8-t       | ✅ Exact     |
| [KZ1048.txt](samples/KZ1048.txt)                   | KZ1048          | Kazakh                                    | KZ1048       | ✅ Exact     |
| [ptcp154.txt](samples/ptcp154.txt)                 | ptcp154         | Kazakh                                    | ptcp154      | ✅ Exact     |
| [hp-roman8.txt](samples/hp-roman8.txt)             | hp-roman8       | French                                    | hp-roman8    | ✅ Exact     |
| [cp437.txt](samples/cp437.txt)                     | cp437           | French                                    | cp437        | ✅ Exact     |
| [cp737.txt](samples/cp737.txt)                     | cp737           | Greek                                     | cp737        | ✅ Exact     |
| [cp775.txt](samples/cp775.txt)                     | cp775           | Lithuanian                                | cp775        | ✅ Exact     |
| [cp850.txt](samples/cp850.txt)                     | cp850           | German                                    | cp437        | ✅ Same text |
| [cp852.txt](samples/cp852.txt)                     | cp852           | Polish                                    | cp852        | ✅ Exact     |
| [IBM855.txt](samples/IBM855.txt)                   | IBM855          | Bulgarian                                 | IBM855       | ✅ Exact     |
| [cp856.txt](samples/cp856.txt)                     | cp856           | Hebrew                                    | cp862        | ✅ Same text |
| [cp857.txt](samples/cp857.txt)                     | cp857           | Turkish                                   | cp857        | ✅ Exact     |
| [cp858.txt](samples/cp858.txt)                     | cp858           | French                                    | cp437        | ✅ Same text |
| [cp860.txt](samples/cp860.txt)                     | cp860           | Portuguese                                | cp860        | ✅ Exact     |
| [cp861.txt](samples/cp861.txt)                     | cp861           | Icelandic                                 | cp861        | ✅ Exact     |
| [cp862.txt](samples/cp862.txt)                     | cp862           | Hebrew                                    | cp862        | ✅ Exact     |
| [cp863.txt](samples/cp863.txt)                     | cp863           | French                                    | cp437        | ✅ Same text |
| [cp864.txt](samples/cp864.txt)                     | cp864           | Arabic                                    | Windows-1256 | ❌ Wrong     |
| [cp865.txt](samples/cp865.txt)                     | cp865           | Norwegian                                 | cp865        | ✅ Exact     |
| [IBM866.txt](samples/IBM866.txt)                   | IBM866          | Russian                                   | IBM866       | ✅ Exact     |
| [cp869.txt](samples/cp869.txt)                     | cp869           | Greek                                     | cp869        | ✅ Exact     |
| [cp1140.txt](samples/cp1140.txt)                   | cp1140          | English                                   | cp500        | ✅ Same text |
| [cp424.txt](samples/cp424.txt)                     | cp424           | Hebrew                                    | ascii        | ❌ Wrong     |
| [cp500.txt](samples/cp500.txt)                     | cp500           | French                                    | cp500        | ✅ Exact     |
| [cp875.txt](samples/cp875.txt)                     | cp875           | Greek                                     | cp875        | ✅ Exact     |
| [cp1026.txt](samples/cp1026.txt)                   | cp1026          | Turkish                                   | cp1026       | ✅ Exact     |
| [cp273.txt](samples/cp273.txt)                     | cp273           | German                                    | cp273        | ✅ Exact     |
| [Windows-1252.csv](samples/Windows-1252.csv)       | Windows-1252    | English, French, German, Spanish, Danish  | Windows-1252 | ✅ Exact     |
| [Windows-1250.csv](samples/Windows-1250.csv)       | Windows-1250    | English, Polish, Czech, Hungarian         | Windows-1250 | ✅ Exact     |
| [Windows-1251.csv](samples/Windows-1251.csv)       | Windows-1251    | English, Russian                          | Windows-1251 | ✅ Exact     |
| [Windows-1254.csv](samples/Windows-1254.csv)       | Windows-1254    | English, Turkish                          | Windows-1254 | ✅ Exact     |
| [CP932.csv](samples/CP932.csv)                     | CP932           | English, Japanese                         | ISO-8859-1   | ❌ Wrong     |
| [MacRoman.csv](samples/MacRoman.csv)               | MacRoman        | English, French, German, Portuguese       | ISO-8859-1   | ❌ Wrong     |
| [cp850.csv](samples/cp850.csv)                     | cp850           | English, German, French, Swedish, Spanish | cp850        | ✅ Exact     |

## chardet's test files

The `chardet` folder holds the test files from [chardet](https://github.com/runk/node-chardet), copyright 2024 Dmitry Shirokov, under the MIT licence in `chardet/LICENSE`:

- `encodings/` — chardet's [unit-test files](https://github.com/runk/node-chardet/tree/master/src/test/data/encodings), 44 files.
- `corpus/` — chardet's [corpus](https://github.com/runk/node-chardet/tree/master/corpus), copied whole: its README, manifests, source texts (`sources.json`, `test-sources.json`) and the generated files under `generated/<encoding>/<language>/<train|validation|test>/`. 138 of the generated files are a source document's title and text, encoded, so their decoding is checked against that text. The rest are copies of the unit-test files.
- `samples.json` — ours, not chardet's: each file's true encoding, its source document where it has one, and what jschardet detects.

The tests run the same checks as for our own samples. With jschardet 4.0.0, of 216 files 144 are detected exactly, 61 as a sister encoding that gives the same text, and 11 wrong:

| File                                                        | Encoding    | Detected     |
| :---------------------------------------------------------- | :---------- | :----------- |
| `encodings/iso2022cn`                                       | ISO-2022-CN | (none)       |
| `encodings/utf16be`                                         | utf-16-be   | UTF-16       |
| `corpus/generated/CP949/ko/train/workshop.bin`              | CP949       | GB18030      |
| `corpus/generated/ISO-2022-CN/zh/validation/iso2022cn.bin`  | ISO-2022-CN | (none)       |
| `corpus/generated/ISO-8859-16/ro/test/community-garden.bin` | iso8859-16  | Windows-1250 |
| `corpus/generated/ISO-8859-16/ro/train/city-morning.bin`    | iso8859-16  | Windows-1250 |
| `corpus/generated/ISO-8859-16/ro/train/library.bin`         | iso8859-16  | Windows-1250 |
| `corpus/generated/ISO-8859-16/ro/train/market.bin`          | iso8859-16  | ISO-8859-2   |
| `corpus/generated/ISO-8859-16/ro/train/workshop.bin`        | iso8859-16  | Windows-1250 |
| `corpus/generated/ISO-8859-16/ro/validation/river-trip.bin` | iso8859-16  | Windows-1250 |
| `corpus/generated/UTF-16BE/en/validation/utf16be.bin`       | utf-16-be   | UTF-16       |

- `ISO-2022-CN` is not an encoding jschardet can detect, and browsers cannot decode it.
- chardet's `utf16be` file starts with a big-endian byte-order mark but holds little-endian text, so it cannot be detected correctly.
- Node's `TextDecoder` decodes `corpus/generated/CP949/ko/train/workshop.bin` wrongly, because it lacks the Korean extension characters browsers include in `euc-kr`, such as `똠`. Chrome decodes it correctly. Its decoding test runs as an expected failure until Node catches up.

## Sources and licences

- The UDHR texts come from the [NLTK UDHR corpus (Unicode version)](https://www.nltk.org/nltk_data/), which is in the public domain.
- The CSV data, and two Welsh sentences added to `iso8859-14.txt` (the UDHR's Welsh text never uses `ŵ` or `ŷ`), are written for these tests.

The files were generated once, with Python's standard codecs, which use the same encoding names as jschardet.
