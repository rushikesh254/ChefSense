import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "ChefSense API is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export { app };
