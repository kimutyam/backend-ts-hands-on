import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// Configuration for database tests (*.db.test.ts)
const dbTestConfig = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    include: ['src/**/*.db.test.ts'],
  },
});

// Configuration for all other tests
const regularTestConfig = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
      '**/*.db.test.ts',
    ],
  },
});

const getConfig = (testType: string | undefined) => {
  switch (testType) {
    case 'regular':
      return regularTestConfig;
    case 'db':
      return dbTestConfig;
    default:
      throw new Error(`TEST_TYPE is unexpected value. Should have been never.`);
  }
};

// Default configuration based on environment variable
export default getConfig(process.env['TEST_TYPE']);
