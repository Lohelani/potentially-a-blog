var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/viewblogs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
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

};