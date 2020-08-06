const express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth")
const User = require('../models/User');

router.get("/", ensureAuthenticated, (req, res) => {
  {
    let score = []
    User.findOne({
        username: req.user.username
      })
      .then(user => {
        if (user) {
          for (var i=1; i<=6; i++) {
            score.push(user.progress[i].length)
          }
          res.render("./partials/learn", {
            layout: "main",
            data: {
              progress: score
            }
          })
        }
      });
  }
})

router.get('/:module', (req, res) => {
  if (req.isAuthenticated()) {
    res.render(`modules/${req.params.module}`, {
      layout: 'module',
    });
  } else {
    req.app.set("info", "Please login to view this resource")
    res.redirect("/login")
  }
})

module.exports = router;
