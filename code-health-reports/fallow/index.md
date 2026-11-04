## Fallow: 4 issues found

### Unused files (1)

- `src/component/recipe/index.ts`

### Unused exports (1)

- `src/component/module/tool/toolConfig.schema.ts`
  - :15 `parserDataFormatIdSchema`

### Unused devDependencies (2)

- `iconv-lite`
- `jschardet`


## Fallow: no code duplication found

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 3531 |
| Avg Cyclomatic | 2.7 |
| P90 Cyclomatic | 6 |
| Cyclomatic units | Functions: 136, module scopes: 2, templates: 0 |
| Module-scope max cyclomatic (aggregate only) | 8 |
| Dead Files | 2.2% |
| Dead Exports | 0.4% |
| Maintainability (avg) | 92.2 |
| Hotspots (since 6 months) | 0 |
| Circular Deps | 0 |
| Unused Deps | 2 |

## Fallow: 2 high complexity functions

| File | Function | Severity | Cyclomatic | Cognitive | CRAP | Lines |
|:-----|:---------|:---------|:-----------|:----------|:-----|:------|
| `src/component/module/tool/delimitedText.ts:38` | `determineValueDelimiter` | moderate | 15 | 17 **!** | - | 44 |
| `scripts/documentEncodings.ts:17` | `rows` | moderate | 6 | 5 | 42.0 **!** | 2 |

**!** marks the dimension that breached.

**45** files, **136** functions analyzed (thresholds: cyclomatic > 20, cognitive > 15, CRAP >= 30.0)

### File Health Scores (16 files)

| File | Maintainability | Fan-in | Fan-out | Dead Code | Density | Risk |
|:-----|:---------------|:-------|:--------|:----------|:--------|:-----|
| `scripts/documentEncodings.ts` | 94.7 | 0 | 0 | 0% | 0.21 | 42.0 |
| `src/utilities/index.ts` | 92.5 | 1 | 0 | 0% | 0.25 | 17.0 |
| `src/component/module/tool/delimitedText.ts` | 85.1 | 1 | 2 | 0% | 0.35 | 15.0 |
| `src/component/module/connector/objectParsing.ts` | 89.1 | 1 | 4 | 0% | 0.15 | 14.0 |
| `src/errors/index.ts` | 91.0 | 3 | 0 | 0% | 0.30 | 13.8 |
| `src/component/dataView/index.ts` | 91.5 | 8 | 4 | 0% | 0.07 | 12.0 |
| `scripts/checkBrowserDecoding.ts` | 93.1 | 0 | 0 | 0% | 0.23 | 12.0 |
| `src/component/module/connector/index.ts` | 89.3 | 4 | 9 | 0% | 0.05 | 8.0 |
| `src/locale/index.ts` | 86.4 | 4 | 1 | 0% | 0.36 | 6.0 |
| `src/component/module/tool/index.ts` | 86.5 | 6 | 6 | 0% | 0.19 | 4.0 |
| `src/component/index.ts` | 92.9 | 16 | 2 | 0% | 0.09 | 4.0 |
| `src/encoding/index.ts` | 95.4 | 3 | 1 | 0% | 0.06 | 3.0 |
| `src/locale/label.ts` | 97.6 | 12 | 0 | 0% | 0.12 | 3.0 |
| `src/component/module/presenter/index.ts` | 91.9 | 1 | 5 | 0% | 0.03 | 2.0 |
| `vite.config.ts` | 99.5 | 0 | 0 | 0% | 0.02 | 2.0 |
| `src/schema.ts` | 98.8 | 6 | 0 | 0% | 0.18 | 1.0 |

**Average maintainability index:** 92.2/100

### Hotspots (14 files, since 6 months)

| File | Score | Commits | Churn | Density | Fan-in | Trend |
|:-----|:------|:--------|:------|:--------|:-------|:------|
| `src/utilities/index.ts` | 19.1 | 14 | 619 | 0.25 | 1 | stable |
| `src/locale/index.ts` | 17.1 | 11 | 153 | 0.36 | 4 | cooling |
| `src/component/module/tool/index.ts` | 15.1 | 12 | 100 | 0.19 | 6 | stable |
| `src/component/dataView/index.ts` | 14.8 | 26 | 628 | 0.07 | 8 | accelerating |
| `src/component/module/connector/objectParsing.ts` | 14.3 | 10 | 493 | 0.15 | 1 | cooling |
| `src/component/module/connector/index.ts` | 13.9 | 39 | 582 | 0.05 | 4 | accelerating |
| `src/errors/index.ts` | 13.8 | 8 | 226 | 0.30 | 3 | stable |
| `src/component/module/tool/delimitedText.ts` | 9.9 | 3 | 109 | 0.35 | 1 | cooling |
| `scripts/documentEncodings.ts` | 6.5 | 4 | 68 | 0.21 | 0 | cooling |
| `scripts/checkBrowserDecoding.ts` | 5.4 | 3 | 169 | 0.23 | 0 | cooling |
| `src/component/index.ts` | 4.8 | 9 | 101 | 0.09 | 16 | stable |
| `src/encoding/index.ts` | 3.6 | 8 | 557 | 0.06 | 3 | accelerating |
| `vite.config.ts` | 2.4 | 21 | 139 | 0.02 | 0 | accelerating |
| `src/component/module/presenter/index.ts` | 1.6 | 9 | 92 | 0.03 | 1 | cooling |

*2 files excluded (< 3 commits)*

### Hidden Change Coupling (4 pairs, since 12 months)

| File A | File B | Degree | Shared | Commits A | Commits B | Strong |
|:-------|:-------|:-------|:-------|:----------|:----------|:-------|
| `src/component/module/index.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 56% | 5 | 7 | 11 | **strong** |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 50% | 8 | 21 | 11 | **strong** |
| `src/component/module/index.ts` | `src/component/module/presenter/index.ts` | 43% | 5 | 7 | 16 |  |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/index.ts` | 36% | 5 | 21 | 7 |  |

*Files that change together in the commit history with no import between them.*

---

<details><summary>Metric definitions</summary>

- **MI**: Maintainability Index (0–100, higher is better)
- **Order**: risk-aware triage order using the larger of low-MI concern and CRAP risk
- **Fan-in**: files that import this file (blast radius)
- **Fan-out**: files this file imports (coupling)
- **Dead Code**: % of value exports with zero references
- **Density**: cyclomatic complexity / lines of code
- **Risk**: max CRAP score for the file; low <15, moderate 15-30, high >=30
- **Score**: churn × complexity (0–100, higher = riskier)
- **Commits**: commits in the analysis window
- **Churn**: total lines added + deleted
- **Trend**: accelerating / stable / cooling

[Full metric reference](https://fallow.tools/docs/explanations/health/)

</details>

