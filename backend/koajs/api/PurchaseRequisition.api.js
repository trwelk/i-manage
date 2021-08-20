const uuid = require('uuid');
const purchaseRequisitionSchema = require('../model/PurchaseRequisition.model')
// const mailApi = require('../api/mail.api');


/*Inserts a new purchaseRequisitionLocation entity into the database and returns the object if successfull : else returns the error 
  Catch this error from where it's called and throw an error*/
  const addPurchaseRequisition = async obj => {
    return new Promise((resolve, reject) => {
        var newPurchaseRequisitionSchema = new purchaseRequisitionSchema({
            id: obj.id,
            purchaseRequisitionName: obj.PurchaseRequisitionName,
            Note: obj.Note,
            contractDate: obj.contractDate,
            contractExpDate: obj.contractExpDate,
            contactNumber: obj.contactNumber,
            contactEmail: obj.contactEmail,
            currencyCode: obj.currencyCode,
            state: obj.state,
            rating: obj.rating,

        });

        newPurchaseRequisitionSchema.save()
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}


/*Fetches all the purchaseRequisitionLocations and returns a json array of purchaseRequisitionLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getPurchaseRequisitions() {
    return new Promise((resolve, reject) => {
        purchaseRequisitionSchema.find(null, function (err, response) {
            if (err)
                reject(err)
            else {
                resolve(response);
            }
        });
    })

}


/*Fetches all the purchaseRequisitionLocations for a given category and returns a json array of purchaseRequisitionLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getPurchaseRequisitionsByCategory(category) {
    const query = { categories: category }
    return new Promise((resolve, reject) => {
        purchaseRequisitionSchema.find(query,function(err, response){
            if(err)
                reject(err)
            else{
                resolve(response)
            }
         });
    })

}

async function deletePurchaseRequisition( purchaseRequisitionId ) {
    return new Promise((resolve, reject) => {
        var query = { id: purchaseRequisitionId };
        purchaseRequisitionSchema.deleteOne(query,function(err, response) {
            if (err) {
                reject(err)
            }
            resolve(response)
          });
    })
   
}


async function updatePurchaseRequisition( purchaseRequisition ) {
    var filter = {id: purchaseRequisition.id};
    let updatedPurchaseRequisition = await purchaseRequisitionSchema.findOneAndReplace(filter, purchaseRequisition, {
        new: true
    });
    return updatedPurchaseRequisition;
}
module.exports = {updatePurchaseRequisition, addPurchaseRequisition, getPurchaseRequisitionsByCategory, getPurchaseRequisitions ,deletePurchaseRequisition };