var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  role: Boolean,
  token: String,
  dateCreate: { type: Date, default: Date.now },
});

UserSchema.methods.validPassword = function( password ) {
    return ( this.password === password );
};

mongoose.model('users', UserSchema);
