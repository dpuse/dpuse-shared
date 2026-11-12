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
| Total LOC | 3626 |
| Avg Cyclomatic | 3.0 |
| P90 Cyclomatic | 6 |
| Cyclomatic units | Functions: 141, module scopes: 2, templates: 0 |
| Module-scope max cyclomatic (aggregate only) | 8 |
| Dead Files | 2.0% |
| Dead Exports | 0.4% |
| Maintainability (avg) | 92.5 |
| Hotspots (since 6 months) | 0 |
| Circular Deps | 0 |
| Unused Deps | 2 |

## Fallow: 3 high complexity functions

| File | Function | Severity | Cyclomatic | Cognitive | CRAP | Lines |
|:-----|:---------|:---------|:-----------|:----------|:-----|:------|
| `src/component/module/connector/objectParsing.ts:43` | `buildPreviewObjectResult` | high | 38 **!** | 18 **!** | 38.0 **!** | 134 |
| `src/component/module/tool/delimitedText.ts:38` | `determineValueDelimiter` | moderate | 15 | 17 **!** | - | 44 |
| `scripts/documentEncodings.ts:17` | `rows` | moderate | 6 | 5 | 42.0 **!** | 2 |

**!** marks the dimension that breached.

**49** files, **141** functions analyzed (thresholds: cyclomatic > 20, cognitive > 15, CRAP >= 30.0)

### File Health Scores (21 files)

| File | Maintainability | Fan-in | Fan-out | Dead Code | Density | Risk |
|:-----|:---------------|:-------|:--------|:----------|:--------|:-----|
| `scripts/documentEncodings.ts` | 94.7 | 0 | 0 | 0% | 0.21 | 42.0 |
| `src/component/module/connector/objectParsing.ts` | 86.7 | 1 | 4 | 0% | 0.23 | 38.0 |
| `src/utilities/index.ts` | 92.5 | 1 | 0 | 0% | 0.25 | 17.0 |
| `src/component/module/tool/delimitedText.ts` | 85.1 | 1 | 2 | 0% | 0.35 | 15.0 |
| `src/errors/index.ts` | 91.0 | 4 | 0 | 0% | 0.30 | 13.8 |
| `scripts/checkBrowserDecoding.ts` | 93.1 | 0 | 0 | 0% | 0.23 | 12.0 |
| `src/component/module/connector/index.ts` | 87.9 | 5 | 13 | 0% | 0.05 | 8.0 |
| `src/component/module/connector/storePath.ts` | 95.8 | 1 | 0 | 0% | 0.39 | 7.0 |
| `src/locale/index.ts` | 86.4 | 5 | 1 | 0% | 0.36 | 6.0 |
| `src/component/module/connector/tableSchema.ts` | 90.2 | 1 | 2 | 0% | 0.18 | 6.0 |
| `src/component/module/tool/index.ts` | 86.2 | 6 | 6 | 0% | 0.20 | 4.0 |
| `src/component/index.ts` | 92.9 | 14 | 2 | 0% | 0.09 | 4.0 |
| `src/component/module/connector/storeValues.ts` | 92.6 | 1 | 2 | 0% | 0.28 | 3.0 |
| `src/component/dataView/index.ts` | 95.3 | 10 | 2 | 0% | 0.01 | 3.0 |
| `src/encoding/index.ts` | 95.4 | 5 | 1 | 0% | 0.06 | 3.0 |
| `src/locale/label.ts` | 97.6 | 11 | 0 | 0% | 0.12 | 3.0 |
| `src/component/module/engine/index.ts` | 91.3 | 2 | 6 | 0% | 0.03 | 2.0 |
| `src/component/module/presenter/index.ts` | 91.9 | 1 | 5 | 0% | 0.03 | 2.0 |
| `src/component/module/connector/webLock.ts` | 97.0 | 1 | 0 | 0% | 0.22 | 2.0 |
| `vite.config.ts` | 99.5 | 0 | 0 | 0% | 0.02 | 2.0 |
| `src/schema.ts` | 98.8 | 6 | 0 | 0% | 0.18 | 1.0 |

**Average maintainability index:** 92.5/100

