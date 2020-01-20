const express = require ("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const helmet = require('helmet');
const app = express();
const cors = require('cors')
require ("./models/User");
require ("./models/Orders");
require ("./services/passport.js");
var mongoose = require('mongoose');
var keys = require("./config");

mongoose.connect(keys.dbURL, {
  useNewUrlParser: true,
  useFindAndModify: false ,
  useCreateIndex: true
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(helmet());
app.use(cors());
app.options('*', cors());

require('./routes/index.js')(app);

const PORT = process.env.PORT | 8000;

app.listen(PORT, () => {
  console.log("App run on port: " + PORT);
})
