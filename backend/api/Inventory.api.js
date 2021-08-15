const uuid = require('uuid');
const inventorySchema = require('../model/inventory.model')
// const mailApi = require('../api/mail.api');


/*Inserts a new inventory entity into the database and returns the object if successfull : else returns the error 
  Catch this error from where it's called and throw an error*/
  const addInventory = async obj => {
    return new Promise((resolve, reject) => {
        var newInventory = new inventorySchema({
            id: uuid.v4(),
            paperUploader: obj.paperUploader,
            paperTopic: obj.paperTopic,
            paperLink: obj.paperLink,
            state: "requested",
            email: obj.email,
        });

        newInventory.save()
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}


/*Fetches all the inventorys and returns a json array of inventorys.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getInventory() {
    return new Promise((resolve, reject) => {
        inventorySchema.find(null, function (err, response) {
            if (err)
                reject(err)
            else {
                resolve(response);
            }
        });
    })

}


/*Fetches all the inventorys for a given category and returns a json array of inventorys.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getInventoryByCategory(category) {
    const query = { categories: category }
    return new Promise((resolve, reject) => {
        inventorySchema.find(query,function(err, response){
            if(err)
                reject(err)
            else{
                resolve(response)
            }
         });
    })

}

async function deleteInventory(inventoryId) {
    return new Promise((resolve, reject) => {
        var query = { id: inventoryId };
        inventorySchema.deleteOne(query,function(err, response) {
            if (err) {
                reject(err)
            }
            resolve(response)
          });
    })
   
}


async function updateInventory(inventory) {
    var filter = {id: inventory.id};
    let updatedInventory = await inventorySchema.findOneAndReplace(filter,inventory, {
        new: true
    });
    return updatedInventory;
}
module.exports = {updateInventory, addInventory, getInventoryByCategory, getInventory ,deleteInventory };