import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './dist-drizzle-kit/adapter/secondary/db/rdb/schema/*.sql.js',
  out: './drizzle',
  dbCredentials: {
    url: process.env['DATABASE_URL']!,
  },
});
