## Fallow: 3 issues found

### Unused files (1)

- `src/component/recipe/index.ts`

### Unused exports (1)

- `src/component/module/tool/toolConfig.schema.ts`
  - :15 `parserDataFormatIdSchema`

### Unused devDependencies (1)

- `jschardet`


## Fallow: no code duplication found

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 2844 |
| Avg Cyclomatic | 2.6 |
| P90 Cyclomatic | 6 |
| Cyclomatic units | Functions: 104, module scopes: 2, templates: 0 |
| Module-scope max cyclomatic (aggregate only) | 8 |
| Dead Files | 2.3% |
| Dead Exports | 0.5% |
| Maintainability (avg) | 93.3 |
| Hotspots (since 6 months) | 0 |
| Circular Deps | 0 |
| Unused Deps | 1 |


### File Health Scores (14 files)

| File | Maintainability | Fan-in | Fan-out | Dead Code | Density | Risk |
|:-----|:---------------|:-------|:--------|:----------|:--------|:-----|
| `scripts/documentEncodings.ts` | 95.8 | 0 | 0 | 0% | 0.18 | 20.0 |
| `src/utilities/index.ts` | 92.5 | 1 | 0 | 0% | 0.25 | 17.0 |
| `src/errors/index.ts` | 91.0 | 3 | 0 | 0% | 0.30 | 13.8 |
| `src/component/dataView/index.ts` | 91.5 | 5 | 4 | 0% | 0.07 | 12.0 |
| `scripts/checkBrowserDecoding.ts` | 93.1 | 0 | 0 | 0% | 0.23 | 12.0 |
| `src/component/module/connector/index.ts` | 89.1 | 3 | 8 | 0% | 0.07 | 8.0 |
| `src/locale/index.ts` | 86.4 | 4 | 1 | 0% | 0.36 | 6.0 |
| `src/component/index.ts` | 92.9 | 16 | 2 | 0% | 0.09 | 4.0 |
| `src/component/module/tool/index.ts` | 90.9 | 4 | 4 | 0% | 0.09 | 3.0 |
| `src/encoding/index.ts` | 95.1 | 2 | 1 | 0% | 0.07 | 3.0 |
| `src/locale/label.ts` | 97.6 | 12 | 0 | 0% | 0.12 | 3.0 |
| `src/component/module/presenter/index.ts` | 91.9 | 1 | 5 | 0% | 0.03 | 2.0 |
| `vite.config.ts` | 99.5 | 0 | 0 | 0% | 0.02 | 2.0 |
| `src/schema.ts` | 98.8 | 6 | 0 | 0% | 0.18 | 1.0 |

**Average maintainability index:** 93.3/100

### Hotspots (12 files, since 6 months)

| File | Score | Commits | Churn | Density | Fan-in | Trend |
|:-----|:------|:--------|:------|:--------|:-------|:------|
| `src/utilities/index.ts` | 39.7 | 15 | 649 | 0.25 | 1 | cooling |
| `src/locale/index.ts` | 37.7 | 13 | 174 | 0.36 | 4 | cooling |
| `src/errors/index.ts` | 27.8 | 8 | 226 | 0.30 | 3 | stable |
| `src/component/module/connector/index.ts` | 19.4 | 25 | 377 | 0.07 | 3 | stable |
| `src/component/dataView/index.ts` | 17.6 | 17 | 518 | 0.07 | 5 | accelerating |
| `scripts/documentEncodings.ts` | 11.3 | 4 | 68 | 0.18 | 0 | cooling |
| `scripts/checkBrowserDecoding.ts` | 10.9 | 3 | 169 | 0.23 | 0 | cooling |
| `src/component/index.ts` | 9.6 | 9 | 101 | 0.09 | 16 | stable |
| `src/component/module/tool/index.ts` | 7.7 | 8 | 50 | 0.09 | 4 | cooling |
| `src/encoding/index.ts` | 7.1 | 7 | 527 | 0.07 | 2 | accelerating |
| `vite.config.ts` | 4.9 | 21 | 139 | 0.02 | 0 | accelerating |
| `src/component/module/presenter/index.ts` | 3.1 | 9 | 92 | 0.03 | 1 | cooling |

*2 files excluded (< 3 commits)*

### Hidden Change Coupling (8 pairs, since 12 months)

| File A | File B | Degree | Shared | Commits A | Commits B | Strong |
|:-------|:-------|:-------|:-------|:----------|:----------|:-------|
| `src/component/module/index.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 56% | 5 | 7 | 11 | **strong** |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 52% | 8 | 20 | 11 | **strong** |
| `src/component/module/index.ts` | `src/component/module/presenter/index.ts` | 43% | 5 | 7 | 16 |  |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/index.ts` | 37% | 5 | 20 | 7 |  |
| `src/component/module/connector/index.ts` | `src/component/module/index.ts` | 34% | 7 | 34 | 7 |  |
| `src/component/connection/index.ts` | `src/component/module/tool/index.ts` | 34% | 5 | 19 | 10 |  |
| `src/component/module/connector/index.ts` | `src/component/module/presenter/index.ts` | 32% | 8 | 34 | 16 |  |
| `src/component/module/connector/index.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 31% | 7 | 34 | 11 |  |

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

