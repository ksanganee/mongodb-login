const express = require('express');
var router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated } = require("../config/auth")

router.get("/", ensureAuthenticated, (req, res) => {
  User.findOne({ username: req.user.username }).then(user => {
    temp = user.progress[req.query.module]
    if (temp.indexOf(req.query.question) === -1) {
      temp.push(req.query.question)
      user.progress[req.query.module] = temp;
    }
    user.save()
    redirectstring = "/learn/" + req.query.module
    res.redirect(redirectstring)
  })
});

module.exports = router;
