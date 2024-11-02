const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middlware");

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post(
  "/signup",
  catchAsync(async (req, res, next) => {
    try {
      const { fullName, email, username, password } = req.body;
      const user = new User({ fullName, email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "welcome to spoonful stories");
        res.redirect("/recipes");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "welcome back!!!");
    const redirectUrl = res.locals.returnTo || "/recipes";
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "goodbye !");
  res.redirect("/");
});

module.exports = router;
