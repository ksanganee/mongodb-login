const express = require('express');
var router = express.Router();
const passport = require('passport');

router.get("/", (req, res) => {
  console.log("test")
  req.logout();
  req.app.set("info", "You are logged out")
  res.redirect("/login")
})


module.exports = router;
