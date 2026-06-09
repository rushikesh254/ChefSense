// 404 handler - runs when no route matches
const notFound = (req, res) => {
  res.status(404).json({ error: "Route not found" });
};

// global error handler - catches anything that slips past controller try/catch
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Something went wrong" });
};

export { errorHandler, notFound };
