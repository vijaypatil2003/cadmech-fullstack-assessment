const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const DB_PATH = process.env.DB_PATH || path.join(__dirname, "equipment.sqlite");
const SCHEMA_PATH = path.join(__dirname, "schema.sql");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

function loadSqliteSchema() {
  const fullSchema = fs.readFileSync(SCHEMA_PATH, "utf8");

  // schema.sql contains MySQL and PostgreSQL variants too - slice only the SQLite block
  const startMarker = "CREATE TABLE IF NOT EXISTS equipment";
  const endMarker = "OPTION 2: MySQL";

  const startIdx = fullSchema.indexOf(startMarker);
  const endIdx = fullSchema.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    throw new Error("Could not locate SQLite schema block in schema.sql");
  }

  return fullSchema.slice(startIdx, endIdx);
}

function initSchema() {
  const equipmentTableExists = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='equipment'",
    )
    .get();

  // skip if table exists - prevents duplicate seed inserts on server restart
  if (equipmentTableExists) return;

  const sqliteSchema = loadSqliteSchema();
  db.exec(sqliteSchema);
  console.log("SQLite schema initialized with seed data");
}

initSchema();

module.exports = db;
