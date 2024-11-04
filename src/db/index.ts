import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const connectionString = process.env.DATABASE_URL_FK ||
"postgres://postgres:postgres@localhost:5432/postgres";
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client,{schema});