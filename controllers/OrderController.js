var mongoose = require('mongoose');
const Order = mongoose.model("orders");

module.exports = {

    list(req, res, done){
        const { index } = req.body;
        const { id } = req.decoded;
        if(index){
            Order.find({ $text: { 
                $search: index,
                $caseSensitive: true 
            } }, (err, order) => {
                if(order){
                    res.send({success: true, order})
                }else{
                    res.send({success: false, err})
                }
            })
        }else{
            Order.find({userId: id}, (err, orders) => {
                if(orders && orders.length > 0){
                    res.send({success: true, orders})
                    done();
                }else if(!orders.length > 0){
                    res.send({success: false, err: "User don't have orders"});
                }else{
                    res.send({success: false, err})
                }
            })
        }
    },

    async store(req, res, done){
        const { orderType, orderDescription } = req.body;
        const { id } = req.decoded;
        const newOrder = await new Order({ userId: id, orderType, orderDescription });
        
        newOrder.orderStatus = 'open';
        newOrder.orderRole = false;
    
        newOrder.save()
        .then((order) => {
            res.send({
                success: true,
                order: order
            });
            done();
        })
        .catch((err) => {
            res.status(500).send({error: err, success: false})
        })
        return newOrder;
    }

}