import { drizzle } from "drizzle-orm/node-postgres"
import pkg from "pg"
import schema from "./schema/index.js"
import { DATABASE_URL } from "../src/utils/constants.js"

const { Pool } = pkg

const pool = new Pool({
  connectionString: DATABASE_URL,
})

pool
  .connect()
  .then(async () => {
    console.log("Database connection has been established successfully.")
    
  })

  
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })

export const database = drizzle(pool, { schema })

