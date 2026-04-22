# Data Positioning Shared Library

<span><!-- OWASP_BADGES_START -->
[![OWASP](https://img.shields.io/badge/OWASP-passed-4CAF50)](https://dpuse.github.io/dpuse-shared/dependency-check-reports/dependency-check-report.html)
<!-- OWASP_BADGES_END --></span>

[![npm version](https://img.shields.io/npm/v/@dpuse/dpuse-shared.svg)](https://www.npmjs.com/package/@dpuse/dpuse-shared)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A library containing common constants, types and utilities used across all Data Positioning projects.

## Installation

Install as a production dependency:

```bash
npm install @dpuse/dpuse-shared
```

> See the Data Positioning security documentation for additional initialization requirements.

## Declarations

This package provides constants, errors, types/interfaces and utilities used by Data Positioning modules.

[Documentation](https://dpuse.github.io/dpuse-shared/docs/typedoc/index.html)

### Modules

The Data Positioning solution consists of the following modules. All modules, except `App`, extend the base type `Module`.

| Type      | Dynamic | Notes                                                           |
| --------- | :-----: | --------------------------------------------------------------- |
| App       |         | Implements the data positioning web application.                |
| Engine    |    ✔    | Implements the data positioning engine.                         |
| Connector |    ✔    | Implements a connector which handles one or more connections.   |
| Context   |    ✔    | Implements a context which defines one or more models.          |
| Presenter |    ✔    | Implements a presenter which renders one or more presentations. |
| Tool      |    ✔    | Implements...                                                   |

### Components

Each module implements a set of components. All module component types extend the base component types.

| Types                           | Notes                                                        |
| ------------------------------- | ------------------------------------------------------------ |
| [Component](./src/component.ts) | The Component type serves as a base type for all components. |
| ComponentReference              |                                                              |
| ComponentStatus                 |                                                              |
| ComponentStatusId               |                                                              |
| ComponentTypeId                 |                                                              |
| ComponentStatusColorId          |                                                              |

#### Connector Module Components

| Item                                    | Notes                                                             |
| --------------------------------------- | ----------------------------------------------------------------- |
| [Connector Types](./src/connector.ts)   | Connector types. The Connector type extends the Component type.   |
| [Connection Types](./src/connection.ts) | Connection types. The Connection type extends the Component type. |

#### Context Module Components

| Item                                     | Notes                                                               |
| ---------------------------------------- | ------------------------------------------------------------------- |
| [Context Types](./src/context.ts)        | Context types. The Context type extends the Component type.         |
| [Data View Types](./src/dataView.ts)     | DataView types. The DataView type extends the Component type.       |
| [Dimension Types](./src/dimension.ts)    | Dimension types. The Dimension type extends the Component type.     |
| [Engine Types](./src/dimension.ts)       | Engine types.                                                       |
| [Event Query Types](./src/eventQuery.ts) | Event Query types. The Event Query type extends the Component type. |

#### Engine Module Components

| Item                               | Notes         |
| ---------------------------------- | ------------- |
| [Engine Types](./src/dimension.ts) | Engine types. |

#### Presenter Module Components

| Item                                        | Notes                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------- |
| [Presenter Types](./src/presenter.ts)       | Presenter types. The Presenter type extends the Component type.       |
| [Presentation Types](./src/presentation.ts) | Presentation types. The Presentation type extends the Component type. |

### Composables

### Constants

### Errors

### Utilities

## Usage

Import the library in your TypeScript project:

```ts
import { type ConnectorConfig, getComponentStatus } from '@dpuse/dpuse-shared';

// Example type usage.
let connectorConfig: ConnectorConfig;

// Example function usage.
getComponentStatus('alpha');
```

Implements the common Data Positioning repository management command set. For more information see [@dpuse/dpuse-development](https://github.com/dpuse/dpuse-development).

## Bundle Analysis Reports

The Bundle Analysis Report provides a detailed breakdown of the bundle's composition and module sizes, helping to identify which modules contribute most to the final build. It is generated automatically on each release using the npm package `rollup-plugin-visualizer`.

[View the Bundle Analysis Report](https://dpuse.github.io/dpuse-shared/stats.html)

## Dependency Check Report

The OWASP Dependency Check Report identifies known vulnerabilities in project dependencies. It is generated automatically on each release using the npm package [owasp-dependency-check](https://dependency-check.github.io/DependencyCheck/index.html). We also rely on GitHub Dependabot to continuously check for vulnerabilities across all dependencies.

[View the OWASP Dependency Check Report](https://dpuse.github.io/dpuse-shared/dependency-check-reports/dependency-check-report.html)

## Dependency Licenses

The following table lists top-level production and peer dependencies. All these dependencies (including transitive ones) have been recursively verified to use Apache-2.0, BSD-2-Clause, CC0-1.0, or MIT—commercially friendly licenses with minimal restrictions. Developers cloning this repository should independently verify dev and optional dependencies; users of the uploaded library are covered by these checks. We do not include unlicensed dependencies. Used to support development activity and not released as part of the production release. Check if you clone. We use the `npm` packages [license-report](https://www.npmjs.com/package/license-report), [license-report-check](https://www.npmjs.com/package/license-report-check) and [license-report-recursive](https://www.npmjs.com/package/license-report-recursive) to identify dependency licenses.

The following table lists top-level production and peer dependencies. All these dependencies (including transitive ones) have been recursively verified to use Apache-2.0, BSD-2-Clause, CC0-1.0, or MIT—commercially friendly licenses with minimal restrictions. Developers cloning this repository should independently verify dev and optional dependencies; users of the published library are covered by these checks. We do not include unlicensed dependencies. Used to support development activity and not released as part of the production release. Check if you clone. We use the `npm` packages [license-report](https://www.npmjs.com/package/license-report), [license-report-check](https://www.npmjs.com/package/license-report-check) and [license-report-recursive](https://www.npmjs.com/package/license-report-recursive) to identify dependency licenses.

<!-- DEPENDENCY_LICENSES_START -->
|Name|Type|Installed|Latest|Latest Released|Deps|Document|
|:-|:-|:-:|:-:|:-|-:|:-|

<!-- DEPENDENCY_LICENSES_END -->

**Installed dependencies are kept up-to-date with latest releases.**

## License

[MIT](./LICENSE) © 2026 Data Positioning Pty Ltd
