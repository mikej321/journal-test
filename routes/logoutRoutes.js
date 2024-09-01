const Router = require("express").Router();

Router.get("/", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect("/");
  });
});

module.exports = Router;
