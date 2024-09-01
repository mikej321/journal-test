const Router = require("express").Router();
const passport = require("passport");

Router.get("/", (req, res, next) => {
  res.render("login");
});

Router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/log-in",
  })
);

module.exports = Router;
