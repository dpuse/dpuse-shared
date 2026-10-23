## Fallow: 2 issues found

### Unused files (1)

- `src/component/recipe/index.ts`

### Unused devDependencies (1)

- `jschardet`


## Fallow: no code duplication found

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 2639 |
| Avg Cyclomatic | 2.6 |
| P90 Cyclomatic | 6 |
| Cyclomatic units | Functions: 104, module scopes: 2, templates: 0 |
| Module-scope max cyclomatic (aggregate only) | 8 |
| Dead Files | 2.5% |
| Dead Exports | 0.0% |
| Maintainability (avg) | 93.4 |
| Hotspots (since 6 months) | 0 |
| Circular Deps | 0 |
| Unused Deps | 1 |


### File Health Scores (14 files)

| File | Maintainability | Fan-in | Fan-out | Dead Code | Density | Risk |
|:-----|:---------------|:-------|:--------|:----------|:--------|:-----|
| `scripts/documentEncodings.ts` | 95.8 | 0 | 0 | 0% | 0.18 | 20.0 |
| `src/utilities/index.ts` | 92.5 | 1 | 0 | 0% | 0.25 | 17.0 |
| `src/errors/index.ts` | 91.0 | 3 | 0 | 0% | 0.30 | 13.8 |
| `src/component/dataView/index.ts` | 92.1 | 3 | 3 | 0% | 0.08 | 12.0 |
| `scripts/checkBrowserDecoding.ts` | 93.1 | 0 | 0 | 0% | 0.23 | 12.0 |
| `src/component/module/connector/index.ts` | 89.1 | 2 | 8 | 0% | 0.07 | 8.0 |
| `src/locale/index.ts` | 86.4 | 4 | 1 | 0% | 0.36 | 6.0 |
| `src/component/index.ts` | 92.9 | 16 | 2 | 0% | 0.09 | 4.0 |
| `src/component/module/tool/index.ts` | 91.5 | 4 | 3 | 0% | 0.11 | 3.0 |
| `src/encoding/index.ts` | 95.1 | 2 | 1 | 0% | 0.07 | 3.0 |
| `src/locale/label.ts` | 97.6 | 12 | 0 | 0% | 0.12 | 3.0 |
| `src/component/module/presenter/index.ts` | 91.9 | 1 | 5 | 0% | 0.03 | 2.0 |
| `vite.config.ts` | 99.5 | 0 | 0 | 0% | 0.02 | 2.0 |
| `src/schema.ts` | 98.8 | 5 | 0 | 0% | 0.18 | 1.0 |

**Average maintainability index:** 93.4/100

### Hotspots (12 files, since 6 months)

| File | Score | Commits | Churn | Density | Fan-in | Trend |
|:-----|:------|:--------|:------|:--------|:-------|:------|
| `src/locale/index.ts` | 46.1 | 13 | 174 | 0.36 | 4 | cooling |
| `src/utilities/index.ts` | 37.3 | 13 | 619 | 0.25 | 1 | cooling |
| `src/errors/index.ts` | 34.0 | 8 | 226 | 0.30 | 3 | stable |
| `src/component/module/connector/index.ts` | 19.4 | 23 | 353 | 0.07 | 2 | stable |
| `scripts/documentEncodings.ts` | 13.8 | 4 | 68 | 0.18 | 0 | cooling |
| `scripts/checkBrowserDecoding.ts` | 13.3 | 3 | 169 | 0.23 | 0 | cooling |
| `src/component/index.ts` | 12.2 | 10 | 103 | 0.09 | 16 | accelerating |
| `src/component/dataView/index.ts` | 11.8 | 10 | 433 | 0.08 | 3 | stable |
| `src/component/module/tool/index.ts` | 8.9 | 7 | 46 | 0.11 | 4 | stable |
| `src/encoding/index.ts` | 7.1 | 6 | 437 | 0.07 | 2 | accelerating |
| `vite.config.ts` | 5.6 | 20 | 137 | 0.02 | 0 | stable |
| `src/component/module/presenter/index.ts` | 4.0 | 10 | 94 | 0.03 | 1 | stable |

*2 files excluded (< 3 commits)*

### Hidden Change Coupling (8 pairs, since 12 months)

| File A | File B | Degree | Shared | Commits A | Commits B | Strong |
|:-------|:-------|:-------|:-------|:----------|:----------|:-------|
| `src/component/module/index.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 56% | 5 | 7 | 11 | **strong** |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 52% | 8 | 20 | 11 | **strong** |
| `src/component/module/index.ts` | `src/component/module/presenter/index.ts` | 43% | 5 | 7 | 16 |  |
| `src/component/module/connector/index.ts` | `src/component/module/index.ts` | 37% | 7 | 31 | 7 |  |
| `src/component/module/connector/connectorConfig.schema.ts` | `src/component/module/index.ts` | 37% | 5 | 20 | 7 |  |
| `src/component/connection/index.ts` | `src/component/module/tool/index.ts` | 36% | 5 | 19 | 9 |  |
| `src/component/module/connector/index.ts` | `src/component/module/presenter/index.ts` | 34% | 8 | 31 | 16 |  |
| `src/component/module/connector/index.ts` | `src/component/module/presenter/presenterConfig.schema.ts` | 33% | 7 | 31 | 11 |  |

*Files that change together in the commit history with no import between them.*

### Refactoring Targets (1)

| Efficiency | Category | Effort / Confidence | File | Recommendation |
|:-----------|:---------|:--------------------|:-----|:---------------|
| 13.7 | high impact | medium / medium | `src/locale/index.ts` | Split high-impact file (56 LOC), 4 dependents amplify every change |

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

