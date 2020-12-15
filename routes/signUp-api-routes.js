var db = require("../models");


module.exports = function (app) {
  app.get("/api/signup", function (req, res) {

    db.NewUser.findAll({
      include: [db.Post]
    }).then(function (dbNewUser) {
      res.json(dbNewUser);
    });
  });



};