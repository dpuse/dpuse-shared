// External Dependencies
import { defineConfig } from 'vite'; // Core Vite API.
import dts from 'vite-plugin-dts'; // Emit .d.ts files alongside the bundle.
import type { PackageJson } from 'type-fest';
import Sonda from 'sonda/vite'; // Visualize bundle results with Sonda plugin.
import { visualizer } from 'rollup-plugin-visualizer'; // Generate bundle size report.
import { fileURLToPath, URL } from 'node:url'; // ESM-safe path helpers.

// Local Data
import config from './config.json' with { type: 'json' }; // Provide configuration identifier for naming.
import package_ from './package.json' with { type: 'json' }; // Provide package for peer dependency detection.

// Initialisation
const { peerDependencies } = package_ as PackageJson;
const external = peerDependencies ? Object.keys(peerDependencies) : []; // Keep peer dependencies out of the bundle.

// Configuration
export default defineConfig({
    build: {
        lib: {
            entry: {
                component: fileURLToPath(new URL('src/component/index.ts', import.meta.url)),
                componentConnection: fileURLToPath(new URL('src/component/connection/index.ts', import.meta.url)),
                componentDataView: fileURLToPath(new URL('src/component/dataView/index.ts', import.meta.url)),
                componentDimension: fileURLToPath(new URL('src/component/dimension/index.ts', import.meta.url)),
                componentEventQuery: fileURLToPath(new URL('src/component/eventQuery/index.ts', import.meta.url)),
                componentModule: fileURLToPath(new URL('src/component/module/index.ts', import.meta.url)),
                componentModuleConnector: fileURLToPath(new URL('src/component/module/connector/index.ts', import.meta.url)),
                componentModuleContext: fileURLToPath(new URL('src/component/module/context/index.ts', import.meta.url)),
                componentModuleContextModel: fileURLToPath(new URL('src/component/module/context/model/index.ts', import.meta.url)),
                componentModuleContextModelDimension: fileURLToPath(new URL('src/component/module/context/model/dimension/index.ts', import.meta.url)),
                componentModuleContextModelEntity: fileURLToPath(new URL('src/component/module/context/model/entity/index.ts', import.meta.url)),
                componentModuleContextModelEntityDataItem: fileURLToPath(new URL('src/component/module/context/model/entity/dataItem/index.ts', import.meta.url)),
                componentModuleContextModelEntityEvent: fileURLToPath(new URL('src/component/module/context/model/entity/event/index.ts', import.meta.url)),
                componentModuleContextModelEntityPrimaryMeasure: fileURLToPath(new URL('src/component/module/context/model/entity/primaryMeasure/index.ts', import.meta.url)),
                componentModuleContextModelSecondaryMeasure: fileURLToPath(new URL('src/component/module/context/model/secondaryMeasure/index.ts', import.meta.url)),
                componentModulePresenter: fileURLToPath(new URL('src/component/module/presenter/index.ts', import.meta.url)),
                componentModulePresenterPresentation: fileURLToPath(new URL('src/component/module/presenter/presentation/index.ts', import.meta.url)),
                componentModuleTool: fileURLToPath(new URL('src/component/module/tool/index.ts', import.meta.url)),
                encoding: fileURLToPath(new URL('src/encoding/index.ts', import.meta.url)),
                engine: fileURLToPath(new URL('src/engine/index.ts', import.meta.url)),
                errors: fileURLToPath(new URL('src/errors/index.ts', import.meta.url)),
                locale: fileURLToPath(new URL('src/locale/index.ts', import.meta.url)),
                utilities: fileURLToPath(new URL('src/utilities/index.ts', import.meta.url))
            },
            fileName: (format, entryName) => {
                return entryName === 'index' ? `${config.id}.${format}.js` : `${config.id}-${entryName}.${format}.js`;
            },
            formats: ['es']
        },
        rollupOptions: {
            external,
            plugins: [
                Sonda({ filename: 'index', format: 'html', gzip: true, brotli: true, open: false, outputDir: './bundle-analysis-reports/sonda' }),
                visualizer({ filename: './bundle-analysis-reports/rollup-visualiser/index.html', open: false, gzipSize: true, brotliSize: true })
            ]
        },
        target: 'ESNext'
    },
    plugins: [dts({ outDirs: 'dist/types' })],
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./', import.meta.url)),
            '@': fileURLToPath(new URL('src', import.meta.url))
        }
    }
});