### Hotspots (15 files, since 6 months)

| File | Score | Commits | Churn | Density | Fan-in | Trend |
|:-----|:------|:--------|:------|:--------|:-------|:------|
| `src/component/module/connector/objectParsing.ts` | 35.4 | 23 | 892 | 0.23 | 1 | stable |
| `src/component/module/tool/index.ts` | 16.4 | 16 | 120 | 0.20 | 6 | stable |
| `src/component/module/connector/index.ts` | 13.9 | 52 | 820 | 0.05 | 5 | accelerating |
| `src/utilities/index.ts` | 11.7 | 11 | 474 | 0.25 | 1 | stable |
| `src/locale/index.ts` | 11.5 | 11 | 153 | 0.36 | 5 | cooling |
| `src/component/module/tool/delimitedText.ts` | 11.4 | 5 | 133 | 0.35 | 1 | stable |
| `src/errors/index.ts` | 11.4 | 9 | 230 | 0.30 | 4 | stable |
| `scripts/documentEncodings.ts` | 5.8 | 5 | 83 | 0.21 | 0 | cooling |
| `scripts/checkBrowserDecoding.ts` | 5.2 | 4 | 171 | 0.23 | 0 | cooling |
| `src/component/index.ts` | 3.8 | 10 | 119 | 0.09 | 14 | stable |
| `src/encoding/index.ts` | 2.8 | 9 | 778 | 0.06 | 5 | accelerating |
| `src/component/dataView/index.ts` | 2.7 | 44 | 1524 | 0.01 | 10 | accelerating |
| `vite.config.ts` | 1.6 | 21 | 139 | 0.02 | 0 | accelerating |
| `src/component/module/engine/index.ts` | 1.5 | 11 | 107 | 0.03 | 2 | stable |
| `src/component/module/presenter/index.ts` | 1.3 | 10 | 98 | 0.03 | 1 | cooling |

*6 files excluded (< 3 commits)*

### Hidden Change Coupling (10 pairs, since 12 months)

| File A | File B | Degree | Shared | Commits A | Commits B | Strong |
|:-------|:-------|:-------|:-------|:----------|:----------|:-------|
| `src/component/module/cookbook/index.ts` | `src/component/module/index.ts` | 71% | 5 | 6 | 8 | **strong** |
| `src/component/module/index.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 60% | 6 | 8 | 12 | **strong** |
| `src/component/module/cookbook/cookbookConfig.schema.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 56% | 5 | 6 | 12 | **strong** |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 50% | 9 | 24 | 12 | **strong** |
| `src/component/module/index.ts` | `src/component/module/presenter/index.ts` | 48% | 6 | 8 | 17 |  |
| `src/component/eventQuery/index.ts` | `src/component/module/presenter/index.ts` | 40% | 5 | 8 | 17 |  |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/index.ts` | 38% | 6 | 24 | 8 |  |
| `src/component/eventQuery/index.ts` | `src/component/module/tool/index.ts` | 38% | 5 | 8 | 18 |  |
| `src/component/module/moduleConfig.schema.ts` | `src/component/module/presenter/index.ts` | 33% | 5 | 13 | 17 |  |
| `src/component/module/moduleConfig.schema.ts` | `src/component/module/tool/index.ts` | 32% | 5 | 13 | 18 |  |

*Files that change together in the commit history with no import between them.*

### Refactoring Targets (1)

| Efficiency | Category | Effort / Confidence | File | Recommendation |
|:-----------|:---------|:--------------------|:-----|:---------------|
| 10.9 | high impact | medium / medium | `src/locale/index.ts` | Split high-impact file (56 LOC), 5 dependents amplify every change |

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
- **Efficiency**: priority / effort (higher = better quick-win value, default sort)
- **Category**: recommendation type (churn+complexity, high impact, dead code, complexity, coupling, circular dep)
- **Effort**: estimated effort (low / medium / high) based on file size, function count, and fan-in
- **Confidence**: recommendation reliability (high = deterministic analysis, medium = heuristic, low = git-dependent)

[Full metric reference](https://fallow.tools/docs/explanations/health/)

</details>

