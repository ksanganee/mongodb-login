const express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth")

router.get("/", (req, res) => {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    res.render("./partials/learn", { layout: "main" })
  } else {
    res.redirect("/login")
  }

})

module.exports = router;
