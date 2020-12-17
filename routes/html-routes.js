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

  app.get("/createblog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blogCreate.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signUp.html"));
  });

  // Here we've add our authenticate middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};