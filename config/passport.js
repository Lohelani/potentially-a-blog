var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");


passport.use(
  new LocalStrategy(
    {
      emailField: "email"
    },
    function(email, password, done) {
      db.Author.findOne({
        where: {
          email: email
        }
      }).then(function(dbAuthor) {
        if (!dbAuthor) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        else if (!dbAuthor.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        return done(null, dbAuthor);
      });
    }
  )
);

passport.serializeUser(function(Author, cb) {
  cb(null, Author);
});

passport.deserializeUser(function(obj, cb){
  cb(null, obj);
});


module.exports = passport;