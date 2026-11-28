## Fallow: 4 issues found

### Unused files (1)

- `src/component/recipe/index.ts`

### Unused exports (1)

- `src/component/module/tool/toolConfig.schema.ts`
  - :16 `parserDataFormatIdSchema`

### Unused devDependencies (2)

- `iconv-lite`
- `jschardet`


## Fallow: no code duplication found

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 4333 |
| Avg Cyclomatic | 3.1 |
| P90 Cyclomatic | 6 |
| Cyclomatic units | Functions: 175, module scopes: 2, templates: 0 |
| Module-scope max cyclomatic (aggregate only) | 8 |
| Dead Files | 2.0% |
| Dead Exports | 0.3% |
| Maintainability (avg) | 92.1 |
| Hotspots (since 6 months) | 0 |
| Circular Deps | 0 |
| Unused Deps | 2 |

## Fallow: 3 high complexity functions

| File | Function | Severity | Cyclomatic | Cognitive | CRAP | Lines |
|:-----|:---------|:---------|:-----------|:----------|:-----|:------|
| `src/component/module/connector/objectParsing.ts:50` | `buildPreviewObjectResult` | critical | 52 **!** | 26 **!** | 52.0 **!** | 169 |
| `src/component/module/tool/delimitedText.ts:54` | `determineValueDelimiter` | moderate | 15 | 17 **!** | - | 44 |
| `scripts/documentEncodings.ts:17` | `rows` | moderate | 6 | 5 | 42.0 **!** | 2 |

**!** marks the dimension that breached.

**51** files, **175** functions analyzed (thresholds: cyclomatic > 20, cognitive > 15, CRAP >= 30.0)

### File Health Scores (23 files)

| File | Maintainability | Fan-in | Fan-out | Dead Code | Density | Risk |
|:-----|:---------------|:-------|:--------|:----------|:--------|:-----|
| `src/component/module/connector/objectParsing.ts` | 85.3 | 1 | 5 | 0% | 0.25 | 52.0 |
| `scripts/documentEncodings.ts` | 94.7 | 0 | 0 | 0% | 0.21 | 42.0 |
| `src/utilities/index.ts` | 92.5 | 1 | 0 | 0% | 0.25 | 17.0 |
| `src/component/module/tool/delimitedText.ts` | 85.2 | 1 | 3 | 0% | 0.31 | 15.0 |
| `src/errors/index.ts` | 91.0 | 7 | 0 | 0% | 0.30 | 13.8 |
| `scripts/checkBrowserDecoding.ts` | 93.1 | 0 | 0 | 0% | 0.23 | 12.0 |
| `src/component/module/connector/index.ts` | 87.7 | 5 | 15 | 0% | 0.04 | 8.0 |
| `src/component/module/connector/webLock.ts` | 91.6 | 1 | 0 | 0% | 0.31 | 7.0 |
| `src/component/module/connector/storePath.ts` | 95.8 | 1 | 0 | 0% | 0.39 | 7.0 |
| `src/locale/index.ts` | 86.4 | 5 | 1 | 0% | 0.36 | 6.0 |
| `src/component/module/connector/tableSchema.ts` | 90.2 | 1 | 2 | 0% | 0.18 | 6.0 |
| `src/component/module/connector/objectFetching.ts` | 90.9 | 1 | 1 | 0% | 0.21 | 6.0 |
| `src/component/module/connector/storeErrors.ts` | 93.0 | 1 | 1 | 0% | 0.25 | 6.0 |
| `src/component/module/tool/index.ts` | 86.5 | 7 | 6 | 0% | 0.19 | 4.0 |
| `src/component/index.ts` | 92.9 | 14 | 2 | 0% | 0.09 | 4.0 |
| `src/component/module/connector/storeValues.ts` | 92.6 | 1 | 2 | 0% | 0.28 | 3.0 |
| `src/component/dataView/index.ts` | 93.3 | 10 | 4 | 0% | 0.01 | 3.0 |
| `src/encoding/index.ts` | 95.4 | 7 | 1 | 0% | 0.06 | 3.0 |
| `src/locale/label.ts` | 97.6 | 11 | 0 | 0% | 0.12 | 3.0 |
| `src/component/module/engine/index.ts` | 91.3 | 2 | 6 | 0% | 0.03 | 2.0 |
| `src/component/module/presenter/index.ts` | 91.9 | 1 | 5 | 0% | 0.03 | 2.0 |
| `vite.config.ts` | 99.5 | 0 | 0 | 0% | 0.02 | 2.0 |
| `src/schema.ts` | 98.8 | 6 | 0 | 0% | 0.18 | 1.0 |

