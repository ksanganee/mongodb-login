const express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

router.get("/", (req, res) => {
  res.render("./partials/login", { layout: "main" })
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/learn',
  failureRedirect: '/login',
  failureFlash: true
}))

module.exports = router;
