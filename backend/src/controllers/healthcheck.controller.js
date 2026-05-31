// health check controller to check if the server is healthy or not
const healthCheck = (req, res) => {
  try {
    res.status(200).json({ message: "Server is healthy" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server is not healthy", error: error.message });
  }
};

export { healthCheck };
