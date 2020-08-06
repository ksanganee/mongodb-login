const express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get("/", (req, res) => {
  res.render("./partials/signup", {
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


router.post("/", (req, res) => {
  const {
    username,
    password
  } = req.body;
  if (password.length < 6) {
    req.app.set("error", "Password too short")
    res.redirect("/signup")
  } else {
    User.findOne({
        username: username
      })
      .then(user => {
        if (user) {
          req.app.set("error", "Username already exists")
          res.redirect("/signup")
        } else {
          const newUser = new User({
            username,
            password,
          })
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash
              newUser.save()
                .then(user => {
                  req.app.set("info", "You have successfully signed up, please login below")
                  res.redirect("/login")
                })
                .catch(err => console.log(err))
            }))
        }
      });
  }
})

module.exports = router;
