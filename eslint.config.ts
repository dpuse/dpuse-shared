// External dependencies
import sonarjs from 'eslint-plugin-sonarjs';

// DPU framework
import dpuse from '@dpuse/eslint-config-dpuse';

// ESLint configuration
export default [
    ...dpuse,
    {
        plugins: {
            sonarjs
        },
        rules: {
            // 'sonarjs/cognitive-complexity': ['error', 18]
        }
    }
];
