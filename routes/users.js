const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middlware");
const users = require("../controllers/users");

router.route("/signup").get(users.renderSignup).post(catchAsync(users.signup));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
