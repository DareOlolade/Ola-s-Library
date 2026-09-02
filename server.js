const express = require("express");
const path = require("path");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware & View engine settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// --- Routes ---
app.use("/", postRoutes);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`mdblog running at http://localhost:${PORT}`);
});

