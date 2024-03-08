const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) res.status(401).json({ message: "Unauthorized" });

  token = token.replace("Bearer ", "");

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { validateToken };
