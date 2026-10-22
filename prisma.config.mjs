import "dotenv/config";
import { defineConfig } from "prisma/config";
import { resolve } from "node:path";
import { existsSync, writeFileSync } from "node:fs";

const url = process.env.DATABASE_URL || "file:./prisma/flights.db";
const databasePath = resolve(url.slice(5));
if (!existsSync(databasePath)) writeFileSync(databasePath, "");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { seed: "node prisma/seed.mjs" },
  datasource: { url: `file:${databasePath}` },
});
