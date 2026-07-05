// ── External Dependencies & Registrations
import { dpuseESLintConfig } from '@dpuse/eslint-config-dpuse';

// ── ESLint Configuration ─────────────────────────────────────────────────────────────────────────────────────────────

/** @type {import('eslint').Linter.Config[]} */
const config = dpuseESLintConfig({
    ignores: ['rust/**'],
    rules: {
        'unicorn/filename-case': ['error', { cases: { camelCase: true, pascalCase: true }, ignore: [/\.schema\.ts$/] }],
        'unicorn/max-nested-calls': ['error', { max: 5 }] // Increased level from default of 3 to 5 for Valibot schema definitions.
    }
});

export default config;
