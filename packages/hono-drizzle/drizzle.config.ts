import { defineConfig } from 'drizzle-kit';

const { DATABASE_URL } = process.env;
if (DATABASE_URL === undefined) {
  throw new Error('DATABASE_URL is not defined');
}
console.log('DATABASE_URL:', DATABASE_URL);

export default defineConfig({
  dialect: 'postgresql',
  schema: './dist-drizzle-kit/adapter/secondary/db/rdb/schema/*.sql.js',
  out: './drizzle',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
