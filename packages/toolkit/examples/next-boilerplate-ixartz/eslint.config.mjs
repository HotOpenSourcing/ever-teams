import nextConfigs from '@ever-teams/eslint-config/next.mjs';
import rootConfig from '../../../../eslint.config.mjs';

/**
 * ESLint 9 flat config. This file held a copy of examples/base/.eslintrc.js written as
 * an eslintrc object (`extends`), which flat config rejects, so ESLint crashed on it.
 * It is now the flat config examples/base uses, with the intended `parserOptions` instead of the `parseOptions` typo.
 * The earlier, commented-out config is kept below.
 */
export default [
	...rootConfig,
	...nextConfigs,
	{
		// Type-aware parsing for the TypeScript files (`eslint .` also lints the JavaScript config files) that
		// tsconfig.json includes: it leaves out the tests.
		files: ['**/*.{ts,tsx}'],
		ignores: ['**/*.spec.ts', '**/*.e2e.ts'],
		languageOptions: {
			sourceType: 'module',
			parserOptions: {
				project: 'tsconfig.json',
				tsconfigRootDir: import.meta.dirname
			}
		}
	}
];
