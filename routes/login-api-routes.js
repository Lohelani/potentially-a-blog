var db = require("../models");


module.exports = function(app){
  app.get("/api/login", function(req, res) {

    db.User.findAll({
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};