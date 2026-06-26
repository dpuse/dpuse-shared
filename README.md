# DPUse Shared Library

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared?ref=badge_shield)

[![npm version](https://img.shields.io/npm/v/@dpuse/dpuse-shared.svg)](https://www.npmjs.com/package/@dpuse/dpuse-shared)
[![CodeQL](https://github.com/dpuse/dpuse-shared/actions/workflows/codeql.yml/badge.svg)](https://github.com/dpuse/dpuse-shared/actions/workflows/codeql.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dpuse_dpuse-shared&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=dpuse_dpuse-shared)
[![CI](https://github.com/dpuse/dpuse-shared/actions/workflows/ci.yml/badge.svg)](https://github.com/dpuse/dpuse-shared/actions/workflows/ci.yml)


## Introduction

@dpuse/dpuse-shared is the foundational library for the [DPUse](https://www.dpuse.app/) ecosystem. It provides the common constants, types, errors, and utilities that are shared across all DPUse modules — including the App, API, Engine, Connectors, Contexts, Presenters and Recipes.

The library is written in TypeScript and designed to be consumed exclusively by TypeScript projects. All configuration types are schema-validated using [Valibot](https://valibot.dev/), giving consumers both compile-time safety and runtime validation from a single source of truth.

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

## Architecture

### Domain Model

`Component` is the foundational base type for all DPUse domain objects. All component types extend `ComponentConfig` and are logically grouped in the following hierarchy. `Module` is a component type whose implementations are dynamically loaded by the host modules (App and API):

```
Component
├── Module
│   ├── Connector
│   │   └── Connection
│   ├── Context
│   │   └── Model
│   │       ├── Dimension
│   │       │   └── DimensionHierarchy
│   │       ├── Entity
│   │       │   ├── DataItem
│   │       │   ├── Event
│   │       │   └── PrimaryMeasure
│   │       └── SecondaryMeasure
│   ├── Engine
│   ├── Presenter
│   │   └── Presentation
│   ├── Recipe
│   └── Tool
├── DataView
├── Dimension
└── EventQuery
```

### Cross-cutting Concerns

The following are shared across all modules and are not part of the domain model:

| Concern   | Description                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Errors    | A typed error hierarchy with serialisation and deserialisation support for transporting errors across API and worker boundaries. |
| Utilities | Common conversion, extraction, formatting and lookup functions.                                                                  |
| Encoding  | Encoding configuration and format support.                                                                                       |
| Locale    | Locale identifiers and label types used for internationalisation.                                                                |

## API Reference

This package provides constants, errors, types/interfaces and utilities used by Data Positioning modules.

### Composables

### Constants

### Errors

### Utilities

Implements the common Data Positioning repository management command set. For more information see [@dpuse/dpuse-development](https://github.com/dpuse/dpuse-development).

## Contributing

## Changelog

## Project Health

### Bundle Analysis Reports

The Bundle Analysis Report provides a detailed breakdown of the bundle's composition and module sizes, helping to identify which modules contribute most to the final build. It is generated automatically on each release using the npm package `rollup-plugin-visualizer`.

[View the Bundle Analysis Report](https://dpuse.github.io/dpuse-shared/stats.html)

### Dependency Check Report

### Dependency Licenses

The following table lists top-level production and peer dependencies. All these dependencies (including transitive ones) have been recursively verified to use Apache-2.0, BSD-2-Clause, CC0-1.0, or MIT—commercially friendly licenses with minimal restrictions. Developers cloning this repository should independently verify dev and optional dependencies; users of the uploaded library are covered by these checks. We do not include unlicensed dependencies. Used to support development activity and not released as part of the production release. Check if you clone. We use the `npm` packages [license-report](https://www.npmjs.com/package/license-report), [license-report-check](https://www.npmjs.com/package/license-report-check) and [license-report-recursive](https://www.npmjs.com/package/license-report-recursive) to identify dependency licenses.

The following table lists top-level production and peer dependencies. All these dependencies (including transitive ones) have been recursively verified to use Apache-2.0, BSD-2-Clause, CC0-1.0, or MIT—commercially friendly licenses with minimal restrictions. Developers cloning this repository should independently verify dev and optional dependencies; users of the published library are covered by these checks. We do not include unlicensed dependencies. Used to support development activity and not released as part of the production release. Check if you clone. We use the `npm` packages [license-report](https://www.npmjs.com/package/license-report), [license-report-check](https://www.npmjs.com/package/license-report-check) and [license-report-recursive](https://www.npmjs.com/package/license-report-recursive) to identify dependency licenses.

<!-- DEPENDENCY_LICENSES_START -->

| Name | Version | License(s) | Document |
| ---- | :-----: | ---------- | -------- |

<!-- DEPENDENCY_LICENSES_END -->
<!-- DEPENDENCY_TREE_START -->

<!-- DEPENDENCY_TREE_END -->

**Installed dependencies are kept up-to-date with latest releases.**

## License

[MIT](./LICENSE) © 2026 Data Positioning Pty Ltd


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared?ref=badge_large)