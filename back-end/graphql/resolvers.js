const jwt = require("jsonwebtoken");

const resolvers = {
  // Define resolvers here
};

// JWT Authorization
const generateAccessToken = (userDetails) => {
  return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: "1800s" });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, userDetails) => {
    if (err) return res.sendStatus(403);
    req.userDetails = userDetails;
    next();
  });
};
