// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.username);
    res.json(req.password);
    //res.json(db.Author)
  });


  app.post("/api/signup", function(req, res) {
    db.Author.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });


  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/viewblogs", function(req,response) {
    res.json(response);
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/userdata", function(req, res) {
    if (!req.user) {

      res.json({});
    } else {

      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });
};