## Fallow: 2 issues found

### Unused files (1)

- `src/component/recipe/index.ts`

### Unused devDependencies (1)

- `jschardet`


## Fallow: no code duplication found

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 2534 |
| Avg Cyclomatic | 2.7 |
| P90 Cyclomatic | 6 |
| Cyclomatic units | Functions: 100, module scopes: 2, templates: 0 |
| Module-scope max cyclomatic (aggregate only) | 8 |
| Dead Files | 2.5% |
| Dead Exports | 0.0% |
| Maintainability (avg) | 93.4 |
| Hotspots (since 6 months) | 1 |
| Circular Deps | 0 |
| Unused Deps | 1 |


### File Health Scores (13 files)

| File | Maintainability | Fan-in | Fan-out | Dead Code | Density | Risk |
|:-----|:---------------|:-------|:--------|:----------|:--------|:-----|
| `scripts/documentEncodings.ts` | 95.8 | 0 | 0 | 0% | 0.18 | 20.0 |
| `src/utilities/index.ts` | 90.4 | 1 | 0 | 0% | 0.32 | 16.0 |
| `src/errors/index.ts` | 91.0 | 2 | 0 | 0% | 0.30 | 13.8 |
| `src/component/dataView/index.ts` | 92.1 | 3 | 3 | 0% | 0.08 | 12.0 |
| `scripts/checkBrowserDecoding.ts` | 93.1 | 0 | 0 | 0% | 0.23 | 12.0 |
| `src/component/module/connector/index.ts` | 89.4 | 2 | 8 | 0% | 0.06 | 8.0 |
| `src/locale/index.ts` | 86.4 | 4 | 1 | 0% | 0.36 | 6.0 |
| `src/component/index.ts` | 92.9 | 16 | 2 | 0% | 0.09 | 4.0 |
| `src/component/module/tool/index.ts` | 91.5 | 3 | 3 | 0% | 0.11 | 3.0 |
| `src/encoding/index.ts` | 95.1 | 2 | 1 | 0% | 0.07 | 3.0 |
| `src/locale/label.ts` | 97.6 | 12 | 0 | 0% | 0.12 | 3.0 |
| `vite.config.ts` | 99.5 | 0 | 0 | 0% | 0.02 | 2.0 |
| `src/schema.ts` | 98.8 | 5 | 0 | 0% | 0.18 | 1.0 |

**Average maintainability index:** 93.4/100

### Hotspots (12 files, since 6 months)

| File | Score | Commits | Churn | Density | Fan-in | Trend |
|:-----|:------|:--------|:------|:--------|:-------|:------|
| `src/locale/index.ts` | 59.2 | 23 | 293 | 0.36 | 4 | cooling |
| `src/errors/index.ts` | 32.3 | 9 | 237 | 0.30 | 2 | accelerating |
| `src/utilities/index.ts` | 30.9 | 14 | 340 | 0.32 | 1 | cooling |
| `src/component/module/connector/index.ts` | 16.2 | 30 | 960 | 0.06 | 2 | cooling |
| `src/component/index.ts` | 14.1 | 17 | 201 | 0.09 | 16 | stable |
| `scripts/documentEncodings.ts` | 12.5 | 4 | 68 | 0.18 | 0 | cooling |
| `scripts/checkBrowserDecoding.ts` | 12.1 | 3 | 169 | 0.23 | 0 | cooling |
| `src/component/module/tool/index.ts` | 9.2 | 9 | 74 | 0.11 | 3 | accelerating |
| `src/component/dataView/index.ts` | 8.7 | 14 | 614 | 0.08 | 3 | cooling |
| `src/encoding/index.ts` | 7.1 | 8 | 474 | 0.07 | 2 | accelerating |
| `vite.config.ts` | 5.6 | 28 | 178 | 0.02 | 0 | stable |
| `src/schema.ts` | 4.9 | 5 | 24 | 0.18 | 5 | cooling |

*1 file excluded (< 3 commits)*

### Refactoring Targets (1)

| Efficiency | Category | Effort / Confidence | File | Recommendation |
|:-----------|:---------|:--------------------|:-----|:---------------|
| 15.3 | high impact | medium / medium | `src/locale/index.ts` | Split high-impact file (56 LOC), 4 dependents amplify every change |

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

[Full metric reference](https://docs.fallow.tools/explanations/metrics)

</details>

