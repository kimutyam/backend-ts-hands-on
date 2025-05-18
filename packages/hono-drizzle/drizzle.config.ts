import { defineConfig } from 'drizzle-kit';

const { DATABASE_URL } = process.env;
if (DATABASE_URL === undefined) {
  throw new Error('DATABASE_URL is not defined');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './dist-drizzle-kit/adaptor/serverSide/postgresql/schema/*.sql.js',
  out: './drizzle',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
