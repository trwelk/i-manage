const uuid = require('uuid');
const cartSchema = require('../model/Cart.model')


  const addCart = async obj => {
    return new Promise((resolve, reject) => {
        var newCartSchema = new cartSchema({
            userId: obj.userId,
            items: obj.items
        });

        newCartSchema.save()
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

async function getUserCart(userid) {
    const query = { userId: userid }
    return new Promise((resolve, reject) => {
       cartSchema.find(query,function(err, response){
            if(err)
                reject(err)
            else{
                resolve(response)
            }
         });
    })

}

async function deleteCart(userid) {
    return new Promise((resolve, reject) => {
        var query = { userid:userid };
       cartSchema.deleteOne(query,function(err, response) {
            if (err) {
                reject(err)
            }
            resolve(response)
          });
    })
   
}


async function updateCart(cart) {
    var filter = {userid:cart.userid};
    let updatedCart = awaitcartSchema.findOneAndReplace(filter,cart, {
        new: true
    });
    return updatedCart;
}
module.exports = {updateCart, addCart, getUserCart, deleteCart };