import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema:
    './dist-drizzle-kit/adapter/secondary/persistence/rdb/schema/*.sql.js',
  out: './drizzle',
  casing: 'snake_case',
  dbCredentials: {
    url: process.env['DATABASE_URL']!,
  },
});
