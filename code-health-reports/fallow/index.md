## Fallow: no issues found

## Fallow: no code duplication found

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 7281 |
| Avg Cyclomatic | 2.8 |
| P90 Cyclomatic | 6 |
| Cyclomatic units | Functions: 83, module scopes: 0, templates: 0 |
| Dead Files | 0.0% |
| Dead Exports | 0.0% |
| Maintainability (avg) | 93.1 |
| Hotspots (since 6 months) | 1 |
| Circular Deps | 0 |
| Unused Deps | 0 |

## Fallow: 4 high complexity functions

| File | Function | Severity | Cyclomatic | Cognitive | CRAP | Lines |
|:-----|:---------|:---------|:-----------|:----------|:-----|:------|
| `src/errors/index.ts:120` | `normalizeToError` | critical | 10 | 9 | 110.0 **!** | 14 |
| `src/errors/index.ts:224` | `redactValue` | high | 7 | 6 | 56.0 **!** | 12 |
| `src/errors/index.ts:172` | `buildFallbackMessage` | moderate | 6 | 7 | 42.0 **!** | 12 |
| `src/errors/index.ts:185` | `reconstructError` | moderate | 6 | 1 | 42.0 **!** | 20 |

**!** marks the dimension that breached.

**40** files, **83** functions analyzed (thresholds: cyclomatic > 20, cognitive > 15, CRAP >= 30.0)

### File Health Scores (11 files)

| File | Maintainability | Fan-in | Fan-out | Dead Code | Density | Risk |
|:-----|:---------------|:-------|:--------|:----------|:--------|:-----|
| `src/errors/index.ts` | 91.0 | 1 | 0 | 0% | 0.30 | 110.0 |
| `src/utilities/index.ts` | 90.4 | 0 | 0 | 0% | 0.32 | 16.0 |
| `src/component/dataView/index.ts` | 92.1 | 2 | 3 | 0% | 0.08 | 12.0 |
| `src/encoding/index.ts` | 95.1 | 1 | 1 | 0% | 0.07 | 12.0 |
| `src/component/module/connector/index.ts` | 89.4 | 1 | 8 | 0% | 0.06 | 8.0 |
| `src/locale/index.ts` | 86.4 | 3 | 1 | 0% | 0.36 | 6.0 |
| `vite.config.ts` | 99.1 | 0 | 0 | 0% | 0.03 | 6.0 |
| `src/component/index.ts` | 92.9 | 15 | 2 | 0% | 0.09 | 4.0 |
| `src/component/module/tool/index.ts` | 91.5 | 2 | 3 | 0% | 0.11 | 3.0 |
| `src/locale/label.ts` | 97.6 | 12 | 0 | 0% | 0.12 | 3.0 |
| `src/schema.ts` | 98.8 | 5 | 0 | 0% | 0.18 | 1.0 |

**Average maintainability index:** 93.1/100

### Hotspots (10 files, since 6 months)

| File | Score | Commits | Churn | Density | Fan-in | Trend |
|:-----|:------|:--------|:------|:--------|:-------|:------|
| `src/locale/index.ts` | 67.0 | 23 | 291 | 0.36 | 3 | cooling |
| `src/utilities/index.ts` | 37.8 | 14 | 340 | 0.32 | 0 | cooling |
| `src/errors/index.ts` | 27.1 | 7 | 229 | 0.30 | 1 | stable |
| `src/component/module/connector/index.ts` | 16.2 | 27 | 948 | 0.06 | 1 | cooling |
| `src/component/index.ts` | 14.6 | 17 | 227 | 0.09 | 15 | stable |
| `src/component/module/tool/index.ts` | 11.3 | 9 | 74 | 0.11 | 2 | accelerating |
| `src/component/dataView/index.ts` | 9.8 | 15 | 642 | 0.08 | 2 | cooling |
| `vite.config.ts` | 8.3 | 25 | 133 | 0.03 | 0 | cooling |
| `src/schema.ts` | 6.0 | 5 | 24 | 0.18 | 5 | cooling |
| `src/encoding/index.ts` | 4.3 | 5 | 205 | 0.07 | 1 | cooling |

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

