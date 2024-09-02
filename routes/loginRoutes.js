const Router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

Router.get("/", (req, res, next) => {
  res.render("login");
});

Router.post(
  "/",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    res.render("dashboard", {
      token,
      user: req.user,
    });
  }
);

module.exports = Router;
