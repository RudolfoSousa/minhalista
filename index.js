const express = require ("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const helmet = require('helmet');
const app = express();
require ("./models/User");
require ("./models/List");
require ("./services/passport.js");
var mongoose = require('mongoose');
var keys = require("./config");

mongoose.connect(keys.dbURL, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(helmet());

require('./routes/index.js')(app);

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log("App run on port: " + PORT);
})
