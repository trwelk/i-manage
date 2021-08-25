const uuid = require('uuid');
const orderSchema = require('../model/Order.model')


  const addOrder = async obj => {
    return new Promise((resolve, reject) => {
        var newOrderSchema = new orderSchema({
            userId: obj.userId,
            products: obj.items,
            qty: obj.qty,
            total: obj.total,
            itemCount: obj.itemCount
        });

        newOrderSchema.save()
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

async function getOrders() {
    return new Promise((resolve, reject) => {
        orderSchema.find(null, function (err, response) {
            if (err)
                reject(err)
            else {
                resolve(response);
            }
        });
    })

}

async function getOrder(orderid) {
    const query = { id: orderid }
    return new Promise((resolve, reject) => {
       orderSchema.find(query,function(err, response){
            if(err)
                reject(err)
            else{
                resolve(response)
            }
         });
    })

}

async function deleteOrder(orderid) {
    return new Promise((resolve, reject) => {
        var query = { id:orderid };
       orderSchema.deleteOne(query,function(err, response) {
            if (err) {
                reject(err)
            }
            resolve(response)
          });
    })
   
}


async function updateOrder(order) {
    var filter = {userid:order.userid};
    let updatedOrder = awaitorderSchema.findOneAndReplace(filter,order, {
        new: true
    });
    return updatedOrder;
}
module.exports = {addOrder, getOrders, getOrder, deleteOrder, updateOrder };