import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/adapter/secondary/persistence/rdb/schema/*.sql.ts',
  out: './drizzle',
  casing: 'snake_case',
  dbCredentials: {
    url: process.env['DATABASE_URL']!,
  },
});