**Average maintainability index:** 92.1/100

### Hotspots (16 files, since 6 months)

| File | Score | Commits | Churn | Density | Fan-in | Trend |
|:-----|:------|:--------|:------|:--------|:-------|:------|
| `src/component/module/connector/objectParsing.ts` | 39.4 | 33 | 1375 | 0.25 | 1 | cooling |
| `src/component/module/tool/index.ts` | 14.5 | 20 | 137 | 0.19 | 7 | accelerating |
| `src/component/module/connector/index.ts` | 11.1 | 69 | 976 | 0.04 | 5 | accelerating |
| `src/errors/index.ts` | 10.8 | 11 | 280 | 0.30 | 7 | accelerating |
| `src/utilities/index.ts` | 8.9 | 11 | 496 | 0.25 | 1 | accelerating |
| `src/component/module/tool/delimitedText.ts` | 8.5 | 6 | 165 | 0.31 | 1 | cooling |
| `src/locale/index.ts` | 6.6 | 8 | 118 | 0.36 | 5 | cooling |
| `src/component/module/connector/webLock.ts` | 4.6 | 3 | 70 | 0.31 | 1 | accelerating |
| `scripts/documentEncodings.ts` | 4.0 | 5 | 83 | 0.21 | 0 | cooling |
| `scripts/checkBrowserDecoding.ts` | 3.6 | 4 | 171 | 0.23 | 0 | cooling |
| `src/component/index.ts` | 2.6 | 10 | 119 | 0.09 | 14 | stable |
| `src/component/dataView/index.ts` | 2.2 | 51 | 1588 | 0.01 | 10 | accelerating |
| `src/encoding/index.ts` | 2.0 | 9 | 778 | 0.06 | 7 | accelerating |
| `vite.config.ts` | 1.1 | 20 | 137 | 0.02 | 0 | stable |
| `src/component/module/engine/index.ts` | 1.0 | 11 | 107 | 0.03 | 2 | stable |
| `src/component/module/presenter/index.ts` | 1.0 | 11 | 100 | 0.03 | 1 | stable |

*7 files excluded (< 3 commits)*

### Hidden Change Coupling (10 pairs, since 12 months)

| File A | File B | Degree | Shared | Commits A | Commits B | Strong |
|:-------|:-------|:-------|:-------|:----------|:----------|:-------|
| `src/component/module/cookbook/index.ts` | `src/component/module/index.ts` | 71% | 5 | 6 | 8 | **strong** |
| `src/component/module/index.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 60% | 6 | 8 | 12 | **strong** |
| `src/component/module/cookbook/cookbookConfig.schema.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 56% | 5 | 6 | 12 | **strong** |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 47% | 9 | 26 | 12 |  |
| `src/component/module/index.ts` | `src/component/module/presenter/index.ts` | 46% | 6 | 8 | 18 |  |
| `src/component/eventQuery/index.ts` | `src/component/module/presenter/index.ts` | 37% | 5 | 9 | 18 |  |
| `src/index.ts` | `vite.config.ts` | 35% | 17 | 46 | 52 |  |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/index.ts` | 35% | 6 | 26 | 8 |  |
| `src/component/eventQuery/index.ts` | `src/component/module/tool/index.ts` | 32% | 5 | 9 | 22 |  |
| `src/component/module/moduleConfig.schema.ts` | `src/component/module/presenter/index.ts` | 32% | 5 | 13 | 18 |  |

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

