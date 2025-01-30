import { DATABASE_URL } from "./src/utils/constants.js";
import { defineConfig } from "drizzle-kit";

const config =  {
  dialect: "postgresql",
  schema: "./db/schema",
  out: "./migrations",
  dbCredentials: {
    url: DATABASE_URL,
  },
}

export default defineConfig(config);

