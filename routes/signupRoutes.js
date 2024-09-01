const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const prisma = require("../prisma");

Router.get("/", (req, res, next) => {
  res.render("signup");
});

Router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    try {
      await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  });
});

module.exports = Router;
