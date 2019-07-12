var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  userId: String,
  listName: String,
  products: Array,
  dataCreated: Date,
  totalPrice: String
});

mongoose.model('lists', listSchema);
