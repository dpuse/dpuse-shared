// ── External Dependencies & Registrations
import { dpuseESLintConfig } from '@dpuse/eslint-config-dpuse';

// ── ESLint Configuration ─────────────────────────────────────────────────────────────────────────────────────────────

/** @type {import('eslint').Linter.Config[]} */
const config = dpuseESLintConfig({
    ignores: ['rust/**', 'tests/fixtures/**'], // Fixtures include third-party files, such as chardet's generated corpus.
    rules: {}
});

export default config;
