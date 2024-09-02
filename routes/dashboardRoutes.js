const Router = require("express").Router();
const jwt = require("jsonwebtoken");

Router.get("/", (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No Token Provided" });
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      res.render("dashboard", {
        user: decoded,
        token,
      }); // Pass the token to the EJS template
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = Router;
