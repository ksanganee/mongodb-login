const express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const { ensureAuthenticated } = require("../config/auth")

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/learn")
  }
  res.render("./partials/login", {
    layout: "main",
    data: {
      error: req.app.get("error"),
      info: req.app.get("info")
    }
  })
  if (req.app.get("error")) {
    req.app.set("error", "")
  }
  if (req.app.get("info")) {
    req.app.set("info", "")
  }
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/learn',
  failureRedirect: '/failed',
}))

module.exports = router;
