var db = require("../models");

var passport = require("../config/passport.js");
// var {deserializeUser} = require("../config/passport.js");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json({
      username: req.user.username,
      id: req.user.id
    }
    );
  });
  // app.post('/login',
  // passport.authenticate('local', { successRedirect: '/',
  //                                  failureRedirect: '/login',
  //                                  failureFlash: true })


  app.post("/api/signup", function(req, res) {
    db.Author.create({
      password: req.body.password,
      username: req.body.username
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err){
        res.status(401).json(err);
      });
  });


  app.get("/logout", function(req, res) {
    req.logout();
    deserializeUser();
    res.redirect("/");
  });

};