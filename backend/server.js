/**
 * SmartLab Equipment Manager — Backend API Server
 * CADMech Full Stack Assessment
 *
 * Endpoints:
 *   GET    /api/equipment      — List all equipment (with search/filter)
 *   GET    /api/equipment/:id  — Get single equipment
 *   POST   /api/equipment      — Create new equipment
 *   PUT    /api/equipment/:id  — Update equipment
 *   DELETE /api/equipment/:id  — Delete equipment
 *   GET    /api/stats          — Dashboard statistics
 */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiRoutes = require("./routes/api");
const app = express();
const PORT = process.env.PORT || 5000;
// ─── Middleware ─────────────────────────────────────────────
app.use(
  cors({
    origin: ["http://localhost:5173", "https://vijaypatil2003.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ─── Request Logging (simple) ──────────────────────────────
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
  next();
});
// ─── Routes ────────────────────────────────────────────────
app.use("/api", apiRoutes);
// ─── Health Check ──────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "CADMech Equipment Manager API is running",
    timestamp: new Date().toISOString(),
  });
});
// ─── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} does not exist`,
  });
});
// ─── Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong",
  });
});
// ─── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════════╗
  ║  🏭 CADMech Equipment Manager API             ║
  ║  Server running on http://localhost:${PORT}       ║
  ║  Health: http://localhost:${PORT}/api/health      ║
  ╚════════════════════════════════════════════════╝
  `);
});
module.exports = app;
