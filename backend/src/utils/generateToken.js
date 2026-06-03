// create jwt token using jwt secret and id, it expires in 7 days

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default generateToken;
