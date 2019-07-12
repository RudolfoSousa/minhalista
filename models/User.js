var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.methods.validPassword = function( password ) {
    return ( this.password === password );
};

mongoose.model('users', userSchema);
