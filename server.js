const express = require("express");
const hbs = require("express-handlebars");
require("dotenv").config();
const app = express()
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session')
require("./config/passport-config")(passport)
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.engine("hbs", hbs({ extname: "hbs" }));

app.use(express.json())

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.success_msg = req.flash('error_msg');
  res.locals.error = req.flash('error')
  next();
})

app.use("/signup", require("./routes/signup.js"))
app.use("/login", require("./routes/login.js"))
app.use("/learn", require("./routes/learn.js"))
app.use("/logout", require("./routes/logout.js"))

app.get("/", (req, res) => {
  res.redirect("/login")
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
});
