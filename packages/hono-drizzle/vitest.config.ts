import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

const normalTestConfig = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    include: ['src/**/*.test.ts'],
    exclude: ['src/**/*.db.test.ts'],
  },
});

const dbTestConfig = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    include: ['src/**/*.db.test.ts'],
  },
});

const getConfig = (testType: string | undefined) => {
  switch (testType) {
    case 'normal':
      return normalTestConfig;
    case 'db':
      return dbTestConfig;
    default:
      throw new Error(`TEST_TYPE is unexpected value. Should have been never.`);
  }
};

export default getConfig(process.env['TEST_KIND']);
