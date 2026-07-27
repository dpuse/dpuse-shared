# DPUse Shared Library

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/@dpuse/dpuse-shared.svg)](https://www.npmjs.com/package/@dpuse/dpuse-shared)
[![CodeQL](https://github.com/dpuse/dpuse-shared/actions/workflows/codeql.yml/badge.svg)](https://github.com/dpuse/dpuse-shared/actions/workflows/codeql.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dpuse_dpuse-shared&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=dpuse_dpuse-shared)
[![CI](https://github.com/dpuse/dpuse-shared/actions/workflows/ci.yml/badge.svg)](https://github.com/dpuse/dpuse-shared/actions/workflows/ci.yml)

## Introduction

@dpuse/dpuse-shared is the foundational library for the [DPUse](https://www.dpuse.app/) ecosystem. It provides the common constants, types, errors, and utilities that are shared across all DPUse modules — including the App, API, Engine, Connectors, Contexts, Presenters and Recipes.

The library is written in TypeScript and designed to be consumed exclusively by TypeScript projects. All configuration types are schema-validated using [Valibot](https://valibot.dev/), giving consumers both compile-time safety and runtime validation from a single source of truth.

<!-- OPENING_START -->

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![DPUse version](https://img.shields.io/github/v/release/dpuse/dpuse-shared?color=f6821f&label=DPUse)](https://github.com/dpuse/dpuse-shared/releases/latest)
[![CI](https://github.com/dpuse/dpuse-shared/actions/workflows/ci.yml/badge.svg)](https://github.com/dpuse/dpuse-shared/actions/workflows/ci.yml)
[![CodeQL](https://github.com/dpuse/dpuse-shared/actions/workflows/codeql.yml/badge.svg)](https://github.com/dpuse/dpuse-shared/actions/workflows/codeql.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dpuse_dpuse-shared&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=dpuse_dpuse-shared)

[Documentation](https://www.dpuse.app) · [Report a Vulnerability](https://github.com/dpuse/dpuse-shared/security/advisories/new) · [Open an Issue](https://github.com/dpuse/dpuse-shared/issues)

## About DPUse

DPUse (Data Positioning & Use) is an in-browser application that positions your data for use through three core activities: sourcing, contextualising, and publishing. **Sourcing** uses a library of [Connectors](https://www.dpuse.app) to establish [Connections](https://www.dpuse.app) to applications, databases, file stores, and curated datasets; these connections are subsequently used to configure structured [Data Views](https://www.dpuse.app) from the underlying sources. **Contextualising** extracts chronological events from those [Data Views](https://www.dpuse.app) and maps them into comprehensive [Context Models](https://www.dpuse.app). This provides the DPUse Engine with the structural framework required to generate deterministic transactions, facts, or observations. **Publishing** employs a library of [Presenters](https://www.dpuse.app) to render standard [Presentations](https://www.dpuse.app) immediately using the contextualised data; additionally, [Cookbooks](https://www.dpuse.app) of [Recipes](https://www.dpuse.app) allow you to build Data Apps using your preferred tools.

## Introduction

...

<!-- OPENING_END -->

## Table of Contents

## Prerequisites

The following are required to use this library:

| Prerequisite                                  | Version |
| --------------------------------------------- | :-----: |
| [Node.js](https://nodejs.org/)                | ≥ 22.0  |
| [npm](https://www.npmjs.com/)                 | ≥ 11.0  |
| [TypeScript](https://www.typescriptlang.org/) |  ≥ 6.0  |

## Installation

`@dpuse/dpuse-shared` is published to the [public npm registry](https://www.npmjs.com/package/@dpuse/dpuse-shared). Install it using your preferred package manager:

```bash
# npm
npm install @dpuse/dpuse-shared

# yarn
yarn add @dpuse/dpuse-shared

# pnpm
pnpm add @dpuse/dpuse-shared
```

This package has no peer dependencies.

## Usage

This package uses [sub-path exports](https://nodejs.org/api/packages.html#subpath-exports). Import only the entry points you need:

```ts
import { getComponentStatus } from '@dpuse/dpuse-shared/component';
import type { ConnectorConfig } from '@dpuse/dpuse-shared/component/module/connector';
import { ConnectorError, serialiseError } from '@dpuse/dpuse-shared/errors';
import { formatNumberAsDuration } from '@dpuse/dpuse-shared/utilities';

try {
    // The locator argument follows the convention 'project.file.function'
    throw new ConnectorError('Connection failed.', 'connector.connection.read');
} catch (error) {
    const serialised = serialiseError(error);
}
```

Implements the common Data Positioning repository management command set. For more information see [@dpuse/dpuse-development](https://github.com/dpuse/dpuse-development).

## Architecture

### Component Hierarchy

`Component` is the foundational base type for all DPUse components. All component types extend `ComponentConfig` and are logically grouped in the following hierarchy. `Module` is a component type whose implementations are dynamically loaded by the host modules (App and API):

![Schematic](./schematic.svg)

### Encoding

Character encoding types with detection and decodability flags, a static catalogue of all supported encodings loaded from JSON, and an action to retrieve them in sorted order. |

### Errors

A typed error hierarchy (`DPUseError`, `AppError`, `APIError`, `EngineError`, `ConnectorError`, `FetchError`) with serialisation and deserialisation for transporting errors across API and worker boundaries, plus utilities for normalising unknown throwables, constructing errors from HTTP responses, and suppressing best-effort cleanup errors. |

### Locale

Locale and flag identifiers, localised label, description and verb types, Valibot schemas for locale fields, supported language constants, and actions for resolving and applying locale-specific values to configuration objects. |

### Utilities

OData-to-internal type conversion, file path name and extension extraction, number formatting as decimal, whole number, compact size, storage size and duration, and MIME type lookup by file extension. |

## API Reference

See [API_REFERENCE.md](./API_REFERENCE.md) for the complete API reference, including all exported schemas, types, classes, constants, and actions for each sub-path entry point.

## Dependency Licenses

License data is collected automatically on each release using [license-checker](https://github.com/RSeidelsohn/license-checker-rseidelsohn). The following table lists all production dependencies. These dependencies (including transitive ones) have been checked and confirmed to use Apache-2.0, BSD-3-Clause, CC0-1.0, or MIT — all permissive, commercially-friendly licenses. Developers cloning this repository should independently verify development dependencies; users of the uploaded library are covered by these checks.

<!-- DEPENDENCY_LICENSES_START -->

License data is collected automatically on each release using [license-checker](https://github.com/RSeidelsohn/license-checker-rseidelsohn). The following table lists all production dependencies. These dependencies (including transitive ones) have been checked and confirmed to use MIT — all permissive, commercially-friendly licenses. Users of the uploaded library are covered by these checks; developers cloning this repository should independently verify development dependencies.

|Dependency|Version|License(s)|Document|
|:-|:-:|:-|:-|

<!-- DEPENDENCY_LICENSES_END -->

### Dependency Tree

The dependency tree below lists every package in this project — direct and transitive — along with its installed version, release date, and update status. Packages flagged ❗ have a newer version available; ⚠️ indicates a package that hasn't been updated in the last 6 months or longer. Neither flag necessarily indicates a problem: we let new releases stabilise before upgrading, and some packages are simply mature and stable, requiring no active development.

<!-- DEPENDENCY_TREE_START -->

The dependency tree below lists every package in this project — direct and transitive — along with its installed version, release date, and update status. Packages flagged ❗ have a newer version available; ⚠️ indicates a package that hasn't been updated in the last 6 months or longer. Neither flag necessarily indicates a problem: we let new releases stabilise before upgrading, and some packages are simply mature and stable, requiring no active development.

<!-- DEPENDENCY_TREE_END -->

## Bundle Analysis

<!-- BUNDLE_START -->

The Bundle Analysis Report is generated automatically on each release using [Sonda](https://sonda.dev/), which analyses final source maps to reveal the actual effects of tree-shaking and minification rather than relying on pre-build estimates.

_Note: Sonda's Vite reports currently exclude CSS files, since Vite does not generate source maps for CSS._

|Chunk/Module/File|Composition|
|:------ |:-----------|
| dist/componentConfig.schema-CqVgZGPq.js | 10.8 kB · brotli 2.3 kB |
| dist/dpuse-shared-encoding.es.js | 6.8 kB · brotli 953 B |
| dist/dpuse-shared-componentModuleConnector.es.js | 3.6 kB · brotli 1.2 kB |
| dist/dpuse-shared-utilities.es.js | 3.6 kB · brotli 1.1 kB |
| dist/dpuse-shared-errors.es.js | 3.5 kB · brotli 1.1 kB |
| dist/dpuse-shared-component.es.js | 1.3 kB · brotli 451 B |
| dist/dpuse-shared-locale.es.js | 987 B · brotli 390 B |
| dist/dpuse-shared-componentDataView.es.js | 722 B · brotli 310 B |
| dist/dpuse-shared-componentModulePresenter.es.js | 411 B · brotli 219 B |
| dist/dpuse-shared-componentModuleCookbook.es.js | 370 B · brotli 233 B |
| dist/dpuse-shared-componentModuleTool.es.js | 325 B · brotli 223 B |
| dist/moduleConfig.schema-CXWl_g98.js | 325 B · brotli 209 B |
| dist/dpuse-shared-componentRecipe.es.js | 94 B · brotli 70 B |
| dist/dpuse-shared-componentConnection.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentContext.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentContextModel.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentContextModelEntity.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentContextModelEntityDataItem.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentContextModelEntityEvent.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentContextModelEntityPrimaryMeasure.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentContextModelSecondaryMeasure.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentDimension.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentEventQuery.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentModule.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentModuleEngine.es.js | 0 B · brotli 1 B |
| dist/dpuse-shared-componentPresentation.es.js | 0 B · brotli 1 B |

(unassigned) = bytes Sonda can't trace to a specific source line (whitespace, stray keywords, bundler-injected region markers) — not actual missing/unknown code.

<!-- BUNDLE_END -->

<!-- GOVERNANCE_START -->

## Security & Quality

### CodeQL

[CodeQL](https://github.com/dpuse/dpuse-shared/security/code-scanning) static analysis runs on every push to `main` and on a weekly schedule, scanning TypeScript, JavaScript, Rust, and GitHub Actions workflow files for security vulnerabilities and coding errors.

### SonarCloud

[SonarCloud](https://sonarcloud.io/summary/new_code?id=dpuse_dpuse-shared) performs continuous code quality and security analysis on every push, detecting bugs, code smells, and security vulnerabilities in the TypeScript source.

### Vulnerability Scanning

Two complementary tools continuously monitor dependencies for known vulnerabilities:

- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) runs on every push to `main` via the CI workflow, failing the build if any high or critical severity vulnerabilities are detected.
- [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot) automatically raises pull requests to update vulnerable dependencies, drawing on the GitHub Advisory Database which combines NVD and npm-specific advisories.

### Supply Chain Security

[Socket.dev](https://socket.dev) monitors all dependencies for supply chain risk — detecting malicious packages, dependency confusion, typosquatting, and suspicious behaviour that may not yet have a CVE.

### Reporting Vulnerabilities

Please do not open public GitHub issues for security vulnerabilities. Use [GitHub private vulnerability reporting](https://github.com/dpuse/dpuse-shared/security/advisories/new) instead. See [SECURITY.md](./SECURITY.md) for the full disclosure policy, contact details, and expected response times.

### OpenSSF 🚧

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/dpuse/dpuse-shared/badge)](https://scorecard.dev/viewer/?uri=github.com/dpuse/dpuse-shared)

This project is working towards the [OpenSSF Best Practices](https://www.bestpractices.dev) Passing badge, a self-certification covering security policy, vulnerability reporting, build processes, code quality, and more. Currently the [OpenSSF Scorecard](https://scorecard.dev/viewer/?uri=github.com/dpuse/dpuse-shared) provides an independent automated assessment of the project's security practices and is an ongoing area of improvement.

## Contributing

This repository is maintained solely by its owner and does not, at present, accept external contributions into the canonical repo. Its source is published openly under the MIT License — every DPUse project is fully open source except DPUse Engine, which remains closed and proprietary.

For security vulnerabilities, see [Reporting Vulnerabilities](#reporting-vulnerabilities). For bugs, inconsistencies, or other feedback, [open a GitHub issue](https://github.com/dpuse/dpuse-shared/issues) — feedback is read, but responses and fixes are at the maintainer's discretion.

## License

This project is licensed under the MIT License, permitting free use, modification, and distribution.

[MIT](./LICENSE) © 2026-present Jonathan Terrell

<!-- GOVERNANCE_END -->
