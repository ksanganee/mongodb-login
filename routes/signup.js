const express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const flash = require('express-flash');
const session = require('express-session');

router.get("/", (req, res) => {
  console.log(req.flash("error_msg"))
  res.render("./partials/signup", {
    layout: "main",
  })
})

router.use(flash());

router.post("/", (req, res) => {
  const {
    username,
    password
  } = req.body;
  if (password.length < 6) {
    req.flash("error_msg", "Password should be at least 6 characters")
    res.redirect("/signup")
  } else {
    User.findOne({
        username: username
      })
      .then(user => {
        if (user) {
          res.render("./partials/signup", {
            layout: "main",
            data: {
              username: username,
              password: password,
              msg: "Username already exists"
            }
          })
        } else {
          const newUser = new User({
            username,
            password
          })
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash
              newUser.save()
                .then(user => {
                  res.render("./partials/login", {
                    layout: "main",
                    data: {
                      msg: "You have sucessfully signed up, please login below"
                    }
                  })
                })
                .catch(err => console.log(err))
            }))
        }
      });
  }

})

module.exports = router;
