const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const { connectDatabase } = require("./startup/database.js");
connectDatabase();

const folders = require("./startup/folders.js");
folders.init();

const router = require("./routes/api/routes.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use("/avatars", express.static(path.join(__dirname, "./public/avatars")));
app.use("public", express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;