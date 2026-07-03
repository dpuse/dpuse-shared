// ── External Dependencies & Registrations
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import Sonda from 'sonda/vite';
import { fileURLToPath, URL } from 'node:url';

// ── Data
import config from './config.json';

// ── Vite Configuration ───────────────────────────────────────────────────────────────────────────────────────────────

export default defineConfig({
    build: {
        lib: {
            entry: {
                component: fileURLToPath(new URL('src/component/index.ts', import.meta.url)),
                componentConnection: fileURLToPath(new URL('src/component/connection/index.ts', import.meta.url)),
                componentDataView: fileURLToPath(new URL('src/component/dataView/index.ts', import.meta.url)),
                componentDimension: fileURLToPath(new URL('src/component/dimension/index.ts', import.meta.url)),
                componentEventQuery: fileURLToPath(new URL('src/component/eventQuery/index.ts', import.meta.url)),
                componentModel: fileURLToPath(new URL('src/component/model/index.ts', import.meta.url)),
                componentModelDimension: fileURLToPath(new URL('src/component/model/dimension/index.ts', import.meta.url)),
                componentModelEntity: fileURLToPath(new URL('src/component/model/entity/index.ts', import.meta.url)),
                componentModelEntityDataItem: fileURLToPath(new URL('src/component/model/entity/dataItem/index.ts', import.meta.url)),
                componentModelEntityEvent: fileURLToPath(new URL('src/component/model/entity/event/index.ts', import.meta.url)),
                componentModelEntityPrimaryMeasure: fileURLToPath(new URL('src/component/model/entity/primaryMeasure/index.ts', import.meta.url)),
                componentModelSecondaryMeasure: fileURLToPath(new URL('src/component/model/secondaryMeasure/index.ts', import.meta.url)),
                componentModule: fileURLToPath(new URL('src/component/module/index.ts', import.meta.url)),
                componentModuleConnector: fileURLToPath(new URL('src/component/module/connector/index.ts', import.meta.url)),
                componentModuleContext: fileURLToPath(new URL('src/component/module/context/index.ts', import.meta.url)),
                componentModuleEngine: fileURLToPath(new URL('src/component/module/engine/index.ts', import.meta.url)),
                componentModulePresenter: fileURLToPath(new URL('src/component/module/presenter/index.ts', import.meta.url)),
                componentModuleTool: fileURLToPath(new URL('src/component/module/tool/index.ts', import.meta.url)),
                componentPresentation: fileURLToPath(new URL('src/component/presentation/index.ts', import.meta.url)),
                encoding: fileURLToPath(new URL('src/encoding/index.ts', import.meta.url)),
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
            plugins: [Sonda({ filename: 'index', format: 'json', brotli: true, gzip: false, open: false, outputDir: './bundle-analysis-reports/sonda' })]
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
