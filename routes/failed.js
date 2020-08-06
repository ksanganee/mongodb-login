const express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  console.log("test")
  req.app.set("error", "The username or password is incorrect")
  res.redirect("/login")
})

module.exports = router;
