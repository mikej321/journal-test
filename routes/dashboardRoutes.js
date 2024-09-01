const Router = require("express").Router();

Router.get("/", (req, res, next) => {
  res.render("dashboard", {
    user: req.user,
  });
});

module.exports = Router;
