const uuid = require('uuid');
const orderSchema = require('../model/Order.model')


  const addOrder = async obj => {
    return new Promise((resolve, reject) => {
        var newOrderSchema = new orderSchema({
            id: uuid.v4(),
            userId: obj.userId,
            source: obj.source,
            date: obj.date,
            items: obj.items,
            total: obj.total,
            status: 'New'
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
    var filter = {userId:order.userId};
    let updatedOrder = await orderSchema.findOneAndReplace(filter,order, {
        new: true
    });
    return updatedOrder;
}
module.exports = {addOrder, getOrders, getOrder, deleteOrder, updateOrder };