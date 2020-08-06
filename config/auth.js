module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      req.app.set("info", "Please login to view this resource")
      res.redirect("/login")
    }
  }
}
