const configAuth = require('../config');
var jwt = require('jsonwebtoken');
const passport = require("passport");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const User = mongoose.model("users");
const List = mongoose.model("lists");
const verifyJWT = require("../services/verifyAuth");
const saltRounds = 10;
const config = {
  // successRedirect: '/',
  // failureRedirect: '/login',
  session: false
}

module.exports = (app) => {

app.get("/", (req, res) => {
  res.send("Hello Word");
});

app.get('/login', function(req, res, next) {
  res.send(req.user)
  console.log(req.user);
});

app.post('/login',
  passport.authenticate('local', config),
  function(req, res) {
    if (req.user) {
      var id = req.user.id;
      var token = jwt.sign({ id: id }, configAuth.secret, {
        expiresIn: 3000 // expires in 5min
      });
      res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
    }else{
      res.status(500).send({error: true});
    }
  });

app.post('/cadastre', (req, res, done) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if(user){
      res.send({failure: true})
    }else{
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        new User({username: req.body.username, password: hash})
          .save()
          .then(user => done(null, user))
          res.send({"success": true});
      })
    }
  })
});

app.post('/lista', (req, res, done) => {
  List.findOne({listName: req.body.listName}, (err, list) => {
    if(list){
      res.send({failure: true, message: "Listname has ben created"})
    }else{
      var date = new Date();
      new List({userId: req.body.userId, listName: req.body.listName, products: req.body.products, dataCreated: date})
        .save()
        .then((list) => {
          res.send({success: true})
          done(null, list);
        })
      res.send(req.body)
    }
  })
});

// Get all lists by user
app.get('/lista',verifyJWT.checkToken, (req, res, done) => {
  console.log(req.decoded.id)
  List.find({userId: req.decoded.id}, (err, list) => {
    if(list){
      res.send(list)
    }else{
      res.send(err)
    }
  })
});

}
