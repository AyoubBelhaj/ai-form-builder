import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  dialect: "postgresql",
  schema:'./src/db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL_FK ||
    "postgres://postgres:postgres@localhost:5432/postgres",
    ssl: { rejectUnauthorized: false },
  }
})