var db = require("../models");

var passport = require("../config/passport.js");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json({
      username: req.user.username,
      id: req.user.id
    }
    );
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.username);
    res.json(req.password);
    //res.json(db.Author)
  });


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


  app.post("/api/signup", function(req, res) {
    db.Author.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        console.log(req);
        //res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });


  app.post("/api/createblog", function(req, res) {
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      AuthorId:req.body.author
    }).then(function(){
      res.redirect(307, "/").catch(function(err){
        res.status(401).json(err);
      });
    });
  });

  app.get("/api/createblog", function(req,res) {
    res.json({
      title: req.body.title,
      body: req.body.body
    });
  });

  // app.post("/api/viewblogs", function(req, res){
  //   db.Post.create({
  //     title: req.body.title,
  //     body: req.body.body
  //   }).then(function(){
  //     console.log(req);
  //   }).catch(function(err){
  //     res.status(401).json(err);
  //   });
  // });

  app.get("/viewblogs", function(req,res) {
    res.json(res);
  });

  app.get("/logout", function(req, res) {
    req.logout();
    passport.deserializeUser();
    res.redirect("/");
  });

  // app.get("/logout", function(req, res) {
  //   req.logout();
  //   res.redirect("/");
  // });

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