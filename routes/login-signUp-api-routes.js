var db = require("../models");

var passport = require("../config/passport.js");
// var {deserializeUser} = require("../config/passport.js");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(
      //{
      console.log(req.user.username)
      // username: req.author.username,
      // id: req.author.id
    //}
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

  app.post("api/createblog", function(req, res) {
    db.Post.create({
      title: req.body.title,
      body: req.body.body
    }).then(function(){
      res.redirect(307, "/").catch(function(err){
        res.status(401).json(err);
      });
    });
  });


  app.get("/logout", function(req, res) {
    req.logout();
    deserializeUser();
    res.redirect("/");
  });


  app.get("/api/user_data", function(req, res) {
    if (!req.author) {

      res.json({});
    } else {

      res.json({
        email: req.author.email,
        id: req.author.id
      });
    }
  });
};