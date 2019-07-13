const passport = require("passport");
var bcrypt = require('bcrypt');
const saltRounds = 10;
var mongoose = require('mongoose');
const User = mongoose.model("users");
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if(result == false){
          return done(null, false, { message: 'Incorrect password.' });
        }else{
          return done(null, user);
        }
      })
    });
  }
));
