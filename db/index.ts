import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import * as schema from "./schema"

function createPool() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment for Drizzle + PostgreSQL.",
    )
  }
  return new Pool({ connectionString })
}

export const pool = createPool()

export const db = drizzle(pool, { schema })

export { schema }
