import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";

// dotenv configuration
dotenv.config({
  path: ".env",
});

// port configuration
const port = process.env.PORT || 1337;

// server start and database connection

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Failed to connect to the database. Server not started. ❌",
      error.message,
    );
  });
