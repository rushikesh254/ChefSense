import dotenv from "dotenv";
dotenv.config();
import { app } from "./src/app.js";
import connectDB from "./src/db/db.js";

const port = process.env.PORT || 1337;

connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`ChefSense Server running on port ${port}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  })
  .catch((error) => {
    console.error("Failed to connect to the database. Server not started.");
    console.error(error.message);
    process.exit(1);
  });
