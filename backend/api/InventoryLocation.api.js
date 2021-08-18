const uuid = require('uuid');
const inventoryLocationSchema = require('../model/InventoryLocation.model')
// const mailApi = require('../api/mail.api');


/*Inserts a new inventoryLocation entity into the database and returns the object if successfull : else returns the error 
  Catch this error from where it's called and throw an error*/
  const addInventoryLocation = async obj => {
    return new Promise((resolve, reject) => {
        var newInventoryLocation = new inventoryLocationSchema({
            id: obj.id,
            locationName: obj.locationName,
            locationDescription: obj.locationDescription,
            address: obj.address,
            city: obj.city,
            country: obj.country,
            manager: obj.manager
        });

        newInventoryLocation.save()
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}


/*Fetches all the inventoryLocations and returns a json array of inventoryLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getInventoryLocation() {
    return new Promise((resolve, reject) => {
        inventoryLocationSchema.find(null, function (err, response) {
            if (err)
                reject(err)
            else {
                resolve(response);
            }
        });
    })

}


/*Fetches all the inventoryLocations for a given category and returns a json array of inventoryLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getInventoryLocationByCategory(category) {
    const query = { categories: category }
    return new Promise((resolve, reject) => {
        inventoryLocationSchema.find(query,function(err, response){
            if(err)
                reject(err)
            else{
                resolve(response)
            }
         });
    })

}

async function deleteInventoryLocation( inventoryLocationId ) {
    return new Promise((resolve, reject) => {
        var query = { id: inventoryLocationId };
        inventoryLocationSchema.deleteOne(query,function(err, response) {
            if (err) {
                reject(err)
            }
            resolve(response)
          });
    })
   
}


async function updateInventoryLocation( inventory ) {
    var filter = {id: inventory.id};
    let updatedInventory = await inventoryLocationSchema.findOneAndReplace(filter,inventory, {
        new: true
    });
    return updatedInventory;
}
module.exports = {updateInventoryLocation, addInventoryLocation, getInventoryLocationByCategory, getInventoryLocation ,deleteInventoryLocation };