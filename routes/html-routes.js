var path = require("path");

var authenticate = require("../config/middleware/authenticate");

module.exports = function(app) {

  app.get("/", function(req, res) {
    //send user to the home page, an account is not necessary unless they want to create a post
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/viewblogs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //authenticate is used to restrict the user from viewing this page unless signed in
  app.get("/createblog", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blogCreate.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signUp.html"));
  });

  //   app.get("/members", isAuthenticated, function(req, res) {
  //     res.sendFile(path.join(__dirname, "../public/members.html"));
  //   });

  //   app.get("/login", function(req, res) {

  //   });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
    //res.end();
  });

  //might need app.get("/google")

};