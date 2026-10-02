## Fallow: 1 issue found

### Unused files (1)

- `src/component/recipe/index.ts`


## Fallow: no code duplication found

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 2314 |
| Avg Cyclomatic | 2.8 |
| P90 Cyclomatic | 6 |
| Cyclomatic units | Functions: 83, module scopes: 0, templates: 0 |
| Dead Files | 2.6% |
| Dead Exports | 0.0% |
| Maintainability (avg) | 93.1 |
| Hotspots (since 6 months) | 1 |
| Circular Deps | 0 |
| Unused Deps | 0 |


### File Health Scores (11 files)

| File | Maintainability | Fan-in | Fan-out | Dead Code | Density | Risk |
|:-----|:---------------|:-------|:--------|:----------|:--------|:-----|
| `src/utilities/index.ts` | 90.4 | 1 | 0 | 0% | 0.32 | 16.0 |
| `src/errors/index.ts` | 91.0 | 2 | 0 | 0% | 0.30 | 13.8 |
| `src/component/dataView/index.ts` | 92.1 | 3 | 3 | 0% | 0.08 | 12.0 |
| `src/component/module/connector/index.ts` | 89.4 | 2 | 8 | 0% | 0.06 | 8.0 |
| `src/locale/index.ts` | 86.4 | 4 | 1 | 0% | 0.36 | 6.0 |
| `src/component/index.ts` | 92.9 | 16 | 2 | 0% | 0.09 | 4.0 |
| `src/component/module/tool/index.ts` | 91.5 | 3 | 3 | 0% | 0.11 | 3.0 |
| `src/encoding/index.ts` | 95.1 | 2 | 1 | 0% | 0.07 | 3.0 |
| `src/locale/label.ts` | 97.6 | 12 | 0 | 0% | 0.12 | 3.0 |
| `vite.config.ts` | 99.3 | 0 | 0 | 0% | 0.03 | 2.0 |
| `src/schema.ts` | 98.8 | 5 | 0 | 0% | 0.18 | 1.0 |

**Average maintainability index:** 93.1/100

### Hotspots (10 files, since 6 months)

| File | Score | Commits | Churn | Density | Fan-in | Trend |
|:-----|:------|:--------|:------|:--------|:-------|:------|
| `src/locale/index.ts` | 63.1 | 23 | 293 | 0.36 | 4 | cooling |
| `src/utilities/index.ts` | 32.9 | 14 | 340 | 0.32 | 1 | cooling |
| `src/errors/index.ts` | 28.8 | 8 | 231 | 0.30 | 2 | accelerating |
| `src/component/module/connector/index.ts` | 16.2 | 29 | 958 | 0.06 | 2 | cooling |
| `src/component/index.ts` | 15.1 | 17 | 201 | 0.09 | 16 | stable |
| `src/component/module/tool/index.ts` | 9.8 | 9 | 74 | 0.11 | 3 | accelerating |
| `src/component/dataView/index.ts` | 9.2 | 14 | 614 | 0.08 | 3 | cooling |
| `vite.config.ts` | 8.3 | 27 | 174 | 0.03 | 0 | stable |
| `src/schema.ts` | 5.2 | 5 | 24 | 0.18 | 5 | cooling |
| `src/encoding/index.ts` | 5.0 | 6 | 213 | 0.07 | 2 | stable |

*1 file excluded (< 3 commits)*

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

[Full metric reference](https://docs.fallow.tools/explanations/metrics)

</details>

