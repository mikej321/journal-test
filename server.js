const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();

// prisma import
const prisma = require("./prisma");

// routes
const loginRoutes = require("./routes/loginRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const signupRoutes = require("./routes/signupRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) {
        return done(null, false, {
          message: "Incorrect Username",
        });
      } else {
        console.log(user);
      }

      const comparison = await bcrypt.compare(password, user.password);
      if (!comparison) {
        return done(null, false, {
          message: "Incorrect Password",
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      console.log(user);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("/", (req, res, next) => {
  res.render("index", {
    user: req.user,
  });
});

app.use("/log-in", loginRoutes);
app.use("/log-out", logoutRoutes);
app.use("/sign-up", signupRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(3000, () => console.log("listening on port 3000"));
