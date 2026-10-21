/** @type {import('jest').Config} */
module.exports = {
	preset: 'jest-expo',
	transform: {
		// ts-jest for TS/TSX, but pointed at THIS project's tsconfig.json. Without an explicit
		// tsconfig ts-jest falls back to its own defaults, which include `strict: true` — the
		// project is not strict (neither tsconfig.json nor expo/tsconfig.base enables it), so tests
		// were failing to compile on ~500 strict-mode diagnostics that `tsc -p .` (the CI gate)
		// never reports. Tests must type-check against the same rules the shipped code does.
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.json',
				babelConfig: true,
				// Only report type errors from OUR code. Expo ships TypeScript SOURCE in
				// node_modules (e.g. expo-modules-core/src) that ts-jest would otherwise diagnose
				// against this project's tsconfig — and it is written for strict mode, so it
				// spuriously fails here. skipLibCheck only covers .d.ts, not .ts sources.
				diagnostics: {
					exclude: ['**/node_modules/**']
				}
			}
		];
