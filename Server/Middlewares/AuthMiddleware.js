const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      return res.status(403).json({ message: "Please Login" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Error while authentication" });
  }
};

module.exports = { authMiddleware };
