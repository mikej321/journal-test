const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const prisma = require("../prisma");
const { body, validationResult } = require("express-validator");

Router.get("/", (req, res, next) => {
  res.render("signup");
});

Router.post(
  "/",
  // using validation to verify valid inputs (middleware)
  [
    body("username").notEmpty().withMessage("Cannot be empty").trim(),
    body("password")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isStrongPassword()
      .withMessage("Password not strong enough")
      .trim(),
  ], // Be sure to not have an extra comma or it won't work
  async (req, res, next) => {
    // start of the validationResult middleware
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

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
  }
);

module.exports = Router;
