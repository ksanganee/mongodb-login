const express = require("express");
const hbs = require("express-handlebars");
require("dotenv").config();
const app = express()
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session')
require("./config/passport-config")(passport)

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.engine("hbs", hbs({ extname: "hbs" }));
app.use(express.json())

app.use(session({
  secret: 'terces',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}))

app.use(passport.initialize());
app.use(passport.session());

app.set("error", "")
app.set("info", "")

app.use("/signup", require("./routes/signup.js"))
app.use("/login", require("./routes/login.js"))
app.use("/learn", require("./routes/learn.js"))
app.use("/logout", require("./routes/logout.js"))
app.use("/failed", require("./routes/failed.js"))
app.use("/updatedb", require("./routes/updatedb"))

app.get("/", (req, res) => {
  res.redirect("/login")
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
});
