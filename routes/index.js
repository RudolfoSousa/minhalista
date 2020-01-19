const configAuth = require('../config');
var jwt = require('jsonwebtoken');
const passport = require("passport");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const User = mongoose.model("users");
const OrderController = require('../controllers/OrderController');
const verifyJWT = require("../services/verifyAuth");
const saltRounds = 10;
const expiresin = 60 * 60 * 60 * 60 * 1000;
const config = {
  // successRedirect: '/',
  // failureRedirect: '/login',
  session: false
}

module.exports = (app) => {

app.post('/login',
  passport.authenticate('local', config),
  function(req, res) {
    if (req.user) {
      var id = req.user.id;
      var name = req.user.name;
      var token = jwt.sign({ id: id }, configAuth.secret, {
        expiresIn: expiresin
      });
      User.findByIdAndUpdate({_id: id}, {token: token}, false)
      .then((docs) => {
        if(docs){
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token,
            name: name
          });
        }
      })
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
        const newUser = new User({username: req.body.username, password: hash, name: req.body.name, role: false});
        const {userID} = newUser;  
        const token = jwt.sign({ id: userID }, configAuth.secret, {
              expiresIn: expiresin
            });
            newUser.token = token;
          newUser.save()
          .then((user) => {
            const id = user.id;
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token
            });
            done(null, user)
          })
          .catch((err) => {
            res.json({
              success: false,
              message: 'Erro on sign up'
            })
          })
      })
    }
  })
});

app.post('/order', verifyJWT.checkToken, OrderController.store);
app.get('/order', verifyJWT.checkToken, OrderController.list);

// // Get all lists by user
// app.get('/lista',verifyJWT.checkToken, (req, res, done) => {
//   // console.log(req.decoded.id)
//   List.find({userId: req.decoded.id}, (err, list) => {
//     if(list){
//       res.send(list)
//     }else{
//       res.send(err)
//     }
//   })
// });
}
