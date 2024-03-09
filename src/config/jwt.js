import jwt from "jsonwebtoken";

const generateToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

const checkToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return {
        statusCode: 401,
        message: "Invalid token",
      };
    }
    return {
      statusCode: 200,
      data: decoded,
    };
  });
};

const apiKey = (req, res, next) => {
  let { token } = req.headers;

  if (token) {
    let verifyToken = checkToken(token);
    if (verifyToken.statusCode == 200) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

export { generateToken, checkToken, apiKey };
