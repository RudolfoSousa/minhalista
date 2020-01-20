var mongoose = require('mongoose');

var OrdersSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  orderCreated: { type: Date, default: Date.now },
  orderType: String,
  orderStatus: String,
  orderDescription: String,
  orderRole: Boolean
});

OrdersSchema.index({'$**': 'text'});
mongoose.model('orders', OrdersSchema);
